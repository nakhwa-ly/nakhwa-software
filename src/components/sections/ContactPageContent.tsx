'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ContactForm } from '@/components/sections/ContactForm';

const PHONE = '+218 91 070 9671';
const EMAIL = 'nakhwa.libya@gmail.com';

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

function InfoItem({ icon: Icon, label, value, href }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border bg-card hover:border-primary/50 transition-colors">
      <div className="w-11 h-11 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        {href ? (
          <a
            href={href}
            className="font-medium hover:text-primary transition-colors inline-flex items-center gap-1 group"
            dir="ltr"
          >
            {value}
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

export function ContactPageContent() {
  const t = useTranslations('contact');

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="secondary">{t('sectionBadge')}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold">{t('sectionTitle')}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t('sectionSubtitle')}</p>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <InfoItem
              icon={Phone}
              label={t('info.phone')}
              value={PHONE}
              href={`tel:${PHONE.replace(/\s/g, '')}`}
            />
            <InfoItem
              icon={Mail}
              label={t('info.email')}
              value={EMAIL}
              href={`mailto:${EMAIL}`}
            />
            <InfoItem
              icon={MapPin}
              label={t('info.location')}
              value={t('info.locationValue')}
            />
            <InfoItem
              icon={Clock}
              label={t('info.hours')}
              value={t('info.hoursValue')}
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl border p-6 md:p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
