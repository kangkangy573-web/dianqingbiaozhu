import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MoreVertical, DollarSign, History, CheckCircle, Timer, Info, Check, X, ArrowRight } from 'lucide-react';

export const TaskDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
            <ArrowLeft size={24} />
          </button>
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">任务详情</div>
          <button className="p-2 -mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl font-bold leading-tight">边界框：行人检测</h1>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 text-sm font-semibold border border-primary/20">
              <DollarSign size={16} />
              ¥0.50 / 图像
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700">
              <History size={16} />
              预计 2 分钟
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
            识别并在所有街景图像中的行人周围绘制紧密的边界框。确保覆盖全身，包括四肢。
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <CheckCircle size={20} />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wide font-medium">准确率</div>
                <div className="text-lg font-bold">{'>'} 98%</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Timer size={20} />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wide font-medium">倒计时</div>
                <div className="text-lg font-bold">60 分钟</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-2 bg-slate-100 dark:bg-slate-900/50 w-full"></div>
        
        <div className="px-5 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-primary dark:text-blue-400" />
            <h2 className="text-lg font-bold">标注指南</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-emerald-500/30 dark:border-emerald-500/20 shadow-sm">
              <div className="relative h-48 w-full bg-slate-800">
                <img 
                  alt="Correct example" 
                  className="w-full h-full object-cover opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuASvSkVtMTSxh1HlLl9iQAxmYGD9s_qnWNOFVrfwhSVQOMVSrLD9cVTkDLF-1RkfZyLvcGOMxFxdN_-TlEiSUZbvdSgf9IgbTDJ9bLVSdNQ9izshLVDIeJVDsx5Me0DSLsnz88c0dYSKXAcOI3CQE7Sg2lowBnInP3JCjEzTCbzneo6a82xPgBwW3GQyybGERoNZheHVDjFGYr6-FW7Edr1bGRooqb6gR2AA62hjCErwIoyH5AyFD2-DrVEjXjCWwDm7g9nve2MRek"
                />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-36 border-2 border-emerald-500 bg-emerald-500/20 rounded-sm"></div>
                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md flex items-center gap-1">
                  <Check size={12} /> 正确示例
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">紧密贴合</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">边框应紧贴行人边缘，包括他们携带的任何包或配饰。</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-rose-500/30 dark:border-rose-500/20 shadow-sm">
              <div className="relative h-48 w-full bg-slate-800">
                <img 
                  alt="Incorrect example" 
                  className="w-full h-full object-cover opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-t6zFGjusvO34liFrJicCqvbF6vb9OVcIQY673EapIMkkHW1BUVjEE_zlHW6OQl5F1KcN-4_Az2Q38fchXppVPrXfd24LmVVr2i4VmQsNDvsp3wZ51xS6y6gZhN3GefkR_hukAuNgp4nqDnmoDawSUEHVT-YowI1TfJmaJEvtfR-TnWHGIvcNFIDmaekCB6ZnDyQPmOLfUC5owUP81QpdXRxy0aiuzOrGNQRE2W5Uk3TDGqLBA9ikUImG0symSHHpRCf7jcjvxfc"
                />
                <div className="absolute top-4 left-1/3 w-40 h-40 border-2 border-rose-500 bg-rose-500/20 rounded-sm"></div>
                <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md flex items-center gap-1">
                  <X size={12} /> 错误示例
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-rose-700 dark:text-rose-400 mb-1">太松 / 背景过多</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">不要包含过多的背景空间。此框太松散，捕获了不必要的街道元素。</p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex gap-3">
              <Info size={20} className="text-primary dark:text-blue-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">遮挡处理</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  如果行人部分被汽车或物体遮挡，仅在可见部分周围绘制边框。不要猜测被遮挡的区域。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-5 pb-8">
          <p className="text-xs text-center text-slate-400 dark:text-slate-500">
            点击接受即表示您同意质量标准。准确率低可能会导致付款被拒绝。
          </p>
        </div>
      </main>
      
      <footer className="absolute bottom-0 w-full bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-4 pb-8 z-30">
        <button 
          onClick={() => navigate(`/workbench/${id || '1'}`)}
          className="w-full bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary/20 dark:shadow-primary/10 transition-all flex items-center justify-center gap-2 group"
        >
          <span>接受并开始任务</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </button>
      </footer>
    </div>
  );
};