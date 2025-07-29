# SEO Implementation with next-seo

This project implements a comprehensive SEO solution using the [next-seo](https://github.com/garmeeh/next-seo) library with full i18n support for English and Arabic.

## 🚀 Quick Start

### Installation

The `next-seo` library is already installed:

```bash
npm install next-seo
```

### Basic Usage

```typescript
import { SEO } from '@/lib/seo-simple';

export default function MyPage() {
  return (
    <>
      <SEO 
        title="Page Title"
        description="Page description"
      />
      {/* Your page content */}
    </>
  );
}
```

## 📁 File Structure

```
src/
├── lib/
│   └── seo-simple.ts          # Main SEO implementation
├── app/[locale]/
│   ├── page.tsx               # Home page with SEO
│   ├── about/page.tsx         # About page with SEO
│   └── contact/page.tsx       # Contact page with SEO
└── components/
    └── SEOExample.tsx         # Client component SEO example
```

## 🎯 Key Features

### 1. i18n Integration
- **Automatic locale detection** from your i18n configuration
- **Locale-specific SEO** for English and Arabic
- **Translation-based content** for titles and descriptions

### 2. Server & Client Components
- **SEO component** for Server Components (recommended)
- **ClientSEO component** for Client Components
- **Automatic locale detection** in Server Components

### 3. Type Safety
- **Full TypeScript support**
- **Interface validation** for SEO props
- **IntelliSense support** in your IDE

### 4. Easy Replacement
- **Centralized configuration** in single file
- **Consistent interface** across components
- **Easy migration** to other SEO libraries

## 📝 Usage Examples

### Server Component (Recommended)

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
        openGraph={{
          title: t('ogTitle'),
          description: t('ogDescription'),
          images: [
            {
              url: 'https://yourdomain.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: t('title'),
            },
          ],
        }}
      />
      {/* Your page content */}
    </>
  );
}
```

### Client Component

```typescript
import { ClientSEO } from '@/lib/seo-simple';

export default function MyClientComponent() {
  return (
    <>
      <ClientSEO 
        title="Page Title"
        description="Page description"
        locale="en-US" // Optional
      />
      {/* Your component content */}
    </>
  );
}
```

### Advanced Usage

```typescript
import { SEO } from '@/lib/seo-simple';

export default function ProductPage() {
  return (
    <>
      <SEO 
        title="Product Name"
        description="Product description"
        canonical="https://yourdomain.com/product/123"
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
      {/* Product content */}
    </>
  );
}
```

### Prevent Indexing (Admin Pages)

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

## 🌐 i18n Configuration

### Translation Structure

Add SEO-specific translations to your message files:

```json
{
  "SEO": {
    "home": {
      "title": "Welcome to Next.js 15",
      "description": "Get started with Next.js internationalization",
      "ogTitle": "Welcome to Next.js 15 - Internationalization Demo",
      "ogDescription": "A comprehensive demo of Next.js 15 with i18n support"
    },
    "about": {
      "title": "About Us",
      "description": "Learn more about our setup",
      "ogTitle": "About Us - Next.js Internationalization",
      "ogDescription": "Discover our Next.js 15 setup"
    }
  }
}
```

### Using SEO Translations

```typescript
const seoT = useTranslations('SEO.home');

<SEO 
  title={seoT('title')}
  description={seoT('description')}
  openGraph={{
    title: seoT('ogTitle'),
    description: seoT('ogDescription'),
  }}
/>
```

## ⚙️ Configuration

### Base Configuration

Edit `src/lib/seo-simple.ts` to customize:

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

## 🔧 Customization

### Adding New Locales

1. Add locale configuration to `localeConfigs`
2. Update your i18n routing configuration
3. Add translations to message files

### Adding New SEO Features

1. Extend the `SEOProps` interface
2. Update the SEO components
3. Add new configuration options

### Replacing with Other Libraries

The implementation is designed to be easily replaceable:

1. **Update the SEO component** in `src/lib/seo-simple.ts`
2. **Modify configuration structure** to match new library
3. **Page components remain unchanged** - they use the same interface

## 🧪 Testing

### View Page Source
Check that meta tags are properly generated:

```html
<title>Page Title | Your Company Name</title>
<meta name="description" content="Page description" />
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
```

### Social Media Testing
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## 📚 Best Practices

### 1. Use Server Components
Prefer Server Components for SEO when possible - they render meta tags server-side.

### 2. Translation Integration
Always use translations for SEO content to maintain consistency across locales.

### 3. Image Optimization
Use optimized images for Open Graph with proper dimensions (1200x630px recommended).

### 4. Canonical URLs
Set canonical URLs for duplicate content to prevent SEO issues.

### 5. Locale-Specific URLs
Use locale-specific canonical URLs for multilingual sites.

## 🚨 Troubleshooting

### Common Issues

1. **Meta tags not appearing**: Ensure SEO component is rendered before `</head>`
2. **Translation not working**: Check translation keys exist in message files
3. **Open Graph images not showing**: Verify image URLs are accessible
4. **Locale not detected**: Check `getGlobalI18nConfig()` is working

### Debug Mode

Add console logging to see generated SEO props:

```typescript
// Add to SEO component temporarily
console.log('SEO Props:', seoProps);
```

## 📖 Documentation

For detailed documentation, see:
- [SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md) - Comprehensive guide
- [next-seo GitHub](https://github.com/garmeeh/next-seo) - Library documentation

## 🤝 Contributing

When contributing to the SEO implementation:

1. **Maintain the interface** - don't break existing usage
2. **Add tests** for new features
3. **Update documentation** for changes
4. **Consider i18n impact** for all changes

## 📄 License

This SEO implementation is part of the project and follows the same license terms. 