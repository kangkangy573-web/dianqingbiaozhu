import React from 'react';
import { Eye, ArrowUp, History, TrendingUp, CheckCircle, ArrowUpRight, Hourglass } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

const WEEKLY_DATA = [
  { day: '一', amount: 40 },
  { day: '二', amount: 65 },
  { day: '三', amount: 30 },
  { day: '四', amount: 85 },
  { day: '五', amount: 50 },
  { day: '六', amount: 20 },
  { day: '日', amount: 10 },
];

export const Wallet: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <header className="pt-12 pb-4 px-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">钱包</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
             <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></div>
             <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
               <span className="material-icons text-gray-400">notifications</span>
             </button>
           </div>
           <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-x1oytjTO981FOUotDU5LEtmCSfoQgH2gi6AQduVJySaqB2QYIuU6ZIqYNAXMthUZQ1PZ2JcgxtgRRcMArqcQc5yvVuiRe8DgRpNumeyU6Xkzmi30-Uy66dSNPINRWdebR1l9B2zNNp44XjjvC6ITNgRdjY-AYFTT2g3ByQB9ct5_sSJCaPAZZxbYhw3g8Dxtv8j3OKUax-QZZVfNHyQjrpTivVDqK6rgFljlYxIEfKHBlAfmWY_QR_-zge-mNmmNKAFlol49jks" alt="Profile" className="w-full h-full object-cover" />
           </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4">
        <div className="mt-2 bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-6 shadow-lg shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-black/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100 text-sm font-medium">总余额</span>
              <button className="text-blue-100 hover:text-white transition-colors">
                <Eye size={18} />
              </button>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-blue-100">¥</span>
              <span className="text-5xl font-bold text-white tracking-tight">1,240.50</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-xs text-blue-50 font-medium">今日 +¥145.00</span>
              </div>
              <span className="text-xs text-blue-200">待结算: ¥320.00</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="bg-surface-dark active:bg-surface-lighter hover:bg-surface-lighter border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <ArrowUp size={24} />
            </div>
            <span className="font-semibold text-sm">提现</span>
          </button>
          <button className="bg-surface-dark active:bg-surface-lighter hover:bg-surface-lighter border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
            <div className="w-12 h-12 rounded-full bg-surface-lighter text-gray-400 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors border border-white/5">
              <History size={24} />
            </div>
            <span className="font-semibold text-sm text-gray-300">历史记录</span>
          </button>
        </div>

        <div className="mt-6 mb-2 flex justify-between items-end">
          <h2 className="text-lg font-bold">收益明细</h2>
          <select className="bg-transparent border-none text-xs text-gray-400 focus:ring-0 pr-6 p-0 font-medium cursor-pointer">
            <option>本周</option>
            <option>上周</option>
            <option>本月</option>
          </select>
        </div>

        <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 mb-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_DATA}>
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {WEEKLY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 3 ? '#136dec' : 'rgba(19, 109, 236, 0.2)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-2 px-2">
             {WEEKLY_DATA.map((d, i) => (
                 <span key={i} className={`text-[10px] ${i===3 ? 'text-white font-bold' : 'text-gray-500'}`}>{d.day}</span>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-1">今天</h3>
            <div className="space-y-3">
              <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex items-center justify-between active:scale-[0.99] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">图像标注</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">已通过</span>
                      <span className="text-xs text-gray-500">14:20</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">+¥50.00</p>
                  <p className="text-[10px] text-gray-500">批次 #8291</p>
                </div>
              </div>

               <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex items-center justify-between active:scale-[0.99] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">文本分类</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">已通过</span>
                      <span className="text-xs text-gray-500">11:05</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">+¥25.50</p>
                  <p className="text-[10px] text-gray-500">批次 #8288</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-1">昨天</h3>
             <div className="space-y-3">
              <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex items-center justify-between active:scale-[0.99] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <ArrowUpRight size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">提现至支付宝</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">已完成</span>
                      <span className="text-xs text-gray-500">09:15</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-300">-¥100.00</p>
                  <p className="text-[10px] text-gray-500">转账</p>
                </div>
              </div>

               <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex items-center justify-between opacity-75">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Hourglass size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">音频转写</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded">审核中</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-500">¥12.00</p>
                  <p className="text-[10px] text-gray-500">预计收益</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};