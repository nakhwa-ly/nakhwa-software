import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PortfolioContent } from '@/components/sections/PortfolioContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('portfolio.title'),
    description: t('portfolio.description'),
    openGraph: {
      title: t('portfolio.title'),
      description: t('portfolio.description'),
      url: `https://nakhwa.com.ly/${locale}/portfolio`,
    },
  };
}

export default function PortfolioPage() {
  return <PortfolioContent />;
}
