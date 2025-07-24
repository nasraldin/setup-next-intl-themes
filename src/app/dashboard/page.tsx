import DashboardStats from './components/DashboardStats';
import LocaleSwitcher from './components/LocaleSwitcher';
import Link from 'next/link';
import { getGlobalI18nConfig, createTranslationFunction } from '@/i18n/global-config';

// Get dashboard data with global i18n configuration
async function getDashboardData() {
  // Use the global i18n configuration - reusable across any non-routing page
  const config = await getGlobalI18nConfig();

  // Mock server-side data
  const data = {
    'en-US': {
      totalUsers: 1234,
      totalOrders: 567,
      revenue: '$12,345',
      growth: '+12.5%'
    },
    'ar-AE': {
      totalUsers: 1234,
      totalOrders: 567,
      revenue: '12,345 د.إ',
      growth: '+12.5%'
    }
  };

  return {
    ...config,
    dashboardData: data[config.locale as keyof typeof data] || data['en-US'],
    userLocaleSource: 'global-cookie' // Now using global cookie system
  };
}

/**
 * DASHBOARD HOME PAGE - SERVER COMPONENT
 *
 * Demonstrates next-intl without URL-based routing using GLOBAL configuration:
 * • Uses the global getGlobalI18nConfig() utility (reusable)
 * • Uses the same 'locale' cookie as main site (unified)
 * • Can be replicated for /admin, /settings, etc. easily
 * • No duplicate configuration needed
 */
export default async function DashboardPage() {
  const { locale, messages, dashboardData, userLocaleSource } = await getDashboardData();

  // Use the global translation function utility
  const t = createTranslationFunction(messages);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('Dashboard.title')}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('Dashboard.welcome')}
            </p>
          </div>

          {/* Global Locale Switcher */}
          <LocaleSwitcher />
        </div>

        {/* Locale Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🌐 {t('Dashboard.localeInfo.title')}
          </h2>
          <div className="space-y-1 text-sm text-blue-700 dark:text-blue-200">
            <p><strong>{t('Dashboard.localeInfo.current')}:</strong> {locale}</p>
            <p><strong>{t('Dashboard.localeInfo.source')}:</strong> {userLocaleSource}</p>
            <p><strong>{t('Dashboard.localeInfo.direction')}:</strong> {locale === 'ar-AE' ? 'RTL' : 'LTR'}</p>
            <p><strong>Cookie:</strong> global `locale` cookie (shared with main site)</p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats data={dashboardData} />

        {/* Feature Comparison */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('Dashboard.comparison.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-green-700 dark:text-green-400">
                ✅ {t('Dashboard.comparison.withoutRouting')}
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• {t('Dashboard.comparison.features.userSettings')}</li>
                <li>• {t('Dashboard.comparison.features.singleUrl')}</li>
                <li>• {t('Dashboard.comparison.features.adminPanel')}</li>
                <li>• {t('Dashboard.comparison.features.cookieBased')}</li>
                <li>• <strong>Global configuration reusable for /admin, /settings, etc.</strong></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-blue-700 dark:text-blue-400">
                🌐 {t('Dashboard.comparison.withRouting')}
                <span className="text-xs text-gray-500">({t('Dashboard.comparison.mainSite')})</span>
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• {t('Dashboard.comparison.features.seoFriendly')}</li>
                <li>• {t('Dashboard.comparison.features.urlBased')}</li>
                <li>• {t('Dashboard.comparison.features.staticGeneration')}</li>
                <li>• {t('Dashboard.comparison.features.autoDetection')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('Dashboard.navigation.title')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/dashboard/analytics"
              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                📊 {t('Dashboard.navigation.analytics')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('Dashboard.navigation.analyticsDesc')}
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
                {t('Dashboard.navigation.mainSiteDesc')}
              </p>
            </Link>
          </div>
        </div>

        {/* Server Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            🚀 {t('Dashboard.serverRendered')}: {new Date().toLocaleString(locale)}
            | Locale: {locale} | Route: /dashboard (global i18n config)
          </p>
        </div>
      </div>
    </div>
  );
}
