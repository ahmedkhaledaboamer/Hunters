import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextStep, saveDetails } from '../../features/booking/bookingSlice';
import { countryCodes, makeBookingDetailsSchema } from '../../features/forms/schemas';
import { useLocale } from '../../features/preferences/usePreferences';
import { Field, Input, Textarea } from '../../shared/ui/Input';
import { Select } from '../../shared/ui/Select';

export const DETAILS_FORM_ID = 'booking-details-form';

export function StepDetails() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const saved = useAppSelector((s) => s.booking.details);
  const schema = makeBookingDetailsSchema(t);
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: saved ?? {
      fullName: '',
      company: '',
      jobTitle: '',
      email: '',
      countryCode: '+971',
      phone: '',
      companySize: '',
      challenge: '',
      language: locale
    }
  });

  const onSubmit = handleSubmit((values) => {
    dispatch(saveDetails(values));
    dispatch(nextStep());
  });

  const sizes = t('forms.sizes', { returnObjects: true }) as Record<string, string>;
  const err = (name: keyof Values) => ({
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined
  });

  return (
    <div>
      <h2 className="text-2xl font-light md:text-3xl">{t('book.detailsTitle')}</h2>
      <form id={DETAILS_FORM_ID} onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label={t('forms.fullName')} htmlFor="fullName" error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" {...err('fullName')} {...register('fullName')} />
        </Field>
        <Field label={t('forms.company')} htmlFor="company" error={errors.company?.message}>
          <Input id="company" autoComplete="organization" {...err('company')} {...register('company')} />
        </Field>
        <Field label={t('forms.jobTitle')} htmlFor="jobTitle" error={errors.jobTitle?.message}>
          <Input id="jobTitle" autoComplete="organization-title" {...err('jobTitle')} {...register('jobTitle')} />
        </Field>
        <Field label={t('forms.email')} htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" dir="ltr" autoComplete="email" className="rtl:text-right" {...err('email')} {...register('email')} />
        </Field>
        <Field label={t('forms.phone')} htmlFor="phone" error={errors.phone?.message}>
          <div className="flex gap-2" dir="ltr">
            <label htmlFor="countryCode" className="sr-only">
              {t('forms.countryCode')}
            </label>
            <div className="w-28 shrink-0">
              <Select id="countryCode" options={countryCodes.map((c) => ({ value: c, label: c }))} {...register('countryCode')} />
            </div>
            <Input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="50 123 4567" {...err('phone')} {...register('phone')} />
          </div>
        </Field>
        <Field label={t('forms.companySize')} htmlFor="companySize" error={errors.companySize?.message}>
          <Select
            id="companySize"
            placeholder="—"
            options={Object.entries(sizes).map(([value, label]) => ({ value, label }))}
            {...err('companySize')}
            {...register('companySize')} />
          
        </Field>
        <Field label={t('forms.challenge')} htmlFor="challenge" error={errors.challenge?.message} className="sm:col-span-2">
          <Textarea id="challenge" rows={4} {...err('challenge')} {...register('challenge')} />
        </Field>
        <Field label={t('forms.language')} htmlFor="language" error={errors.language?.message}>
          <Select
            id="language"
            options={[
            { value: 'ar', label: 'العربية' },
            { value: 'en', label: 'English' }]
            }
            {...register('language')} />
          
        </Field>
      </form>
    </div>);

}