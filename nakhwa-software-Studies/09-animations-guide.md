# 09 — دليل الأنيميشن (Animations Guide)

## 🎯 الفلسفة العامة

> **الأنيميشن يخدم تجربة المستخدم، لا يعطلها.**

- ⚡ كل أنيميشن يجب أن يكون **سلساً (60fps)**
- ⏱️ الأنيميشن **سريع** (200-600ms عادة)
- 🎨 **متناسق** عبر الموقع كله
- ♿ **يحترم** `prefers-reduced-motion`

---

## 📦 المكتبة المستخدمة

**Framer Motion v11+** — الخيار الوحيد للأنيميشن المعقد في React.

```bash
npm install framer-motion
```

---

## 🎬 أنواع الأنيميشن في الموقع

### 1. **Page Load Animations** — عند تحميل الصفحة
### 2. **Scroll Animations** — عند الـ scroll
### 3. **Hover/Tap Animations** — تفاعل المستخدم
### 4. **Background Animations** — خلفيات متحركة
### 5. **Transition Animations** — انتقالات بين الصفحات

---

## 1️⃣ Page Load — Hero Animation

### Stagger Text Reveal للعنوان الرئيسي

```tsx
'use client';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function HeroTitle({ words }: { words: string[] }) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-5xl md:text-7xl font-bold"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block me-3">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

---

## 2️⃣ Scroll Animations — Fade In on Scroll

### استخدام `whileInView`

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  المحتوى هنا
</motion.div>
```

### Wrapper مكوّن لإعادة الاستخدام

استخدم `AnimatedSection` من `07-shared-components.md`.

### للـ Grids — Stagger Children

```tsx
const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

<motion.div
  variants={gridContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {services.map((service) => (
    <motion.div key={service.id} variants={gridItem}>
      <ServiceCard {...service} />
    </motion.div>
  ))}
</motion.div>
```

---

## 3️⃣ Hover Animations

### Service Card Lift

```tsx
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
```

### Button Micro-interaction

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
```

### Icon Rotation on Hover

```tsx
<motion.div whileHover={{ rotate: 12 }}>
  <Icon />
</motion.div>
```

---

## 4️⃣ Background Animations (Hero)

### Animated Blobs

```tsx
<div className="absolute inset-0 overflow-hidden -z-10">
  <motion.div
    animate={{
      x: [0, 100, 0],
      y: [0, -50, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute top-1/4 start-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
  />
  <motion.div
    animate={{
      x: [0, -80, 0],
      y: [0, 60, 0],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute bottom-1/4 end-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
  />
</div>
```

### Gradient Mesh (CSS only)

```css
.gradient-mesh {
  background: 
    radial-gradient(at 27% 37%, hsl(var(--primary) / 0.15) 0px, transparent 50%),
    radial-gradient(at 97% 21%, hsl(var(--accent) / 0.1) 0px, transparent 50%),
    radial-gradient(at 52% 99%, hsl(var(--primary) / 0.1) 0px, transparent 50%);
}
```

---

## 5️⃣ Animated Counter

> الكود الكامل في `07-shared-components.md` — مكون `Counter`

```tsx
<Counter from={0} to={25} duration={2} suffix="+" />
```

---

## 6️⃣ Page Transitions

### بسيط — Fade between pages

في `app/[locale]/template.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## ↔️ RTL-Aware Animations

### القاعدة الذهبية
عند الحاجة لحركة من اليسار/اليمين، استخدم `useLocale` لتحديد الاتجاه:

```tsx
'use client';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

export function SlideInCard({ children }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

> **ملاحظة:** الـ Fade-up (`y` axis) لا يتأثر بـ RTL، استخدمه بأمان دائماً.

---

## ♿ احترام Reduced Motion

```tsx
import { useReducedMotion } from 'framer-motion';

export function AnimatedHero() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
    >
      ...
    </motion.div>
  );
}
```

---

## 📊 الإعدادات القياسية (Standard Timings)

| الحدث | المدة | Easing |
|------|------|--------|
| Hover (button) | 200ms | spring |
| Hover (card) | 300ms | spring |
| Fade in (small element) | 400ms | easeOut |
| Fade in (section) | 600ms | easeOut |
| Page transition | 300ms | easeInOut |
| Counter | 2000ms | easeOut |
| Background blob | 20000ms | easeInOut (infinite) |

---

## ✅ Checklist الأنيميشن لكل صفحة

- [ ] Hero يحتوي على staggered reveal
- [ ] كل قسم له fade-in عند الـ scroll
- [ ] الـ cards لها hover effect
- [ ] الأزرار لها hover + tap effect
- [ ] الـ counters تعمل عند الظهور
- [ ] الخلفية المتحركة في Hero لا تستهلك CPU
- [ ] الأنيميشن في الاتجاه الصحيح (RTL)
- [ ] `prefers-reduced-motion` محترم

---

## ⚠️ المخاطر الشائعة

| المشكلة | السبب | الحل |
|--------|------|------|
| Lag في الأنيميشن | استخدام خصائص ثقيلة | استخدم `transform` و `opacity` فقط |
| Hydration mismatch | useMotionValue يختلف | استخدم `mounted` state أو SSR-safe values |
| الأنيميشن يتكرر | عدم استخدام `once: true` | أضف `viewport={{ once: true }}` |
| Scroll lagging | كثير من العناصر تتحرك | قلل العدد أو استخدم Intersection Observer |
| RTL أنيميشن خاطئ | استخدام x بقيمة ثابتة | استخدم `useLocale` كما في القاعدة |

---

## 🎁 أنيميشن إضافية موصى بها

### 1. Loading Skeleton
```tsx
<div className="animate-pulse bg-muted rounded-xl h-40" />
```

### 2. Shimmer Effect
```tsx
<motion.div
  className="bg-gradient-to-r from-muted via-muted-foreground/10 to-muted"
  animate={{
    backgroundPosition: ['200% 0', '-200% 0'],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: 'linear',
  }}
  style={{
    backgroundSize: '200% 100%',
  }}
/>
```

### 3. Scroll Indicator في Hero
```tsx
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="absolute bottom-8 start-1/2 -translate-x-1/2"
>
  <ChevronDown />
</motion.div>
```

---

**الخطوة التالية:** اقرأ `10-content-copy.md`
