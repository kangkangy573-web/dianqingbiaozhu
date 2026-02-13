const express = require('express');
const { login, register, verifyToken, getCurrentUser } = require('../controllers/auth');

const router = express.Router();

// 登录
router.post('/login', login);

// 注册
router.post('/register', register);

// 获取当前用户信息（需要验证token）
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;