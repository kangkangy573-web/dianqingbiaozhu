const supabase = require('../utils/supabase');

// 获取交易记录
const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user;
    const { type, status, startDate, endDate, page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // 过滤条件
    if (type) {
      query = query.eq('type', type);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    // 分页
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: transactions, error, count } = await query;

    if (error) {
      console.error('Get transactions error:', error);
      return res.status(500).json({ error: '获取交易记录失败' });
    }

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 申请提现
const requestWithdrawal = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount, method, account } = req.body;

    // 验证提现金额
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: '提现金额必须大于0' });
    }

    // 获取用户余额
    const { data: userStats, error: statsError } = await supabase
      .from('user_stats')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (statsError || !userStats) {
      return res.status(404).json({ error: '用户统计信息不存在' });
    }

    // 检查余额是否足够
    if (userStats.balance < amount) {
      return res.status(400).json({ error: '余额不足' });
    }

    // 开始事务
    // 1. 创建提现交易记录
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'withdraw',
        amount: amount * -1, // 提现为负数
        status: '审核中',
        description: `提现至${method}`,
        metadata: { method, account }
      })
      .select('*')
      .single();

    if (transactionError) {
      console.error('Create transaction error:', transactionError);
      return res.status(500).json({ error: '创建提现记录失败' });
    }

    // 2. 更新用户余额（实际项目中应该在审核通过后再更新）
    // 这里简化处理，直接扣除余额
    await supabase
      .from('user_stats')
      .update({ balance: userStats.balance - amount })
      .eq('user_id', userId);

    res.json({ transaction });
  } catch (error) {
    console.error('Request withdrawal error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取提现历史
const getWithdrawalHistory = async (req, res) => {
  try {
    const { userId } = req.user;
    const { status, page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'withdraw')
      .order('created_at', { ascending: false });

    // 过滤条件
    if (status) {
      query = query.eq('status', status);
    }

    // 分页
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: withdrawals, error, count } = await query;

    if (error) {
      console.error('Get withdrawal history error:', error);
      return res.status(500).json({ error: '获取提现历史失败' });
    }

    res.json({
      withdrawals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0
      }
    });
  } catch (error) {
    console.error('Get withdrawal history error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取钱包余额
const getWalletBalance = async (req, res) => {
  try {
    const { userId } = req.user;

    const { data: userStats, error } = await supabase
      .from('user_stats')
      .select('balance, pending_earnings')
      .eq('user_id', userId)
      .single();

    if (error || !userStats) {
      return res.status(404).json({ error: '用户统计信息不存在' });
    }

    res.json({
      balance: userStats.balance,
      pendingEarnings: userStats.pending_earnings
    });
  } catch (error) {
    console.error('Get wallet balance error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取每日收益统计
const getDailyEarnings = async (req, res) => {
  try {
    const { userId } = req.user;
    const { days = 7 } = req.query;

    // 计算开始日期
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days) + 1);
    startDate.setHours(0, 0, 0, 0);

    // 获取指定天数的每日收益
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('created_at, amount')
      .eq('user_id', userId)
      .eq('type', 'income')
      .eq('status', '已通过')
      .gte('created_at', startDate.toISOString());

    if (error) {
      console.error('Get daily earnings error:', error);
      return res.status(500).json({ error: '获取每日收益失败' });
    }

    // 按日期分组计算收益
    const dailyEarnings = {};
    for (let i = 0; i < parseInt(days); i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      dailyEarnings[dateStr] = 0;
    }

    transactions.forEach(transaction => {
      const dateStr = transaction.created_at.toISOString().split('T')[0];
      if (dailyEarnings[dateStr] !== undefined) {
        dailyEarnings[dateStr] += transaction.amount;
      }
    });

    // 转换为数组格式
    const earningsArray = Object.entries(dailyEarnings).map(([date, amount]) => ({
      date,
      amount
    }));

    res.json({ dailyEarnings: earningsArray });
  } catch (error) {
    console.error('Get daily earnings error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

module.exports = {
  getTransactions,
  requestWithdrawal,
  getWithdrawalHistory,
  getWalletBalance,
  getDailyEarnings
};