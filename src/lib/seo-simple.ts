import React from 'react';
import { NextSeo } from 'next-seo';
import { getGlobalI18nConfig } from '@/i18n/global-config';

// Base SEO configuration
const baseConfig = {
  titleTemplate: '%s | Your Company Name',
  defaultTitle: 'Your Company Name',
  description: 'Your default site description',
  canonical: 'https://yourdomain.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Your Company Name',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Company Name',
      },
    ],
  },
  twitter: {
    handle: '@yourcompany',
    site: '@yourcompany',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

// Locale-specific configurations
const localeConfigs = {
  'en-US': {
    titleTemplate: '%s | Your Company Name',
    defaultTitle: 'Your Company Name',
    description: 'Your English site description',
    canonical: 'https://yourdomain.com',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://yourdomain.com',
      siteName: 'Your Company Name',
      images: [
        {
          url: 'https://yourdomain.com/og-image-en.jpg',
          width: 1200,
          height: 630,
          alt: 'Your Company Name',
        },
      ],
    },
  },
  'ar-AE': {
    titleTemplate: '%s | اسم شركتك',
    defaultTitle: 'اسم شركتك',
    description: 'وصف موقعك باللغة العربية',
    canonical: 'https://yourdomain.com/ar',
    openGraph: {
      type: 'website',
      locale: 'ar_AE',
      url: 'https://yourdomain.com/ar',
      siteName: 'اسم شركتك',
      images: [
        {
          url: 'https://yourdomain.com/og-image-ar.jpg',
          width: 1200,
          height: 630,
          alt: 'اسم شركتك',
        },
      ],
    },
  },
};

// SEO interface
export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    type?: string;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: string;
  };
}

// Main SEO component for Server Components
export async function SEO(props: SEOProps): Promise<React.JSX.Element> {
  const i18nConfig = await getGlobalI18nConfig();
  const localeConfig = localeConfigs[i18nConfig.locale as keyof typeof localeConfigs] || localeConfigs['en-US'];

  const {
    title,
    description,
    canonical,
    noindex = false,
    nofollow = false,
    openGraph,
    twitter,
  } = props;

  const seoProps = {
    ...baseConfig,
    ...localeConfig,
    title,
    description,
    canonical,
    noindex,
    nofollow,
    openGraph: {
      ...baseConfig.openGraph,
      ...localeConfig.openGraph,
      ...openGraph,
    },
    twitter: {
      ...baseConfig.twitter,
      ...twitter,
    },
  };

  return React.createElement(NextSeo, seoProps);
}

// SEO component for Client Components
export function ClientSEO(props: SEOProps & { locale?: string }): React.JSX.Element {
  const {
    title,
    description,
    canonical,
    noindex = false,
    nofollow = false,
    openGraph,
    twitter,
    locale = 'en-US',
  } = props;

  const localeConfig = localeConfigs[locale as keyof typeof localeConfigs] || localeConfigs['en-US'];

  const seoProps = {
    ...baseConfig,
    ...localeConfig,
    title,
    description,
    canonical,
    noindex,
    nofollow,
    openGraph: {
      ...baseConfig.openGraph,
      ...localeConfig.openGraph,
      ...openGraph,
    },
    twitter: {
      ...baseConfig.twitter,
      ...twitter,
    },
  };

  return React.createElement(NextSeo, seoProps);
}

// Predefined SEO configurations for common pages
export const pageConfigs = {
  home: {
    title: 'Home',
    description: 'Welcome to our website',
    openGraph: {
      type: 'website',
      title: 'Home',
      description: 'Welcome to our website',
    },
  },
  about: {
    title: 'About Us',
    description: 'Learn more about our company and mission',
    openGraph: {
      type: 'website',
      title: 'About Us',
      description: 'Learn more about our company and mission',
    },
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with our team',
    openGraph: {
      type: 'website',
      title: 'Contact Us',
      description: 'Get in touch with our team',
    },
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Admin dashboard',
    noindex: true,
    nofollow: true,
  },
} as const;

// Utility function to get SEO config for a specific page
export function getPageSEOConfig(page: keyof typeof pageConfigs, locale: string = 'en-US') {
  const config = pageConfigs[page];
  const localeConfig = localeConfigs[locale as keyof typeof localeConfigs] || localeConfigs['en-US'];
  
  return {
    ...config,
    titleTemplate: localeConfig.titleTemplate,
  };
}

// JSON-LD structured data utilities
export function generateOrganizationSchema(data: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...data,
  };
}

export function generateWebsiteSchema(data: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    ...data,
  };
}

export function generateWebPageSchema(data: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    ...data,
  };
} 