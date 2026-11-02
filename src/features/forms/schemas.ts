import { z } from 'zod';
import type { TFunction } from 'i18next';

const PHONE = /^[0-9\s-]{6,15}$/;

export const makeBookingDetailsSchema = (t: TFunction) =>
z.object({
  fullName: z.string().trim().min(2, t('forms.errors.required')),
  company: z.string().trim().min(1, t('forms.errors.required')),
  jobTitle: z.string().trim().min(1, t('forms.errors.required')),
  email: z.string().trim().min(1, t('forms.errors.required')).email(t('forms.errors.email')),
  countryCode: z.string().min(1, t('forms.errors.required')),
  phone: z.string().trim().regex(PHONE, t('forms.errors.phone')),
  companySize: z.string().min(1, t('forms.errors.required')),
  challenge: z.string().trim().min(20, t('forms.errors.min', { count: 20 })),
  language: z.enum(['ar', 'en'])
});

export const makeContactSchema = (t: TFunction) =>
z.object({
  fullName: z.string().trim().min(2, t('forms.errors.required')),
  email: z.string().trim().min(1, t('forms.errors.required')).email(t('forms.errors.email')),
  company: z.string().trim().optional(),
  subject: z.string().trim().min(2, t('forms.errors.required')),
  message: z.string().trim().min(20, t('forms.errors.min', { count: 20 }))
});

export const makePartnerSchema = (t: TFunction) =>
z.object({
  fullName: z.string().trim().min(2, t('forms.errors.required')),
  company: z.string().trim().min(1, t('forms.errors.required')),
  email: z.string().trim().min(1, t('forms.errors.required')).email(t('forms.errors.email')),
  website: z.string().trim().optional(),
  partnerType: z.string().min(1, t('forms.errors.required')),
  message: z.string().trim().min(20, t('forms.errors.min', { count: 20 }))
});

const MAX_CV = 5 * 1024 * 1024;

export const makeApplySchema = (t: TFunction) =>
z.object({
  fullName: z.string().trim().min(2, t('forms.errors.required')),
  email: z.string().trim().min(1, t('forms.errors.required')).email(t('forms.errors.email')),
  phone: z.string().trim().regex(PHONE, t('forms.errors.phone')),
  message: z.string().trim().optional(),
  cv: z.
  custom<FileList>((v) => typeof FileList !== 'undefined' && v instanceof FileList && v.length > 0, t('forms.errors.file')).
  refine((files) => {
    const f = files?.[0];
    return !!f && f.size <= MAX_CV && /\.(pdf|docx?)$/i.test(f.name);
  }, t('forms.errors.file'))
});

export const countryCodes = ['+971', '+966', '+974', '+965', '+973', '+968', '+20', '+44', '+1'];