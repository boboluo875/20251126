import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, Award, Gift, CheckCircle, ChevronDown, 
  Code, Shield, Activity, FileText, RefreshCcw, HeartPulse, 
  Pill, ThermometerSun, Stethoscope, Syringe, User, Heart 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 模拟用户成长数据
const userProgressData = [
  { name: '第1周', points: 150, level: 1 },
  { name: '第2周', points: 320, level: 2 },
  { name: '第3周', points: 580, level: 3 },
  { name: '第4周', points: 890, level: 4 },
  { name: '第5周', points: 1350, level: 5 },
  { name: '第6周', points: 1920, level: 6 },
];

// 核心功能规划组件
const FeatureCard = ({ 
  icon, 
  title, 
  children, 
  colorClass = "bg-blue-500" 
}: { 
  icon: React.ElementType; 
  title: string; 
  children: React.ReactNode; 
  colorClass?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="mb-6 rounded-xl overflow-hidden shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`${colorClass} text-white p-4 cursor-pointer flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {icon({ size: 24 })}
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <ChevronDown 
          size={20} 
          className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>
      
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="bg-white overflow-hidden"
      >
        <div className="p-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// 内容领域标签组件 - 医疗风格优化
const TopicTag = ({ title, icon }: { title: string, icon?: React.ElementType }) => (
  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium mr-2 mb-2 transition-all duration-300 hover:bg-blue-100">
    {icon && <icon size={14} />}
    {title}
  </span>
);

// 流程图组件
const FlowDiagram = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
    {[
      { icon: Users, text: '注册登录', color: 'bg-blue-100 text-blue-600' },
      { icon: BookOpen, text: '答题闯关', color: 'bg-green-100 text-green-600' },
      { icon: Award, text: '获取积分', color: 'bg-yellow-100 text-yellow-600' },
      { icon: Gift, text: '兑换礼品', color: 'bg-red-100 text-red-600' },
      { icon: CheckCircle, text: '线下核销', color: 'bg-purple-100 text-purple-600' }
    ].map((step, index, array) => {
      const Icon = step.icon;
      return (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div className={`${step.color} p-3 rounded-full mb-2 shadow-inner`}>
              <Icon size={24} />
            </div>
            <span className="text-sm font-medium">{step.text}</span>
          </div>
          {index < array.length - 1 && (
            <div className="hidden md:block text-gray-400">
              <ChevronDown className="transform rotate-[-90deg]" size={20} />
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// 医疗元素装饰组件
const MedicalDecorations = () => (
  <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    <motion.div 
      className="absolute top-20 left-10 text-blue-100 opacity-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
    >
      <Stethoscope size={180} />
    </motion.div>
    <motion.div 
      className="absolute bottom-40 right-10 text-green-100 opacity-20"
      animate={{ rotate: -360 }}
      transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
    >
      <Heart size={150} />
    </motion.div>
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
    </div>
  </div>
);

// 主规划页面组件
const HealthQuizPlanner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8 relative">
      <MedicalDecorations />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* 页面标题 - 医疗风格优化 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center bg-white rounded-full p-3 shadow-lg mb-4 border-2 border-blue-100">
            <HeartPulse size={40} className="text-red-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            医疗卫生健康教育答题闯关网站规划
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            全面提升公众健康素养的互动学习平台
          </p>
        </motion.div>

        {/* 1. 功能架构设计 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Stethoscope size={24} className="text-blue-500" />
            功能架构设计
          </h2>

          <FeatureCard icon={Users} title="用户注册登录系统" colorClass="bg-blue-500">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>手机号一键注册/登录</li>
              <li>第三方平台快捷登录（微信、QQ）</li>
              <li>用户信息完善（基本资料、健康偏好设置）</li>
              <li>安全保障（密码找回、账号绑定）</li>
            </ul>
          </FeatureCard>

          <FeatureCard icon={BookOpen} title="答题闯关模块" colorClass="bg-green-500">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">关卡设置</h4>
                <p className="text-gray-700">分级关卡设计，从基础到进阶，每关10题，通关可解锁下一关卡</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">题目类型</h4>
                <p className="text-gray-700">单选题、多选题、判断题、图片题等多种题型结合</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">答题规则</h4>
                <p className="text-gray-700">限时答题、答错提示、连续答对奖励、复活机制</p>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon={Award} title="积分系统" colorClass="bg-yellow-500">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">获取途径</h4>
                <p className="text-gray-700">答题正确、每日签到、邀请好友、完成任务</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">累积机制</h4>
                <p className="text-gray-700">积分永久有效，支持查询积分明细</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">等级体系</h4>
                <p className="text-gray-700">基于积分累计的等级晋升，不同等级享有专属权益</p>
              </div>
            </div>
            <div className="mt-4 h-64 bg-white p-4 rounded-lg shadow-inner border border-gray-100">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="points" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="level" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-gray-500 mt-1">用户成长曲线图示例</p>
            </div>
          </FeatureCard>

          <FeatureCard icon={Gift} title="礼品兑换模块" colorClass="bg-red-500">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">礼品展示</h4><p className="text-gray-700">健康相关实物礼品、优惠券、虚拟徽章等分类展示</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">兑换流程</h4>
                <p className="text-gray-700">积分兑换、填写收货信息、确认兑换</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">积分消耗</h4>
                <p className="text-gray-700">不同礼品所需积分不同，支持积分不足提醒</p>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon={CheckCircle} title="线下核销机制" colorClass="bg-purple-500">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>二维码核销：生成专属核销码，线下商户扫码验证</li>
              <li>短信验证码核销：发送验证码至用户手机，商户输入验证</li>
              <li>核销记录查询：用户可查看所有已核销和待核销的礼品</li>
              <li>商户核销管理：提供商户后台进行核销操作和数据统计</li>
            </ul>
          </FeatureCard>
        </section>

        {/* 2. 内容策略制定 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText size={24} className="text-green-500" />
            内容策略制定
          </h2>

          <FeatureCard icon={Activity} title="核心知识领域划分" colorClass="bg-teal-500">
            <div className="space-y-3">
              <div className="flex flex-wrap">
                <TopicTag title="传染病预防" icon={Shield} />
                <TopicTag title="慢性病管理" icon={Activity} />
                <TopicTag title="合理用药" icon={Pill} />
                <TopicTag title="急救知识" icon={HeartPulse} />
                <TopicTag title="健康生活方式" icon={ThermometerSun} />
                <TopicTag title="儿童健康" icon={User} />
                <TopicTag title="老年保健" icon={Heart} />
                <TopicTag title="心理健康" icon={HeartPulse} />
                <TopicTag title="食品安全" icon={Shield} />
                <TopicTag title="环境卫生" icon={Activity} />
                <TopicTag title="中医养生" icon={ThermometerSun} />
                <TopicTag title="妇幼保健" icon={User} />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon={Award} title="题目难度梯度设计" colorClass="bg-indigo-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-700 mb-2">初级难度</h4>
                <p className="text-gray-700 text-sm">基础医疗卫生常识，覆盖面广，适合所有用户</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-700 mb-2">中级难度</h4>
                <p className="text-gray-700 text-sm">较专业的健康知识，需要一定的理解能力</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-700 mb-2">高级难度</h4>
                <p className="text-gray-700 text-sm">专业医疗卫生知识，适合有相关背景的用户</p>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon={RefreshCcw} title="内容更新机制" colorClass="bg-orange-500">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>每日更新10道新题目</li>
              <li>每周推出专题知识闯关活动</li>
              <li>根据季节性疾病和健康热点定期更新内容</li>
              <li>用户反馈题目质量评估与优化机制</li>
            </ul>
          </FeatureCard>

          <FeatureCard icon={Shield} title="权威性保障措施" colorClass="bg-gray-700">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>与专业医疗机构和高校合作审核内容</li>
              <li>建立医疗卫生专家顾问团队</li>
              <li>引用权威医学文献和指南</li>
              <li>定期对内容进行科学性审查和更新</li>
              <li>明确标注信息来源和更新时间</li>
            </ul>
          </FeatureCard>
        </section>

        {/* 3. 用户体验流程 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity size={24} className="text-purple-500" />
            用户体验流程
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
              <HeartPulse size={20} className="text-red-500" />
              完整用户旅程
            </h3>
            <FlowDiagram />
          </div>

          <FeatureCard icon={BookOpen} title="答题闯关趣味性优化" colorClass="bg-pink-500">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>游戏化设计：关卡进度可视化、成就系统、排行榜</li>
              <li>互动元素：答题动画效果、答对提示音效</li>
              <li>社交功能：好友PK、邀请好友答题</li>
              <li>个性化推荐：根据用户答题偏好推荐相关题目</li>
              <li>答题奖励：连续答对奖励额外积分</li>
            </ul>
          </FeatureCard>

          <FeatureCard icon={CheckCircle} title="线下核销便捷性优化" colorClass="bg-cyan-500">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>一键生成核销码，支持截图保存</li>
              <li>核销码有效期提醒和自动续期功能</li>
              <li>附近合作商户地图导航</li>
              <li>核销成功即时通知和积分扣除确认</li>
              <li>核销记录历史查询和评价功能</li>
            </ul>
          </FeatureCard>
        </section>

        {/* 4. 技术实现建议 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Code size={24} className="text-gray-700" />
            技术实现建议
          </h2>

          <FeatureCard icon={Code} title="技术选型建议" colorClass="bg-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">前端技术</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• React 18+ (框架)</li>
                  <li>• TypeScript (类型安全)</li>
                  <li>• Tailwind CSS (样式)</li>
                  <li>• React Router (路由)</li>
                  <li>• Framer Motion (动画)</li>
                  <li>• Recharts (数据可视化)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">后端技术</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Node.js + Express (API服务)</li>
                  <li>• JWT (用户认证)</li>
                  <li>• RESTful API (接口设计)</li>
                  <li>• WebSocket (实时通信)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">数据库</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• MongoDB (用户数据、题目)</li>
                  <li>• Redis (缓存、会话管理)</li>
                  <li>• MySQL (交易记录、核销数据)</li>
                </ul>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon={Activity} title="关键功能模块实现方案" colorClass="bg-emerald-600">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">答题系统</h4>
                <p className="text-gray-700">前后端分离架构，题目数据预加载，实时校验答案，答题进度本地缓存</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">积分系统</h4>
                <p className="text-gray-700">事务型设计确保积分数据一致性，分布式锁处理并发请求</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">核销系统</h4>
                <p className="text-gray-700">二维码生成与识别技术，消息队列处理核销请求，多渠道通知机制</p>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon={Shield} title="数据安全与用户隐私保护" colorClass="bg-red-600">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>数据加密：用户敏感信息加密存储，传输层SSL/TLS加密</li>
              <li>访问控制：基于角色的权限管理，API接口鉴权</li>
              <li>隐私保护：严格遵守数据隐私法规，用户数据匿名化处理</li>
              <li>安全审计：定期安全漏洞扫描，操作日志记录与审计</li>
              <li>备份恢复：数据定期备份，完善的灾难恢复机制</li>
            </ul>
          </FeatureCard>
        </section>

         {/* 页脚 */}
         <footer className="text-center mt-16 text-gray-500 text-sm">
           <div className="inline-flex items-center justify-center mb-2">
             <HeartPulse size={14} className="text-red-500 mr-1" />
             <span>镇海社区卫生服务中心</span>
           </div>
           <p className="mt-1">© 2025 健康存折 版权所有</p>
           <p className="text-xs mt-2">提示：点击右下角按钮获取网站分享方法</p>
         </footer>
      </div>
    </div>
  );
};

export default HealthQuizPlanner;