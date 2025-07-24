import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en-US', 'ar-AE'],

  // Used when no locale matches
  defaultLocale: 'en-US',
  localePrefix: 'as-needed',
  localeDetection: true,
  localeCookie: {
    name: 'locale',
  }
});
