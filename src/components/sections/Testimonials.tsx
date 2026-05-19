'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { TestimonialCard } from '@/components/shared/TestimonialCard';

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Testimonials() {
  const t = useTranslations('testimonials');
  // TODO(pre-launch): replace with real client quotes + signed approval
  const items = t.raw('items') as Array<{
    quote: string;
    name: string;
    role: string;
    company: string;
  }>;

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
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={gridItem}>
              <TestimonialCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
