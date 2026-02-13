import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, PieChart, Square, Hexagon, Hand, Undo2, Trash2, Car, User as UserIcon, AlertTriangle, Bus, Bike, ArrowRight } from 'lucide-react';

export const Workbench: React.FC = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<'box' | 'polygon' | 'pan'>('box');
  const [activeLabel, setActiveLabel] = useState<string>('car');

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden select-none">
      {/* Header */}
      <header className="flex-none px-4 py-3 flex items-center justify-between bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/hall')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <X size={20} />
          </button>
          <div>
            <h1 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">任务 #1024</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">街道物体检测</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-medium text-primary">进度</span>
            <span className="text-xs font-mono font-bold tracking-wide">5 <span className="text-slate-500 font-normal">/ 50</span></span>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/20" style={{ height: '10%' }}></div>
             <PieChart size={14} className="text-primary" />
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 relative overflow-hidden bg-slate-100 dark:bg-[#0b111a] flex items-center justify-center">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <div className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700/50 max-h-[75vh] max-w-full">
            <img 
              alt="Workbench" 
              className="max-h-full max-w-full object-contain pointer-events-none select-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLmClRRHry1D0Zsw3sQJIg57tCOgh4IYD_EpZKeoKdUxOo5_PDva2-vdLcmbMfgmyiNHcDWVBHQZ4QTfVUbqh1yZxVnsOtFzAQ8leJeDjhRiYqaHCVb6fOftoKNHyQa08TcGrP3B7D6imVH4ULV5H7Kp5ou4U82RP32QO6ud_IVuxcLHgcr4Zaiq7q46SYm1wN69lOejiaJ8lhGBawtZzs4n_fojt8Re2iM_XBLv0xNMIl0u_FYrzwq0nHQIAjPWOKEU7lOMoFuQM"
            />
            {/* Annotation Overlay - Static for demo */}
            <div className="absolute border-2 border-primary bg-primary/10" style={{ top: '45%', left: '20%', width: '25%', height: '20%' }}>
              <div className="absolute -top-6 left-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
                汽车 <X size={10} className="cursor-pointer hover:text-red-200" />
              </div>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-primary rounded-full shadow-sm"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-primary rounded-full shadow-sm"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-primary rounded-full shadow-sm"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-primary rounded-full shadow-sm"></div>
            </div>

            <div className="absolute border-2 border-indigo-500 bg-indigo-500/10" style={{ top: '55%', left: '70%', width: '8%', height: '18%' }}>
               <div className="absolute -top-6 left-0 bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm">
                行人
               </div>
            </div>
          </div>
        </div>

        {/* Toolbar - Floating Right */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-30">
          <div className="bg-[#1A2533]/90 backdrop-blur-md rounded-lg shadow-xl border border-white/5 p-1 flex flex-col gap-1">
            <button 
              onClick={() => setActiveTool('box')}
              className={`w-9 h-9 flex items-center justify-center rounded transition-all ${activeTool === 'box' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
            >
              <Square size={18} />
            </button>
            <button 
               onClick={() => setActiveTool('polygon')}
               className={`w-9 h-9 flex items-center justify-center rounded transition-all ${activeTool === 'polygon' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
            >
              <Hexagon size={18} />
            </button>
             <button 
               onClick={() => setActiveTool('pan')}
               className={`w-9 h-9 flex items-center justify-center rounded transition-all ${activeTool === 'pan' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
            >
              <Hand size={18} />
            </button>
             <div className="h-px w-5 mx-auto bg-slate-700 my-0.5"></div>
             <button className="w-9 h-9 flex items-center justify-center rounded text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
              <Undo2 size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded text-red-400 hover:bg-red-500/20 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-none bg-white dark:bg-[#151F2E] border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-safe">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">选择标签</span>
            <button className="text-[10px] text-primary font-medium hover:text-primary-dark">编辑列表</button>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-4 px-4 snap-x">
            <LabelButton 
              active={activeLabel === 'car'} 
              onClick={() => setActiveLabel('car')}
              icon={<Car size={16} />}
              label="汽车"
              count={1}
            />
            <LabelButton 
              active={activeLabel === 'person'} 
              onClick={() => setActiveLabel('person')}
              icon={<UserIcon size={16} />}
              label="行人"
              count={2}
            />
            <LabelButton 
              active={activeLabel === 'sign'} 
              onClick={() => setActiveLabel('sign')}
              icon={<AlertTriangle size={16} />}
              label="交通标志"
            />
            <LabelButton 
              active={activeLabel === 'bus'} 
              onClick={() => setActiveLabel('bus')}
              icon={<Bus size={16} />}
              label="公交车"
            />
            <LabelButton 
              active={activeLabel === 'bike'} 
              onClick={() => setActiveLabel('bike')}
              icon={<Bike size={16} />}
              label="自行车"
            />
          </div>
        </div>
        <div className="px-4 pb-6 pt-1 flex gap-3">
          <button className="h-11 w-24 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1A2533] text-slate-700 dark:text-slate-300 font-medium text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 transition-colors">
            跳过
          </button>
          <button 
            onClick={() => navigate('/hall')}
            className="h-11 flex-1 rounded-lg bg-primary hover:bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-primary/25 active:shadow-none active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>提交并下一条</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

interface LabelButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}

const LabelButton: React.FC<LabelButtonProps> = ({ active, onClick, icon, label, count }) => (
  <button 
    onClick={onClick}
    className={`snap-start shrink-0 h-9 pl-3 pr-3 rounded-md flex items-center gap-2 transition-all active:scale-95 border ${
      active 
        ? 'bg-primary text-white shadow-sm border-primary/50' 
        : 'bg-[#1A2533] text-slate-400 border-slate-700 hover:border-slate-600 hover:bg-[#1f2b3b]'
    }`}
  >
    {icon}
    <span className="font-medium text-xs">{label}</span>
    {count !== undefined && (
      <span className={`${active ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'} text-[9px] px-1.5 py-0.5 rounded font-bold ml-1`}>
        {count}
      </span>
    )}
  </button>
);