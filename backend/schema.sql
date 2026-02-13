-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  avatar_url VARCHAR(500),
  level INTEGER DEFAULT 1,
  level_progress INTEGER DEFAULT 0,
  join_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 任务表
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('image', 'audio', 'text', 'video')),
  price DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('简单', '中等', '困难')),
  remaining INTEGER NOT NULL,
  total INTEGER NOT NULL,
  image_url VARCHAR(500),
  hot BOOLEAN DEFAULT FALSE,
  description TEXT,
  guidelines TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 任务实例表（用户领取的任务）
CREATE TABLE IF NOT EXISTS task_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  task_id UUID REFERENCES tasks(id),
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected', 'reviewing')),
  progress INTEGER DEFAULT 0,
  total_items INTEGER NOT NULL,
  current_item_index INTEGER DEFAULT 0,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 标注数据表
CREATE TABLE IF NOT EXISTS annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_instance_id UUID REFERENCES task_instances(id),
  user_id UUID REFERENCES users(id),
  task_id UUID REFERENCES tasks(id),
  item_id VARCHAR(255) NOT NULL,
  data JSONB NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 交易表
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'withdraw')),
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('已通过', '已完成', '审核中', '需修改')),
  batch_id VARCHAR(255),
  task_id UUID REFERENCES tasks(id),
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 用户统计表
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  balance DECIMAL(10, 2) DEFAULT 0,
  today_earnings DECIMAL(10, 2) DEFAULT 0,
  pending_earnings DECIMAL(10, 2) DEFAULT 0,
  completed_tasks INTEGER DEFAULT 0,
  in_progress_tasks INTEGER DEFAULT 0,
  total_annotations INTEGER DEFAULT 0,
  accuracy_rate DECIMAL(5, 2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 任务项目表（任务中的具体项目，如图像、音频等）
CREATE TABLE IF NOT EXISTS task_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id),
  item_id VARCHAR(255) NOT NULL,
  content_url VARCHAR(500) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_tasks_type ON tasks(type);
