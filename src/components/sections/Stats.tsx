'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Counter } from '@/components/shared/Counter';

type StatItem =
  | { key: string; value: number; suffix: string; animated: true }
  | { key: string; value: null; display: string; animated: false };

const STATS: StatItem[] = [
  { key: 'projects', value: 5,    suffix: '+', animated: true  },
  { key: 'clients',  value: 10,   suffix: '+', animated: true  },
  { key: 'years',    value: 2,    suffix: '+', animated: true  },
  { key: 'coffee',   value: null, display: '∞', animated: false },
];

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
          {STATS.map((stat) => (
            <motion.div
              key={stat.key}
              variants={gridItem}
              className="text-center space-y-2"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {stat.animated ? (
                  <Counter to={stat.value} suffix={stat.suffix} duration={2} />
                ) : (
                  <span className="tabular-nums">{stat.display}</span>
                )}
              </div>
              <p className="text-muted-foreground font-medium">{t(stat.key as Parameters<typeof t>[0])}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
