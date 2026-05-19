'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Award, Headphones, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FEATURES = [
  { key: 'localExpertise', icon: MapPin },
  { key: 'globalQuality', icon: Award },
  { key: 'ongoingSupport', icon: Headphones },
  { key: 'fastDelivery', icon: Zap },
] as const;

export function Features() {
  const t = useTranslations('features');

  return (
    <section className="py-24 px-4 bg-muted/30">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {FEATURES.map(({ key, icon: Icon }, index) => (
            <motion.div
              key={key}
              variants={gridItem}
              className="text-center space-y-4"
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto',
                  index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                )}
              >
                <Icon className="h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-bold">{t(`${key}.title`)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(`${key}.description`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
