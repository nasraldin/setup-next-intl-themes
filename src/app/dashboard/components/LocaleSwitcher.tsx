'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

/**
 * GLOBAL LOCALE SWITCHER - CLIENT COMPONENT
 *
 * Uses the GLOBAL 'locale' cookie (same as main site) instead of route-specific cookies
 * This ensures consistent locale management across the entire application
 */
export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('Common');
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    // Use the GLOBAL locale cookie (same as main site) - no more separate cookies!
    // This ensures consistency across the entire application
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=lax`; // 30 days

    // Refresh the page to apply new locale
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('language')}:
      </span>
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        aria-label={t('switchLanguage')}
      >
        <option value="en-US">{t('english')}</option>
        <option value="ar-AE">{t('arabic')}</option>
      </select>

      <span className="text-xs text-gray-500 dark:text-gray-400">
        (Global cookie)
      </span>
    </div>
  );
}
