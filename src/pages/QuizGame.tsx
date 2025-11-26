import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Clock, CheckCircle, XCircle, ChevronRight, Home, Gift, RefreshCcw, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// 定义题目类型
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

const QuizGame: React.FC = () => {
  // 游戏状态管理
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [quizResult, setQuizResult] = useState<'success' | 'failure' | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [dailyAttempts, setDailyAttempts] = useState(0);
  const [canPlay, setCanPlay] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const today = new Date().toDateString();
  
  // 模拟医疗卫生题目数据
  const questions: Question[] = [
    {
      id: 1,
      text: '以下哪种行为有助于预防新冠病毒感染？',
      options: [
        '经常用手触摸面部',
        '不戴口罩去人群密集处',
        '勤洗手并保持社交距离',
        '熬夜增强免疫力'
      ],
      correctAnswer: 2,
      explanation: '勤洗手可以去除手部的病毒，保持社交距离可以减少病毒传播的机会，这是预防新冠病毒感染的有效措施。',
      difficulty: 'easy',
      category: '传染病预防'
    },
    {
      id: 2,
      text: '成年人每天应该喝多少水？',
      options: [
        '500毫升以下',
        '1000-1500毫升',
        '1500-2000毫升',
        '3000毫升以上'
      ],
      correctAnswer: 2,
      explanation: '根据健康建议，成年人每天应该喝1500-2000毫升的水，约8杯左右，以维持身体正常代谢。',
      difficulty: 'easy',
      category: '健康生活方式'
    },
    {
      id: 3,
      text: '下列哪种食物富含蛋白质？',
      options: [
        '米饭',
        '苹果',
        '鸡肉',
        '黄瓜'
      ],
      correctAnswer: 2,
      explanation: '鸡肉是优质蛋白质的良好来源，而米饭主要提供碳水化合物，苹果和黄瓜主要提供维生素和膳食纤维。',
      difficulty: 'easy',
      category: '合理饮食'
    },
    {
      id: 4,
      text: '正常成年人的血压范围是？',
      options: [
        '收缩压<90mmHg，舒张压<60mmHg',
        '收缩压90-139mmHg，舒张压60-89mmHg',
        '收缩压140-159mmHg，舒张压90-99mmHg',
        '收缩压≥160mmHg，舒张压≥100mmHg'
      ],
      correctAnswer: 1,
      explanation: '正常成年人的血压范围是收缩压90-139mmHg，舒张压60-89mmHg。高于这个范围可能提示高血压。',
      difficulty: 'medium',
      category: '慢性病管理'
    },
    {
      id: 5,
      text: '心肺复苏(CPR)的正确按压位置是？',
      options: [
        '胸部左侧乳头附近',
        '胸骨中下部1/3交界处',
        '上腹部',
        '胸部正中央锁骨下方'
      ],
      correctAnswer: 1,
      explanation: '心肺复苏的正确按压位置是胸骨中下部1/3交界处，这个位置能有效地推动心脏血液流动。',
      difficulty: 'medium',
      category: '急救知识'
    },
    {
      id: 6,
      text: '下列哪种药物应该在饭后服用？',
      options: [
        '阿司匹林肠溶片',
        '布洛芬',
        '降压药',
        '抗生素'
      ],
      correctAnswer: 1,
      explanation: '布洛芬等非甾体抗炎药对胃黏膜有刺激作用，饭后服用可以减少这种刺激。',
      difficulty: 'medium',
      category: '合理用药'
    },
    {
      id: 7,
      text: '糖尿病患者应该限制摄入哪种营养素？',
      options: [
        '蛋白质',
        '脂肪',
        '碳水化合物',
        '膳食纤维'
      ],
      correctAnswer: 2,
      explanation: '碳水化合物会在体内转化为葡萄糖，导致血糖升高，因此糖尿病患者需要控制碳水化合物的摄入量。',
      difficulty: 'medium',
      category: '慢性病管理'
    },
    {
      id: 8,
      text: '预防龋齿的有效方法不包括？',
      options: [
        '每天刷牙两次',
        '使用含氟牙膏',
        '减少高糖食物摄入',
        '经常用清水漱口'
      ],
      correctAnswer: 3,
      explanation: '用清水漱口虽然能清除部分食物残渣，但不能有效预防龋齿。预防龋齿需要正确刷牙、使用含氟牙膏和控制糖分摄入。',
      difficulty: 'easy',
      category: '口腔健康'
    },
    {
      id: 9,
      text: '成年人每天的建议睡眠时间是？',
      options: [
        '4-5小时',
        '5-6小时',
        '7-8小时',
        '9-10小时'
      ],
      correctAnswer: 2,
      explanation: '成年人每天需要7-8小时的睡眠时间，以保证身体和大脑的充分休息和恢复。',
      difficulty: 'easy',
      category: '健康生活方式'
    },
    {
      id: 10,
      text: '下列哪种情况可能是脑卒中的症状？',
      options: [
        '突然面部麻木或口角歪斜',
        '持续性头痛但无其他症状',
        '轻微咳嗽并伴有流涕',
        '短暂性视力模糊但很快恢复'
      ],
      correctAnswer: 0,
      explanation: '突然面部麻木或口角歪斜是脑卒中的典型症状之一，如出现此类症状应立即就医。',
      difficulty: 'hard',
      category: '急救知识'
    }
  ];

  // 初始化数据，从localStorage加载用户信息
  useEffect(() => {
    // 加载用户积分
    const storedPoints = localStorage.getItem('userPoints');
    if (storedPoints) {
      setUserPoints(parseInt(storedPoints));
    }
    
    // 检查今日答题次数
    const storedAttempts = localStorage.getItem(`quizAttempts_${today}`);
    if (storedAttempts) {
      const attempts = parseInt(storedAttempts);
      setDailyAttempts(attempts);
      setCanPlay(attempts < 2);
    }
  }, [today]);

  // 开始答题或进入下一题时启动计时器
  useEffect(() => {
    if (isGameOver || !canPlay) return;
    
    // 清除之前的计时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // 重置状态
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    // 启动新计时器
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          // 时间到，自动进入下一题
          handleNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // 组件卸载时清除计时器
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, isGameOver, canPlay]);

  // 处理答案选择
  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || isGameOver) return;
    
    setSelectedAnswer(answerIndex);
    
    // 检查答案是否正确
    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
      toast.success('回答正确！');
    } else {
      toast.error('回答错误');
    }
    
    // 显示解释
    setShowExplanation(true);
    
    // 短暂延迟后进入下一题
    setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  };

  // 进入下一题
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // 游戏结束
      finishQuiz();
    }
  };

  // 完成答题，计算结果
  const finishQuiz = () => {
    setIsGameOver(true);
    setQuizCompleted(true);
    
    // 判断是否闯关成功（答对8题及以上）
    if (score >= 8) {
      setQuizResult('success');
      // 增加积分
      const newPoints = userPoints + 5;
      setUserPoints(newPoints);
      localStorage.setItem('userPoints', newPoints.toString());
      toast.success('恭喜您闯关成功！获得5积分奖励！');
    } else {
      setQuizResult('failure');
      toast.error('很遗憾，闯关失败，请再接再厉！');
    }
    
    // 更新今日答题次数
    const newAttempts = dailyAttempts + 1;
    setDailyAttempts(newAttempts);
    localStorage.setItem(`quizAttempts_${today}`, newAttempts.toString());
    setCanPlay(newAttempts < 2);
  };

  // 重新开始游戏
  const restartQuiz = () => {
    if (!canPlay) {
      toast.warning('今日答题次数已用完，请明天再来！');
      return;
    }
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setQuizResult(null);
    setQuizCompleted(false);
  };

  // 获取当前题目
  const currentQuestion = questions[currentQuestionIndex];

  // 渲染倒计时指示器
  const renderTimer = () => {
    // 根据剩余时间计算颜色
    let timerColor = 'text-green-500';
    if (timeLeft <= 10) {
      timerColor = 'text-red-500';
    } else if (timeLeft <= 20) {
      timerColor = 'text-yellow-500';
    }
    
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-24 h-24">
          {/* 圆形进度条背景 */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          {/* 圆形进度条 */}
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#eab308' : '#10b981',
              borderRightColor: timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#eab308' : '#10b981',
              rotate: -90,
              transformOrigin: 'center'
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 - timeLeft / 30 }}
            transition={{ duration: 1, ease: "linear" }}
          />
          {/* 剩余时间 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${timerColor}`}>{timeLeft}</span>
            <span className={`ml-1 text-sm ${timerColor}`}>秒</span>
          </div>
        </div>
      </div>
    );
  };

  // 渲染题目和选项
  const renderQuestion = () => {
    return (
      <div className="space-y-6">
        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <h3 className="text-lg font-bold mb-2">
            第 {currentQuestionIndex + 1}/{questions.length} 题
          </h3>
          <div className="flex items-center mb-1">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQuestion.difficulty === 'easy' ? '简单' :
               currentQuestion.difficulty === 'medium' ? '中等' : '困难'}
            </span>
            <span className="ml-2 text-xs text-gray-500">{currentQuestion.category}</span>
          </div>
          <p className="text-xl font-medium mt-3">{currentQuestion.text}</p>
        </div>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            // 确定选项样式
            let optionClass = 'p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-md';
            let icon = null;
            
            if (selectedAnswer !== null) {
              if (index === selectedAnswer) {
                // 用户选择的答案
                if (index === currentQuestion.correctAnswer) {
                  // 用户选择正确
                  optionClass += ' bg-green-50 border-green-300 text-green-700';
                  icon = <CheckCircle size={20} className="text-green-500" />;
                } else {
                  // 用户选择错误
                  optionClass += ' bg-red-50 border-red-300 text-red-700';
                  icon = <XCircle size={20} className="text-red-500" />;
                }
              } else if (index === currentQuestion.correctAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                // 正确答案（当用户选错时显示）
                optionClass += ' bg-green-50 border-green-300 text-green-700';
                icon = <CheckCircle size={20} className="text-green-500" />;
              } else {
                // 未选择的选项
                optionClass += ' border-gray-200 opacity-70';
              }
            } else {
              // 未选择任何答案
              optionClass += ' border-gray-200';
            }
            
            return (
              <motion.div
                key={index}
                whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                className={optionClass}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span>{option}</span>
                  {icon && <div className="ml-auto">{icon}</div>}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* 显示答案解释 */}
        {showExplanation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-gray-50 border border-gray-200"
          >
            <div className="flex items-start">
              <Info size={18} className="text-blue-500 mr-2 mt-0.5" />
              <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // 渲染游戏结果
  const renderResult = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 p-6 rounded-2xl bg-white shadow-lg"
      >
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
          quizResult === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {quizResult === 'success' ? (
            <CheckCircle size={48} className="text-green-500" />
          ) : (
            <XCircle size={48} className="text-red-500" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">
          {quizResult === 'success' ? '恭喜您闯关成功！' : '很遗憾，闯关失败'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-blue-50">
            <p className="text-sm text-gray-600">答对题目</p>
            <p className="text-2xl font-bold">{score}/10</p>
          </div>
          <div className="p-3 rounded-lg bg-yellow-50">
            <p className="text-sm text-gray-600">获得积分</p>
            <p className="text-2xl font-bold">{quizResult === 'success' ? '5' : '0'}</p>
          </div>
        </div>
        
        <p className="mb-6">
          {quizResult === 'success' 
            ? '您已成功掌握了健康知识！继续保持，争取更好的成绩！' 
            : '不要灰心，继续学习健康知识，相信您下次一定能取得好成绩！'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={restartQuiz}
            disabled={!canPlay}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              canPlay 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canPlay ? '再玩一次' : '今日次数已用完'}
          </button>
          <Link to="/">
            <button className="px-6 py-3 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300">
              返回首页
            </button>
          </Link>
        </div>
      </motion.div>
    );
  };

  // 渲染开始游戏界面
  const renderStartScreen = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center justify-center bg-white rounded-full p-4 shadow-lg mb-6">
          <BookOpen size={40} className="text-blue-500" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">医疗卫生知识闯关</h2>
        
        <div className="p-6 rounded-2xl bg-white shadow-md mb-6 text-left">
          <h3 className="text-xl font-semibold mb-3">游戏规则</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ChevronRight size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
              <span>每次答题包含10道选择题</span>
            </li>
            <li className="flex items-start">
              <ChevronRight size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
              <span>每道题目限时30秒</span>
            </li>
            <li className="flex items-start">
              <ChevronRight size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
              <span>答对8题及以上视为闯关成功，获得5积分</span>
            </li>
            <li className="flex items-start">
              <ChevronRight size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
              <span>每位用户每日限答2次</span>
            </li>
          </ul>
        </div>
        
        <div className="flex justify-center items-center space-x-6 mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-2">
              <Award size={28} className="text-yellow-500" />
            </div>
            <p className="text-sm">我的积分</p>
            <p className="text-2xl font-bold">{userPoints}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-2">
              <Clock size={28} className="text-blue-500" />
            </div>
            <p className="text-sm">今日剩余次数</p>
            <p className="text-2xl font-bold">{2 - dailyAttempts}</p>
          </div>
        </div>
        
        <button 
          onClick={restartQuiz}
          disabled={!canPlay}
          className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
            canPlay 
              ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canPlay ? '开始答题' : '今日次数已用完'}
        </button>
        
        <Link to="/">
          <button className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center mx-auto">
            <Home size={16} className="mr-1" />
            返回首页
          </button>
        </Link>
      </motion.div>
    );
  };

  // 主题切换逻辑
  const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

  return (
    <div className={`min-h-screen p-4 md:p-8 flex flex-col ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-green-50 text-gray-800'
    }`}>
      <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <div className="flex items-center gap-2">
            <BookOpen size={24} className="text-blue-500" />
            <h1 className="text-2xl font-bold">医疗卫生知识闯关</h1>
          </div>
          <div className="text-sm flex items-center gap-1">
            <Award size={16} className="text-yellow-500" />
            <span>{userPoints}积分</span>
          </div>
        </div>
        
        {/* 答题进度 */}
        {!quizCompleted && canPlay && (
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-1">
              <span>进度</span>
              <span>{currentQuestionIndex + 1}/{questions.length} 题</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
        
        {/* 根据游戏状态渲染不同内容 */}
        <div className="flex-grow">
          {!canPlay && !quizCompleted && (
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-4">
                <Clock size={48} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">今日答题次数已用完</h2>
              <p className="mb-6">请明天再来挑战吧！</p>
              <Link to="/">
                <button className="px-6 py-3 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
                  返回首页
                </button>
              </Link>
            </div>
          )}
          
          {canPlay && !quizCompleted && !isGameOver && renderTimer()}
          {canPlay && !quizCompleted && !isGameOver && renderQuestion()}
          {isGameOver && renderResult()}
          {canPlay && quizCompleted && !isGameOver && renderStartScreen()}
          {canPlay && !quizCompleted && !isGameOver && (
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedAnswer !== null 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors duration-300`}
              >
                下一题
              </button>
            </div>
          )}
        </div>
        
        {/* 页脚 */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>© 2025 健康知识闯关 版权所有</p>
        </footer>
      </div>
    </div>
  );
};

export default QuizGame;