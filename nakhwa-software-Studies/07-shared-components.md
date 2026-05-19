# 07 — المكونات المشتركة (Shared Components)

## 📦 قائمة المكونات

| المكون | المسار | الحالة |
|-------|------|------|
| `Navbar` | `components/layout/Navbar.tsx` | Critical |
| `Footer` | `components/layout/Footer.tsx` | Critical |
| `LanguageSwitcher` | `components/layout/LanguageSwitcher.tsx` | Critical |
| `ThemeToggle` | `components/layout/ThemeToggle.tsx` | Critical |
| `MobileMenu` | `components/layout/MobileMenu.tsx` | Critical |
| `ThemeProvider` | `components/providers/ThemeProvider.tsx` | Critical |
| `AnimatedSection` | `components/shared/AnimatedSection.tsx` | High |
| `Counter` | `components/shared/Counter.tsx` | Medium |
| `ServiceCard` | `components/shared/ServiceCard.tsx` | High |
| `ProjectCard` | `components/shared/ProjectCard.tsx` | Medium |
| `TestimonialCard` | `components/shared/TestimonialCard.tsx` | Medium |
| `CTABanner` | `components/shared/CTABanner.tsx` | Low |

---

## 🧭 Navbar

**الموقع:** `src/components/layout/Navbar.tsx`

**المواصفات:**
- Sticky في الأعلى
- شفاف في البداية، يصبح ملون عند scroll
- يحتوي على: شعار + روابط + LanguageSwitcher + ThemeToggle + CTA Button
- على الموبايل: hamburger menu

**الـ States:**
```tsx
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**الـ Styling:**
```tsx
<nav className={cn(
  "fixed top-0 inset-x-0 z-50 transition-all duration-300",
  isScrolled 
    ? "bg-background/80 backdrop-blur-lg border-b shadow-sm" 
    : "bg-transparent"
)}>
```

**الروابط (من `messages/[locale].json`):**
- الرئيسية
- خدماتنا
- أعمالنا
- من نحن
- تواصل معنا

---

## 🦶 Footer

**الموقع:** `src/components/layout/Footer.tsx`

**Layout:** 4 أعمدة على الديسكتوب، 2 على التابلت، 1 على الموبايل

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  [الشعار]    │  روابط سريعة │  خدماتنا     │  تواصل معنا  │
│  وصف قصير   │              │              │              │
│              │  • الرئيسية   │  • موبايل    │  📞 الهاتف  │
│  [Social]    │  • الخدمات   │  • ويب       │  📧 الإيميل │
│              │  • الأعمال   │  • أنظمة     │  📍 العنوان │
│              │  • من نحن    │  • استشارات  │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
─────────────────────────────────────────────────────────
© 2026 نخوة للحلول البرمجية. جميع الحقوق محفوظة.
```

**الـ Social Links (placeholder):**
- Twitter/X
- LinkedIn
- GitHub
- Instagram

---

## 🌐 LanguageSwitcher

**الموقع:** `src/components/layout/LanguageSwitcher.tsx`

**التصميم:** زر بسيط يعرض اللغة البديلة
- في صفحة عربية: يعرض "EN"
- في صفحة إنجليزية: يعرض "العربية"

**الكود الأساسي:**
```tsx
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
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      {label}
    </Button>
  );
}
```

---

## 🌓 ThemeToggle

**الموقع:** `src/components/layout/ThemeToggle.tsx`

**التصميم:** زر دائري بأيقونة شمس/قمر متحركة

```tsx
'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="w-9 h-9" />;
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

**ملاحظة مهمة:** `mounted` ضروري لتجنب hydration mismatch.

---

## 📱 MobileMenu

**التصميم:** Slide-in menu من الأعلى أو الجانب

**العناصر:**
- زر إغلاق (X) في الأعلى
- روابط عمودية كبيرة
- LanguageSwitcher و ThemeToggle
- CTA button في الأسفل

**Animation:** Slide + Fade باستخدام Framer Motion

---

## 🎨 ThemeProvider

**الموقع:** `src/components/providers/ThemeProvider.tsx`

```tsx
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

**الاستخدام في `app/[locale]/layout.tsx`:**
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

---

## ✨ AnimatedSection

**الموقع:** `src/components/shared/AnimatedSection.tsx`

**الغرض:** Wrapper لإضافة fade-in على scroll لأي قسم

```tsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
```

---

## 🔢 Counter (للـ Stats)

**الموقع:** `src/components/shared/Counter.tsx`

```tsx
'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
}

export function Counter({ from = 0, to, duration = 2, suffix = '' }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration });
      return controls.stop;
    }
  }, [isInView, count, to, duration]);
  
  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}
```

**الاستخدام:**
```tsx
<Counter to={25} suffix="+" />
<Counter to={1000} suffix="+" />
```

---

## 🃏 ServiceCard

**الموقع:** `src/components/shared/ServiceCard.tsx`

```tsx
interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  accent?: boolean;
}

export function ServiceCard({ icon: Icon, title, description, href, accent }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group p-6 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-xl transition-all"
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
        accent ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
      )}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {href && (
        <Link href={href} className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
          اقرأ المزيد
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        </Link>
      )}
    </motion.div>
  );
}
```

---

## 📁 ProjectCard

نمط مماثل لـ ServiceCard لكن مع صورة بدل أيقونة.

---

## 💬 TestimonialCard

```tsx
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}
```

تصميم بسيط: علامة اقتباس كبيرة + النص + معلومات العميل في الأسفل.

---

## 🎁 CTABanner

Banner بسيط مع gradient + نص + زر، يُستخدم في نهاية الصفحات الفرعية.

```
┌─────────────────────────────────────────┐
│  هل لديك مشروع في ذهنك؟                │
│  دعنا نحوله إلى حقيقة.                 │
│                                         │
│  [تواصل معنا الآن]                      │
└─────────────────────────────────────────┘
```

---

## ✅ قواعد عامة لكل مكون

1. **TypeScript:** كل المكونات بـ `.tsx` مع types محددة
2. **Props Interface:** عرّف interface واضحة لكل مكون
3. **Default Exports:** للصفحات، **Named Exports** للمكونات
4. **Server Components first:** إلا إذا كان المكون يحتاج state أو hooks
5. **استخدم `cn()` utility** لدمج الـ classes:
   ```tsx
   import { cn } from '@/lib/utils';
   ```

---

**الخطوة التالية:** اقرأ `08-contact-form-spec.md`
