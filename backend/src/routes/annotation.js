const express = require('express');
const { submitAnnotation, getAnnotations, getTaskItem, getAnnotationFeedback } = require('../controllers/annotation');
const { verifyToken } = require('../controllers/auth');

const router = express.Router();

// 所有标注相关路由都需要认证
router.use(verifyToken);

// 提交标注数据
router.post('/submit', submitAnnotation);

// 获取标注历史
router.get('/history', getAnnotations);

// 获取任务项目
router.get('/item', getTaskItem);

// 获取标注反馈
router.get('/feedback/:annotationId', getAnnotationFeedback);

module.exports = router;