import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Award, ChevronRight, School, CreditCard, Bell, HelpCircle, LogOut } from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0"></div>
      
      <main className="flex-1 px-5 pt-8 pb-24 z-10 overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative mb-4 group cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background-light dark:border-background-dark ring-2 ring-primary/50 shadow-lg">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnNFbne0iwODPmslCa5mqwsjVu4gzMbspi0DY56LbLgFVs9ENRgouK8XFzhRXAy-2pZj7JqXATVd-vM978akrw-5Pb_R9MlwcbW_gupopu4fK_Zoyxstt96i_RQI5mnfg4QBAQhl98iKHCI88C7ZsAGtgbh429DUAQiyo56n9a7_on2OuKvNsbyAzZkUvuZ7zKkm9sJmGwi1NS5moLWV3IJS-6q0FHfpJo5jM89EqV49uc2GWB6r5TAT-lXpfpsHiEmKNk9aLipvw" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-background-dark shadow-sm">
              <Edit2 size={12} />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">标注员小张</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">2023年3月加入</p>
          
          <div className="w-full max-w-xs flex flex-col items-center">
            <div className="flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full border border-primary/20 mb-3">
              <Award size={14} className="text-primary" />
              <span className="text-primary font-semibold text-xs tracking-wide uppercase">等级 4 专家</span>
            </div>
            <div className="w-full flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-1 px-1">
              <span>距离等级 5 进度</span>
              <span>85%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white dark:bg-surface-dark p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white mb-1">14.2k</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">已标注</span>
          </div>
          <div className="bg-primary bg-opacity-10 dark:bg-opacity-20 p-3 rounded-xl shadow-sm border border-primary/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 bg-primary/20 rounded-full blur-xl"></div>
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-2xl font-bold text-primary">98.5%</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-primary/80 font-medium">准确率</span>
          </div>
          <div className="bg-white dark:bg-surface-dark p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white mb-1">#42</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">排名</span>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <School size={18} />
              </div>
              <div className="text-left">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">技能与证书</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">解锁高薪任务</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">2 New</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <CreditCard size={18} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">支付方式</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <Bell size={18} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">通知设置</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <HelpCircle size={18} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">帮助中心</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="w-full p-4 rounded-xl flex items-center justify-center space-x-2 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">退出登录</span>
        </button>
      </main>
    </div>
  );
};