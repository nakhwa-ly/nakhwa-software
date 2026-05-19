# 04 — استراتيجية الترجمة (i18n) و RTL

## 🌍 الإعدادات الأساسية

| الإعداد | القيمة |
|--------|-------|
| **اللغة الافتراضية** | العربية (`ar`) |
| **اللغة الثانوية** | الإنجليزية (`en`) |
| **استراتيجية URL** | `prefix` — `/ar/...` و `/en/...` |
| **المكتبة** | `next-intl@3+` |
| **اتجاه العربية** | RTL |
| **اتجاه الإنجليزية** | LTR |

---

## 📁 هيكل ملفات الترجمة

```
nakhwa-software/
├── messages/
│   ├── ar.json        ← الترجمة العربية
│   └── en.json        ← الترجمة الإنجليزية
└── src/
    ├── i18n/
    │   ├── routing.ts     ← إعدادات الـ routing
    │   └── request.ts     ← تحميل الرسائل
    └── middleware.ts      ← middleware الـ locale
```

---

## ⚙️ إعداد next-intl خطوة بخطوة

### 1. `src/i18n/routing.ts`
```ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always', // /ar/... و /en/...
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

### 2. `src/i18n/request.ts`
```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### 3. `src/middleware.ts`
```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

### 4. `next.config.mjs`
```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {};

export default withNextIntl(nextConfig);
```

### 5. `src/app/[locale]/layout.tsx`
```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## 📝 استخدام الترجمة في المكونات

### Server Component
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('hero');
  
  return (
    <h1>{t('title')}</h1>
  );
}
```

### Client Component
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  
  return (
    <button>{t('submit')}</button>
  );
}
```

---

## ↔️ التعامل مع RTL

### 1. Tailwind RTL utilities

استخدم Tailwind v3.3+ التي تدعم `rtl:` و `ltr:` modifiers:

```tsx
// مثال: padding يتغير حسب الاتجاه
<div className="ps-4 pe-2">  // padding-inline-start, padding-inline-end
  // أو
<div className="rtl:pr-4 ltr:pl-4">
```

### 2. القاعدة الذهبية: استخدم Logical Properties

| ❌ تجنّب | ✅ استخدم |
|---------|----------|
| `pl-4` | `ps-4` (padding-inline-start) |
| `pr-4` | `pe-4` (padding-inline-end) |
| `ml-4` | `ms-4` (margin-inline-start) |
| `mr-4` | `me-4` (margin-inline-end) |
| `left-0` | `start-0` |
| `right-0` | `end-0` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |

### 3. الأيقونات الاتجاهية

```tsx
// أيقونة السهم — تنقلب تلقائياً
import { ArrowRight } from 'lucide-react';

<ArrowRight className="rtl:rotate-180" />
```

### 4. الأنيميشن الاتجاهي

```tsx
// في Framer Motion
const slideVariants = {
  hidden: { x: locale === 'ar' ? 50 : -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};
```

---

## 📄 هيكل ملفات الترجمة

### `messages/ar.json` (مثال)
```json
{
  "navbar": {
    "home": "الرئيسية",
    "services": "خدماتنا",
    "portfolio": "أعمالنا",
    "about": "من نحن",
    "contact": "تواصل معنا",
    "cta": "احصل على عرض سعر"
  },
  "hero": {
    "headline": "نخوة للحلول البرمجية",
    "subheadline": "نبني تطبيقات الجيل القادم بإتقان حرفي",
    "ctaPrimary": "ابدأ مشروعك",
    "ctaSecondary": "تصفح أعمالنا"
  },
  "services": {
    "sectionTitle": "خدماتنا",
    "sectionSubtitle": "حلول برمجية متكاملة لنمو أعمالك",
    "mobile": {
      "title": "تطبيقات الموبايل",
      "description": "تطبيقات Flutter عالية الأداء لـ iOS و Android"
    }
  },
  "contact": {
    "name": "الاسم الكامل",
    "email": "البريد الإلكتروني",
    "phone": "رقم الهاتف",
    "company": "اسم الشركة",
    "service": "الخدمة المطلوبة",
    "budget": "الميزانية",
    "message": "رسالتك",
    "submit": "إرسال",
    "submitting": "جارٍ الإرسال...",
    "success": "تم استلام رسالتك بنجاح",
    "error": "حدث خطأ، حاول مرة أخرى"
  }
}
```

### `messages/en.json` (نفس البنية)
```json
{
  "navbar": {
    "home": "Home",
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "contact": "Contact",
    "cta": "Get a Quote"
  },
  "hero": {
    "headline": "Nakhwa Software Solutions",
    "subheadline": "Crafting next-generation software with artisanal precision",
    "ctaPrimary": "Start Your Project",
    "ctaSecondary": "View Our Work"
  }
}
```

> **المحتوى الكامل في:** `10-content-copy.md`

---

## 🔄 Language Switcher Component

```tsx
'use client';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  
  const switchLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: newLocale });
  };
  
  return (
    <button onClick={switchLocale} className="font-medium">
      {locale === 'ar' ? 'EN' : 'العربية'}
    </button>
  );
}
```

---

## ⚠️ المخاطر الشائعة في RTL

| المشكلة | الحل |
|--------|------|
| الأيقونات معكوسة بشكل خاطئ | استخدم `rtl:rotate-180` فقط للأسهم |
| الـ flexbox order خاطئ | flexbox ينعكس تلقائياً مع `dir="rtl"` |
| الأنيميشن في الاتجاه الخاطئ | تحقق من `x` في Framer Motion |
| الأرقام بالعربية | استخدم `tabular-nums` + `font-feature-settings` |
| محاذاة الـ form labels | استخدم `text-start` بدلاً من `text-left` |

---

## ✅ Checklist RTL

عند بناء أي مكون، تحقق من:
- [ ] استخدمت `ps/pe/ms/me` بدل `pl/pr/ml/mr`
- [ ] استخدمت `start/end` بدل `left/right`
- [ ] استخدمت `text-start` بدل `text-left`
- [ ] الأيقونات الاتجاهية تنقلب بـ `rtl:rotate-180`
- [ ] الأنيميشن في الاتجاه الصحيح للغة
- [ ] الـ form labels محاذية بشكل صحيح
- [ ] النصوص الإنجليزية المختلطة (URLs, emails) تظهر بشكل صحيح

---

**الخطوة التالية:** اقرأ `05-site-structure.md`
