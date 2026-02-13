import React from 'react';
import { TrendingUp, CheckCircle, Clock, Smile, Mic, Video, Languages, AlertCircle, Calendar } from 'lucide-react';

export const Progress: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <header className="px-5 pt-12 pb-4 bg-white dark:bg-background-dark z-20 sticky top-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">我的进度</h1>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/20">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-JnsO-pST6MtL-pxoGiFB28a2ct6BcqMADODngwQxRVpjKBiWCyrnC27C5MJ-74KYFTdnVOIhbJ-40htfIfIcYdmXwh_SXB-OUNEssPP0GtHz1HiRMfCCHoBoijZxWF5mgZKFNhyc5_ZmajNje6qzrYqwHrjzed8DImoa6cesGuAHDUOQO7N2LL25wNcK7TeIWElReS65T0t0EQbyWwGzMmiIKSo8gEPvI414EF1rHhKAxN5wyf3jrvpM_8X9QbMz9T0smwQszqs" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-5 shadow-lg shadow-primary/20 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">总收益</p>
              <h2 className="text-3xl font-bold">¥1,240.50</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <TrendingUp size={14} />
              +12%
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm font-medium relative z-10">
            <div className="flex items-center gap-1.5 opacity-90">
              <CheckCircle size={16} />
              <span>142 已完成</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              <Clock size={16} />
              <span>12 进行中</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-5 pb-2 dark:bg-background-dark z-10">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
          <button className="flex-shrink-0 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium transition-colors shadow-lg shadow-primary/20">
            进行中
          </button>
          <button className="flex-shrink-0 px-4 py-2 rounded-full bg-surface-dark text-gray-400 text-sm font-medium border border-gray-800 hover:bg-surface-lighter hover:text-white transition-colors">
            审核中
          </button>
          <button className="flex-shrink-0 px-4 py-2 rounded-full bg-surface-dark text-gray-400 text-sm font-medium border border-gray-800 hover:bg-surface-lighter hover:text-white transition-colors">
            已完成
          </button>
          <button className="flex-shrink-0 px-4 py-2 rounded-full bg-surface-dark text-gray-400 text-sm font-medium border border-gray-800 hover:bg-surface-lighter hover:text-white transition-colors">
            已驳回
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
        <div className="pt-2 pb-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 ml-1">今日</p>
          
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-transform duration-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-primary">
                  <Smile size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">情感分析 - 推文</h3>
                  <p className="text-xs text-gray-500 mt-1">ID: #Proj-8832 • <span className="text-primary font-medium">¥0.45/任务</span></p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                进行中
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>进度</span>
                <span className="text-gray-300 font-medium">45%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-surface-lighter rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={14} />
                <span>2小时后截止</span>
              </div>
              <button className="text-xs font-semibold text-primary hover:text-blue-400 transition-colors">继续任务 →</button>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm mt-4 active:scale-[0.98] transition-transform duration-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Mic size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">音频转录 - 医疗</h3>
                  <p className="text-xs text-gray-500 mt-1">ID: #Proj-102 • <span className="text-primary font-medium">¥1.20/任务</span></p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                已暂停
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>进度</span>
                <span className="text-gray-300 font-medium">10%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-surface-lighter rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={14} />
                <span>明天截止</span>
              </div>
              <button className="text-xs font-semibold text-gray-400 hover:text-white transition-colors">恢复任务</button>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 ml-1">昨日</p>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 border border-red-900/30 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-100">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">视频分割</h3>
                  <p className="text-xs text-gray-500 mt-1">ID: #Proj-Video-09</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                需修改
              </span>
            </div>
            <div className="bg-red-500/5 rounded-lg p-3 border border-red-500/10 flex items-start gap-3 mt-2">
              <AlertCircle size={18} className="text-red-400 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-red-200">有反馈意见</p>
                <p className="text-[11px] text-red-300/70 mt-0.5 leading-snug">审核员指出3帧边界模糊。请修正以便付款。</p>
              </div>
              <button className="ml-auto text-xs font-bold text-red-400 underline decoration-red-400/30 underline-offset-2">查看</button>
            </div>
          </div>

           <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm mt-4 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                  <Languages size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">翻译 - 英译西</h3>
                  <p className="text-xs text-gray-500 mt-1">ID: #Proj-Trans-22</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                已支付
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3 mt-3">
              <div className="text-xs text-gray-500">18小时前完成</div>
              <div className="text-sm font-bold text-green-400 flex items-center gap-1">
                <span className="text-xs">¥</span>12.50
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};