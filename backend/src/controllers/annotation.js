const supabase = require('../utils/supabase');

// 提交标注数据
const submitAnnotation = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskInstanceId, itemId, data } = req.body;

    // 检查任务实例是否存在
    const { data: taskInstance, error: instanceError } = await supabase
      .from('task_instances')
      .select('*, tasks(*)')
      .eq('id', taskInstanceId)
      .eq('user_id', userId)
      .single();

    if (instanceError || !taskInstance) {
      return res.status(404).json({ error: '任务实例不存在' });
    }

    // 检查任务实例状态
    if (taskInstance.status !== 'in_progress') {
      return res.status(400).json({ error: '任务实例状态错误' });
    }

    // 检查是否已经提交过该项目的标注
    const { data: existingAnnotation, error: annotationError } = await supabase
      .from('annotations')
      .select('id')
      .eq('task_instance_id', taskInstanceId)
      .eq('item_id', itemId)
      .single();

    if (existingAnnotation) {
      // 更新现有标注
      const { data: updatedAnnotation, error: updateError } = await supabase
        .from('annotations')
        .update({ data })
        .eq('id', existingAnnotation.id)
        .select('*')
        .single();

      if (updateError) {
        console.error('Update annotation error:', updateError);
        return res.status(500).json({ error: '更新标注数据失败' });
      }

      res.json({ annotation: updatedAnnotation });
    } else {
      // 创建新标注
      const { data: newAnnotation, error: createError } = await supabase
        .from('annotations')
        .insert({
          task_instance_id: taskInstanceId,
          user_id: userId,
          task_id: taskInstance.task_id,
          item_id: itemId,
          data,
          status: 'pending'
        })
        .select('*')
        .single();

      if (createError) {
        console.error('Create annotation error:', createError);
        return res.status(500).json({ error: '提交标注数据失败' });
      }

      // 更新任务实例进度
      await supabase
        .from('task_instances')
        .update({ current_item_index: taskInstance.current_item_index + 1 })
        .eq('id', taskInstanceId);

      res.json({ annotation: newAnnotation });
    }
  } catch (error) {
    console.error('Submit annotation error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取标注历史
const getAnnotations = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskInstanceId, status, page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('annotations')
      .select('*, task_instances(*, tasks(*))')
      .eq('user_id', userId);

    if (taskInstanceId) {
      query = query.eq('task_instance_id', taskInstanceId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    // 分页
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: annotations, error, count } = await query;

    if (error) {
      console.error('Get annotations error:', error);
      return res.status(500).json({ error: '获取标注历史失败' });
    }

    res.json({
      annotations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0
      }
    });
  } catch (error) {
    console.error('Get annotations error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取任务项目
const getTaskItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskInstanceId, itemIndex } = req.query;

    // 检查任务实例是否存在
    const { data: taskInstance, error: instanceError } = await supabase
      .from('task_instances')
      .select('*, tasks(*)')
      .eq('id', taskInstanceId)
      .eq('user_id', userId)
      .single();

    if (instanceError || !taskInstance) {
      return res.status(404).json({ error: '任务实例不存在' });
    }

    // 检查任务实例状态
    if (taskInstance.status !== 'in_progress') {
      return res.status(400).json({ error: '任务实例状态错误' });
    }

    // 这里简化处理，实际项目中应该从task_items表中获取具体项目
    // 现在返回模拟数据
    const itemId = `item-${itemIndex || taskInstance.current_item_index}`;
    const itemUrl = `https://example.com/tasks/${taskInstance.task_id}/items/${itemId}`;

    res.json({
      item: {
        id: itemId,
        url: itemUrl,
        index: itemIndex || taskInstance.current_item_index,
        total: taskInstance.total_items
      }
    });
  } catch (error) {
    console.error('Get task item error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 获取标注反馈
const getAnnotationFeedback = async (req, res) => {
  try {
    const { userId } = req.user;
    const { annotationId } = req.params;

    const { data: annotation, error } = await supabase
      .from('annotations')
      .select('*, task_instances(*, tasks(*))')
      .eq('id', annotationId)
      .eq('user_id', userId)
      .single();

    if (error || !annotation) {
      return res.status(404).json({ error: '标注数据不存在' });
    }

    if (!annotation.feedback) {
      return res.status(400).json({ error: '标注数据暂无反馈' });
    }

    res.json({ feedback: annotation.feedback, status: annotation.status });
  } catch (error) {
    console.error('Get annotation feedback error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

module.exports = {
  submitAnnotation,
  getAnnotations,
  getTaskItem,
  getAnnotationFeedback
};