'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { Sidebar } from '@/components/layout';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale(); // get the current locale from cookie - hebrew or english
  const isRTL = locale === 'he';

  useEffect(() => { // if the user is not authenticated, redirect to the login page
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]); // all this variables are dependencies for the useEffect hook

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className={isRTL ? "mr-64 p-8" : "ml-64 p-8"}>
        {children}
      </main>
    </div>
  );
}

