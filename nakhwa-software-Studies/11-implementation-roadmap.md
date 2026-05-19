# 11 — خارطة الطريق التنفيذية (Implementation Roadmap)

> هذا الملف هو **المسار الكامل** الذي يجب أن يتبعه Claude Code من البداية إلى النهاية.

---

## 🎯 المراحل الكبرى

| # | المرحلة | المدة المتوقعة | الأولوية |
|---|---------|---------------|---------|
| 1 | الإعداد الأساسي | 15 دقيقة | 🔴 Critical |
| 2 | إعداد i18n + Themes | 20 دقيقة | 🔴 Critical |
| 3 | المكونات المشتركة | 30 دقيقة | 🔴 Critical |
| 4 | الصفحة الرئيسية | 90 دقيقة | 🔴 Critical |
| 5 | نموذج التواصل + API | 30 دقيقة | 🔴 Critical |
| 6 | الصفحات الفرعية | 60 دقيقة | 🟡 High |
| 7 | الأنيميشن والتحسينات | 30 دقيقة | 🟡 High |
| 8 | SEO + Metadata | 15 دقيقة | 🟢 Medium |
| 9 | الاختبار النهائي | 20 دقيقة | 🔴 Critical |
| 10 | README + Deployment Guide | 15 دقيقة | 🟡 High |

**الإجمالي:** ~5 ساعات

---

## 📋 المرحلة 1: الإعداد الأساسي (15 دقيقة)

### الخطوات
- [ ] **1.1** اقرأ `01-project-overview.md`
- [ ] **1.2** اقرأ `02-tech-stack.md`
- [ ] **1.3** اقرأ مهارة `frontend-design`:
  ```bash
  view /mnt/skills/public/frontend-design/SKILL.md
  ```
- [ ] **1.4** أنشئ المشروع:
  ```bash
  cd D:\
  npx create-next-app@latest nakhwa-software --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint
  cd nakhwa-software
  ```
- [ ] **1.5** ثبّت المكتبات:
  ```bash
  npm install framer-motion next-intl next-themes react-hook-form zod @hookform/resolvers lucide-react
  ```
- [ ] **1.6** ثبّت shadcn/ui:
  ```bash
  npx shadcn@latest init
  npx shadcn@latest add button input textarea card label select sonner separator badge
  ```
- [ ] **1.7** انسخ مجلد `nakhwa-software-Studies` إلى `D:\nakhwa-software\nakhwa-software-Studies\`
- [ ] **1.8** اختبر أن المشروع يعمل: `npm run dev`

### المخرجات المتوقعة
✅ مشروع Next.js يعمل على `http://localhost:3000`
✅ جميع المكتبات مثبتة
✅ shadcn/ui جاهز

### حدّث Progress Tracker
```markdown
✅ المرحلة 1: الإعداد الأساسي - مكتمل
```

---

## 📋 المرحلة 2: إعداد i18n + Themes (20 دقيقة)

### الخطوات
- [ ] **2.1** اقرأ `04-i18n-and-rtl.md` بالكامل
- [ ] **2.2** أنشئ `src/i18n/routing.ts`
- [ ] **2.3** أنشئ `src/i18n/request.ts`
- [ ] **2.4** أنشئ `src/middleware.ts`
- [ ] **2.5** عدّل `next.config.mjs` لإضافة plugin
- [ ] **2.6** أنشئ مجلد `messages/`
- [ ] **2.7** انسخ محتوى `ar.json` من `10-content-copy.md`
- [ ] **2.8** انسخ محتوى `en.json` من `10-content-copy.md`
- [ ] **2.9** أعد هيكلة `app/` إلى `app/[locale]/`
- [ ] **2.10** عدّل `app/[locale]/layout.tsx` لإضافة:
  - `NextIntlClientProvider`
  - `ThemeProvider`
  - `dir` و `lang` ديناميكياً
- [ ] **2.11** أضف خطوط Cairo و Inter من Google Fonts
- [ ] **2.12** اقرأ `03-design-system.md` وانسخ CSS variables إلى `globals.css`
- [ ] **2.13** عدّل `tailwind.config.ts` لإضافة الألوان والخطوط
- [ ] **2.14** اختبر: انتقل بين `/ar` و `/en` — يجب أن يتغير الاتجاه

