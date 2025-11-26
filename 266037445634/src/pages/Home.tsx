import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Award, Gift, CheckCircle, HeartPulse, Activity, Shield, User, FileText, Stethoscope, Pill, Syringe, ThermometerSun, Heart } from "lucide-react";
import { FooterNavigation } from "../components/FooterNavigation";
import { toast } from 'sonner';

// 健康知识主题数据
const healthTopics = [
  { title: "传染病预防", icon: Shield, color: "bg-red-100 text-red-600" },
  { title: "慢性病管理", icon: Activity, color: "bg-blue-100 text-blue-600" },
  { title: "合理用药", icon: Pill, color: "bg-green-100 text-green-600" },
  { title: "急救知识", icon: HeartPulse, color: "bg-orange-100 text-orange-600" },
  { title: "健康生活方式", icon: ThermometerSun, color: "bg-yellow-100 text-yellow-600" },
  { title: "儿童健康", icon: User, color: "bg-purple-100 text-purple-600" },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8 pb-20">
            {/* 装饰性医疗元素 */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <motion.div 
                    className="absolute top-20 right-10 text-blue-100 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                    <Stethoscope size={180} />
                </motion.div>
                <motion.div 
                    className="absolute bottom-40 left-10 text-green-100 opacity-20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                >
                    <Heart size={150} />
                </motion.div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center pt-10 relative z-10">
                {/* 页面头部 */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8
                    }}
                    className="mb-12">
                    <div
                        className="inline-flex items-center justify-center bg-white rounded-full p-3 shadow-lg mb-4 border-2 border-blue-100">
                        <HeartPulse size={40} className="text-red-500" />
                    </div>
                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">闯关答题，健康知识小百科</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">健康存折，你也来试试</p>
                </motion.div>

                {/* 核心功能卡片 */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.6,
                        staggerChildren: 0.2
                    }}>
                    {[{
                        icon: BookOpen,
                        title: "答题闯关",
                        desc: "分级关卡，多种题型",
                        color: "bg-blue-100 text-blue-600",
                        borderColor: "border-blue-200"
                    }, {
                        icon: Gift,
                        title: "礼品兑换",
                        desc: "丰富礼品，轻松兑换",
                        color: "bg-green-100 text-green-600",
                        borderColor: "border-green-200"
                    }, {
                        icon: CheckCircle,
                        title: "线下核销",
                        desc: "便捷验证，无忧使用",
                        color: "bg-purple-100 text-purple-600",
                        borderColor: "border-purple-200"
                    }].map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)"
                                }}
                                className={`bg-white rounded-xl p-6 shadow-md border ${feature.borderColor} hover:border-opacity-100 transition-all duration-300`}>
                                 <div className="flex justify-center mb-4">
                                    {feature.title === "礼品兑换" ? (
                                        <Link to="/gift-center">
                                            <div className={`${feature.color} p-3 rounded-full shadow-inner cursor-pointer transition-transform duration-300 hover:scale-110`}>
                                                <Icon size={24} />
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link to="/voucher">
                                            <div className={`${feature.color} p-3 rounded-full shadow-inner cursor-pointer transition-transform duration-300 hover:scale-110`}>
                                                <Icon size={24} />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* 健康知识主题区 */}
                <motion.section 
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
                        <FileText size={24} className="text-blue-500" />
                        健康知识主题
                    </h2>
                     <div className="flex flex-wrap justify-center gap-4">
                        {healthTopics.map((topic, index) => {
                            const Icon = topic.icon;
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-md border border-gray-100 cursor-pointer transition-all duration-300 hover:border-blue-200"
                                    onClick={() => toast('功能正在开发中，敬请等待')}
                                >
                                    <div className={`${topic.color} p-1.5 rounded-full`}>
                                        <Icon size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{topic.title}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>


            </div>

            {/* 底部导航 */}
            <FooterNavigation activeRoute="/" />
        </div>
    );
}