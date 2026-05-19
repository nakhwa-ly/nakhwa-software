'use client';
import { motion } from 'framer-motion';
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

const wordItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function Hero() {
  const t = useTranslations('hero');

  const headline = t('headline');
  const highlight = t('headlineHighlight');
  const words = `${headline} ${highlight}`.split(' ');
  const highlightWords = highlight.split(' ');

  return (
    <section className="relative flex items-center justify-center min-h-[90vh] overflow-hidden px-4">

      {/* ── Layer 2: Animated gradient mesh (large, slow, subtle) ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute start-[-10%] top-[-5%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[160px] bg-primary/15 dark:bg-primary/25"
          animate={{ x: [0, 80, 30, 0], y: [0, -50, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute end-[-10%] bottom-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-[160px] bg-accent/10 dark:bg-accent/20"
          animate={{ x: [0, -60, -20, 0], y: [0, 50, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute start-[30%] top-[40%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[160px] bg-primary/10 dark:bg-primary/15"
          animate={{ x: [0, 40, -20, 0], y: [0, 60, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </div>

      {/* ── Layer 3: SVG dot pattern with radial fade ── */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dot-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1.2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot-pattern)" />
        </svg>
      </div>

      {/* ── Layer 4: Floating orbs (primary + accent only, no blend mode) ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute start-[8%] top-[12%] w-[280px] h-[280px] rounded-full blur-[100px] bg-primary/25 dark:bg-primary/35"
          animate={{ x: [0, 70, -20, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute end-[10%] bottom-[15%] w-[240px] h-[240px] rounded-full blur-[90px] bg-accent/20 dark:bg-accent/30"
          animate={{ x: [0, -50, 30, 0], y: [0, 60, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute end-[22%] top-[30%] w-[200px] h-[200px] rounded-full blur-[80px] bg-primary/20 dark:bg-primary/25"
          animate={{ x: [0, 45, -25, 0], y: [0, 75, -20, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute end-[3%] top-[3%] w-[220px] h-[220px] rounded-full blur-[120px] bg-accent/15 dark:bg-accent/25"
          animate={{ x: [0, -35, 20, 0], y: [0, 45, -55, 0] }}
          transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute start-[40%] bottom-[5%] w-[200px] h-[200px] rounded-full blur-[90px] bg-primary/15 dark:bg-primary/20"
          animate={{ x: [0, -25, 35, 0], y: [0, -40, 15, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </div>

      {/* ── Layer 5: Content ── */}
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
            {t('badge')}
          </Badge>
        </motion.div>

        {/* Headline with stagger reveal */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordItem}
              className={
                highlightWords.includes(word)
                  ? 'inline-block me-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
                  : 'inline-block me-3'
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm text-muted-foreground"
        >
          {t('trustText')}
        </motion.p>
      </div>

      {/* Scroll indicator — centered via flexbox, no left/right */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 inset-x-0 flex justify-center text-muted-foreground pointer-events-none"
        aria-hidden="true"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
