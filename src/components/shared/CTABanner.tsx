import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CTABannerProps {
  title: string;
  subtitle: string;
  button: string;
}

export function CTABanner({ title, subtitle, button }: CTABannerProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 text-white shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-white/80 text-lg mb-8">{subtitle}</p>
        <Button asChild size="lg" variant="secondary" className="gap-2 font-semibold">
          <Link href="/contact">
            {button}
            <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
