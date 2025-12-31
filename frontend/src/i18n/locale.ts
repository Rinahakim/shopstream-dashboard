'use server';

import { cookies } from 'next/headers';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export async function getUserLocale(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(LOCALE_COOKIE)?.value || 'en';
}

export async function setUserLocale(locale: 'en' | 'he'): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

