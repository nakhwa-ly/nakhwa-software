# 03 — نظام التصميم (Design System)

## 🎨 لوحة الألوان (Color Palette)

### الألوان الأساسية

| الاسم | HEX | RGB | الاستخدام |
|------|-----|-----|----------|
| **Primary** | `#0066CC` | `0, 102, 204` | الأزرار الرئيسية، الروابط، التركيز |
| **Primary Dark** | `#0052A3` | `0, 82, 163` | Hover للأزرار الأساسية |
| **Primary Light** | `#3385D6` | `51, 133, 214` | الخلفيات الناعمة |
| **Accent (Gold)** | `#D4AF37` | `212, 175, 55` | التميز، CTAs ثانوية |
| **Accent Dark** | `#B8941F` | `184, 148, 31` | Hover الذهبي |

### الألوان المحايدة (Neutrals)

| الاسم | Light Mode | Dark Mode |
|------|-----------|-----------|
| **Background** | `#FFFFFF` | `#0A0A0F` |
| **Surface** | `#F8FAFC` | `#13131A` |
| **Card** | `#FFFFFF` | `#1A1A24` |
| **Border** | `#E2E8F0` | `#27272F` |
| **Text Primary** | `#0F172A` | `#F1F5F9` |
| **Text Secondary** | `#475569` | `#94A3B8` |
| **Text Muted** | `#94A3B8` | `#64748B` |

### ألوان الحالة

| الحالة | اللون | الاستخدام |
|--------|------|----------|
| **Success** | `#10B981` | رسائل النجاح |
| **Warning** | `#F59E0B` | التحذيرات |
| **Error** | `#EF4444` | الأخطاء |
| **Info** | `#3B82F6` | المعلومات |

---

## 🌗 CSS Variables (في `globals.css`)

```css
@layer base {
  :root {
    /* Primary */
    --primary: 211 100% 40%;          /* #0066CC */
    --primary-foreground: 0 0% 100%;
    
    /* Accent (Gold) */
    --accent: 46 65% 52%;             /* #D4AF37 */
    --accent-foreground: 0 0% 100%;
    
    /* Neutrals - Light Mode */
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 211 100% 40%;
    
    /* Radius */
    --radius: 0.75rem;
  }

  .dark {
    --background: 240 16% 5%;          /* #0A0A0F */
    --foreground: 210 40% 96%;
    --card: 240 13% 12%;               /* #1A1A24 */
    --card-foreground: 210 40% 96%;
    --muted: 240 8% 16%;
    --muted-foreground: 215 16% 65%;
    --border: 240 6% 18%;
    --input: 240 6% 18%;
    --ring: 211 100% 50%;
  }
}
```

---

## ✍️ نظام الخطوط (Typography)

### الخطوط المستخدمة

| اللغة | الخط | المصدر | الأوزان |
|------|-----|-------|---------|
| **العربية** | Cairo | Google Fonts | 400, 500, 600, 700, 800 |
| **الإنجليزية** | Inter | Google Fonts | 400, 500, 600, 700, 800 |

### التطبيق في `app/[locale]/layout.tsx`

```tsx
import { Cairo, Inter } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// في الـ HTML:
<html className={`${cairo.variable} ${inter.variable}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

### في `tailwind.config.ts`

```ts
fontFamily: {
  arabic: ['var(--font-cairo)', 'sans-serif'],
  latin: ['var(--font-inter)', 'sans-serif'],
  sans: ['var(--font-cairo)', 'var(--font-inter)', 'sans-serif'],
}
```

---

## 📏 المقاسات (Type Scale)

| الاسم | الحجم | الاستخدام |
|------|------|----------|
| `text-xs` | 12px | Labels صغيرة |
| `text-sm` | 14px | نص ثانوي |
| `text-base` | 16px | النص الأساسي |
| `text-lg` | 18px | نص بارز |
| `text-xl` | 20px | عناوين فرعية |
| `text-2xl` | 24px | h3 |
| `text-3xl` | 30px | h2 |
| `text-4xl` | 36px | h1 على الموبايل |
| `text-5xl` | 48px | Hero على الموبايل |
| `text-6xl` | 60px | h1 على الديسكتوب |
| `text-7xl` | 72px | Hero على الديسكتوب |

### قاعدة سريعة للعناوين

```tsx
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
<h3 className="text-2xl md:text-3xl font-semibold">
```

---

## 📐 التباعد (Spacing)

استخدم نظام Tailwind الافتراضي (4px scale):

| استخدام | القيمة |
|--------|-------|
| Padding داخل بطاقة | `p-6` (24px) |
| Gap بين العناصر | `gap-4` أو `gap-6` |
| Section padding عمودي | `py-16 md:py-24 lg:py-32` |
| Container max-width | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |

---

## 🎨 الانحناءات (Border Radius)

| الاسم | القيمة | الاستخدام |
|------|------|----------|
| `rounded-sm` | 2px | عناصر صغيرة |
| `rounded` | 4px | Inputs |
| `rounded-md` | 6px | Badges |
| `rounded-lg` | 8px | الأزرار |
| `rounded-xl` | 12px | البطاقات (الافتراضي) |
| `rounded-2xl` | 16px | بطاقات بارزة |
| `rounded-3xl` | 24px | Hero elements |
| `rounded-full` | 9999px | Avatars, pills |

---

## 🌑 الظلال (Shadows)

```css
/* Light mode */
shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow:      0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1)
shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1)
shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1)
shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)

/* Custom (للبطاقات) */
shadow-card: 0 4px 24px -8px rgb(0 102 204 / 0.1)
```

---

## 🎭 التدرجات (Gradients)

```css
/* Hero background */
bg-gradient-to-br from-primary/10 via-background to-accent/5

/* Card hover */
bg-gradient-to-br from-primary to-primary-dark

/* Text gradient (للعناوين البارزة) */
bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent
```

---

## 🖼️ القواعد البصرية

### ✅ افعل
- استخدم whitespace بسخاء
- اجعل التباين عالياً للنص
- استخدم max 3 ألوان في الصفحة الواحدة
- اجعل الـ CTAs بارزة بصرياً
- احترم RTL في كل التفاصيل

### ❌ لا تفعل
- لا تستخدم drop shadows ثقيلة
- لا تستخدم gradients مبالغ فيها
- لا تستخدم أكثر من خطين في الصفحة
- لا تستخدم emojis في UI رسمي (إلا للـ stats أو الخدمات)
- لا تنسى dark mode عند التصميم

---

## 🎯 مكونات shadcn/ui المخصصة

### Button Variants المتوقعة
```tsx
<Button>Default</Button>                    // Primary
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Custom variant للذهبي
<Button className="bg-accent hover:bg-accent-dark">Gold CTA</Button>
```

---

## 📱 Breakpoints المعتمدة

| الاسم | القيمة | الجهاز |
|------|------|--------|
| `sm` | 640px | موبايل أفقي |
| `md` | 768px | تابلت |
| `lg` | 1024px | لابتوب |
| `xl` | 1280px | ديسكتوب |
| `2xl` | 1536px | شاشات كبيرة |

> **القاعدة:** Mobile First دائماً. ابدأ بدون prefix ثم أضف `md:` للأكبر.

---

**الخطوة التالية:** اقرأ `04-i18n-and-rtl.md`