### المخرجات المتوقعة
✅ `/ar` يعرض RTL
✅ `/en` يعرض LTR
✅ Light و Dark mode يعملان (بدون UI toggle بعد)
✅ ألوان وخطوط مطبقة

### اختبار
- افتح `localhost:3000` → يجب أن يحوّل تلقائياً إلى `/ar`
- افتح `localhost:3000/en` → يجب أن يعمل بالإنجليزية

---

## 📋 المرحلة 3: المكونات المشتركة (30 دقيقة)

### الخطوات
- [ ] **3.1** اقرأ `07-shared-components.md`
- [ ] **3.2** أنشئ `components/providers/ThemeProvider.tsx`
- [ ] **3.3** أنشئ `components/layout/LanguageSwitcher.tsx`
- [ ] **3.4** أنشئ `components/layout/ThemeToggle.tsx`
- [ ] **3.5** أنشئ `components/layout/Navbar.tsx`
- [ ] **3.6** أنشئ `components/layout/MobileMenu.tsx`
- [ ] **3.7** أنشئ `components/layout/Footer.tsx`
- [ ] **3.8** أنشئ `components/shared/AnimatedSection.tsx`
- [ ] **3.9** أنشئ `components/shared/Counter.tsx`
- [ ] **3.10** أضف Navbar و Footer إلى `app/[locale]/layout.tsx`
- [ ] **3.11** أضف `<Toaster />` من sonner إلى layout

### المخرجات المتوقعة
✅ Navbar يظهر مع جميع الروابط
✅ Footer يظهر
✅ LanguageSwitcher يبدّل اللغة
✅ ThemeToggle يبدّل الوضع
✅ Mobile menu يعمل على الشاشات الصغيرة

---

## 📋 المرحلة 4: الصفحة الرئيسية (90 دقيقة)

### الخطوات
- [ ] **4.1** اقرأ `06-pages-detailed-spec.md` (قسم الصفحة الرئيسية)
- [ ] **4.2** اقرأ `09-animations-guide.md`
- [ ] **4.3** **Hero Section** — `components/sections/Hero.tsx`
  - عنوان مع stagger animation
  - subtitle
  - الأزرار (CTAs)
  - خلفية متحركة (blobs)
- [ ] **4.4** **Services Section** — `components/sections/Services.tsx`
  - 6 بطاقات بـ icons من lucide-react
  - hover effects
  - stagger animation للظهور
- [ ] **4.5** **Features Section** — `components/sections/Features.tsx`
  - 4 نقاط تميز
- [ ] **4.6** **Portfolio Preview** — `components/sections/PortfolioPreview.tsx`
  - 3 مشاريع بطاقات
- [ ] **4.7** **Stats Section** — `components/sections/Stats.tsx`
  - 4 عدّادات متحركة
- [ ] **4.8** **Testimonials** — `components/sections/Testimonials.tsx`
  - 3 شهادات
- [ ] **4.9** **CTA Banner قبل الـ Footer**
- [ ] **4.10** اجمع كل الأقسام في `app/[locale]/page.tsx`

### المخرجات المتوقعة
✅ صفحة رئيسية كاملة بكل الأقسام
✅ الأنيميشن سلس
✅ متجاوبة على جميع المقاسات
✅ تعمل بالعربية والإنجليزية
✅ تعمل في Light و Dark mode

### نقطة تحقق مهمة
```bash
npm run build
```
يجب أن ينجح بدون أخطاء.

---

## 📋 المرحلة 5: نموذج التواصل + API (30 دقيقة)

### الخطوات
- [ ] **5.1** اقرأ `08-contact-form-spec.md` بالكامل
- [ ] **5.2** أنشئ `lib/validations.ts` مع Zod schema
- [ ] **5.3** أنشئ `components/sections/ContactForm.tsx`
- [ ] **5.4** أنشئ `app/api/contact/route.ts`
- [ ] **5.5** اربط النموذج بالـ API
- [ ] **5.6** اختبر:
  - إرسال نموذج صحيح → toast نجاح
  - إرسال نموذج خاطئ → رسائل خطأ
  - log في الـ terminal يظهر البيانات

### المخرجات المتوقعة
✅ النموذج يعمل بـ validation كامل
✅ Success/Error toasts تظهر
✅ البيانات تصل إلى الـ API

---

## 📋 المرحلة 6: الصفحات الفرعية (60 دقيقة)

