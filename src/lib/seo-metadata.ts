import { getGlobalI18nConfig } from '@/i18n/global-config';
import { Metadata } from 'next';

// Locale-specific configurations
const localeConfigs = {
  'en-US': {
    titleTemplate: '%s | Your Company Name',
    defaultTitle: 'Your Company Name',
    description: 'Your English site description',
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

// SEO interface for metadata
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

// Generate metadata for Server Components
export async function generateSEO(props: SEOProps): Promise<Metadata> {
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

  const metadata: Metadata = {
    title: title ? `${title} | Your Company Name` : localeConfig.defaultTitle,
    description: description || localeConfig.description,
    robots: {
      index: !noindex,
      follow: !nofollow,
    },
    openGraph: {
      title: openGraph?.title || title || localeConfig.defaultTitle,
      description: openGraph?.description || description || localeConfig.description,
      type: (openGraph?.type || 'website') as 'website',
      locale: localeConfig.openGraph.locale,
      url: canonical || localeConfig.openGraph.url,
      siteName: localeConfig.openGraph.siteName,
      images: openGraph?.images || localeConfig.openGraph.images,
    },
    twitter: {
      card: (twitter?.cardType || 'summary_large_image') as 'summary_large_image',
      title: openGraph?.title || title || localeConfig.defaultTitle,
      description: openGraph?.description || description || localeConfig.description,
      creator: twitter?.handle,
      site: twitter?.site,
    },
    alternates: canonical ? {
      canonical: canonical,
    } : undefined,
  };

  return metadata;
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