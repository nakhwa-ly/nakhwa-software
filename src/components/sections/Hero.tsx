'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function Hero() {
  const t = useTranslations('hero');
  const shouldReduceMotion = useReducedMotion();

  const headline = t('headline');
  const highlight = t('headlineHighlight');
  const words = `${headline} ${highlight}`.split(' ');
  const highlightWords = highlight.split(' ');

  return (
    <section className="relative flex items-center justify-center min-h-[90vh] md:min-h-[90vh] overflow-hidden px-4">
      {/* Animated blobs */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 start-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 end-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, 80, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 end-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
            {t('badge')}
          </Badge>
        </motion.div>

        {/* Headline with stagger */}
        <motion.h1
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={shouldReduceMotion ? undefined : item}
              className={`inline-block me-3 ${highlightWords.includes(word) ? 'text-primary' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="min-w-40 font-semibold">
            <Link href="/contact">{t('ctaPrimary')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-40 font-semibold">
            <Link href="/portfolio">{t('ctaSecondary')}</Link>
          </Button>
        </motion.div>

        {/* Trust indicator */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm text-muted-foreground"
        >
          {t('trustText')}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      )}
    </section>
  );
}