### الخطوات
- [ ] **6.1** اقرأ القسم الخاص بكل صفحة في `06-pages-detailed-spec.md`
- [ ] **6.2** أنشئ `app/[locale]/services/page.tsx`
- [ ] **6.3** أنشئ `app/[locale]/about/page.tsx`
- [ ] **6.4** أنشئ `app/[locale]/portfolio/page.tsx`
- [ ] **6.5** أنشئ `app/[locale]/contact/page.tsx`
- [ ] **6.6** أضف Metadata لكل صفحة (`generateMetadata`)

### المخرجات المتوقعة
✅ جميع الصفحات تعمل
✅ التنقل بينها سلس
✅ كل صفحة لها metadata صحيحة

---

## 📋 المرحلة 7: الأنيميشن والتحسينات (30 دقيقة)

### الخطوات
- [ ] **7.1** راجع كل قسم وتأكد من الأنيميشن
- [ ] **7.2** أضف `prefers-reduced-motion` للأنيميشن المهمة
- [ ] **7.3** اختبر الأداء (Chrome DevTools → Performance)
- [ ] **7.4** قلل الـ bundle size إن أمكن
- [ ] **7.5** أضف loading states لكل العناصر الديناميكية
- [ ] **7.6** أضف Skeleton components حيث يلزم

---

## 📋 المرحلة 8: SEO + Metadata (15 دقيقة)

### الخطوات
- [ ] **8.1** أنشئ `app/sitemap.ts`
- [ ] **8.2** أنشئ `app/robots.ts`
- [ ] **8.3** أضف Open Graph images (placeholder للآن)
- [ ] **8.4** تأكد من أن كل صفحة لها `<title>` و `<meta description>`
- [ ] **8.5** أضف Schema.org markup (Organization)

---

## 📋 المرحلة 9: الاختبار النهائي (20 دقيقة)

### Checklist
- [ ] جميع الروابط تعمل
- [ ] جميع النصوص من الترجمة (لا hardcoded)
- [ ] AR + EN يعملان
- [ ] Light + Dark mode يعملان
- [ ] متجاوب على:
  - [ ] iPhone SE (375px)
  - [ ] iPad (768px)
  - [ ] Desktop (1280px)
  - [ ] Large screens (1920px)
- [ ] لا أخطاء في console
- [ ] `npm run build` ينجح
- [ ] Lighthouse Score 90+
- [ ] نموذج التواصل يعمل

---

## 📋 المرحلة 10: README + Deployment (15 دقيقة)

### الخطوات
- [ ] **10.1** أنشئ `README.md` شامل في جذر المشروع
- [ ] **10.2** اقرأ `14-deployment-guide.md`
- [ ] **10.3** اكتب تعليمات النشر على Vercel
- [ ] **10.4** اكتب تعليمات ربط دومين `nakhwa.com.ly`
- [ ] **10.5** اكتب تعليمات إضافة Resend مستقبلاً

---

## ✅ معايير "تم" (Definition of Done)

المشروع مكتمل عندما:

| المعيار | الحالة |
|--------|------|
| جميع المراحل الـ 10 منجزة | - |
| `npm run build` ينجح بدون أخطاء | - |
| `npm run dev` يعمل بسلاسة | - |
| Lighthouse: Performance 90+, SEO 90+, Accessibility 90+ | - |
| متجاوب على 4 مقاسات | - |
| AR + EN يعملان بدون مشاكل | - |
| Light + Dark mode يعملان بدون وميض | - |
| نموذج التواصل يعمل ويرسل البيانات | - |
| الأنيميشن سلس على جميع الأجهزة | - |
| README جاهز للنشر | - |

---

## 🚨 ماذا تفعل إذا واجهت مشكلة؟

1. **تحقق من `15-troubleshooting.md`** — قد تكون مشكلة معروفة
2. **سجّلها في `13-decisions-log.md`** مع الحل
3. **حدّث `15-troubleshooting.md`** بالحل الجديد
4. **استمر** — لا تتوقف عند مشكلة صغيرة

---

## 🎬 الخطوة الأولى

ابدأ بـ:
```bash
view /mnt/skills/public/frontend-design/SKILL.md
```

ثم:
```
cat nakhwa-software-Studies/01-project-overview.md
cat nakhwa-software-Studies/02-tech-stack.md
```

ثم نفّذ **المرحلة 1**.

---

**الخطوة التالية في القراءة:** `12-progress-tracker.md`
