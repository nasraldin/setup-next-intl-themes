# Next.js 15 Internationalization with next-intl v4 + next-themes

This project demonstrates a complete internationalization and theming setup using Next.js 15 App Router, next-intl v4, and next-themes, supporting English (US) and Arabic (UAE) locales with perfect dark mode support.

## 🌟 Features

- ✅ **Next.js 15** with App Router
- ✅ **next-intl v4** with latest best practices
- ✅ **next-themes** with perfect dark mode support
- ✅ **Tailwind CSS v4** with dark mode classes
- ✅ **TypeScript** support
- ✅ **RTL Support** for Arabic
- ✅ **Automatic locale detection**
- ✅ **Static generation** with `generateStaticParams`
- ✅ **Localized routing** (`/en-US/about`, `/ar-AE/about`)
- ✅ **Language switcher** component
- ✅ **Theme switcher** component (System/Light/Dark)
- ✅ **Server and Client Components** support
- ✅ **No flash on load** - perfect SSR/SSG support
- ✅ **Global theme system** across all routes

## 🎯 Supported Locales

- `en-US` - English (United States) - Default locale
- `ar-AE` - Arabic (United Arab Emirates)

## 🎨 Supported Themes

- **System** - Follows user's system preference
- **Light** - Light theme
- **Dark** - Dark theme

## 🏗️ Project Structure

```
src/
├── app/
│   ├── [locale]/              # Dynamic locale segment (i18n routing)
│   │   ├── layout.tsx         # Locale-aware layout with themes
│   │   ├── page.tsx           # Home page
│   │   ├── about/
│   │   │   └── page.tsx       # About page
│   │   └── contact/
│   │       ├── page.tsx       # Contact page
│   │       └── actions.ts     # Server actions
│   ├── dashboard/             # Non-i18n routing (global config)
│   │   ├── layout.tsx         # Dashboard layout with themes
│   │   ├── page.tsx           # Dashboard page
│   │   ├── analytics/
│   │   │   └── page.tsx       # Analytics page
│   │   └── components/
│   │       ├── DashboardStats.tsx
│   │       └── LocaleSwitcher.tsx
│   ├── admin/                 # Example of reusable global config
│   │   ├── layout.tsx         # Admin layout with themes
│   │   └── page.tsx           # Admin page
│   └── globals.css            # Global styles with theme support
├── components/
│   ├── LanguageSwitcher.tsx   # Language switching component
│   ├── Navigation.tsx         # Localized navigation
│   ├── ThemeSwitcher.tsx      # Theme switching component
│   └── providers/
│       └── ThemeProvider.tsx  # next-themes provider wrapper
├── i18n/
│   ├── navigation.ts          # i18n navigation helpers
│   ├── request.ts            # Server-side i18n config
│   ├── routing.ts            # Routing configuration
│   └── global-config.ts      # Global i18n config for non-routing pages
├── messages/
│   ├── en-US.json            # English translations
│   └── ar-AE.json            # Arabic translations
├── middleware.ts             # Locale detection middleware
└── tailwind.config.ts        # Tailwind v4 config with dark mode
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
   - `http://localhost:3000/dashboard` (Dashboard with global i18n)
   - `http://localhost:3000/admin` (Admin with global i18n)

## 🌙 Theme System

### Perfect Dark Mode with next-themes

