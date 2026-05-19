import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { routing } from '@/i18n/routing';
import '../globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nakhwa.com.ly'),
  title: {
    default: 'نخوة للحلول البرمجية',
    template: '%s | نخوة',
  },
  description: 'شريكك التقني لبناء تطبيقات احترافية',
  openGraph: {
    type: 'website',
    siteName: 'نخوة للحلول البرمجية',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'نخوة للحلول البرمجية' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'نخوة للحلول البرمجية',
  alternateName: 'Nakhwa Software Solutions',
  url: 'https://nakhwa.com.ly',
  logo: 'https://nakhwa.com.ly/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+218910709671',
    contactType: 'customer service',
    email: 'nakhwa.libya@gmail.com',
    areaServed: 'LY',
    availableLanguage: ['Arabic', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tripoli',
    addressCountry: 'LY',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? cairo.variable : inter.variable;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col ${fontClass}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <MotionProvider>
              <Navbar />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
              <Toaster />
            </MotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
