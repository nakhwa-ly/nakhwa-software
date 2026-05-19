import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const QUICK_LINKS = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/about', key: 'about' },
] as const;

const SERVICE_KEYS = ['mobile', 'web', 'businessSystems', 'database', 'delivery', 'consulting'] as const;

const SOCIAL_LINKS = [
  { label: 'X', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
];

export function Footer() {
  const tFooter = useTranslations('footer');
  const tNavbar = useTranslations('navbar');
  const tServices = useTranslations('services');
  const tContact = useTranslations('contact');

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <span className="text-2xl font-bold text-primary">نخوة</span>
            <p className="text-muted-foreground text-sm leading-relaxed">{tFooter('description')}</p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="px-3 py-1.5 rounded-full border text-xs font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
                >
                  {label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{tFooter('quickLinks')}</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {tNavbar(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">{tFooter('services')}</h3>
            <ul className="space-y-2">
              {SERVICE_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href="/services"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {tServices(`${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">{tFooter('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span dir="ltr">+218910709671</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>nakhwa.libya@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{tContact('info.locationValue')}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>{tFooter('copyright')}. {tFooter('rights')}.</span>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            {tNavbar('contact')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
