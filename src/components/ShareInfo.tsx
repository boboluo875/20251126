import { useState } from 'react';
import { Share2, Download, Info, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export const ShareInfo: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    // 模拟复制网站链接
    toast.success('链接已复制到剪贴板');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownloadCode = () => {
    toast.info('代码下载功能开发中');
  };
  
  return (
    <div className="fixed bottom-20 right-6 z-50">
      <button
        className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
        onClick={handleCopyLink}
        title="分享网站"
      >
        <Share2 size={24} />
      </button>
      
      {/* 分享提示框 */}
      <div className="absolute bottom-full right-0 mb-4 w-64 bg-white rounded-xl shadow-xl p-4 border border-gray-100 opacity-0 invisible transition-all duration-300 hover:opacity-100 hover:visible group">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-gray-800">分享网站</h4>
          <button className="text-gray-400 hover:text-gray-600">
            <Info size={16} />
          </button>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">
            要分享此网站让他人预览，建议：
          </p>
          <ul className="text-xs text-gray-600 space-y-1 ml-5 list-disc">
            <li>下载网站源代码</li>
            <li>部署到第三方托管平台</li>
            <li>分享部署后的链接</li>
          </ul>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="flex-1 py-2 px-3 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center gap-1"
            onClick={handleCopyLink}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            复制链接
          </button>
          <button 
            className="flex-1 py-2 px-3 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-1"
            onClick={handleDownloadCode}
          >
            <Download size={14} />
            下载代码
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          <p className="flex items-center gap-1">
            <ExternalLink size={12} />
            推荐托管平台：Vercel、Netlify、GitHub Pages
          </p>
        </div>
        
        {/* 指向按钮的小三角 */}
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
      </div>
    </div>
  );
};