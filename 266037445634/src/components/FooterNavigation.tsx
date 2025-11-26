import { Link } from 'react-router-dom';
import { HeartPulse, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterNavigationProps {
  activeRoute: string;
}

export const FooterNavigation = ({ activeRoute }: FooterNavigationProps) => {
  const navItems = [
    {
      id: 'home',
      label: '首页',
      icon: HeartPulse, // 替换为医疗相关图标
      route: '/'
    },
    {
      id: 'profile',
      label: '我的',
      icon: User,
      route: '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.route;
          
          return (
            <Link
              key={item.id}
              to={item.route}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
                isActive ? 'bg-blue-50' : ''
              }`}
            >
              <Icon 
                size={24} 
                className={cn(
                  'mb-1', 
                  isActive ? 'text-blue-600' : 'text-gray-400'
                )} 
              />
              <span 
                className={cn(
                  'text-xs font-medium',
                  isActive ? 'text-blue-600' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};