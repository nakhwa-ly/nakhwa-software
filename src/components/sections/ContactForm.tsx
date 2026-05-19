'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            {t('name')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            {...register('name')}
            placeholder={t('namePlaceholder')}
            disabled={isSubmitting}
            className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            {t('email')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder={t('emailPlaceholder')}
            disabled={isSubmitting}
            className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">{t('phone')}</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder={t('phonePlaceholder')}
            disabled={isSubmitting}
            dir="ltr"
            className={errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company">{t('company')}</Label>
          <Input
            id="company"
            {...register('company')}
            placeholder={t('companyPlaceholder')}
            disabled={isSubmitting}
          />
        </div>

        {/* Service */}
        <div className="space-y-2">
          <Label htmlFor="service">
            {t('service')} <span className="text-destructive">*</span>
          </Label>
          <Select
            onValueChange={(val) =>
              setValue('service', val as ContactFormData['service'], { shouldValidate: true })
            }
            disabled={isSubmitting}
          >
            <SelectTrigger
              id="service"
              className={errors.service ? 'border-destructive' : ''}
            >
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

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">{t('budget')}</Label>
          <Select
            onValueChange={(val) =>
              setValue('budget', val as ContactFormData['budget'], { shouldValidate: true })
            }
            disabled={isSubmitting}
          >
            <SelectTrigger id="budget">
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

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          {t('message')} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={6}
          {...register('message')}
          placeholder={t('messagePlaceholder')}
          disabled={isSubmitting}
          className={errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto gap-2 font-semibold"
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
