# SEO Implementation Guide

This document explains the SEO implementation using `next-seo` library with i18n support for English and Arabic.

## Overview

The SEO implementation is designed to be:
- **Centralized**: Single file manages all SEO configurations
- **i18n-aware**: Automatically handles English and Arabic locales
- **Type-safe**: Full TypeScript support
- **Replaceable**: Easy to swap with other SEO libraries
- **Server/Client compatible**: Works with both Server and Client Components

## File Structure

```
src/lib/
└── seo-simple.ts          # Main SEO implementation

src/app/[locale]/
├── page.tsx               # Home page with SEO
├── about/
│   └── page.tsx          # About page with SEO
└── contact/
    └── page.tsx          # Contact page with SEO
```

## Core Components

### 1. SEO Component (Server Components)

```typescript
import { SEO } from '@/lib/seo-simple';

export default async function MyPage() {
  return (
    <>
      <SEO 
        title="Page Title"
        description="Page description"
        openGraph={{
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://yourdomain.com/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Image alt text",
            },
          ],
        }}
      />
      {/* Your page content */}
    </>
  );
}
```

### 2. ClientSEO Component (Client Components)

```typescript
import { ClientSEO } from '@/lib/seo-simple';

export default function MyClientComponent() {
  return (
    <>
      <ClientSEO 
        title="Page Title"
        description="Page description"
        locale="en-US" // Optional, defaults to 'en-US'
      />
      {/* Your component content */}
    </>
  );
}
```

## Configuration

### Base Configuration

The base configuration is defined in `src/lib/seo-simple.ts`:

```typescript
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
  // ... additional meta tags and link tags
};
```

### Locale-Specific Configuration

```typescript
const localeConfigs = {
  'en-US': {
    titleTemplate: '%s | Your Company Name',
    defaultTitle: 'Your Company Name',
    description: 'Your English site description',
    // ... English-specific config
  },
  'ar-AE': {
    titleTemplate: '%s | اسم شركتك',
    defaultTitle: 'اسم شركتك',
    description: 'وصف موقعك باللغة العربية',
    // ... Arabic-specific config
  },
};
```

## Usage Examples

### 1. Basic Usage

```typescript
import { SEO } from '@/lib/seo-simple';
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('MyPage');
  
  return (
    <>
      <SEO 
        title={t('title')}
        description={t('description')}
      />
      {/* Page content */}
    </>
  );
}
```

### 2. Advanced Usage with Open Graph

```typescript
import { SEO } from '@/lib/seo-simple';

export default function MyPage() {
  return (
    <>
      <SEO 
        title="Product Name"
        description="Product description"
        openGraph={{
          title: "Product Name",
          description: "Product description",
          type: "product",
          images: [
            {
              url: "https://yourdomain.com/product-image.jpg",
              width: 1200,
              height: 630,
              alt: "Product image",
            },
          ],
        }}
        twitter={{
          handle: "@yourcompany",
          cardType: "summary_large_image",
        }}
      />
      {/* Page content */}
    </>
  );
}
```

### 3. Preventing Indexing (Admin Pages)

```typescript
import { SEO } from '@/lib/seo-simple';

export default function AdminPage() {
  return (
    <>
      <SEO 
        title="Admin Dashboard"
        description="Admin dashboard"
        noindex={true}
        nofollow={true}
      />
      {/* Admin content */}
    </>
  );
}
```

### 4. Using Predefined Configurations

```typescript
import { SEO, getPageSEOConfig } from '@/lib/seo-simple';

export default function AboutPage() {
  const seoConfig = getPageSEOConfig('about', 'en-US');
  
  return (
    <>
      <SEO {...seoConfig} />
      {/* Page content */}
    </>
  );
}
```

## Structured Data (JSON-LD)

The implementation includes utilities for generating structured data:

```typescript
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo-simple';

// Organization schema
const organizationSchema = generateOrganizationSchema({
  name: "Your Company Name",
  url: "https://yourdomain.com",
  logo: "https://yourdomain.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-555-5555",
    contactType: "customer service",
  },
});

// Website schema
const websiteSchema = generateWebsiteSchema({
  name: "Your Website",
  url: "https://yourdomain.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://yourdomain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});
```

## Best Practices

### 1. Translation Integration

Always use translations for SEO content:

```typescript
const t = useTranslations('MyPage');

<SEO 
  title={t('seo.title')}
  description={t('seo.description')}
  openGraph={{
    title: t('seo.ogTitle'),
    description: t('seo.ogDescription'),
  }}
/>
```

### 2. Image Optimization

Use optimized images for Open Graph:

