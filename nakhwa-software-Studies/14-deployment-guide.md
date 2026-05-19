# 14 — دليل النشر (Deployment Guide)

> هذا الدليل يشرح خطوة بخطوة كيفية نشر الموقع على Vercel وربطه بدومين `nakhwa.com.ly`.

---

## 🚀 لماذا Vercel؟

| الميزة | التفصيل |
|-------|--------|
| **مجاني** | للمشاريع الشخصية والصغيرة |
| **سريع** | Edge Network عالمي |
| **سهل** | Push to deploy |
| **متخصص في Next.js** | أداء مثالي |
| **HTTPS تلقائي** | شهادة SSL مجانية |
| **Analytics مدمج** | (اختياري) |

---

## 📦 المرحلة 1: تجهيز المشروع للنشر

### 1.1 تأكد من أن المشروع يعمل محلياً
```bash
cd D:\nakhwa-software
npm run build
```

✅ يجب أن ينجح بدون أخطاء.

### 1.2 اختبر الـ production build محلياً
```bash
npm run start
```

افتح `http://localhost:3000` وتأكد أن كل شيء يعمل.

### 1.3 تأكد من `.gitignore`
يجب أن يحتوي على:
```
node_modules
.next
.env.local
.env*.local
.vercel
```

### 1.4 أنشئ مستودع GitHub
```bash
cd D:\nakhwa-software
git init
git add .
git commit -m "Initial commit: Nakhwa marketing website"

# على github.com: أنشئ مستودع جديد باسم "nakhwa-software"

git remote add origin https://github.com/USERNAME/nakhwa-software.git
git branch -M main
git push -u origin main
```

---

## ☁️ المرحلة 2: النشر على Vercel

### 2.1 إنشاء حساب Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجّل دخول بـ GitHub (مستحسن)
3. أكمل إنشاء الحساب

### 2.2 ربط المستودع
1. اضغط **"Add New..."** → **"Project"**
2. اختر مستودع `nakhwa-software`
3. اضغط **"Import"**

### 2.3 إعدادات البناء (Build Settings)
عادة Vercel يكتشفها تلقائياً، لكن تحقق من:

| الإعداد | القيمة |
|--------|-------|
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` (افتراضي) |
| **Output Directory** | `.next` (افتراضي) |
| **Install Command** | `npm install` (افتراضي) |
| **Node.js Version** | 20.x |

### 2.4 Environment Variables
أضف هذه المتغيرات (إذا كانت موجودة):

```env
NEXT_PUBLIC_SITE_URL=https://nakhwa.com.ly
```

**لاحقاً عند إضافة Resend:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=nakhwa.libya@gmail.com
```

### 2.5 اضغط Deploy
سيستغرق البناء 1-3 دقائق.

✅ بعد النجاح، ستحصل على URL مثل: `nakhwa-software-xyz.vercel.app`

---

## 🌐 المرحلة 3: ربط دومين nakhwa.com.ly

### 3.1 في لوحة Vercel
1. افتح المشروع
2. اذهب إلى **Settings** → **Domains**
3. اكتب: `nakhwa.com.ly`
4. اضغط **Add**

Vercel سيعطيك تعليمات للـ DNS records.

### 3.2 في لوحة DNS (مكان شراء الدومين)