CREATE INDEX IF NOT EXISTS idx_tasks_difficulty ON tasks(difficulty);
CREATE INDEX IF NOT EXISTS idx_task_instances_user_id ON task_instances(user_id);
CREATE INDEX IF NOT EXISTS idx_task_instances_task_id ON task_instances(task_id);
CREATE INDEX IF NOT EXISTS idx_task_instances_status ON task_instances(status);
CREATE INDEX IF NOT EXISTS idx_annotations_task_instance_id ON annotations(task_instance_id);
CREATE INDEX IF NOT EXISTS idx_annotations_user_id ON annotations(user_id);
CREATE INDEX IF NOT EXISTS idx_annotations_status ON annotations(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_task_items_task_id ON task_items(task_id);
CREATE INDEX IF NOT EXISTS idx_task_items_item_id ON task_items(item_id);

-- 插入示例数据
-- 示例用户
INSERT INTO users (username, password, email, phone, avatar_url, level, level_progress) VALUES
('标注员小张', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'zhangsan@example.com', '13800138000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnNFbne0iwODPmslCa5mqwsjVu4gzMbspi0DY56LbLgFVs9ENRgouK8XFzhRXAy-2pZj7JqXATVd-vM978akrw-5Pb_R9MlwcbW_gupopu4fK_Zoyxstt96i_RQI5mnfg4QBAQhl98iKHCI88C7ZsAGtgbh429DUAQiyo56n9a7_on2OuKvNsbyAzZkUvuZ7zKkm9sJmGwi1NS5moLWV3IJS-6q0FHfpJo5jM89EqV49uc2GWB6r5TAT-lXpfpsHiEmKNk9aLipvw', 4, 85)
ON CONFLICT (username) DO NOTHING;

-- 示例任务
INSERT INTO tasks (title, type, price, unit, duration, difficulty, remaining, total, image_url, hot, description, guidelines) VALUES
('行人边界框', 'image', 0.50, '项', '2 分钟', '简单', 2300, 3000, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbh5ytq7lICRV3YAAOUCq911XM305wW5bIKCj90HhKyO2FNJKYcJ-TUDLsTtnN7G06OzjG0_Lm6-iwxZSZDCMBRIJx-xAmhIRnyytF4qulHzrp76MkauHmDD7gYw6LTfU-lgdSuWr-CBchZ3SsQE3rlPt2LRVnEwAa-US1ybzlItbKySGoulCbpkSbi_q6hfI6jcx1g0faVCAL2GyGWVrKxr77hWc8YhN5HPIAYE7cRg4VZUQjNHv6R_XTHsNZPhPhYgigQKyD9xU', false, '识别并在所有街景图像中的行人周围绘制紧密的边界框。确保覆盖全身，包括四肢。', '1. 边框应紧贴行人边缘
2. 不要包含过多背景
3. 对于部分遮挡的行人，仅标注可见部分
4. 确保标注准确，避免遗漏'),
('音频转写 - 英文', 'audio', 1.20, '分钟', '15 分钟', '困难', 50, 500, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT0f7lFi-hD3h8cFSFcsvxUylao3SAo5b33jlPG4Aadzd7eYfQxNRcsb0dEp6VthBa-uZ9Zzok0sE531AcXIlR260XBf22GBAPz_6zv6a4afFJsywRu8s5pk69plMclVa_QV8rhEdSyiSyRU9l1Gza2X_sJ8pl192PP4nn-VULcaHgXT92iJNiu_uVBnr3lx-_8nMC17RLhxSouqLWECXRM4BTAgX1iJQzbrkgYgaNV1Dmgvk-GbNzHZuFDZLvTtM_ePQV7TrWRc4', true, '将英文音频文件转写为文本，确保准确性和完整性。', '1. 准确转写所有内容
2. 保留说话人的语气和停顿
3. 正确拼写所有单词
4. 注意标点符号的使用'),
('情感分析', 'text', 0.35, '项', '5 分钟', '中等', 5000, 10000, NULL, false, '分析文本的情感倾向，分为积极、消极和中性。', '1. 仔细阅读文本内容
2. 根据整体情感倾向进行分类
3. 注意语境和语气
4. 保持判断的一致性'),
('视频分类', 'video', 0.80, '项', '1 分钟', '简单', 120, 1000, 'https://lh3.googleusercontent.com/aida-public/AB6AXuChTUG9xscev2AwflDIvxvKuE857KX4UxhXzmrzW6MGxOt0ZyMgkWfqp-3H3COvw6_u1wIWpp9DeACI-r24xumCHY8_BSHNWGQkTgymVkZZCaWqjBrlaGIU8imfLad9WN1fbcckAbvIzeILKQnA2fxRVIkZiXxT2iUg2muX6QwN-lH8zRE6y549g9dvdLMCd-t7_l1fbnXObozZv7jwiOayIZc67dYndJNPJJVUOPqYcBBNhdrGM3PvNtbMueWvzL1kMcmkWaHvcUI', false, '根据视频内容对视频进行分类。', '1. 观看完整视频
2. 根据视频内容选择最适合的分类
3. 注意视频的主题和风格
4. 确保分类准确')
ON CONFLICT DO NOTHING;

-- 示例用户统计
INSERT INTO user_stats (user_id, balance, today_earnings, pending_earnings, completed_tasks, in_progress_tasks, total_annotations, accuracy_rate) VALUES
((SELECT id FROM users WHERE username = '标注员小张'), 1240.50, 145.00, 320.00, 142, 12, 14200, 98.5)
ON CONFLICT (user_id) DO NOTHING;

-- 示例交易记录
INSERT INTO transactions (user_id, type, amount, status, batch_id, task_id, description) VALUES
((SELECT id FROM users WHERE username = '标注员小张'), 'income', 50.00, '已通过', '8291', (SELECT id FROM tasks WHERE title = '行人边界框'), '图像标注'),
((SELECT id FROM users WHERE username = '标注员小张'), 'income', 25.50, '已通过', '8288', (SELECT id FROM tasks WHERE title = '情感分析'), '文本分类'),
((SELECT id FROM users WHERE username = '标注员小张'), 'withdraw', 100.00, '已完成', NULL, NULL, '提现至支付宝'),
((SELECT id FROM users WHERE username = '标注员小张'), 'income', 12.00, '审核中', NULL, (SELECT id FROM tasks WHERE title = '音频转写 - 英文'), '音频转写')
ON CONFLICT DO NOTHING;