```typescript
<SEO 
  openGraph={{
    images: [
      {
        url: "https://yourdomain.com/optimized-image.jpg",
        width: 1200,
        height: 630,
        alt: "Descriptive alt text",
      },
    ],
  }}
/>
```

### 3. Canonical URLs

Set canonical URLs for duplicate content:

```typescript
<SEO 
  canonical="https://yourdomain.com/canonical-url"
/>
```

### 4. Locale-Specific URLs

For multilingual sites, use locale-specific canonical URLs:

```typescript
const canonicalUrl = locale === 'ar-AE' 
  ? 'https://yourdomain.com/ar/page'
  : 'https://yourdomain.com/page';

<SEO canonical={canonicalUrl} />
```

## Replacing with Other SEO Libraries

The implementation is designed to be easily replaceable. To switch to another SEO library:

### 1. Update the SEO Component

Replace the `SEO` function in `src/lib/seo-simple.ts`:

```typescript
// Example: Switching to react-helmet-async
import { Helmet } from 'react-helmet-async';

export async function SEO(props: SEOProps): Promise<React.JSX.Element> {
  const i18nConfig = await getGlobalI18nConfig();
  const localeConfig = localeConfigs[i18nConfig.locale as keyof typeof localeConfigs] || localeConfigs['en-US'];

  return React.createElement(Helmet, {
    title: props.title,
    meta: [
      { name: 'description', content: props.description },
      { property: 'og:title', content: props.openGraph?.title },
      // ... other meta tags
    ],
  });
}
```

### 2. Update Configuration Structure

Modify the configuration objects to match the new library's API:

```typescript
// Example: For react-helmet-async
const baseConfig = {
  titleTemplate: '%s | Your Company Name',
  meta: [
    { name: 'description', content: 'Your default description' },
    { property: 'og:type', content: 'website' },
    // ... other meta tags
  ],
};
```

### 3. Update Page Components

The page components won't need to change since they use the same interface:

```typescript
// This stays the same regardless of the underlying SEO library
<SEO 
  title="Page Title"
  description="Page description"
/>
```

## Migration Guide

### From Basic Meta Tags

If you're migrating from basic meta tags:

1. **Replace manual meta tags**:
   ```html
   <!-- Old way -->
   <title>Page Title</title>
   <meta name="description" content="Page description" />
   ```

2. **Use SEO component**:
   ```typescript
   <SEO title="Page Title" description="Page description" />
   ```

### From Other SEO Libraries

1. **Extract configuration** from your current SEO library
2. **Map to new interface** in `src/lib/seo-simple.ts`
3. **Update page components** to use the new SEO component
4. **Test thoroughly** to ensure all meta tags are preserved

## Testing SEO

### 1. View Page Source

Check that meta tags are properly generated:

```html
<title>Page Title | Your Company Name</title>
<meta name="description" content="Page description" />
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
```

### 2. Social Media Testing

Test Open Graph tags:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

### 3. Google Search Console

Monitor indexing and search performance:
- Submit sitemaps
- Check for indexing issues
- Monitor search analytics

## Performance Considerations

### 1. Bundle Size

The `next-seo` library is lightweight (~15KB gzipped), but consider:
- Tree-shaking unused features
- Lazy loading for non-critical pages
- Using dynamic imports for large configurations

### 2. Server-Side Rendering

The SEO component works with SSR:
- Meta tags are rendered server-side
- No hydration issues
- Proper SEO for search engines

### 3. Static Generation

For static pages, SEO is generated at build time:
- Fast page loads
- Consistent meta tags
- No client-side JavaScript required

## Troubleshooting

### Common Issues

1. **Meta tags not appearing**: Check that the SEO component is rendered before the closing `</head>` tag
2. **Translation not working**: Ensure the translation key exists in your message files
3. **Open Graph images not showing**: Verify image URLs are accessible and properly sized
4. **Locale not detected**: Check that `getGlobalI18nConfig()` is working correctly

### Debug Mode

Enable debug mode to see generated meta tags:

```typescript
// Add to your SEO component temporarily
console.log('SEO Props:', seoProps);
```

## Future Enhancements

### 1. Advanced Features

Consider adding:
- Automatic sitemap generation
- RSS feed generation
- Advanced structured data
- Analytics integration

### 2. Performance Optimizations

- Implement SEO caching
- Add preload hints for critical resources
- Optimize image loading for Open Graph

### 3. Monitoring

- Add SEO monitoring tools
- Track Core Web Vitals
- Monitor search rankings

## Conclusion

This SEO implementation provides a robust, i18n-aware solution that can be easily maintained and replaced. The centralized approach ensures consistency across your application while the type-safe interface prevents common errors.

For more information about `next-seo`, visit: https://github.com/garmeeh/next-seo 