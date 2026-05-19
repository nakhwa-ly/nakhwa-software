# 02 — Tech Stack (التقنيات المختارة)

## 🎯 الفلسفة العامة

> **اختر تقنيات مستقرة وموثوقة، ليست bleeding-edge.** الأداء والصيانة أهم من الموضة.

---

## 🛠️ الجدول الكامل

| الفئة | التقنية | الإصدار | السبب |
|------|---------|--------|------|
| **Framework** | Next.js | 14+ (App Router) | SEO، i18n مدمج، RSC |
| **اللغة** | TypeScript | 5+ | أمان الأنواع |
| **Styling** | Tailwind CSS | 3+ | سرعة + تخصيص كامل |
| **Components** | shadcn/ui | latest | مكونات احترافية + مفتوحة |
| **Animation** | Framer Motion | 11+ | الأقوى في React |
| **i18n** | next-intl | 3+ | App Router + RTL |
| **Themes** | next-themes | latest | بدون وميض |
| **Forms** | React Hook Form | 7+ | الأداء + DX |
| **Validation** | Zod | 3+ | تحقق قوي + TS |
| **Icons** | lucide-react | latest | متناسقة + RTL |
| **Notifications** | sonner | latest | Toasts أنيقة |
| **Email** | Resend | latest | (لاحقاً) 3000 إيميل/شهر مجاناً |
| **Deployment** | Vercel | - | مجاني + سريع |

---

## 📦 أوامر التثبيت الكاملة

### 1. إنشاء المشروع
```bash
cd D:\
npx create-next-app@latest nakhwa-software --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint
cd nakhwa-software
```

### 2. تثبيت المكتبات الأساسية
```bash
npm install framer-motion next-intl next-themes react-hook-form zod @hookform/resolvers lucide-react
```

### 3. تثبيت shadcn/ui
```bash
npx shadcn@latest init
```

عند السؤال، اختر:
- **Style:** New York
- **Base color:** Slate
- **CSS variables:** Yes

### 4. إضافة مكونات shadcn/ui
```bash
npx shadcn@latest add button input textarea card label select sonner separator badge
```

### 5. (لاحقاً) Resend للإيميل
```bash
npm install resend
```

---

## 🔍 لماذا هذه الاختيارات؟

### Next.js 14 vs بدائل أخرى
| البديل | لماذا لا؟ |
|--------|----------|
| Vite + React | لا يدعم SSR/SEO بسهولة |
| Astro | جيد لكن أقل ديناميكية للنماذج |
| Flutter Web | bundle ضخم، SEO ضعيف |
| HTML/CSS عادي | بطيء التطوير، صعب الصيانة |

### next-intl vs next-i18next
- ✅ `next-intl` يدعم **App Router** بشكل أصلي
- ❌ `next-i18next` لا يزال يعتمد على Pages Router

### Framer Motion vs بدائل
| البديل | الحكم |
|--------|------|
| Framer Motion | ✅ الأقوى + توثيق ممتاز |
| GSAP | قوي لكن مدفوع لبعض الميزات |
| React Spring | جيد لكن API أصعب |
| CSS animations | محدود للأنيميشن المعقد |

### Zod vs Yup
- ✅ Zod تكامل أفضل مع TypeScript
- ✅ inference تلقائي للأنواع

---

## 📁 هيكل المشروع المتوقع

```
nakhwa-software/
├── nakhwa-software-Studies/    # مجلد الدراسات
├── public/
│   ├── images/
│   └── favicon.ico
├── messages/
│   ├── ar.json                 # ترجمة عربية
│   └── en.json                 # ترجمة إنجليزية
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        # الصفحة الرئيسية
│   │   │   ├── services/
│   │   │   ├── portfolio/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── ContactForm.tsx
│   │   └── shared/
│   │       ├── AnimatedSection.tsx
│   │       └── Counter.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validations.ts      # Zod schemas
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   └── middleware.ts
├── .env.local                  # المتغيرات السرية
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ متغيرات البيئة (.env.local)

```env
# مبدئياً (للتطوير)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# لاحقاً (الإنتاج)
NEXT_PUBLIC_SITE_URL=https://nakhwa.com.ly
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=nakhwa.libya@gmail.com
```

> **ملاحظة:** لا تضف `.env.local` إلى Git. تأكد من `.gitignore`.

---

## 🚦 معايير التشغيل

### الحد الأدنى
- Node.js 18.17 أو أعلى
- npm 9+ أو pnpm 8+
- 4GB RAM

### مستحسن
- Node.js 20 LTS
- pnpm (أسرع من npm)
- 8GB RAM

---

**الخطوة التالية:** اقرأ `03-design-system.md`
