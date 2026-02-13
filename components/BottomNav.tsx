import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Wallet, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/hall', icon: Home, label: '首页' },
    { path: '/progress', icon: ClipboardList, label: '我的任务' },
    { path: '/wallet', icon: Wallet, label: '钱包' },
    { path: '/profile', icon: User, label: '个人中心' },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white/95 dark:bg-[#151f2e]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors group relative ${
              isActive(item.path)
                ? 'text-primary'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
             {isActive(item.path) && (
                 <span className="absolute top-0 h-0.5 w-8 bg-primary rounded-b-full"></span>
             )}
            <item.icon
              size={24}
              strokeWidth={isActive(item.path) ? 2.5 : 2}
              className={`transition-transform duration-200 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-105'}`}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="h-2 w-full"></div>
    </nav>
  );
};