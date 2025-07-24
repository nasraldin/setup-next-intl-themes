# Next.js 15 Internationalization with next-intl v4

This project demonstrates a complete internationalization setup using Next.js 15 App Router and next-intl v4, supporting English (US) and Arabic (UAE) locales.

## 🌟 Features

- ✅ **Next.js 15** with App Router
- ✅ **next-intl v4** with latest best practices
- ✅ **TypeScript** support
- ✅ **RTL Support** for Arabic
- ✅ **Automatic locale detection**
- ✅ **Static generation** with `generateStaticParams`
- ✅ **Localized routing** (`/en-US/about`, `/ar-AE/about`)
- ✅ **Language switcher** component
- ✅ **Server and Client Components** support

## 🎯 Supported Locales

- `en-US` - English (United States) - Default locale
- `ar-AE` - Arabic (United Arab Emirates)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── [locale]/              # Dynamic locale segment
│   │   ├── layout.tsx         # Locale-aware layout
│   │   ├── page.tsx           # Home page
│   │   └── about/
│   │       └── page.tsx       # About page
│   └── globals.css
├── components/
│   ├── LanguageSwitcher.tsx   # Language switching component
│   └── Navigation.tsx         # Localized navigation
├── i18n/
│   ├── navigation.ts          # i18n navigation helpers
│   ├── request.ts            # Server-side i18n config
│   └── routing.ts            # Routing configuration
├── messages/
│   ├── en-US.json            # English translations
│   └── ar-AE.json            # Arabic translations
└── middleware.ts             # Locale detection middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - `http://localhost:3000` (default locale: en-US)
   - `http://localhost:3000/ar-AE` (Arabic)

## 🌐 How It Works

### Routing Configuration

The routing is configured in `src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ['en-US', 'ar-AE'],
  defaultLocale: 'en-US'
});
```

### Middleware

The middleware in `src/middleware.ts` handles:
- Automatic locale detection based on browser preferences
- Redirects and rewrites for proper routing
- Default locale handling

### Translations

Translation files are located in the `messages/` directory:
- `messages/en-US.json` - English translations
- `messages/ar-AE.json` - Arabic translations

Example structure:
```json
{
  "HomePage": {
    "title": "Welcome to Next.js 15",
    "description": "Get started by editing"
  },
  "Navigation": {
    "home": "Home",
    "about": "About"
  }
}
```

### Using Translations

#### In Server Components:
```typescript
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function Page({ params }) {
  const { locale } = React.use(params);
  setRequestLocale(locale);

  const t = useTranslations('HomePage');

  return <h1>{t('title')}</h1>;
}
```

#### In Client Components:
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function ClientComponent() {
  const t = useTranslations('HomePage');

  return <h1>{t('title')}</h1>;
}
```

### Navigation

Use the localized navigation helpers:

```typescript
import { Link } from '@/i18n/navigation';

// This will automatically prefix with the current locale
<Link href="/about">About</Link>
```

### Language Switching

The `LanguageSwitcher` component allows users to switch between locales:

```typescript
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Layout() {
  return (
    <div>
      <LanguageSwitcher />
      {/* rest of your layout */}
    </div>
  );
}
```

## 🎨 RTL Support

The layout automatically sets the correct text direction:

- `en-US`: `dir="ltr"`
- `ar-AE`: `dir="rtl"`

This is handled in `src/app/[locale]/layout.tsx`:

```typescript
const dir = locale === 'ar-AE' ? 'rtl' : 'ltr';

return (
  <html lang={locale} dir={dir}>
    {/* ... */}
  </html>
);
```

## 📱 Static Generation

The app is configured for static generation with `generateStaticParams`:

```typescript
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

This pre-generates all locale versions at build time.

## 🛠️ Development

### Adding New Locales

1. Add the locale to `src/i18n/routing.ts`:
   ```typescript
   locales: ['en-US', 'ar-AE', 'fr-FR']
   ```

2. Create a new message file: `messages/fr-FR.json`

3. Update the `LanguageSwitcher` component to include the new locale

### Adding New Pages

1. Create the page in `src/app/[locale]/your-page/page.tsx`
2. Add the required translations to all message files
3. Use `setRequestLocale(locale)` for static rendering support

### Adding New Translation Keys

1. Add keys to all message files in `messages/`
2. Use the `useTranslations` hook in your components

## 📚 Key next-intl v4 Features Used

- **`defineRouting`**: Modern routing configuration
- **`createNavigation`**: Type-safe navigation helpers
- **`NextIntlClientProvider`**: Client-side translation provider
- **`setRequestLocale`**: Enable static rendering
- **`hasLocale`**: Locale validation
- **`getRequestConfig`**: Server-side configuration

## 🔧 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📖 Resources

- [next-intl Documentation](https://next-intl.dev/)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [next-intl v4 Migration Guide](https://next-intl.dev/blog/next-intl-4-0)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
