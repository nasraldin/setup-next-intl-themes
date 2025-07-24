import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import { getGlobalI18nConfig } from '@/i18n/global-config';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin panel with global i18n configuration',
};

/**
 * ADMIN LAYOUT - EXAMPLE OF REUSING GLOBAL I18N CONFIG + THEMES
 *
 * This demonstrates how easy it is to create any new route
 * outside the [locale] structure using the global configuration:
 *
 * • Same global 'locale' cookie as main site and dashboard
 * • Same locale detection logic as the rest of the app
 * • No duplicate configuration needed
 * • Just import and use getGlobalI18nConfig()
 * • Perfect dark mode with next-themes
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Reuse the exact same global configuration - no duplication!
  const { locale, messages, direction } = await getGlobalI18nConfig();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen">
              <header className="bg-red-600 dark:bg-red-800 shadow transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center">
                      <h1 className="text-xl font-semibold text-white">
                        🔧 Admin Panel
                      </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </header>
              <main>{children}</main>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
