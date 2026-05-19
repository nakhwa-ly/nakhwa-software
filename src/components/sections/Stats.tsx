'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Counter } from '@/components/shared/Counter';

const STATS = [
  { value: 25, suffix: '+', key: 'projects' },
  { value: 15, suffix: '+', key: 'clients' },
  { value: 5, suffix: '+', key: 'years' },
  { value: 1000, suffix: '+', key: 'coffee' },
] as const;

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STATS.map(({ value, suffix, key }) => (
            <motion.div
              key={key}
              variants={gridItem}
              className="text-center space-y-2"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary">
                <Counter to={value} suffix={suffix} duration={2} />
              </div>
              <p className="text-muted-foreground font-medium">{t(key)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
