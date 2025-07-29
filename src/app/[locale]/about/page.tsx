import React from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navigation from "@/components/Navigation";
import { generateSEO } from "@/lib/seo-metadata";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
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
    title: seoT('SEO.about.title'),
    description: seoT('SEO.about.description'),
    openGraph: {
      title: seoT('SEO.about.ogTitle'),
      description: seoT('SEO.about.ogDescription'),
      type: 'website',
    },
  });
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  setRequestLocale(locale);

  const t = useTranslations("AboutPage");

  return (
    <div className="min-h-screen p-8">
        <Navigation />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>

          <div className="prose dark:prose-invert">
            <p className="text-lg mb-4">
              This is a demonstration of Next.js 15 with next-intl v4
              internationalization.
            </p>

            <p className="text-lg mb-4">Features implemented:</p>

            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>🌐 Support for en-US and ar-AE locales</li>
              <li>🎯 Automatic locale detection</li>
              <li>📱 RTL support for Arabic</li>
              <li>🔗 Localized routing</li>
              <li>⚡ Static generation with generateStaticParams</li>
              <li>🎨 Language switcher component</li>
              <li>🛡️ TypeScript support</li>
            </ul>

            <div className="mt-8">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline"
              >
                ← Back to Home
              </Link>
            </div>
                  </div>
      </div>
    </div>
  );
}
