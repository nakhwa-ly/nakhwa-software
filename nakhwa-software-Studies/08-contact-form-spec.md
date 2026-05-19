# 08 — مواصفات نموذج التواصل (Contact Form)

## 🎯 الهدف

نموذج احترافي يجمع معلومات كافية من العميل المحتمل لـ:
1. فهم احتياجاته
2. تأهيله (Lead Qualification)
3. التواصل معه بفاعلية

---

## 📋 الحقول الكاملة

| # | الحقل | النوع | إلزامي؟ | Validation |
|---|------|------|---------|-----------|
| 1 | الاسم الكامل | text | ✅ | min 2, max 100 |
| 2 | البريد الإلكتروني | email | ✅ | email format |
| 3 | رقم الهاتف | tel | ❌ | إذا أُدخل، صيغة صحيحة |
| 4 | اسم الشركة | text | ❌ | max 100 |
| 5 | الخدمة المطلوبة | select | ✅ | من القائمة |
| 6 | الميزانية | select | ❌ | من القائمة |
| 7 | الرسالة | textarea | ✅ | min 10, max 1000 |

---

## 🎨 التخطيط (Layout)

### الديسكتوب (Grid 2 columns)
```
┌─────────────────────┬─────────────────────┐
│  الاسم الكامل      │  البريد الإلكتروني  │
├─────────────────────┼─────────────────────┤
│  رقم الهاتف        │  اسم الشركة         │
├─────────────────────┼─────────────────────┤
│  الخدمة المطلوبة   │  الميزانية          │
├─────────────────────┴─────────────────────┤
│  الرسالة (textarea ممتد)                  │
├───────────────────────────────────────────┤
│              [إرسال الرسالة]              │
└───────────────────────────────────────────┘
```

### الموبايل
كل حقل في صف منفصل (column واحد).

---

## 🛠️ Zod Schema الكامل

**الموقع:** `src/lib/validations.ts`

```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(100, { message: 'الاسم طويل جداً' }),
    
  email: z.string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'صيغة البريد الإلكتروني غير صحيحة' }),
    
  phone: z.string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[0-9\s-]{8,}$/.test(val),
      { message: 'رقم الهاتف غير صحيح' }
    ),
    
  company: z.string()
    .max(100, { message: 'اسم الشركة طويل جداً' })
    .optional(),
    
  service: z.enum([
    'mobile',
    'web',
    'business-systems',
    'database',
    'delivery',
    'consulting',
    'other'
  ], { 
    errorMap: () => ({ message: 'اختر خدمة' }) 
  }),
  
  budget: z.enum([
    'less-1k',
    '1k-5k',
    '5k-10k',
    'more-10k',
    'not-sure'
  ]).optional(),
  
  message: z.string()
    .min(10, { message: 'الرسالة قصيرة جداً (10 أحرف على الأقل)' })
    .max(1000, { message: 'الرسالة طويلة جداً' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

> **ملاحظة مهمة:** رسائل الـ validation يجب أن تأتي من ملفات الترجمة في الإنتاج الحقيقي. لكن للبساطة الأولية، استخدم نصوصاً مباشرة ثم انقلها لاحقاً.

---

## 📦 خيارات الـ Select

### الخدمة
```ts
const services = [
  { value: 'mobile', labelAr: 'تطوير تطبيقات الموبايل', labelEn: 'Mobile App Development' },
  { value: 'web', labelAr: 'تطوير المواقع الإلكترونية', labelEn: 'Web Development' },
  { value: 'business-systems', labelAr: 'أنظمة إدارة الأعمال', labelEn: 'Business Systems' },
  { value: 'database', labelAr: 'تكامل قواعد البيانات', labelEn: 'Database Integration' },
  { value: 'delivery', labelAr: 'تطبيقات التوصيل', labelEn: 'Delivery Apps' },
  { value: 'consulting', labelAr: 'استشارات تقنية', labelEn: 'Technical Consulting' },
  { value: 'other', labelAr: 'أخرى', labelEn: 'Other' },
];
```

### الميزانية
```ts
const budgets = [
  { value: 'less-1k', labelAr: 'أقل من 1,000$', labelEn: 'Less than $1,000' },
  { value: '1k-5k', labelAr: '1,000$ - 5,000$', labelEn: '$1,000 - $5,000' },
  { value: '5k-10k', labelAr: '5,000$ - 10,000$', labelEn: '$5,000 - $10,000' },
  { value: 'more-10k', labelAr: 'أكثر من 10,000$', labelEn: 'More than $10,000' },
  { value: 'not-sure', labelAr: 'غير محدد', labelEn: 'Not sure yet' },
];
```

---

## 🎬 الكود الكامل للمكون

**الموقع:** `src/components/sections/ContactForm.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to send');
      
      toast.success(t('success'));
      reset();
    } catch (error) {
      toast.error(t('error'));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* الاسم */}
        <div className="space-y-2">
          <Label htmlFor="name">{t('name')} *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder={t('namePlaceholder')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        
        {/* الإيميل */}
        <div className="space-y-2">
          <Label htmlFor="email">{t('email')} *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        
        {/* الهاتف */}
        <div className="space-y-2">
          <Label htmlFor="phone">{t('phone')}</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+218 9X XXX XXXX"
            dir="ltr"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
        
        {/* الشركة */}
        <div className="space-y-2">
          <Label htmlFor="company">{t('company')}</Label>
          <Input id="company" {...register('company')} />
        </div>
        
        {/* الخدمة */}
        <div className="space-y-2">
          <Label htmlFor="service">{t('service')} *</Label>
          <Select onValueChange={(value) => setValue('service', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectService')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile">{t('services.mobile')}</SelectItem>
              <SelectItem value="web">{t('services.web')}</SelectItem>
              <SelectItem value="business-systems">{t('services.businessSystems')}</SelectItem>
              <SelectItem value="database">{t('services.database')}</SelectItem>
              <SelectItem value="delivery">{t('services.delivery')}</SelectItem>
              <SelectItem value="consulting">{t('services.consulting')}</SelectItem>
              <SelectItem value="other">{t('services.other')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-sm text-destructive">{errors.service.message}</p>
          )}
        </div>
        
        {/* الميزانية */}
        <div className="space-y-2">
          <Label htmlFor="budget">{t('budget')}</Label>
          <Select onValueChange={(value) => setValue('budget', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectBudget')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-1k">{t('budgets.less1k')}</SelectItem>
              <SelectItem value="1k-5k">{t('budgets.1kTo5k')}</SelectItem>
              <SelectItem value="5k-10k">{t('budgets.5kTo10k')}</SelectItem>
              <SelectItem value="more-10k">{t('budgets.more10k')}</SelectItem>
              <SelectItem value="not-sure">{t('budgets.notSure')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* الرسالة */}
      <div className="space-y-2">
        <Label htmlFor="message">{t('message')} *</Label>
        <Textarea
          id="message"
          rows={6}
          {...register('message')}
          placeholder={t('messagePlaceholder')}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>
      
      {/* زر الإرسال */}
      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting} 
        className="w-full sm:w-auto gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('submitting')}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 rtl:rotate-180" />
            {t('submit')}
          </>
        )}
      </Button>
    </form>
  );
}
```

---

## 🔌 API Route للنموذج

**الموقع:** `src/app/api/contact/route.ts`

### المرحلة 1: مجرد تسجيل في الـ console (للتطوير)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation على الـ server
    const validated = contactFormSchema.parse(body);
    
    // مرحلياً: log فقط
    console.log('📩 New contact form submission:', validated);
    
    // TODO: إضافة Resend هنا لاحقاً
    
    return NextResponse.json(
      { success: true, message: 'تم استلام رسالتك' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ' },
      { status: 500 }
    );
  }
}
```

