const supabase = require('../utils/supabase');
const bcrypt = require('bcrypt');

// 获取用户统计数据
const getUserStats = async (req, res) => {
  try {
    const { userId } = req.user;

    // 获取用户统计信息
    const { data: userStats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (statsError || !userStats) {
      return res.status(404).json({ error: '用户统计信息不存在' });
    }

    // 获取用户信息
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 获取用户任务统计
    const { data: taskInstances, error: taskError } = await supabase
      .from('task_instances')
      .select('status')
      .eq('user_id', userId);

    let completedTasks = 0;
    let inProgressTasks = 0;

    if (taskInstances) {
      taskInstances.forEach(instance => {
        if (instance.status === 'completed') {
          completedTasks++;
        } else if (instance.status === 'in_progress') {
          inProgressTasks++;
        }
      });
    }

    // 计算今日收益
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: todayTransactions, error: transactionError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .eq('type', 'income')
      .eq('status', '已通过')
      .gte('created_at', today.toISOString());

    let todayEarnings = 0;
    if (todayTransactions) {
      todayEarnings = todayTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    }

    res.json({
      balance: userStats.balance,
      todayEarnings,
      pendingEarnings: userStats.pending_earnings,
      completedTasks,
      inProgressTasks,
      totalAnnotations: userStats.total_annotations,
      accuracyRate: userStats.accuracy_rate,
      level: user.level,
      levelProgress: user.level_progress
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 更新用户资料
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, email, phone, avatar_url, password } = req.body;

    const updateData = {};

    if (username) {
      updateData.username = username;
    }
    if (email) {
      updateData.email = email;
    }
    if (phone) {
      updateData.phone = phone;
    }
    if (avatar_url) {
      updateData.avatar_url = avatar_url;
    }
    if (password) {
      // 哈希密码
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    updateData.updated_at = new Date();

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select('*')
      .single();

    if (error) {
      console.error('Update user profile error:', error);
      return res.status(500).json({ error: '更新用户资料失败' });
    }

    res.json({
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar_url: updatedUser.avatar_url,
        level: updatedUser.level,
        level_progress: updatedUser.level_progress,
        join_date: updatedUser.join_date
      }
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取用户等级和进度
const getUserLevel = async (req, res) => {
  try {
    const { userId } = req.user;

    const { data: user, error } = await supabase
      .from('users')
      .select('level, level_progress')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 计算等级进度百分比
    // 假设每个等级需要1000点经验
    const levelThreshold = user.level * 1000;
    const progressPercentage = Math.min((user.level_progress / levelThreshold) * 100, 100);

    res.json({
      level: user.level,
      levelProgress: user.level_progress,
      progressPercentage,
      nextLevelThreshold: levelThreshold
    });
  } catch (error) {
    console.error('Get user level error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取用户技能和证书
const getUserSkills = async (req, res) => {
  try {
    const { userId } = req.user;

    // 这里简化处理，实际项目中应该从专门的技能表中获取
    // 现在返回模拟数据
    const skills = [
      {
        id: '1',
        name: '图像标注',
        level: '专家',
        progress: 95,
        certified: true
      },
      {
        id: '2',
        name: '音频转写',
        level: '高级',
        progress: 80,
        certified: true
      },
      {
        id: '3',
        name: '文本分类',
        level: '中级',
        progress: 65,
        certified: false
      },
      {
        id: '4',
        name: '视频标注',
        level: '初级',
        progress: 40,
        certified: false
      }
    ];

    res.json({ skills });
  } catch (error) {
    console.error('Get user skills error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取用户标注历史记录
const getUserAnnotationHistory = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskType, status, page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('annotations')
      .select('*, task_instances(*, tasks(*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // 过滤条件
    if (status) {
      query = query.eq('status', status);
    }

    // 分页
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: annotations, error, count } = await query;

    if (error) {
      console.error('Get user annotation history error:', error);
      return res.status(500).json({ error: '获取标注历史失败' });
    }

    // 按任务类型过滤
    let filteredAnnotations = annotations;
    if (taskType) {
      filteredAnnotations = annotations.filter(annotation => 
        annotation.task_instances.tasks.type === taskType
      );
    }

    res.json({
      annotations: filteredAnnotations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0
      }
    });
  } catch (error) {
    console.error('Get user annotation history error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

module.exports = {
  getUserStats,
  updateUserProfile,
  getUserLevel,
  getUserSkills,
  getUserAnnotationHistory
};