'use client';

import { useTranslations } from 'next-intl';

interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  revenue: string;
  growth: string;
}

interface DashboardStatsProps {
  data: DashboardData;
}

/**
 * CLIENT COMPONENT - Dashboard Stats
 *
 * Demonstrates useTranslations() in a client component
 * within the "without i18n routing" setup
 */
export default function DashboardStats({ data }: DashboardStatsProps) {
  const t = useTranslations('Dashboard.stats');

  const stats = [
    {
      name: t('users'),
      value: data.totalUsers.toLocaleString(),
      icon: '👥',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: t('orders'),
      value: data.totalOrders.toLocaleString(),
      icon: '📦',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      name: t('revenue'),
      value: data.revenue,
      icon: '💰',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      name: t('growth'),
      value: data.growth,
      icon: '📈',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl" role="img" aria-label={stat.name}>
                  {stat.icon}
                </span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className={`text-lg font-medium ${stat.color}`}>
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
