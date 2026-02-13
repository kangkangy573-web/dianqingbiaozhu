const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../utils/supabase');

// Mock用户数据
const mockUser = {
  id: '1',
  username: '标注员小张',
  password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // password
  email: 'zhangsan@example.com',
  phone: '13800138000',
  avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnNFbne0iwODPmslCa5mqwsjVu4gzMbspi0DY56LbLgFVs9ENRgouK8XFzhRXAy-2pZj7JqXATVd-vM978akrw-5Pb_R9MlwcbW_gupopu4fK_Zoyxstt96i_RQI5mnfg4QBAQhl98iKHCI88C7ZsAGtgbh429DUAQiyo56n9a7_on2OuKvNsbyAzZkUvuZ7zKkm9sJmGwi1NS5moLWV3IJS-6q0FHfpJo5jM89EqV49uc2GWB6r5TAT-lXpfpsHiEmKNk9aLipvw',
  level: 4,
  level_progress: 85,
  join_date: new Date('2023-03-01').toISOString()
};

// 登录
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查是否使用mock数据
    if (!supabase) {
      // 模拟登录逻辑
      if ((username === '13800138000' || username === 'zhangsan@example.com') && password === 'password') {
        // 生成JWT token
        const token = jwt.sign(
          { userId: mockUser.id, username: mockUser.username },
          process.env.JWT_SECRET || 'default_secret',
          { expiresIn: process.env.JWT_EXPIRATION || '24h' }
        );

        // 返回用户信息和token
        return res.json({
          token,
          user: {
            id: mockUser.id,
            username: mockUser.username,
            email: mockUser.email,
            phone: mockUser.phone,
            avatar_url: mockUser.avatar_url,
            level: mockUser.level,
            level_progress: mockUser.level_progress,
            join_date: mockUser.join_date
          }
        });
      } else {
        return res.status(401).json({ error: '用户名或密码错误' });
      }
    }

    // 查找用户
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .or(`username.eq.${username},email.eq.${username},phone.eq.${username}`)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 验证密码
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 生成JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: process.env.JWT_EXPIRATION || '24h' }
    );

    // 返回用户信息和token
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar_url: user.avatar_url,
        level: user.level,
        level_progress: user.level_progress,
        join_date: user.join_date
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 注册
const register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    // 检查用户名是否已存在
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email},phone.eq.${phone}`)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: '用户名、邮箱或手机号已存在' });
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        username,
        password: hashedPassword,
        email,
        phone
      })
      .select('*')
      .single();

    if (error) {
      console.error('Register error:', error);
      return res.status(500).json({ error: '创建用户失败' });
    }

    // 为新用户创建统计记录
    await supabase
      .from('user_stats')
      .insert({
        user_id: newUser.id
      });

    // 生成JWT token
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // 返回用户信息和token
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        avatar_url: newUser.avatar_url,
        level: newUser.level,
        level_progress: newUser.level_progress,
        join_date: newUser.join_date
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 验证token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: '未提供认证token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: '无效的认证token' });
  }
};

// 获取当前用户信息
const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar_url: user.avatar_url,
        level: user.level,
        level_progress: user.level_progress,
        join_date: user.join_date
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

module.exports = {
  login,
  register,
  verifyToken,
  getCurrentUser
};