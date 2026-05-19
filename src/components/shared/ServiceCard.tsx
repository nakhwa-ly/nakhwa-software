import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  learnMore?: string;
  accent?: boolean;
}

export function ServiceCard({ icon: Icon, title, description, href, learnMore, accent }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group p-6 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-xl transition-all"
    >
      <div
        className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
          accent ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
        )}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {href && learnMore && (
        <Link
          href={href}
          className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
        >
          {learnMore}
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        </Link>
      )}
    </motion.div>
  );
}
