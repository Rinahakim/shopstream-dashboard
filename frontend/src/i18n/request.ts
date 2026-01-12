import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from './locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale(); // get the current locale from the function getUserLocale - hebrew or english

  return {
    locale,
    messages: (await import(`./lng/${locale}.json`)).default, // the current locale messages file from the lng folder is imported
  };
});

