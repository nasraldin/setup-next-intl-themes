'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const t = useTranslations('Common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Navigate to the same page in the new locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{t('language')}:</span>
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        aria-label={t('switchLanguage')}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'en-US' ? t('english') : t('arabic')}
          </option>
        ))}
      </select>
    </div>
  );
}
