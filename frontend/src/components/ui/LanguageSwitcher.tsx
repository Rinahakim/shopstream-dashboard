'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { setUserLocale } from '@/i18n/locale';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'he', label: 'עב' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: 'en' | 'he') => {
    startTransition(() => {
      setUserLocale(newLocale);
    });
  };

  return (
    <div className={cn(
      'flex items-center gap-1 bg-slate-100 rounded-lg p-1',
      isPending && 'opacity-50 pointer-events-none'
    )}>
      <Globe className="w-4 h-4 text-slate-500 mx-1" />
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded-md transition-all',
            locale === lang.code
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