#### A Records (للـ apex domain)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME (للـ www subdomain)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3.3 انتظر انتشار DNS
- عادة 5-30 دقيقة
- أحياناً حتى 24 ساعة
- يمكنك التحقق على [dnschecker.org](https://dnschecker.org)

### 3.4 HTTPS تلقائي
Vercel سيحصل على شهادة SSL من Let's Encrypt تلقائياً بمجرد انتشار الـ DNS.

---

## 🔁 المرحلة 4: Auto-Deploy عند الـ Push

بمجرد ربط GitHub:
- ✅ كل `git push` على branch `main` → نشر تلقائي للإنتاج
- ✅ كل `git push` على أي branch آخر → preview deployment

### مثال على workflow
```bash
# عمل تعديل محلياً
git add .
git commit -m "fix: update hero text"
git push

# Vercel سيبدأ البناء تلقائياً ويحدّث الموقع
```

---

## 📧 المرحلة 5: إضافة Resend (لاحقاً)

### 5.1 إنشاء حساب Resend
1. اذهب إلى [resend.com](https://resend.com)
2. سجّل دخول
3. تحقق من بريدك الإلكتروني

### 5.2 إضافة الدومين
1. في Resend Dashboard: **Domains** → **Add Domain**
2. اكتب: `nakhwa.com.ly`
3. Resend سيعطيك DNS records للإضافة:
   - SPF record
   - DKIM record
   - DMARC record (اختياري لكن مستحسن)

### 5.3 إضافة DNS Records في لوحة الدومين
أضف الـ records التي طلبها Resend.

### 5.4 الحصول على API Key
1. في Resend: **API Keys** → **Create API Key**
2. الاسم: `nakhwa-production`
3. الصلاحية: **Sending access**
4. انسخ الـ key (يبدأ بـ `re_`)

### 5.5 إضافة الـ Key إلى Vercel
1. في Vercel: **Settings** → **Environment Variables**
2. أضف:
   ```
   RESEND_API_KEY = re_xxxxxxxxxxxx
   CONTACT_EMAIL = nakhwa.libya@gmail.com
   ```
3. اضغط **Redeploy** على آخر deployment

### 5.6 تحديث الكود
في `app/api/contact/route.ts`، استبدل console.log بـ Resend code (كما في `08-contact-form-spec.md`).

---

## 📊 المرحلة 6: Vercel Analytics (اختياري)

### 6.1 تفعيل Analytics
1. في Vercel: **Analytics** → **Enable**
2. مجاني للمشاريع الصغيرة

### 6.2 إضافة الـ Web Analytics
```bash
npm install @vercel/analytics
```

في `app/[locale]/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/next';

// في الـ <body>:
<Analytics />
```

### 6.3 Speed Insights (اختياري)
```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

<SpeedInsights />
```

---

## 🔒 المرحلة 7: تحسينات الأمان

### 7.1 Headers في `next.config.mjs`
```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
```

### 7.2 Rate Limiting للـ API
استخدم Vercel Edge Config أو Upstash Redis لمنع spam على نموذج التواصل.

> **لاحقاً:** هذا تحسين للمرحلة الثانية.

---

## ✅ Checklist النشر النهائية

قبل اعتبار النشر مكتملاً:

### Pre-deploy
- [ ] `npm run build` ينجح محلياً
- [ ] لا أخطاء في console
- [ ] جميع الـ environment variables محددة
- [ ] `.env.local` ليس في Git

### Deployment
- [ ] المشروع منشور على Vercel
- [ ] دومين `nakhwa.com.ly` مربوط
- [ ] HTTPS يعمل (🔒 في المتصفح)
- [ ] `www.nakhwa.com.ly` يعيد توجيه إلى `nakhwa.com.ly`

### Post-deploy
- [ ] الموقع يعمل بسرعة (< 2s LCP)
- [ ] جميع الصفحات يمكن الوصول إليها
- [ ] نموذج التواصل يعمل
- [ ] Lighthouse Score 90+
- [ ] AR + EN يعملان
- [ ] الموبايل يعمل بسلاسة

---

## 🆘 حل المشاكل الشائعة

### المشكلة: Build فشل على Vercel
**الحل:**
1. تحقق من Build Logs في Vercel
2. شغّل `npm run build` محلياً
3. أصلح الأخطاء و push مجدداً

### المشكلة: 404 على الصفحات
**الحل:**
- تأكد أن `app/[locale]/page.tsx` موجود
- تأكد من إعدادات middleware

### المشكلة: الدومين لا يعمل بعد 24 ساعة
**الحل:**
1. تحقق من DNS records على dnschecker.org
2. تواصل مع مزود الدومين
3. تأكد من propagation وقت

### المشكلة: نموذج التواصل لا يرسل
**الحل:**
1. تحقق من Vercel Function logs
2. تأكد أن RESEND_API_KEY موجود
3. تحقق من Resend dashboard

---

## 📞 الدعم

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

**الخطوة التالية:** اقرأ `15-troubleshooting.md`
