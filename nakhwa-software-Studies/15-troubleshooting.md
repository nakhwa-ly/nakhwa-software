# 15 — حل المشاكل الشائعة (Troubleshooting)

> مرجع للمشاكل المتوقعة وحلولها. أضف أي مشكلة جديدة هنا مع حلها.

---

## 🎨 مشاكل الـ Theme

### المشكلة: Hydration mismatch مع next-themes
**الأعراض:**
```
Warning: Hydration failed because the initial UI does not match...
```

**السبب:**
الـ Theme يُحدد على الـ client، لكن الـ HTML يُولّد على الـ server بثيم مختلف.

**الحل:**
1. أضف `suppressHydrationWarning` على الـ `<html>`:
```tsx
<html lang={locale} dir={dir} suppressHydrationWarning>
```

2. في `ThemeToggle.tsx`، استخدم `mounted` state:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <div className="w-9 h-9" />;
```

3. في `ThemeProvider`:
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange  // ← مهم
>
```

---

### المشكلة: Flash of incorrect theme على التحميل الأول
**السبب:** Theme provider يُحمّل بعد الـ HTML.

**الحل:**
1. تأكد أن `ThemeProvider` في `app/[locale]/layout.tsx`
2. استخدم `disableTransitionOnChange`
3. تأكد من إضافة الكود التالي في `<head>` (next-themes يفعلها تلقائياً):
```html
<script>
  // يُحقن تلقائياً بواسطة next-themes
</script>
```

---

## 🌍 مشاكل الـ i18n و RTL

### المشكلة: الأنيميشن يتحرك في الاتجاه الخاطئ في العربية
**الأعراض:** عنصر يدخل من اليمين في الإنجليزية لكن يدخل من اليسار في العربية (أو العكس).

**الحل:**
```tsx
'use client';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export function SlideIn({ children }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return (
    <motion.div
      initial={{ x: isRTL ? 50 : -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
```

---

### المشكلة: Tailwind RTL classes لا تعمل
**السبب:** نسخة Tailwind قديمة، أو `dir` غير محدد.

**الحل:**
1. تأكد من Tailwind 3.3+
2. تأكد من `<html dir="rtl">` في العربية
3. استخدم Logical Properties:
   - `ps-4` بدل `pl-4`
   - `me-2` بدل `mr-2`
   - `text-start` بدل `text-left`

---

### المشكلة: next-intl middleware يتعارض مع routes أخرى
**الأعراض:** Routes معينة (مثل `/api/...`) لا تعمل بعد إضافة middleware.

**الحل:** عدّل `matcher` في `middleware.ts`:
```ts
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  // ↑ يستثني api routes، _next assets، والملفات الثابتة
};
```

---

### المشكلة: ترجمة لا تظهر، تعرض المفتاح بدلاً
**الأعراض:** `t('hero.title')` يعرض `hero.title` بدلاً من النص.

**الأسباب الشائعة:**
1. المفتاح غير موجود في `messages/ar.json`
2. JSON syntax خاطئ (فاصلة زائدة، quote ناقص)
3. الـ namespace خاطئ في `useTranslations('namespace')`

**الحل:**
1. تحقق من ملف الترجمة
2. استخدم JSON validator
3. تأكد من تطابق الـ namespace

---

### المشكلة: Cairo font لا يحمّل
**الأعراض:** النص العربي يظهر بخط افتراضي قبيح.

**الحل:**
```tsx
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],  // ← مهم جداً
  variable: '--font-cairo',
  display: 'swap',
});
```

تأكد من إضافة `arabic` في `subsets`.

---

## 🎬 مشاكل الأنيميشن

### المشكلة: الأنيميشن يتكرر عند كل scroll
**السبب:** لم تستخدم `once: true` في viewport.

**الحل:**
```tsx
<motion.div
  viewport={{ once: true, margin: '-100px' }}
  // ...
>
```

---

### المشكلة: لا يوجد أنيميشن على بعض المكونات
**الأسباب:**
1. المكون Server Component (لا يدعم Framer Motion)
2. الأنيميشن مخفي خلف overflow

**الحل:**
1. أضف `'use client'` في أعلى الملف
2. تحقق من parent containers (لا overflow hidden يخفي العنصر)

---

### المشكلة: الأنيميشن lag على الموبايل
**السبب:** استخدام خصائص ثقيلة (مثل `width`, `height`, `top`).

**الحل:** استخدم فقط `transform` و `opacity`:
```tsx
// ❌ سيء
animate={{ width: '100%' }}

// ✅ جيد
animate={{ scale: 1, x: 0 }}
```

---

### المشكلة: Counter لا يبدأ
**السبب:** المكون لا يدخل في الـ viewport (مخفي أو في tab خفي).

**الحل:**
- تأكد أن المكون مرئي
- استخدم `useInView` مع `ref` صحيح
- جرّب `margin: '-50px'` لتفعيله مبكراً

---

## 📝 مشاكل النموذج

### المشكلة: Validation لا تعمل
**السبب:** لم تستخدم `zodResolver`.

