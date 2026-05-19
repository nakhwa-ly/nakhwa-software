import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactPageContent } from '@/components/sections/ContactPageContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('contact.title'),
    description: t('contact.description'),
    openGraph: {
      title: t('contact.title'),
      description: t('contact.description'),
      url: `https://nakhwa.com.ly/${locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return <ContactPageContent />;
}
