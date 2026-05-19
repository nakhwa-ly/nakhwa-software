'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === 'ar' ? 'en' : 'ar';
  const label = locale === 'ar' ? 'EN' : 'العربية';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.replace(pathname, { locale: switchTo })}
      className="gap-2 font-medium"
    >
      <Globe className="h-4 w-4" />
      {label}
    </Button>
  );
}
