import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Info, Calendar, Clock, Award, Gift, Scan, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// 定义核销凭证类型
interface VoucherType {
  id: number;
  giftId: number;
  giftName: string;
  exchangeTime: string;
  status: 'pending' | 'used' | 'expired';
  qrCode: string;
}

const Voucher: React.FC = () => {
  const [vouchers, setVouchers] = useState<VoucherType[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'used'>('pending');
  
  // 模拟礼品数据，用于获取礼品图标
  const giftIcons: Record<string, React.ElementType> = {
    '三伏灸': Scan,
    '肝胆胰脾彩超检查': Scan,
    '超声洗牙': Scan,
    '肥皂': Scan,
    '抽纸': Scan,
    '窝沟封闭': Scan
  };

  // 加载用户兑换记录
  useEffect(() => {
    const storedVouchers = localStorage.getItem('vouchers');
    if (storedVouchers) {
      const parsedVouchers = JSON.parse(storedVouchers) as VoucherType[];
      // 按兑换时间倒序排列
      parsedVouchers.sort((a, b) => 
        new Date(b.exchangeTime).getTime() - new Date(a.exchangeTime).getTime()
      );
      setVouchers(parsedVouchers);
    }
  }, []);

  // 获取过滤后的凭证
  const filteredVouchers = vouchers.filter(voucher => 
    activeTab === 'pending' ? voucher.status === 'pending' : voucher.status === 'used'
  );

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 获取状态对应的样式和文本
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: '待核销', className: 'bg-blue-100 text-blue-800' };
      case 'used':
        return { text: '已使用', className: 'bg-green-100 text-green-800' };
      case 'expired':
        return { text: '已过期', className: 'bg-gray-100 text-gray-800' };
      default:
        return { text: '未知状态', className: 'bg-gray-100 text-gray-800' };
    }
  };

  // 生成模拟二维码（实际项目中应该使用真实的二维码生成库）
  const renderQrCode = (qrCodeId: string) => {
    return (
      <div className="w-48 h-48 bg-white border-2 border-gray-200 flex items-center justify-center mx-auto mb-4">
        <div className="w-40 h-40 bg-gray-100 relative">
          {/* 模拟二维码图案 */}
          <div className="absolute top-3 left-3 w-8 h-8 bg-black"></div>
          <div className="absolute top-3 right-3 w-8 h-8 bg-black"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 bg-black"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-black"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
            {qrCodeId}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      {/* 页面标题 */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8 mt-4">
          <CheckCircle size={24} className="text-blue-500" />
          <h1 className="text-2xl font-bold">我的兑换</h1>
        </div>

        {/* 兑换说明 */}
        <motion.div 
          className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Info size={20} className="text-blue-500 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            线下核销时，请向工作人员出示核销二维码，工作人员扫码确认后即可完成兑换。
          </p>
        </motion.div>

        {/* 标签页 */}
        <div className="flex bg-white rounded-xl p-1 mb-8 shadow-sm">
          <button
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'pending' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            待核销 ({vouchers.filter(v => v.status === 'pending').length})
          </button>
          <button
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'used' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('used')}
          >
            已使用 ({vouchers.filter(v => v.status === 'used').length})
          </button>
        </div>

        {/* 凭证列表 */}
        {filteredVouchers.length > 0 ? (
          <div className="space-y-6 mb-12">
            {filteredVouchers.map((voucher) => {
              const GiftIcon = giftIcons[voucher.giftName] || Scan;
              const statusInfo = getStatusInfo(voucher.status);
              
              return (
                <motion.div
                  key={voucher.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <GiftIcon size={20} className="text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold">{voucher.giftName}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                        {statusInfo.text}
                      </span>
                    </div>

                    {/* 显示二维码（仅对待核销的凭证） */}
                    {voucher.status === 'pending' && (
                      <div className="border-t border-gray-100 pt-5 pb-2">
                        <div className="text-center mb-3">
                          <p className="text-sm text-gray-500 mb-2">核销二维码</p>
                          {renderQrCode(voucher.qrCode)}
                          <p className="text-xs text-gray-400">请向工作人员出示此二维码</p>
                        </div>
                      </div>
                    )}

                    {/* 兑换信息 */}
                    <div className="border-t border-gray-100 pt-4 mt-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar size={14} />
                          <span>兑换时间</span>
                        </div>
                        <span className="font-medium">{formatDate(voucher.exchangeTime)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-10 text-center shadow-md border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
              <AlertCircle size={32} className="text-blue-300" />
            </div>
            <h3 className="text-lg font-bold mb-2">{activeTab === 'pending' ? '暂无待核销的礼品' : '暂无已使用的礼品'}</h3>
            <p className="text-gray-500 mb-6">去积分商城兑换心仪的礼品吧！</p>
            <Link to="/gift-center">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                <Gift size={16} />
                前往积分商城
              </button>
            </Link>
          </div>
        )}

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
    </div>
  );
};

export default Voucher;