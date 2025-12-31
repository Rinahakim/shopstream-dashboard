import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string, locale: string = 'en'): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    he: 'he-IL',
  };
  return new Intl.DateTimeFormat(localeMap[locale] || 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function formatShortDate(dateString: string, locale: string = 'en'): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    he: 'he-IL',
  };
  return new Intl.DateTimeFormat(localeMap[locale] || 'en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