### المرحلة 2: مع Resend (لاحقاً)

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// داخل POST handler:
await resend.emails.send({
  from: 'noreply@nakhwa.com.ly',
  to: process.env.CONTACT_EMAIL!,
  subject: `طلب جديد من ${validated.name}`,
  html: `
    <h2>طلب تواصل جديد</h2>
    <p><strong>الاسم:</strong> ${validated.name}</p>
    <p><strong>البريد:</strong> ${validated.email}</p>
    <p><strong>الهاتف:</strong> ${validated.phone || '-'}</p>
    <p><strong>الشركة:</strong> ${validated.company || '-'}</p>
    <p><strong>الخدمة:</strong> ${validated.service}</p>
    <p><strong>الميزانية:</strong> ${validated.budget || '-'}</p>
    <hr>
    <p><strong>الرسالة:</strong></p>
    <p>${validated.message}</p>
  `,
});
```

---

## 🎯 UX Details

### قبل الإرسال
- الـ Submit button معطّل عند بداية الإدخال
- يصبح enabled بعد ملء الحقول الإلزامية

### أثناء الإرسال
- زر "إرسال" يصبح "جارٍ الإرسال..."
- Spinner ظاهر
- جميع الحقول معطّلة (disabled)

### بعد النجاح
- Toast بنجاح
- النموذج يُمسح تلقائياً (`reset()`)
- (اختياري) scroll to top

### بعد الفشل
- Toast بالخطأ
- النموذج يبقى ممتلئاً
- Console error للـ debugging

---

## ✅ Checklist النموذج

- [ ] جميع الحقول الإلزامية محددة بـ `*`
- [ ] رسائل الـ validation واضحة وبالعربية/الإنجليزية
- [ ] حقل الهاتف يدعم الأرقام الدولية
- [ ] Loading state واضح
- [ ] Success/Error toasts تعمل
- [ ] Form يُمسح بعد النجاح
- [ ] الـ API route validates على الـ server
- [ ] يعمل في RTL و LTR

---

**الخطوة التالية:** اقرأ `09-animations-guide.md`