**الحل:**
```tsx
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit } = useForm({
  resolver: zodResolver(contactFormSchema),
});
```

---

### المشكلة: Select من shadcn/ui لا يحفظ القيمة
**السبب:** Select لا يستخدم `register` مباشرة.

**الحل:** استخدم `setValue`:
```tsx
<Select onValueChange={(value) => setValue('service', value as any)}>
```

---

### المشكلة: النموذج يُرسل عدة مرات
**السبب:** زر الإرسال غير معطّل أثناء `isSubmitting`.

**الحل:**
```tsx
<Button disabled={isSubmitting}>
  {isSubmitting ? 'جارٍ الإرسال...' : 'إرسال'}
</Button>
```

---

### المشكلة: API لا يستقبل البيانات
**السبب:** Content-Type خاطئ، أو body غير JSON.

**الحل:**
```tsx
await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

---

## 🏗️ مشاكل البناء (Build)

### المشكلة: `npm run build` فشل بـ TypeScript errors
**الحل:**
1. شغّل `npm run build` محلياً وحلّ كل خطأ
2. لا تتجاهل warnings — حلّها
3. تأكد من `tsconfig.json` strict mode

---

### المشكلة: "Module not found"
**الأسباب:**
1. import path خاطئ
2. ملف لم يُحفظ بعد
3. case sensitivity (Windows vs Linux)

**الحل:**
1. تحقق من الـ path
2. تأكد من حالة الأحرف (capital letters)
3. استخدم `@/` prefix دائماً للـ absolute imports

---

### المشكلة: Static rendering فشل
**السبب:** استخدام client-only APIs في Server Component.

**الحل:**
- استخدم `'use client'` على المكون
- أو لف الجزء الـ client في dynamic import:
```tsx
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  ssr: false,
});
```

---

## 🚀 مشاكل النشر (Deployment)

### المشكلة: Vercel build فشل لكن يعمل محلياً
**الأسباب:**
1. Node.js version مختلفة
2. متغير بيئة مفقود
3. حالة الأحرف (Vercel على Linux، case-sensitive)

**الحل:**
1. حدد Node.js version في Vercel settings → 20.x
2. تحقق من Environment Variables
3. راجع جميع الـ imports للـ casing

---

### المشكلة: 404 على صفحات فرعية بعد النشر
**السبب:** `app/[locale]/page.tsx` يعمل لكن `app/[locale]/services/page.tsx` لا.

**الحل:**
1. تأكد من بنية المجلدات
2. تأكد أن `page.tsx` (وليس `Page.tsx`)
3. تأكد من `export default`

---

### المشكلة: الدومين لا يعمل بعد ربط DNS
**الحل:**
1. انتظر propagation (24 ساعة كحد أقصى)
2. تحقق على [dnschecker.org](https://dnschecker.org)
3. تأكد من A record و CNAME صحيحان

---

## 🔍 مشاكل SEO

### المشكلة: Google لا يظهر اللغة الصحيحة
**الحل:**
1. تأكد من `<html lang="ar">` صحيح
2. أضف hreflang tags:
```tsx
alternates: {
  languages: {
    'ar': 'https://nakhwa.com.ly/ar',
    'en': 'https://nakhwa.com.ly/en',
  },
}
```

---

### المشكلة: Open Graph image لا تظهر
**الحل:**
1. تأكد من absolute URL للصورة
2. الحجم: 1200x630px
3. اختبر على [opengraph.xyz](https://www.opengraph.xyz)

---

## ⚠️ تحذيرات شائعة

### Warning: "Image with src ... has incorrect natural dimensions"
**الحل:** أضف `width` و `height` لـ `<Image>` أو استخدم `fill`.

---

### Warning: "Function components cannot be given refs"
**الحل:** استخدم `React.forwardRef` للمكونات التي تحتاج refs.

---

### Warning: "A title element received a string"
**الحل:** استخدم `metadata` API بدل `<title>` مباشرة:
```tsx
export const metadata = {
  title: 'Nakhwa',
};
```

---

## 🆕 إضافة مشكلة جديدة

عندما تواجه مشكلة لم تُذكر هنا، أضفها بهذا الشكل:

```markdown
### المشكلة: [وصف موجز]
**الأعراض:** [ماذا يحدث؟]
**السبب:** [لماذا يحدث؟]
**الحل:**
[الخطوات أو الكود]
```

---

## 📊 الإحصائيات

| الفئة | عدد المشاكل |
|------|------------|
| Theme | 2 |
| i18n & RTL | 5 |
| Animations | 4 |
| Forms | 4 |
| Build | 3 |
| Deployment | 3 |
| SEO | 2 |
| **الإجمالي** | **23** |

---

## 🔗 مراجع مفيدة

- [Next.js Errors](https://nextjs.org/docs/messages)
- [Framer Motion Troubleshooting](https://www.framer.com/motion/troubleshooting/)
- [next-intl FAQ](https://next-intl-docs.vercel.app/docs/usage/faq)
- [Vercel Logs](https://vercel.com/docs/deployments/logs)

---

**نهاية ملفات الدراسات.** عُد إلى `README.md` للفهرس الكامل.
