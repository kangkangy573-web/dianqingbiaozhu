const express = require('express');
const { getUserStats, updateUserProfile, getUserLevel, getUserSkills, getUserAnnotationHistory } = require('../controllers/user');
const { verifyToken } = require('../controllers/auth');

const router = express.Router();

// 所有用户相关路由都需要认证
router.use(verifyToken);

// 获取用户统计数据
router.get('/stats', getUserStats);

// 更新用户资料
router.put('/profile', updateUserProfile);

// 获取用户等级和进度
router.get('/level', getUserLevel);

// 获取用户技能和证书
router.get('/skills', getUserSkills);

// 获取用户标注历史记录
router.get('/annotation-history', getUserAnnotationHistory);

module.exports = router;