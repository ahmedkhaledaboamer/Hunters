import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Briefcase, CalendarDays, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo, headquarters, isPlaceholder, telHref } from '../../data/directory';
import { useSubmitFormMutation } from '../../features/content/contentApi';
import { makeContactSchema } from '../../features/forms/schemas';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { Button } from '../../shared/ui/Button';
import { Field, Input, Textarea } from '../../shared/ui/Input';
import { SocialRow } from '../../shared/ui/SocialIcons';

export function ContactPage() {
  const { t } = useTranslation();
  useSeo(t('nav.contact'), t('contact.lead'));
  const [submit, { isLoading, isError }] = useSubmitFormMutation();
  const [sent, setSent] = useState(false);
  const schema = makeContactSchema(t);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), mode: 'onTouched' });
  const onSubmit = handleSubmit(async (values) => {
    try {
      await submit({ kind: 'contact', body: values }).unwrap();
      reset();
      setSent(true);
    } catch {

      /* surfaced via isError */}
  });

  const info = [
  { icon: Mail, label: t('contact.email'), value: contactInfo.email, href: `mailto:${contactInfo.email}`, ltr: true },
  { icon: Briefcase, label: t('contact.hrEmail'), value: contactInfo.hrEmail, href: `mailto:${contactInfo.hrEmail}`, ltr: true },
  { icon: Phone, label: t('contact.phone'), value: contactInfo.phone, href: telHref(contactInfo.phone), ltr: true },
  { icon: Globe, label: t('contact.website'), value: contactInfo.website, href: `https://${contactInfo.website}`, ltr: true },
  { icon: MapPin, label: t('contact.location'), value: t('brand.location'), href: headquarters.mapsUrl, ltr: false }].
  filter((i) => !isPlaceholder(i.value));


  return (
    <>
      <PageHero eyebrow="CONTACT" title={t('contact.title')} lead={t('contact.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="glass rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-light">{t('contact.formTitle')}</h2>
            {sent ?
            <div role="status" className="mt-8">
                <p className="text-xl text-fg">{t('common.sentTitle')}</p>
                <p className="mt-2 text-muted">{t('common.sentBody')}</p>
                <Button variant="ghost" className="mt-6" onClick={() => setSent(false)}>{t('contact.formTitle')}</Button>
              </div> :

            <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label={t('forms.fullName')} htmlFor="c-name" error={errors.fullName?.message}><Input id="c-name" autoComplete="name" {...register('fullName')} /></Field>
                <Field label={t('forms.email')} htmlFor="c-email" error={errors.email?.message}><Input id="c-email" type="email" dir="ltr" autoComplete="email" {...register('email')} /></Field>
                <Field label={`${t('forms.company')} (${t('common.optional')})`} htmlFor="c-company"><Input id="c-company" {...register('company')} /></Field>
                <Field label={t('forms.subject')} htmlFor="c-subject" error={errors.subject?.message}><Input id="c-subject" {...register('subject')} /></Field>
                <Field label={t('forms.message')} htmlFor="c-msg" error={errors.message?.message} className="sm:col-span-2"><Textarea id="c-msg" rows={5} {...register('message')} /></Field>
                {isError && <p role="alert" className="text-sm text-red-600 dark:text-red-400 sm:col-span-2">{t('common.sendError')}</p>}
                <Button type="submit" loading={isLoading} className="justify-self-start" arrow>{isLoading ? t('common.sending') : t('common.submit')}</Button>
              </form>
            }
          </div>
          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-light">{t('contact.infoTitle')}</h2>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {info.map((i) =>
                <div key={i.label} className="flex items-center gap-4 py-4">
                    <i.icon className="size-5 shrink-0 text-accent-ink" aria-hidden />
                    <div><dt className="text-xs text-muted">{i.label}</dt><dd className="mt-0.5 text-fg" dir={i.ltr ? 'ltr' : undefined}>{i.href ? <a href={i.href} {...(i.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="transition-colors duration-150 hover:text-accent-ink">{i.value}</a> : i.value}</dd></div>
                  </div>
                )}
              </dl>
            </div>
            <div>
              <p className="text-sm text-muted">{t('contact.socials')}</p>
              <SocialRow className="mt-3" />
            </div>
            <div className="rounded-3xl border border-line p-7">
              <CalendarDays className="size-6 text-accent-ink" aria-hidden />
              <h3 className="mt-5 text-xl font-light">{t('contact.quickTitle')}</h3>
              <p className="mt-2 text-sm text-muted">{t('contact.quickBody')}</p>
              <Button to="/book-consultation" className="mt-6" arrow>{t('nav.book')}</Button>
            </div>
          </aside>
        </div>
      </Section>
    </>);

}