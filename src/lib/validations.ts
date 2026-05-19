import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(100, { message: 'الاسم طويل جداً' }),

  email: z
    .string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'صيغة البريد الإلكتروني غير صحيحة' }),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[0-9\s\-]{8,}$/.test(val),
      { message: 'رقم الهاتف غير صحيح' }
    ),

  company: z.string().max(100, { message: 'اسم الشركة طويل جداً' }).optional(),

  service: z.enum(
    ['mobile', 'web', 'business-systems', 'database', 'delivery', 'consulting', 'other'],
    { error: 'اختر خدمة' }
  ),

  budget: z
    .enum(['less-1k', '1k-5k', '5k-10k', 'more-10k', 'not-sure'])
    .optional(),

  message: z
    .string()
    .min(10, { message: 'الرسالة قصيرة جداً (10 أحرف على الأقل)' })
    .max(1000, { message: 'الرسالة طويلة جداً' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
