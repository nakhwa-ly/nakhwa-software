'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { CTABanner } from '@/components/shared/CTABanner';

const PROJECTS = [
  { key: 'lamia', emoji: '🍕', category: 'mobile' },
  { key: 'inventory', emoji: '📊', category: 'systems' },
  { key: 'education', emoji: '📚', category: 'mobile' },
] as const;

type FilterKey = 'all' | 'mobile' | 'web' | 'systems';

export function PortfolioContent() {
  const t = useTranslations('portfolio');
  const tCta = useTranslations('ctaBanner');
  const [filter, setFilter] = useState<FilterKey>('all');

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t('filters.all') },
    { key: 'mobile', label: t('filters.mobile') },
    { key: 'web', label: t('filters.web') },
    { key: 'systems', label: t('filters.systems') },
  ];

  const filtered = PROJECTS.filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <Badge variant="secondary">{t('sectionBadge')}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">{t('sectionTitle')}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('sectionSubtitle')}
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {filters.map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                onClick={() => setFilter(key)}
                size="sm"
                className="rounded-full"
              >
                {label}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map(({ key, emoji }) => {
                const tags = t.raw(`projects.${key}.tags`) as string[];
                return (
                  <ProjectCard
                    key={key}
                    title={t(`projects.${key}.title`)}
                    description={t(`projects.${key}.description`)}
                    tags={tags}
                    imagePlaceholder={emoji}
                    viewProject={t('viewProject')}
                  />
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20 text-muted-foreground text-lg">
                  —
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
