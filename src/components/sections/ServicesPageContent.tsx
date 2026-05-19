'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Smartphone, Globe, Briefcase, Database, Truck, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { CTABanner } from '@/components/shared/CTABanner';

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SERVICES = [
  { key: 'mobile', icon: Smartphone, accent: false },
  { key: 'web', icon: Globe, accent: false },
  { key: 'businessSystems', icon: Briefcase, accent: true },
  { key: 'database', icon: Database, accent: false },
  { key: 'delivery', icon: Truck, accent: true },
  { key: 'consulting', icon: Lightbulb, accent: true },
] as const;

export function ServicesPageContent() {
  const t = useTranslations('services');
  const tCta = useTranslations('ctaBanner');

  return (
    <>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <Badge variant="secondary">{t('sectionBadge')}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">{t('sectionTitle')}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('sectionSubtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={gridContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map(({ key, icon, accent }) => (
              <motion.div key={key} variants={gridItem}>
                <ServiceCard
                  icon={icon}
                  title={t(`${key}.title`)}
                  description={t(`${key}.description`)}
                  href="/contact"
                  learnMore={t('learnMore')}
                  accent={accent}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        title={tCta('title')}
        subtitle={tCta('subtitle')}
        button={tCta('button')}
      />
    </>
  );
}
