import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <nav className="mb-8">
      <ul className="flex gap-4 justify-center">
        <li>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline"
          >
            {t('home')}
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline"
          >
            {t('about')}
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline"
          >
            {t('contact')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
