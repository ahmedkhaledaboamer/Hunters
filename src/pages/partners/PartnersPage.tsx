import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import type { PartnerCategory } from '../../entities';
import { PartnerLogo } from '../../components/partners/PartnerLogo';
import { useGetPartnersQuery } from '../../features/partners/partnersApi';
import { useSubmitFormMutation } from '../../features/content/contentApi';
import { makePartnerSchema } from '../../features/forms/schemas';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { SectionHeading } from '../../shared/ui/SectionHeading';
import { Tabs } from '../../shared/ui/Tabs';
import { Badge } from '../../shared/ui/Badge';
import { Button } from '../../shared/ui/Button';
import { Field, Input, Textarea } from '../../shared/ui/Input';
import { Select } from '../../shared/ui/Select';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { CardArrow } from '../../shared/ui/SpotlightCard';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';

const categories: PartnerCategory[] = ['technology', 'cloud', 'ai', 'channel'];

export function PartnersPage() {
  const { t } = useTranslation();
  const l = useL();
  useSeo(t('nav.partners'), t('partners.lead'));
  const query = useGetPartnersQuery();
  const [cat, setCat] = useState<PartnerCategory>('technology');
  const visible = (query.data ?? []).filter((p) => p.category === cat);

  return (
    <>
      <PageHero eyebrow="STRATEGIC PARTNERSHIPS" title={t('partners.title')} lead={t('partners.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-6 border-y border-line py-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="text-3xl font-light">{t('partners.philosophyTitle')}</h2>
          <p className="text-xl font-light leading-relaxed text-muted">{t('partners.philosophyBody')}</p>
        </div>
        <Tabs className="mt-12" items={categories.map((c) => ({ value: c, label: t(`partners.categories.${c}`) }))} value={cat} onChange={setCat} label={t('partners.title')} />
        <div className="mt-10">
          <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} isEmpty={!visible.length} skeleton={<CardSkeletonGrid count={2} className="grid gap-4 md:grid-cols-2" itemClassName="h-56" />}>
            {() =>
            <RevealGroup key={cat} className="grid gap-4 md:grid-cols-2">
                {visible.map((p) =>
              <RevealItem key={p.slug}>
                    <Link to={`/partners/${p.slug}`} className="glass group flex h-full flex-col rounded-2xl p-7 transition-colors duration-150 hover:border-accent/50">
                      <div className="flex items-start justify-between gap-4 text-fg">
                        <PartnerLogo monogram={p.monogram} name={p.name} />
                        <Badge tone="outline">{l(p.type)}</Badge>
                      </div>
                      <p className="mt-6 text-muted">{l(p.description)}</p>
                      <CardArrow className="mt-auto pt-8" />
                    </Link>
                  </RevealItem>
              )}
              </RevealGroup>
            }
          </QueryState>
        </div>
        <p className="mt-6 text-xs text-muted">{t('partners.note')}</p>
      </Section>
      <Section className="border-t border-line" aria-labelledby="become-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading id="become-title" eyebrow="BECOME A PARTNER" title={t('partners.becomeTitle')} description={t('partners.becomeBody')} />
          <PartnerForm />
        </div>
      </Section>
    </>);

}

function PartnerForm() {
  const { t } = useTranslation();
  const [submit, { isLoading }] = useSubmitFormMutation();
  const [sent, setSent] = useState(false);
  const schema = makePartnerSchema(t);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), mode: 'onTouched' });
  const onSubmit = handleSubmit(async (values) => {
    await submit({ kind: 'partner-applications', body: values }).unwrap();
    reset();
    setSent(true);
  });
  if (sent) return <p role="status" className="glass rounded-2xl p-8 text-lg text-fg">{t('partners.sent')}</p>;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label={t('forms.fullName')} htmlFor="p-name" error={errors.fullName?.message}><Input id="p-name" {...register('fullName')} /></Field>
      <Field label={t('forms.company')} htmlFor="p-company" error={errors.company?.message}><Input id="p-company" {...register('company')} /></Field>
      <Field label={t('forms.email')} htmlFor="p-email" error={errors.email?.message}><Input id="p-email" type="email" dir="ltr" {...register('email')} /></Field>
      <Field label={t('forms.partnerType')} htmlFor="p-type" error={errors.partnerType?.message}>
        <Select id="p-type" placeholder="—" options={categories.map((c) => ({ value: c, label: t(`partners.categories.${c}`) }))} {...register('partnerType')} />
      </Field>
      <Field label={t('forms.message')} htmlFor="p-msg" error={errors.message?.message} className="sm:col-span-2"><Textarea id="p-msg" rows={4} {...register('message')} /></Field>
      <Button type="submit" loading={isLoading} className="justify-self-start" arrow>{isLoading ? t('common.sending') : t('common.submit')}</Button>
    </form>);

}