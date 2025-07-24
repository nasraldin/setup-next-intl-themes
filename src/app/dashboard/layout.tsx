import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import { getGlobalI18nConfig } from '@/i18n/global-config';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LocaleSwitcher from './components/LocaleSwitcher';

export const metadata: Metadata = {
  title: 'Dashboard - Admin Panel',
  description: 'Admin dashboard with internationalization',
};

/**
 * DASHBOARD LAYOUT - WITHOUT I18N ROUTING + THEMES
 *
 * This layout demonstrates next-intl + next-themes setup without URL-based routing using
 * the GLOBAL i18n configuration that can be reused across any non-routing pages.
 *
 * Features:
 * • Uses the same 'locale' cookie as the main site (unified locale management)
 * • Reusable global configuration (can be used for /admin, /settings, etc.)
 * • Consistent with main routing configuration
 * • No duplicate cookie management
 * • Perfect dark mode with next-themes
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the global i18n configuration - reusable for any non-routing page
  const { locale, messages, direction } = await getGlobalI18nConfig();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen">
              {/* Dashboard-specific header */}
              <header className="bg-white dark:bg-gray-800 shadow transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center">
                      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        🚀 Dashboard
                      </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <LocaleSwitcher />
                      <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </header>

              {/* Main content */}
              <main>{children}</main>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
