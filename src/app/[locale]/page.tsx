import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABanner } from '@/components/shared/CTABanner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('home.title'),
    description: t('home.description'),
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      url: `https://nakhwa.com.ly/${locale}`,
    },
  };
}

export default function HomePage() {
  const t = useTranslations('ctaBanner');

  return (
    <>
      <Hero />
      <Services />
      <Features />
      <PortfolioPreview />
      <Stats />
      <Testimonials />
      <CTABanner
        title={t('title')}
        subtitle={t('subtitle')}
        button={t('button')}
      />
    </>
  );
}
