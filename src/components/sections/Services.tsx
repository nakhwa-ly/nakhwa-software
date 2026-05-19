'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Smartphone, Globe, Briefcase, Database, Truck, Lightbulb } from 'lucide-react';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { Badge } from '@/components/ui/badge';

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

export function Services() {
  const t = useTranslations('services');

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="secondary">{t('sectionBadge')}</Badge>
          <h2 className="text-3xl md:text-5xl font-bold">{t('sectionTitle')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('sectionSubtitle')}</p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map(({ key, icon, accent }) => (
            <motion.div key={key} variants={gridItem}>
              <ServiceCard
                icon={icon}
                title={t(`${key}.title`)}
                description={t(`${key}.description`)}
                href="/services"
                learnMore={t('learnMore')}
                accent={accent}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
