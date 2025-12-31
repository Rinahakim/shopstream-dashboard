'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { LoginForm } from '@/components/forms';
import { useAuth } from '@/context/AuthContext';
import { LanguageSwitcher } from '@/components/ui';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const t = useTranslations('auth');
  const locale = useLocale();
  const isRTL = locale === 'he';

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen flex", isRTL && "flex-row-reverse")}>
      {/* Branding Side */}
      <div className={cn(
        "hidden lg:flex lg:w-1/2 p-12 flex-col justify-between",
        isRTL 
          ? "bg-gradient-to-bl from-indigo-600 via-indigo-700 to-purple-800" 
          : "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800"
      )}>
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ShopStream</span>
          </div>
        </div>
        
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('branding_title')}
          </h2>
          <p className="text-indigo-200 text-lg">
            {t('branding_subtitle')}
          </p>
        </div>

        <div className="text-indigo-300 text-sm">
          {t('copyright')}
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900">ShopStream</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{t('login_title')}</h1>
            <p className="text-slate-500 mt-2">{t('login_subtitle')}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-slate-400 mt-6">
            {t('demo_credentials')}
          </p>

          <div className="flex justify-center mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

