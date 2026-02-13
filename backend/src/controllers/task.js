const supabase = require('../utils/supabase');

// Mock任务数据
const mockTasks = [
  {
    id: '1',
    title: '行人边界框',
    type: 'image',
    price: 0.50,
    unit: '项',
    duration: '2 分钟',
    difficulty: '简单',
    remaining: '2,300',
    total: 3000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbh5ytq7lICRV3YAAOUCq911XM305wW5bIKCj90HhKyO2FNJKYcJ-TUDLsTtnN7G06OzjG0_Lm6-iwxZSZDCMBRIJx-xAmhIRnyytF4qulHzrp76MkauHmDD7gYw6LTfU-lgdSuWr-CBchZ3SsQE3rlPt2LRVnEwAa-US1ybzlItbKySGoulCbpkSbi_q6hfI6jcx1g0faVCAL2GyGWVrKxr77hWc8YhN5HPIAYE7cRg4VZUQjNHv6R_XTHsNZPhPhYgigQKyD9xU'
  },
  {
    id: '2',
    title: '音频转写 - 英文',
    type: 'audio',
    price: 1.20,
    unit: '分钟',
    duration: '15 分钟',
    difficulty: '困难',
    remaining: 50,
    total: 500,
    hot: true,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT0f7lFi-hD3h8cFSFcsvxUylao3SAo5b33jlPG4Aadzd7eYfQxNRcsb0dEp6VthBa-uZ9Zzok0sE531AcXIlR260XBf22GBAPz_6zv6a4afFJsywRu8s5pk69plMclVa_QV8rhEdSyiSyRU9l1Gza2X_sJ8pl192PP4nn-VULcaHgXT92iJNiu_uVBnr3lx-_8nMC17RLhxSouqLWECXRM4BTAgX1iJQzbrkgYgaNV1Dmgvk-GbNzHZuFDZLvTtM_ePQV7TrWRc4'
  },
  {
    id: '3',
    title: '情感分析',
    type: 'text',
    price: 0.35,
    unit: '项',
    duration: '5 分钟',
    difficulty: '中等',
    remaining: '5k+',
    total: 10000,
  },
  {
    id: '4',
    title: '视频分类',
    type: 'video',
    price: 0.80,
    unit: '项',
    duration: '1 分钟',
    difficulty: '简单',
    remaining: 120,
    total: 1000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChTUG9xscev2AwflDIvxvKuE857KX4UxhXzmrzW6MGxOt0ZyMgkWfqp-3H3COvw6_u1wIWpp9DeACI-r24xumCHY8_BSHNWGQkTgymVkZZCaWqjBrlaGIU8imfLad9WN1fbcckAbvIzeILKQnA2fxRVIkZiXxT2iUg2muX6QwN-lH8zRE6y549g9dvdLMCd-t7_l1fbnXObozZv7jwiOayIZc67dYndJNPJJVUOPqYcBBNhdrGM3PvNtbMueWvzL1kMcmkWaHvcUI'
  }
];

// 获取任务列表
const getTasks = async (req, res) => {
  try {
    let { type, difficulty, hot, page = 1, limit = 10 } = req.query;

    // 检查是否使用mock数据
    if (!supabase) {
      // 模拟过滤
      let filteredTasks = [...mockTasks];
      if (type) {
        filteredTasks = filteredTasks.filter(task => task.type === type);
      }
      if (difficulty) {
        filteredTasks = filteredTasks.filter(task => task.difficulty === difficulty);
      }
      if (hot === 'true') {
        filteredTasks = filteredTasks.filter(task => task.hot === true);
      }

      // 模拟分页
      const total = filteredTasks.length;
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const paginatedTasks = filteredTasks.slice(offset, offset + parseInt(limit));

      return res.json({
        tasks: paginatedTasks,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total
        }
      });
    }

    let query = supabase.from('tasks').select('*');

    // 过滤条件
    if (type) {
      query = query.eq('type', type);
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }
    if (hot === 'true') {
      query = query.eq('hot', true);
    }

    // 分页
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: tasks, error, count } = await query;

    if (error) {
      console.error('Get tasks error:', error);
      return res.status(500).json({ error: '获取任务列表失败' });
    }

    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取任务详情
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // 检查是否使用mock数据
    if (!supabase) {
      const task = mockTasks.find(task => task.id === id);
      if (!task) {
        return res.status(404).json({ error: '任务不存在' });
      }
      return res.json({ task });
    }

    const { data: task, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !task) {
      return res.status(404).json({ error: '任务不存在' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task by id error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 领取任务
const claimTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskId } = req.body;

    // 检查任务是否存在
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (taskError || !task) {
      return res.status(404).json({ error: '任务不存在' });
    }

    // 检查任务是否还有剩余
    if (task.remaining <= 0) {
      return res.status(400).json({ error: '任务已领取完毕' });
    }

    // 检查用户是否已经领取过该任务
    const { data: existingInstance, error: instanceError } = await supabase
      .from('task_instances')
      .select('id')
      .eq('user_id', userId)
      .eq('task_id', taskId)
      .eq('status', 'in_progress')
      .single();

    if (existingInstance) {
      return res.status(400).json({ error: '您已经领取了该任务' });
    }

    // 开始事务
    // 1. 创建任务实例
    const { data: taskInstance, error: createInstanceError } = await supabase
      .from('task_instances')
      .insert({
        user_id: userId,
        task_id: taskId,
        status: 'in_progress',
        total_items: 50, // 默认50个项目
        current_item_index: 0
      })
      .select('*')
      .single();

    if (createInstanceError) {
      console.error('Create task instance error:', createInstanceError);
      return res.status(500).json({ error: '领取任务失败' });
    }

    // 2. 更新任务剩余数量
    await supabase
      .from('tasks')
      .update({ remaining: task.remaining - 1 })
      .eq('id', taskId);

    res.json({ taskInstance });
  } catch (error) {
    console.error('Claim task error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取用户任务列表
const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const { status } = req.query;

    let query = supabase
      .from('task_instances')
      .select('*, tasks(*)')
      .eq('user_id', userId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: taskInstances, error } = await query;

    if (error) {
      console.error('Get user tasks error:', error);
      return res.status(500).json({ error: '获取用户任务列表失败' });
    }

    res.json({ taskInstances });
  } catch (error) {
    console.error('Get user tasks error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取任务实例详情
const getTaskInstanceById = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const { data: taskInstance, error } = await supabase
      .from('task_instances')
      .select('*, tasks(*)')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error || !taskInstance) {
      return res.status(404).json({ error: '任务实例不存在' });
    }

    res.json({ taskInstance });
  } catch (error) {
    console.error('Get task instance by id error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 更新任务实例进度
const updateTaskInstanceProgress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { progress, status } = req.body;

    // 检查任务实例是否存在
    const { data: existingInstance, error: instanceError } = await supabase
      .from('task_instances')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (instanceError || !existingInstance) {
      return res.status(404).json({ error: '任务实例不存在' });
    }

    // 更新任务实例
    const updateData = {};
    if (progress !== undefined) {
      updateData.progress = progress;
    }
    if (status) {
      updateData.status = status;
      if (status === 'completed') {
        updateData.completed_at = new Date();
      }
    }

    const { data: updatedInstance, error } = await supabase
      .from('task_instances')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*')
      .single();

    if (error) {
      console.error('Update task instance error:', error);
      return res.status(500).json({ error: '更新任务进度失败' });
    }

    res.json({ taskInstance: updatedInstance });
  } catch (error) {
    console.error('Update task instance progress error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  claimTask,
  getUserTasks,
  getTaskInstanceById,
  updateTaskInstanceProgress
};