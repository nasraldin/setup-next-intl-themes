import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import { Link } from '@/i18n/navigation';
import { submitContactForm } from './actions';
import { generateSEO } from '@/lib/seo-metadata';

/**
 * SERVER-SIDE CONTACT PAGE DEMONSTRATION
 *
 * This page demonstrates advanced server-side features with next-intl v4:
 *
 * 🎯 Server Component Features:
 * • Uses `getTranslations()` instead of `useTranslations()` (async server-side)
 * • Implements `generateMetadata()` for SEO with translations
 * • Server Actions for form handling
 * • Server-side data fetching simulation
 * • Static rendering with `setRequestLocale()`
 * • Proper locale validation and 404 handling
 *
 * 🌐 Internationalization Features:
 * • Multiple translation namespaces ('ContactPage', 'Common')
 * • Locale-specific server-side data
 * • RTL/LTR aware content
 * • Server-rendered timestamps in correct locale format
 *
 * ⚡ Performance Features:
 * • Static generation support
 * • Server-side rendering for SEO
 * • No client-side JavaScript for core functionality
 * • Automatic locale-based redirects
 */

// Mock async server-side data fetching
async function getContactInfo(locale: string) {
  // Simulate async server-side data fetching
  await new Promise(resolve => setTimeout(resolve, 100));

  const contactData = {
    'en-US': {
      office: 'Dubai Office',
      address: '123 Business Bay, Dubai, UAE',
      phone: '+971 4 123 4567',
      email: 'contact@example.com',
      hours: 'Sunday - Thursday: 9:00 AM - 6:00 PM'
    },
    'ar-AE': {
      office: 'مكتب دبي',
      address: '123 خليج الأعمال، دبي، الإمارات العربية المتحدة',
      phone: '+971 4 123 4567',
      email: 'contact@example.com',
      hours: 'الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً'
    }
  };

  return contactData[locale as keyof typeof contactData] || contactData['en-US'];
}

// Generate metadata for this page
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Import messages dynamically
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seoT = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return (value as string) || key;
  };

  return generateSEO({
    title: seoT('SEO.contact.title'),
    description: seoT('SEO.contact.description'),
    openGraph: {
      title: seoT('SEO.contact.ogTitle'),
      description: seoT('SEO.contact.ogDescription'),
      type: 'website',
    },
  });
}

// This is a Server Component - it runs on the server
export default async function ContactPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const { success } = await searchParams;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Server-side translations - note we use getTranslations (async) instead of useTranslations
  const t = await getTranslations('ContactPage');
  const commonT = await getTranslations('Common');

  // Fetch server-side data
  const contactInfo = await getContactInfo(locale);

  // Create bound server action
  const boundSubmitAction = submitContactForm.bind(null, locale);

  // Server component JSX
  return (
    <div className="min-h-screen p-8">
      <Navigation />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          {t('title')}
        </h1>

        {/* Success message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            ✅ {t('successMessage')}
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-8">
            {t('description')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {t('contactInfo')}
              </h2>

              <div className="space-y-3">
                <div>
                  <strong>{t('office')}:</strong>
                  <br />
                  {contactInfo.office}
                </div>

                <div>
                  <strong>{t('address')}:</strong>
                  <br />
                  {contactInfo.address}
                </div>

                <div>
                  <strong>{t('phone')}:</strong>
                  <br />
                  <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>

                <div>
                  <strong>{t('email')}:</strong>
                  <br />
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
                    {contactInfo.email}
                  </a>
                </div>

                <div>
                  <strong>{t('hours')}:</strong>
                  <br />
                  {contactInfo.hours}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {t('sendMessage')}
              </h2>

              <form action={boundSubmitAction} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t('submit')}
                </button>
              </form>
            </div>
          </div>

          {/* Server-rendered timestamp */}
          <div className="text-sm text-gray-600 dark:text-gray-400 border-t pt-4">
            <strong>{t('serverRendered')}:</strong> {new Date().toLocaleString(locale)}
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline"
            >
              ← {commonT('backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
