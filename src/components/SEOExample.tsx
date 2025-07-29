'use client';

import React from 'react';
import { ClientSEO } from '@/lib/seo-simple';

interface SEOExampleProps {
  title: string;
  description: string;
  locale?: string;
}

export default function SEOExample({ title, description, locale = 'en-US' }: SEOExampleProps) {
  return (
    <>
      <ClientSEO 
        title={title}
        description={description}
        locale={locale}
        openGraph={{
          title,
          description,
          type: 'website',
        }}
      />
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">SEO Component Example</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This component demonstrates how to use the ClientSEO component in a client component.
          The SEO meta tags are generated client-side for this example.
        </p>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          <strong>Title:</strong> {title}<br />
          <strong>Description:</strong> {description}<br />
          <strong>Locale:</strong> {locale}
        </div>
      </div>
    </>
  );
} 