import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ServicesPageContent } from '@/components/sections/ServicesPageContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('services.title'),
    description: t('services.description'),
    openGraph: {
      title: t('services.title'),
      description: t('services.description'),
      url: `https://nakhwa.com.ly/${locale}/services`,
    },
  };
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
