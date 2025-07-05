'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, TrendingUp, Home } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Device Management', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-xl font-bold text-gray-900">IoT Gateway</span>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}