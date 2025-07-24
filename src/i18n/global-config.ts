import { cookies, headers } from 'next/headers';
import { routing } from './routing';

/**
 * GLOBAL I18N CONFIGURATION FOR NON-ROUTING PAGES
 *
 * This utility provides a consistent way to handle internationalization
 * for routes that don't use URL-based locale routing (like /dashboard, /admin, etc.)
 *
 * Features:
 * • Uses the same 'locale' cookie as the main site (no separate cookies)
 * • Follows the same locale detection priority as next-intl middleware
 * • Reusable across any route outside the [locale] structure
 * • Consistent with the main routing configuration
 */
export async function getGlobalI18nConfig() {
  const cookieStore = await cookies();
  const headersList = await headers();

  let locale = routing.defaultLocale; // Use the same default as main routing

  // Get cookie name (fallback to 'locale' if not configured)
  const cookieName = (routing.localeCookie && typeof routing.localeCookie === 'object' && 'name' in routing.localeCookie && routing.localeCookie.name)
    ? routing.localeCookie.name
    : 'locale';

  // 1. Check for user preference in the GLOBAL locale cookie (same as main site)
  const userLocale = cookieStore.get(cookieName)?.value;
  if (userLocale && routing.locales.includes(userLocale as typeof routing.locales[number])) {
    locale = userLocale as typeof routing.locales[number];
  } else {
    // 2. Check accept-language header (same logic as middleware)
    const acceptLanguage = headersList.get('accept-language');
    if (acceptLanguage) {
      // Use simple locale matching (could be enhanced with @formatjs/intl-localematcher)
      for (const supportedLocale of routing.locales) {
        if (acceptLanguage.includes(supportedLocale.split('-')[0])) {
          locale = supportedLocale;
          break;
        }
      }
    }
  }

  // Import messages dynamically
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    // Provide additional utilities
    isRTL: locale === 'ar-AE',
    direction: locale === 'ar-AE' ? 'rtl' : 'ltr',
    supportedLocales: routing.locales,
    defaultLocale: routing.defaultLocale,
    cookieName
  };
}

/**
 * MANUAL TRANSLATION UTILITY
 *
 * Creates a translation function for Server Components in non-routing pages
 * Since getTranslations() is tied to getRequestConfig, we need this manual approach
 */
export function createTranslationFunction(messages: Record<string, unknown>) {
  return (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return (value as string) || key;
  };
}

/**
 * TYPE DEFINITIONS
 */
export type GlobalI18nConfig = Awaited<ReturnType<typeof getGlobalI18nConfig>>;
export type TranslationFunction = ReturnType<typeof createTranslationFunction>;
