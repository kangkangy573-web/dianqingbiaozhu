const API_BASE_URL = 'http://localhost:3001/api';

// 获取存储的token
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// 设置存储的token
const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// 移除存储的token
const removeToken = (): void => {
  localStorage.removeItem('token');
};

// 通用API请求函数
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `请求失败: ${response.status}`);
  }

  return response.json();
}

// 认证相关API
export const authApi = {
  // 登录
  login: async (username: string, password: string) => {
    const response = await apiRequest<{
      token: string;
      user: {
        id: string;
        username: string;
        email: string;
        phone: string;
        avatar_url: string;
        level: number;
        level_progress: number;
        join_date: string;
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },

  // 注册
  register: async (username: string, password: string, email: string, phone: string) => {
    const response = await apiRequest<{
      token: string;
      user: {
        id: string;
        username: string;
        email: string;
        phone: string;
        avatar_url: string;
        level: number;
        level_progress: number;
        join_date: string;
      };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email, phone }),
    });
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },

  // 获取当前用户信息
  getCurrentUser: async () => {
    return apiRequest<{
      user: {
        id: string;
        username: string;
        email: string;
        phone: string;
        avatar_url: string;
        level: number;
        level_progress: number;
        join_date: string;
      };
    }>('/auth/me');
  },

  // 登出
  logout: () => {
    removeToken();
  },
};

// 任务相关API
export const taskApi = {
  // 获取任务列表
  getTasks: async (params?: {
    type?: string;
    difficulty?: string;
    hot?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<{
      tasks: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
      };
    }>(endpoint);
  },

  // 获取任务详情
  getTaskById: async (id: string) => {
    return apiRequest<{ task: any }>(`/tasks/${id}`);
  },

  // 领取任务
  claimTask: async (taskId: string) => {
    return apiRequest<{ taskInstance: any }>('/tasks/claim', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
  },

  // 获取用户任务列表
  getUserTasks: async (status?: string) => {
    const queryParams = new URLSearchParams();
    if (status) {
      queryParams.append('status', status);
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/tasks/user/list${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<{ taskInstances: any[] }>(endpoint);
  },

  // 获取任务实例详情
  getTaskInstanceById: async (id: string) => {
    return apiRequest<{ taskInstance: any }>(`/tasks/instance/${id}`);
  },

  // 更新任务实例进度
  updateTaskInstanceProgress: async (id: string, data: {
    progress?: number;
    status?: string;
  }) => {
    return apiRequest<{ taskInstance: any }>(`/tasks/instance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// 标注相关API
export const annotationApi = {
  // 提交标注数据
  submitAnnotation: async (taskInstanceId: string, itemId: string, data: any) => {
    return apiRequest<{ annotation: any }>('/annotations/submit', {
      method: 'POST',
      body: JSON.stringify({ taskInstanceId, itemId, data }),
    });
  },

  // 获取标注历史
  getAnnotations: async (params?: {
    taskInstanceId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/annotations/history${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<{
      annotations: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
      };
    }>(endpoint);
  },

  // 获取任务项目
  getTaskItem: async (taskInstanceId: string, itemIndex?: number) => {
    const queryParams = new URLSearchParams();
    queryParams.append('taskInstanceId', taskInstanceId);
    if (itemIndex !== undefined) {
      queryParams.append('itemIndex', itemIndex.toString());
    }
    
    return apiRequest<{ item: any }>(`/annotations/item?${queryParams.toString()}`);
  },

  // 获取标注反馈
  getAnnotationFeedback: async (annotationId: string) => {
    return apiRequest<{ feedback: string; status: string }>(`/annotations/feedback/${annotationId}`);
  },
};

// 钱包相关API
export const walletApi = {
  // 获取交易记录
  getTransactions: async (params?: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/wallet/transactions${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<{
      transactions: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
      };
    }>(endpoint);
  },

  // 申请提现
  requestWithdrawal: async (amount: number, method: string, account: string) => {
    return apiRequest<{ transaction: any }>('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, method, account }),
    });
  },

  // 获取提现历史
  getWithdrawalHistory: async (status?: string, page: number = 1, limit: number = 20) => {
    const queryParams = new URLSearchParams();
    if (status) {
      queryParams.append('status', status);
    }
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    return apiRequest<{
      withdrawals: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
      };
    }>(`/wallet/withdrawals?${queryParams.toString()}`);
  },

  // 获取钱包余额
  getWalletBalance: async () => {
    return apiRequest<{ balance: number; pendingEarnings: number }>('/wallet/balance');
  },

  // 获取每日收益统计
  getDailyEarnings: async (days: number = 7) => {
    return apiRequest<{ dailyEarnings: Array<{ date: string; amount: number }> }>(`/wallet/daily-earnings?days=${days}`);
  },
};

// 用户相关API
export const userApi = {
  // 获取用户统计数据
  getUserStats: async () => {
    return apiRequest<{
      balance: number;
      todayEarnings: number;
      pendingEarnings: number;
      completedTasks: number;
      inProgressTasks: number;
      totalAnnotations: number;
      accuracyRate: number;
      level: number;
      levelProgress: number;
    }>('/user/stats');
  },

  // 更新用户资料
  updateUserProfile: async (data: {
    username?: string;
    email?: string;
    phone?: string;
    avatar_url?: string;
    password?: string;
  }) => {
    return apiRequest<{
      user: {
        id: string;
        username: string;
        email: string;
        phone: string;
        avatar_url: string;
        level: number;
        level_progress: number;
        join_date: string;
      };
    }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 获取用户等级和进度
  getUserLevel: async () => {
    return apiRequest<{
      level: number;
      levelProgress: number;
      progressPercentage: number;
      nextLevelThreshold: number;
    }>('/user/level');
  },

  // 获取用户技能和证书
  getUserSkills: async () => {
    return apiRequest<{ skills: any[] }>('/user/skills');
  },

  // 获取用户标注历史记录
  getUserAnnotationHistory: async (params?: {
    taskType?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/user/annotation-history${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<{
      annotations: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
      };
    }>(endpoint);
  },
};

export { getToken, setToken, removeToken };