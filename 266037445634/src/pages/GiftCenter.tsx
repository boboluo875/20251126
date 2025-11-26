import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, HeartPulse, Home, CheckCircle, Info, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// 定义礼品类型
interface GiftItem {
  id: number;
  name: string;
  points: number;
  description: string;
  image: string;
  category: 'service' | 'product';
}

const GiftCenter: React.FC = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // 礼品数据
  const giftData: GiftItem[] = [
    {
      id: 1,
      name: '三伏灸',
      points: 200,
      description: '传统中医疗法，适合夏季养生调理',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Traditional%20Chinese%20medicine%20moxibustion%20treatment&sign=995f0c0b5c24640633c5e68c59bca216',
      category: 'service'
    },
    {
      id: 2,
      name: '肝胆胰脾彩超检查',
      points: 300,
      description: '全面检查肝胆胰脾健康状况',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Abdominal%20ultrasound%20scan%20medical%20examination&sign=348a2e5db26804d3a883328626317346',
      category: 'service'
    },
    {
      id: 3,
      name: '超声洗牙',
      points: 300,
      description: '专业超声波洗牙，清洁口腔健康',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Dental%20ultrasonic%20scaling%20treatment&sign=80672b2f75922de7dfc018cf6dba339c',
      category: 'service'
    },
    {
      id: 4,
      name: '肥皂',
      points: 30,
      description: '天然成分肥皂，温和清洁',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Natural%20soap%20bar%20cleaning%20product&sign=c5e9df308865bd09fe6393929faf0027',
      category: 'product'
    },
    {
      id: 5,
      name: '抽纸',
      points: 20,
      description: '柔软亲肤抽纸，家庭必备',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Soft%20facial%20tissue%20box&sign=ad231992a46aa936d843f588dea02eb3',
      category: 'product'
    },
    {
      id: 6,
      name: '窝沟封闭',
      points: 300,
      description: '儿童牙齿防龋保护',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Dental%20sealant%20treatment%20for%20children&sign=4d770dae353ad3b30b26c951cc10f7aa',
      category: 'service'
    }
  ];

  // 加载用户积分
  useEffect(() => {
    const storedPoints = localStorage.getItem('userPoints');
    if (storedPoints) {
      setUserPoints(parseInt(storedPoints));
    }
    setGifts(giftData);
  }, []);

  // 处理礼品兑换
  const handleExchange = (gift: GiftItem) => {
    if (userPoints < gift.points) {
      toast.error('积分不足，无法兑换该礼品');
      return;
    }

    // 扣除积分
    const newPoints = userPoints - gift.points;
    setUserPoints(newPoints);
    localStorage.setItem('userPoints', newPoints.toString());

    // 保存兑换记录
    const voucherData = {
      id: Date.now(),
      giftId: gift.id,
      giftName: gift.name,
      exchangeTime: new Date().toISOString(),
      status: 'pending' as const,
      qrCode: `QRCODE_${Date.now()}_${gift.id}` // 模拟生成的二维码标识
    };

    // 获取已有兑换记录
    const existingVouchers = JSON.parse(localStorage.getItem('vouchers') || '[]');
    existingVouchers.push(voucherData);
    localStorage.setItem('vouchers', JSON.stringify(existingVouchers));

    setSelectedGift(gift);
    setShowSuccessModal(true);
    
    toast.success(`成功兑换${gift.name}！`);
  };

  // 关闭成功弹窗
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      {/* 页面标题 */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 mt-4">
          <div className="flex items-center gap-2">
            <Gift size={24} className="text-blue-500" />
            <h1 className="text-2xl font-bold">积分商城</h1>
          </div>
          <div className="text-sm flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <Award size={16} className="text-yellow-500" />
            <span className="font-medium">{userPoints}积分</span>
          </div>
        </div>

        {/* 积分说明 */}
        <motion.div 
          className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Info size={20} className="text-blue-500 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            参与答题闯关获取积分，使用积分兑换健康礼品。兑换成功后，可在"我的兑换"页面查看核销二维码。
          </p>
        </motion.div>

        {/* 礼品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={gift.image} 
                  alt={gift.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{gift.name}</h3>
                  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Award size={14} />
                    {gift.points}积分
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{gift.description}</p>
                <button
                  onClick={() => handleExchange(gift)}
                  disabled={userPoints < gift.points}
                  className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    userPoints >= gift.points
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={16} />
                  {userPoints >= gift.points ? '立即兑换' : '积分不足'}

               
</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 返回首页按钮 */}
        <div className="text-center mt-8">
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
              <Home size={18} />
              返回首页
            </button>
          </Link>
        </div>
      </div>

      {/* 兑换成功弹窗 */}
      {showSuccessModal && selectedGift && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">兑换成功！</h3>
              <p className="text-gray-600 mb-6">
                您已成功兑换{selectedGift.name}，消耗{selectedGift.points}积分
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={closeSuccessModal}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                >
                  关闭
                </button>
                <Link to="/voucher">
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                    查看核销码
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GiftCenter;