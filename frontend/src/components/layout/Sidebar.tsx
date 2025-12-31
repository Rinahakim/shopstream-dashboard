'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { LanguageSwitcher } from '@/components/ui';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/orders', icon: ShoppingCart, labelKey: 'orders' },
  { href: '/products', icon: Package, labelKey: 'products' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'he';

  return (
    <aside className={cn(
      "fixed top-0 h-full w-64 bg-slate-900 text-white flex flex-col z-40",
      isRTL ? "right-0" : "left-0"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-indigo-400">Shop</span>Stream
        </h1>
        <p className="text-xs text-slate-400 mt-1">Analytics Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Language & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="flex justify-center">
          <LanguageSwitcher />
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{tCommon('logout')}</span>
        </button>
      </div>
    </aside>
  );
}

