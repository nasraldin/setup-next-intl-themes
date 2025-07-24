import React from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navigation from "@/components/Navigation";

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
