'use server';

import { redirect } from 'next/navigation';
// import { getTranslations } from 'next-intl/server';

// Server Action for handling contact form submission
export async function submitContactForm(locale: string, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Validate the form data
  if (!name || !email || !message) {
    throw new Error('All fields are required');
  }

  // Simulate server-side processing
  console.log('Processing contact form:', {
    name,
    email,
    message,
    locale,
    timestamp: new Date().toISOString()
  });

  // In a real application, you would:
  // 1. Save to database
  // 2. Send email notification
  // 3. Log the submission
  // 4. Return success/error response

  // Simulate async processing
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get translations for success message
  // const t = await getTranslations({ locale, namespace: 'ContactPage' });

  // For demo purposes, we'll just redirect back with a success message
  // In a real app, you might use cookies or query params for messages
  redirect(`/${locale}/contact?success=true`);
}
