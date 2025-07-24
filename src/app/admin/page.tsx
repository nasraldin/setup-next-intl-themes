import Link from 'next/link';
import { getGlobalI18nConfig, createTranslationFunction } from '@/i18n/global-config';

/**
 * ADMIN PAGE - EXAMPLE OF GLOBAL I18N REUSE
 *
 * This page demonstrates how easy it is to create new routes
 * outside the [locale] structure with zero duplication
 */
export default async function AdminPage() {
  // Same global configuration - no custom logic needed!
  const { locale, messages } = await getGlobalI18nConfig();
  const t = createTranslationFunction(messages);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔧 Admin Panel Example
          </h1>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              This demonstrates how easy it is to create new routes using the global i18n configuration.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                ✅ Zero Configuration Duplication
              </h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Uses same global `locale` cookie</li>
                <li>• Same locale detection logic</li>
                <li>• Same translation loading</li>
                <li>• Just import and use getGlobalI18nConfig()</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Link
                href="/dashboard"
                className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  🚀 {t('Dashboard.title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Go to dashboard (same global config)
                </p>
              </Link>

              <Link
                href="/"
                className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  🏠 {t('Common.backToHome')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Back to main site
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              🔧 Admin rendered at: {new Date().toLocaleString(locale)} | Locale: {locale} | Route: /admin (global i18n)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
