const express = require('express');
const { getTasks, getTaskById, claimTask, getUserTasks, getTaskInstanceById, updateTaskInstanceProgress } = require('../controllers/task');
const { verifyToken } = require('../controllers/auth');

const router = express.Router();

// 获取任务列表（不需要认证）
router.get('/', getTasks);

// 获取任务详情（不需要认证）
router.get('/:id', getTaskById);

// 需要认证的路由
router.use(verifyToken);

// 领取任务
router.post('/claim', claimTask);

// 获取用户任务列表
router.get('/user/list', getUserTasks);

// 获取任务实例详情
router.get('/instance/:id', getTaskInstanceById);

// 更新任务实例进度
router.put('/instance/:id', updateTaskInstanceProgress);

module.exports = router;