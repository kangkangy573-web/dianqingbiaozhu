import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Bell, Image as ImageIcon, FileText, Mic, Video, Clock, Flame, Crop } from 'lucide-react';
import { Task } from '../types';
import { taskApi } from '../src/services/api';

export const TaskHall: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filters = [
    { id: 'all', label: '全部', icon: null },
    { id: 'image', label: '图像', icon: ImageIcon },
    { id: 'text', label: '文本', icon: FileText },
    { id: 'audio', label: '语音', icon: Mic },
    { id: 'video', label: '视频', icon: Video },
  ];

  // 获取任务列表
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await taskApi.getTasks({
          type: activeFilter === 'all' ? undefined : activeFilter,
        });
        setTasks(response.tasks);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取任务列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [activeFilter]);

  const filteredTasks = tasks;

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark">
      <header className="px-5 pt-12 pb-2 bg-background-light dark:bg-background-dark sticky top-0 z-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">欢迎回来，Alex</p>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">任务大厅</h1>
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark z-10"></div>
            <button className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <Bell size={18} className="text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>
        
        <div className="relative mb-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-slate-500" />
          </span>
          <input
            className="w-full py-2.5 pl-9 pr-10 text-sm bg-white dark:bg-[#1A2533] border border-slate-200 dark:border-slate-700/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-slate-500 dark:placeholder-slate-500 shadow-sm transition-all text-slate-900 dark:text-white"
            placeholder="搜索任务..."
            type="text"
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <SlidersHorizontal size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Scrollable Filter Chips */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-transparent border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {filter.icon && <filter.icon size={14} />}
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-24 space-y-3 no-scrollbar mt-2">
        <div className="flex justify-between items-end mb-1">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">推荐任务</h2>
          <button className="text-xs text-primary font-medium hover:text-blue-400">查看全部</button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {/* 加载占位符 */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-[#1A2533] rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-800/50 flex flex-col gap-3 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    </div>
                    <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 mt-1">
                  <div className="flex flex-col gap-1 w-32">
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  </div>
                  <div className="w-20 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              重试
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500 dark:text-slate-400">暂无任务</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <article key={task.id} className="bg-white dark:bg-[#1A2533] rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-800/50 flex flex-col gap-3">
              <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-800 relative group border border-slate-700/50">
                  {task.type === 'text' ? (
                     <div className="w-full h-full flex items-center justify-center bg-slate-800">
                       <FileText size={28} className="text-slate-500" />
                     </div>
                  ) : (
                    <>
                    <img
                      alt={task.title}
                      className="w-full h-full object-cover opacity-80"
                      src={task.image_url || task.imageUrl}
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      {task.type === 'image' && <Crop className="text-white drop-shadow-md" size={20} />}
                      {task.type === 'audio' && <div className="flex items-center gap-0.5 h-6"><div className="w-0.5 bg-purple-400 h-2 animate-pulse"></div><div className="w-0.5 bg-purple-400 h-4"></div><div className="w-0.5 bg-purple-400 h-3"></div><div className="w-0.5 bg-purple-400 h-5"></div></div>}
                      {task.type === 'video' && <div className="flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"><div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1"></div></div></div>}
                    </div>
                    </>
                  )}
                </div>

                {/* Info Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        task.difficulty === '简单' ? 'bg-green-500/10 text-green-400' :
                        task.difficulty === '中等' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {task.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {task.duration}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold truncate leading-tight text-slate-900 dark:text-white">{task.title}</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-primary">¥{parseFloat(task.price).toFixed(2)}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">/ {task.unit}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-1 mt-1">
                <div className="flex flex-col gap-1 w-32">
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    {task.hot ? (
                      <span className="text-orange-500 font-medium flex items-center gap-1"><Flame size={10} /> 热门</span>
                    ) : (
                      <span>剩余数量</span>
                    )}
                    <span className={`font-medium ${task.hot ? 'text-orange-400' : 'text-slate-700 dark:text-white'}`}>
                      {typeof task.remaining === 'number' ? task.remaining.toLocaleString() : task.remaining}
                      {task.hot && <span> 剩余 {typeof task.remaining === 'number' ? task.remaining : 50}</span>}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 overflow-hidden">
                    <div 
                      className={`h-1 rounded-full ${task.hot ? 'bg-orange-500' : 'bg-primary'}`} 
                      style={{ width: typeof task.remaining === 'number' && typeof task.total === 'number' ? `${(task.remaining / task.total) * 100}%` : '60%' }}
                    ></div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/task/${task.id}`)}
                  className="bg-primary hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-primary/20"
                >
                  立即领取
                </button>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
};