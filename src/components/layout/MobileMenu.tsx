'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('navbar');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 inset-x-0 z-50 bg-background border-b shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-primary">نخوة</span>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label={t('closeMenu')}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-2 mb-8">
              {NAV_LINKS.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={onClose}
                  className="text-lg font-medium py-3 px-4 rounded-xl hover:bg-muted transition-colors"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 mb-6">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Button asChild className="w-full" size="lg">
              <Link href="/contact" onClick={onClose}>
                {t('cta')}
              </Link>
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
