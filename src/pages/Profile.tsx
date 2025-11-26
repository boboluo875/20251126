import { useState, useEffect } from 'react';
import { Award, Gift, CheckCircle, LogOut, Settings, BookOpen, HeartPulse, Activity, Pill, Shield, FileText, User } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { AuthContext } from '@/contexts/authContext';
import { useContext } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { FooterNavigation } from '../components/FooterNavigation';

const Profile = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useContext(AuthContext);
  
  // 模拟用户数据
  const [userData, setUserData] = useState({
    name: '张三',
    level: 3,
    points: 850,
    completedQuizzes: 24,
    兑换礼物: 5
  });

  // 用户健康成就
  const healthAchievements = [
    { name: "健康新手", icon: HeartPulse, color: "bg-blue-100 text-blue-600" },
    { name: "知识达人", icon: BookOpen, color: "bg-green-100 text-green-600" },
    { name: "连续答题", icon: Activity, color: "bg-purple-100 text-purple-600" }
  ];

  // 处理退出登录
  const handleLogout = () => {
    logout();
    toast('已成功退出登录');
  };

  // 切换主题
  const handleToggleTheme = () => {
    toggleTheme();
    toast(`已切换到${theme === 'light' ? '深色' : '浅色'}模式`);
  };

  // 从localStorage加载用户积分
  useEffect(() => {
    const storedPoints = localStorage.getItem('userPoints');
    if (storedPoints) {
      setUserData(prev => ({
        ...prev,
        points: parseInt(storedPoints)
      }));
    }
  }, []);

  return (
    <div className={`min-h-screen p-4 md:p-8 pb-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-green-50 text-gray-800'}`}>
      {/* 医疗风格装饰元素 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* 返回首页按钮 */}
        <div className="mb-6">
          <Link to="/">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
              <i className="fa-solid fa-arrow-left"></i>
              <span>返回首页</span>
            </button>
          </Link>
        </div>
        
        {/* 用户信息头部 */}
        <div className={`rounded-2xl p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-blue-100'} transition-all duration-300`}>
          <div className="flex items-center gap-4">
            {/* 用户头像 - 添加医疗元素 */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} border-4 border-blue-200 shadow-inner`}>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                {userData.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Award size={18} className="text-yellow-500" />
                <span className="text-sm font-medium">健康等级: LV.{userData.level}</span>
              </div>
            </div>
            <button 
              onClick={handleToggleTheme}
              className={`ml-auto p-2.5 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-blue-50 text-blue-600'} transition-all duration-300 transform hover:scale-110`}
              title="切换主题"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* 统计数据 - 改进样式 */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-100'} mb-2`}>
                <Award size={18} className="text-yellow-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">总积分</p>
              <p className="font-bold text-lg">{userData.points}</p>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} mb-2`}>
                <BookOpen size={18} className="text-blue-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">已完成题目</p>
              <p className="font-bold text-lg">{userData.completedQuizzes}</p>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'} mb-2`}>
                <Gift size={18} className="text-green-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">兑换礼物</p>
              <p className="font-bold text-lg">{userData.兑换礼物}</p>
            </div>
          </div>
        </div>

        {/* 健康成就区 */}
        <div className={`rounded-2xl p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300`}>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield size={20} className="text-blue-500" />
            我的健康成就
          </h3>
          <div className="flex flex-wrap gap-3">
            {healthAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} border ${theme === 'dark' ? 'border-gray-600' : 'border-blue-100'} transition-all duration-300 hover:shadow-md`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${achievement.color}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-medium">{achievement.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 功能菜单 - 医疗风格优化 */}
        <div className={`rounded-2xl p-4 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300`}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-2 flex items-center gap-1.5">
            <FileText size={14} />
            功能菜单
          </h3>
          <div className="space-y-1">
            <Link 
              to="/quiz-history" 
              className={`flex items-center gap-3 p-3.5 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-300 transform hover:-translate-x-1`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                <BookOpen size={18} className="text-blue-500" />
              </div>
              <span>答题记录</span>
              <div className="ml-auto text-gray-400">→</div>
            </Link>
            <Link 
              to="/my-points" 
              className={`flex items-center gap-3 p-3.5 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-300 transform hover:-translate-x-1`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                <Award size={18} className="text-yellow-500" />
              </div>
              <span>我的积分</span>
              <div className="ml-auto text-gray-400">→</div>
            </Link>
            <Link 
              to="/gift-center" 
              className={`flex items-center gap-3 p-3.5 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-300 transform hover:-translate-x-1`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
                <Gift size={18} className="text-red-500" />
              </div>
              <span>礼品中心</span>
              <div className="ml-auto text-gray-400">→</div>
            </Link>
            <Link 
              to="/voucher" 
              className={`flex items-center gap-3 p-3.5 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-300 transform hover:-translate-x-1`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                <CheckCircle size={18} className="text-green-500" />
              </div>
              <span>我的兑换</span>
              <div className="ml-auto text-gray-400">→</div>
            </Link>
          </div>
        </div>

        {/* 设置菜单 */}
        <div className={`rounded-2xl p-4 mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300`}>
          <div className="space-y-1">
            <div 
              className={`flex items-center gap-3 p-3.5 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-300`}
              onClick={handleToggleTheme}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                <Settings size={18} className="text-purple-500" />
              </div>
              <span>主题设置</span>
              <div className="ml-auto text-gray-400">{theme === 'light' ? '🌙' : '☀️'}</div>
            </div>
            <div 
              className={`flex items-center gap-3 p-3.5 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-blue-50 text-red-500'} transition-all duration-300`}
              onClick={handleLogout}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                <LogOut size={18} />
              </div>
              <span>退出登录</span>
            </div>
          </div>
        </div>

        {/* 健康小贴士 */}
        <div className={`rounded-2xl p-5 mb-8 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'} border ${theme === 'dark' ? 'border-blue-800' : 'border-blue-100'} shadow-md`}>
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Pill size={16} className="text-blue-500" />
            今日健康小贴士
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            保持每天7-8小时睡眠，合理饮食，适量运动，定期体检，是维护健康的四大基石。
          </p>
        </div>

        {/* 版权信息 */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          <div className="inline-flex items-center justify-center mb-2">
            <HeartPulse size={14} className="text-red-500 mr-1" />
            <span>镇海社区卫生服务中心</span>
          </div>
          <p className="mt-1">© 2025 健康存折 版权所有</p>
        </div>
      </div>
      
      {/* 底部导航 */}
      <FooterNavigation activeRoute="/profile" />
    </div>
  );
};

export default Profile;