This project implements [next-themes](https://github.com/pacocoursey/next-themes) following all best practices:

#### ✅ Key Features
- **No Flash on Load** - Script injected in `<head>` before page renders
- **System Theme Detection** - Automatically follows user's system preference
- **Hydration Safe** - Prevents React hydration mismatches
- **Smooth Transitions** - CSS transitions for theme changes
- **Global State** - Single theme provider across all routes
- **Tailwind v4 Integration** - Perfect dark mode class support

#### 🎯 Theme Configuration

**Theme Provider** (`src/components/providers/ThemeProvider.tsx`):
```typescript
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"           // Uses class-based theme switching
      defaultTheme="system"       // Respects user's system preference
      enableSystem={true}         // Enables system theme detection
      disableTransitionOnChange   // Prevents flash during theme change
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
```

#### 🎨 Using Dark Mode Classes

**Any component can use dark mode:**
```tsx
// ✅ Automatic dark mode support
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content automatically adapts to theme!
</div>

// ✅ Theme-aware buttons
<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
  Button with theme support
</button>

// ✅ Theme-aware cards
<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
  <h2 className="text-gray-900 dark:text-white">Card Title</h2>
  <p className="text-gray-600 dark:text-gray-400">Card content</p>
</div>
```

#### 🔄 Theme Switcher Component

**Hydration-safe theme switcher** (`src/components/ThemeSwitcher.tsx`):
```typescript
'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('Common');

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('theme')}:
        </span>
        {/* Skeleton placeholder to prevent layout shift */}
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('theme')}:
      </span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
        aria-label={t('switchTheme')}
      >
        <option value="system">{t('themeSystem')}</option>
        <option value="light">{t('themeLight')}</option>
        <option value="dark">{t('themeDark')}</option>
      </select>

      {/* Show resolved theme for debugging/info */}
      <span className="text-xs text-gray-500 dark:text-gray-400">
        ({resolvedTheme})
      </span>
    </div>
  );
}
```

#### 🌐 Theme Integration with i18n

**Theme translations** (added to all message files):
```json
{
  "Common": {
    "theme": "Theme",
    "switchTheme": "Switch Theme",
    "themeSystem": "System",
    "themeLight": "Light",
    "themeDark": "Dark"
  }
}
```

**Layout integration** (all layouts include ThemeProvider):
```typescript
// ✅ Main site layout
<ThemeProvider>
  <NextIntlClientProvider messages={messages}>
    <div className="min-h-screen p-8">
      <div className="flex flex-wrap items-center gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />  {/* ✅ Theme switcher */}
      </div>
      {/* ... rest of layout */}
    </div>
  </NextIntlClientProvider>
</ThemeProvider>
```

## 🌐 How It Works

### Routing Configuration

The routing is configured in `src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ['en-US', 'ar-AE'],
  defaultLocale: 'en-US',
  localePrefix: 'as-needed',
  localeDetection: true,
  localeCookie: {
    name: 'locale',
  }
});
```

### Global i18n Configuration

For routes outside the `[locale]` segment (like `/dashboard`, `/admin`), we use a global configuration:

```typescript
// src/i18n/global-config.ts
export async function getGlobalI18nConfig() {
  // Uses the same 'locale' cookie as the main site
  // Follows the same locale detection priority
  // Reusable across any route outside the [locale] structure
}
```

### Middleware

The middleware in `src/middleware.ts` handles:
- Automatic locale detection based on browser preferences
- Redirects and rewrites for proper routing
- Default locale handling
- Excludes dashboard and admin routes (they use global config)

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
  },
  "Common": {
    "language": "Language",
    "theme": "Theme",
    "themeSystem": "System",
    "themeLight": "Light",
    "themeDark": "Dark"
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
  <html lang={locale} dir={dir} suppressHydrationWarning>
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

## 🏗️ Architecture Overview

### Route Types

1. **i18n Routed Pages** (`/[locale]/*`)
   - URL-based locale detection
   - SEO-friendly URLs
   - Static generation support
   - Examples: `/en-US/about`, `/ar-AE/contact`

2. **Global i18n Pages** (`/dashboard/*`, `/admin/*`)
   - Cookie-based locale detection
   - Single URL structure
   - Perfect for admin panels
   - Examples: `/dashboard`, `/dashboard/analytics`, `/admin`

### Theme System

- **Single ThemeProvider** across all routes
- **No flash on load** with script injection
- **Hydration-safe** components
- **System theme detection** with fallbacks
- **Smooth transitions** between themes

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

### Adding New Global Routes

1. Create the route outside `[locale]` (e.g., `/settings`)
2. Use `getGlobalI18nConfig()` in the layout
3. Import `ThemeProvider` and `ThemeSwitcher`
4. Add translations for the new route

### Using Themes in Components

```typescript
// ✅ Server Component with theme-aware styling
export default function ServerComponent() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h1 className="text-gray-900 dark:text-white">Title</h1>
      <p className="text-gray-600 dark:text-gray-400">Content</p>
    </div>
  );
}

// ✅ Client Component with theme hooks
'use client';
import { useTheme } from 'next-themes';

export default function ClientComponent() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900">
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
    </div>
  );
}
```

## 📚 Key Libraries Used

### next-intl v4
- **`defineRouting`**: Modern routing configuration
- **`createNavigation`**: Type-safe navigation helpers
- **`NextIntlClientProvider`**: Client-side translation provider
- **`setRequestLocale`**: Enable static rendering
- **`hasLocale`**: Locale validation
- **`getRequestConfig`**: Server-side configuration

### next-themes
- **`ThemeProvider`**: Theme context provider
- **`useTheme`**: Hook for theme management
- **`resolvedTheme`**: Actual applied theme
- **No flash on load**: Perfect SSR/SSG support
- **System theme detection**: Automatic preference handling

### Tailwind CSS v4
- **`darkMode: 'selector'`**: Modern dark mode configuration
- **Dark mode classes**: `dark:bg-gray-900`, `dark:text-white`
- **Transition utilities**: `transition-colors`
- **Responsive design**: Mobile-first approach

## 🔧 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Performance Features

- ✅ **Static Generation** - All pages pre-rendered at build time
- ✅ **No Flash on Load** - Theme script injected before render
- ✅ **Hydration Safe** - No React hydration mismatches
- ✅ **Optimized Images** - Next.js Image component
- ✅ **Font Optimization** - Google Fonts with display swap
- ✅ **CSS Optimization** - Tailwind CSS purging

## 📖 Resources

- [next-intl Documentation](https://next-intl.dev/)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [next-intl v4 Migration Guide](https://next-intl.dev/blog/next-intl-4-0)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
