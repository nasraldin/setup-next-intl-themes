import Link from 'next/link';
import { getGlobalI18nConfig, createTranslationFunction } from '@/i18n/global-config';

// Get analytics data with global i18n configuration
async function getAnalyticsPageData() {
  // Use the global i18n configuration - same as dashboard and any future non-routing pages
  const config = await getGlobalI18nConfig();

  // Mock analytics data with simulated delay
  await new Promise(resolve => setTimeout(resolve, 150));

  const data = {
    'en-US': {
      pageViews: 45672,
      uniqueVisitors: 8934,
      bounceRate: '34.2%',
      avgSession: '2m 45s',
      topPages: [
        { page: '/home', views: 12453 },
        { page: '/about', views: 8901 },
        { page: '/contact', views: 5432 }
      ]
    },
    'ar-AE': {
      pageViews: 45672,
      uniqueVisitors: 8934,
      bounceRate: '34.2%',
      avgSession: '2د 45ث',
      topPages: [
        { page: '/الرئيسية', views: 12453 },
        { page: '/حول', views: 8901 },
        { page: '/اتصل-بنا', views: 5432 }
      ]
    }
  };

  return {
    ...config,
    analyticsData: data[config.locale as keyof typeof data] || data['en-US']
  };
}

/**
 * ANALYTICS PAGE - WITHOUT I18N ROUTING
 *
 * Demonstrates nested pages using the GLOBAL i18n configuration
 * without URL-based locale routing - same approach as dashboard
 */
export default async function AnalyticsPage() {
  const { locale, messages, analyticsData } = await getAnalyticsPageData();

  // Use the global translation function utility
  const t = createTranslationFunction(messages);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 {t('Analytics.title')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('Analytics.description')}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">👁️</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {t('Analytics.metrics.pageViews')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {analyticsData.pageViews.toLocaleString(locale)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {t('Analytics.metrics.uniqueVisitors')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {analyticsData.uniqueVisitors.toLocaleString(locale)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {t('Analytics.metrics.bounceRate')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {analyticsData.bounceRate}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {t('Analytics.metrics.avgSession')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {analyticsData.avgSession}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('Analytics.topPages.title')}
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-3">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-white">
                    {page.page}
                  </span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {page.views.toLocaleString(locale)} {t('Analytics.topPages.views')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            ← {t('Analytics.backToDashboard')}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            🏠 {t('Common.backToHome')}
          </Link>
        </div>

        {/* Server Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            📊 Analytics rendered at: {new Date().toLocaleString(locale)} | Locale: {locale} | Route: /dashboard/analytics (global i18n)
          </p>
        </div>
      </div>
    </div>
  );
}
