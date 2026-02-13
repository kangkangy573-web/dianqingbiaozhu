const express = require('express');
const { getTransactions, requestWithdrawal, getWithdrawalHistory, getWalletBalance, getDailyEarnings } = require('../controllers/wallet');
const { verifyToken } = require('../controllers/auth');

const router = express.Router();

// 所有钱包相关路由都需要认证
router.use(verifyToken);

// 获取交易记录
router.get('/transactions', getTransactions);

// 申请提现
router.post('/withdraw', requestWithdrawal);

// 获取提现历史
router.get('/withdrawals', getWithdrawalHistory);

// 获取钱包余额
router.get('/balance', getWalletBalance);

// 获取每日收益统计
router.get('/daily-earnings', getDailyEarnings);

module.exports = router;