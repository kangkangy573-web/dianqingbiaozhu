export interface Task {
  id: string;
  title: string;
  type: 'image' | 'audio' | 'text' | 'video';
  price: number;
  unit: string;
  duration: string;
  difficulty: '简单' | '中等' | '困难';
  remaining: number | string;
  total: number | string;
  imageUrl?: string;
  hot?: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  time: string;
  amount: number;
  status: '已通过' | '已完成' | '审核中' | '需修改';
  batchId?: string;
  type: 'income' | 'withdraw';
}

export interface UserStats {
  balance: number;
  todayEarnings: number;
  pendingEarnings: number;
  completedTasks: number;
  inProgressTasks: number;
}
