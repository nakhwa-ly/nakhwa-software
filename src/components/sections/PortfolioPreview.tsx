'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/shared/ProjectCard';

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PROJECTS = [
  { key: 'lamia', emoji: '🍕' },
  { key: 'inventory', emoji: '📦' },
  { key: 'education', emoji: '🎓' },
] as const;

export function PortfolioPreview() {
  const t = useTranslations('portfolio');

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

        {/* Projects Grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {PROJECTS.map(({ key, emoji }) => (
            <motion.div key={key} variants={gridItem}>
              <ProjectCard
                title={t(`projects.${key}.title`)}
                description={t(`projects.${key}.description`)}
                tags={t.raw(`projects.${key}.tags`) as string[]}
                viewProject={t('viewProject')}
                imagePlaceholder={emoji}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button asChild variant="outline" size="lg" className="gap-2 font-semibold">
            <Link href="/portfolio">
              {t('viewAll')}
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
