import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import { authApi } from '../src/services/api';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 获取表单数据
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const username = (formData.get('username') as string) || '13800138000';
      const password = (formData.get('password') as string) || 'password';

      // 调用登录API
      const response = await authApi.login(username, password);
      
      // 登录成功，跳转到任务大厅
      navigate('/hall');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-between p-6 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <div className="w-full flex-1 flex flex-col items-center justify-center mt-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
          <Eye className="text-white w-10 h-10 relative z-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-center mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          点睛标注
        </h1>
        <p className="text-slate-400 text-sm font-medium mb-12">数据标注平台</p>

        <form onSubmit={handleLogin} className="w-full space-y-5 px-2">
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <User size={20} />
            </div>
            <input
              name="username"
              className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              placeholder="手机号或邮箱"
              type="text"
              defaultValue="13800138000"
            />
          </div>

          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <Lock size={20} />
            </div>
            <input
              name="password"
              className="block w-full pl-12 pr-12 py-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              placeholder="密码"
              type={showPassword ? "text" : "password"}
              defaultValue="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>登录中...</span>
                </>
              ) : (
                <>
                  <span>登录</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm px-1">
            <button type="button" className="text-slate-400 hover:text-primary transition-colors">创建账号</button>
            <button type="button" className="text-slate-400 hover:text-primary transition-colors">忘记密码</button>
          </div>
        </form>
      </div>

      <div className="w-full pt-10 pb-4">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-x-0 h-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="relative z-10 px-4 bg-background-light dark:bg-background-dark text-xs font-medium text-slate-500 uppercase tracking-wider">
            或通过以下方式登录
          </span>
        </div>
        <div className="flex justify-center gap-6">
          <button className="w-14 h-14 rounded-full bg-surface-dark border border-slate-700/50 hover:border-green-500/50 hover:bg-green-500/10 flex items-center justify-center transition-all group">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_WEx65aR1wIItOHa21b6KftOPa3eZRutzhcAXWjtadcCNFnckL6XMfXuFxnhkAfKZxYu0DmbbwFqn-3_jXxBGrLLpn7j9JlEP2l5yIyWroe6xBQVPQnevsUqNcwH9-wYmYYL5Ubu4ipWRGQLP88AWqBbm65_Fj8621RhTaFhRG9uY1hteWhOjBbkrvjLh3gTt_8LqErgxba7Z-uNi4bLbcgGtplGb7gwYtjrRBr0rTGuAEauF4_cRKBA3113LOqFlAOZClRJLD_A" alt="WeChat" className="w-7 h-7 group-hover:scale-110 transition-transform" />
          </button>
          <button className="w-14 h-14 rounded-full bg-surface-dark border border-slate-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 flex items-center justify-center transition-all group">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_gBUFVmJN0-KjTLWzmOdtqisn1UAEQELOLOLNh3xhGtu5fICJW8y16zcdObbHrmEfJP2mvfA2kclZ64jR4gWa_aScPam2vb66u6ywuM_nrZM5iIlaiUlFWbF5hpmHamGDvx-8cl3P2wh80PwmSoeVoNDnDQ71LFVXS57Soc-cjY-gpM79dtvSG0WKJkVXgcy6oEbCK9KWBpL8dB0j8b4Awposlhwr86rKMBxQIq2tJd-eUGN61GqIB6kgs7vYzOh37JEAjvwDjPU" alt="Alipay" className="w-7 h-7 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-8">
          登录即表示您同意 <span className="text-slate-400 cursor-pointer hover:text-white underline decoration-slate-600">服务条款</span> 和 <span className="text-slate-400 cursor-pointer hover:text-white underline decoration-slate-600">隐私政策</span>
        </p>
      </div>
    </div>
  );
};