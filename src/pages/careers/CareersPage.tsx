import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { ArrowRight, Check, Upload } from 'lucide-react';
import { contactInfo } from '../../data/directory';
import type { Position } from '../../entities';
import { useGetPositionsQuery, useSubmitFormMutation } from '../../features/content/contentApi';
import { makeApplySchema } from '../../features/forms/schemas';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { SectionHeading } from '../../shared/ui/SectionHeading';
import { Tabs } from '../../shared/ui/Tabs';
import { Badge } from '../../shared/ui/Badge';
import { Button } from '../../shared/ui/Button';
import { Modal } from '../../shared/ui/Modal';
import { Field, Input, Textarea } from '../../shared/ui/Input';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';

type Dept = Position['department'] | 'all';
const depts: Dept[] = ['all', 'engineering', 'ai', 'consulting', 'design'];

export function CareersPage() {
  const { t } = useTranslation();
  const l = useL();
  useSeo(t('nav.careers'), t('careers.lead'));
  const query = useGetPositionsQuery();
  const [dept, setDept] = useState<Dept>('all');
  const [open, setOpen] = useState<Position | null>(null);
  const values = t('careers.values', { returnObjects: true }) as {title: string;body: string;}[];
  const visible = (query.data ?? []).filter((p) => dept === 'all' || p.department === dept);

  return (
    <>
      <PageHero eyebrow="CAREERS" title={t('careers.title')} lead={t('careers.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-10 border-y border-line py-14 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="text-3xl font-light">{t('careers.cultureTitle')}</h2>
          <p className="text-xl font-light leading-relaxed text-muted">{t('careers.cultureBody')}</p>
        </div>
        <h2 className="mt-16 text-2xl font-light">{t('careers.valuesTitle')}</h2>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) =>
          <li key={v.title} className="border-t border-line py-6">
              <h3 className="text-lg text-fg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.body}</p>
            </li>
          )}
        </ul>
      </Section>
      <Section className="border-t border-line" aria-labelledby="positions-title">
        <SectionHeading id="positions-title" eyebrow="OPEN POSITIONS" title={t('careers.positionsTitle')} />
        <Tabs className="mt-10" items={depts.map((d) => ({ value: d, label: t(`careers.departments.${d}`) }))} value={dept} onChange={setDept} label={t('careers.positionsTitle')} />
        <div className="mt-8">
          <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} isEmpty={!visible.length} skeleton={<Skeleton className="h-72" />}>
            {() =>
            <ul className="divide-y divide-line border-y border-line">
                {visible.map((p) =>
              <li key={p.id}>
                    <button type="button" onClick={() => setOpen(p)} className="group grid w-full gap-2 py-6 text-start md:grid-cols-[1.4fr_1fr_auto] md:items-center">
                      <span className="text-lg text-fg transition-colors duration-150 group-hover:text-accent-ink">{l(p.title)}</span>
                      <span className="flex flex-wrap gap-2 text-sm text-muted">
                        <Badge tone="outline">{t(`careers.departments.${p.department}`)}</Badge>{l(p.type)} · {l(p.location)}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-accent-ink">{t('careers.viewRole')}<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden /></span>
                    </button>
                  </li>
              )}
              </ul>
            }
          </QueryState>
        </div>
        <p className="mt-4 text-xs text-muted">{t('careers.note')}</p>
      </Section>
      <Modal open={!!open} onClose={() => setOpen(null)} title={open ? l(open.title) : ''} variant="drawer">
        {open && <PositionDetail position={open} />}
      </Modal>
    </>);

}

function PositionDetail({ position }: {position: Position;}) {
  const { t } = useTranslation();
  const l = useL();
  const [submit, { isLoading }] = useSubmitFormMutation();
  const [sent, setSent] = useState(false);
  const schema = makeApplySchema(t);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), mode: 'onTouched' });
  const file = watch('cv')?.[0];
  const onSubmit = handleSubmit(async ({ cv, ...rest }) => {
    await submit({ kind: 'job-applications', body: { ...rest, position: position.id, cv: cv[0]?.name } }).unwrap();
    setSent(true);
  });

  return (
    <div>
      <p className="text-muted">{l(position.summary)}</p>
      <h3 className="mt-8 text-sm text-fg">{t('careers.responsibilities')}</h3>
      <ul className="mt-3 space-y-2">
        {position.responsibilities.map((r) => <li key={r.en} className="flex gap-2 text-sm text-fg/85"><Check className="mt-0.5 size-4 text-accent-ink" aria-hidden />{l(r)}</li>)}
      </ul>
      <div className="mt-10 border-t border-line pt-8">
        <h3 className="text-xl font-light">{t('careers.apply')}</h3>
        <p className="mt-2 text-sm text-muted">
          {t('careers.orEmail')}{' '}
          <a dir="ltr" href={`mailto:${contactInfo.hrEmail}?subject=${encodeURIComponent(position.title.en)}`} className="text-fg underline decoration-lime-500 decoration-2 underline-offset-4 hover:text-accent-ink">
            {contactInfo.hrEmail}
          </a>
        </p>
        {sent ?
        <p role="status" className="mt-6 text-fg">{t('careers.applied')}</p> :

        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5">
            <Field label={t('forms.fullName')} htmlFor="a-name" error={errors.fullName?.message}><Input id="a-name" {...register('fullName')} /></Field>
            <Field label={t('forms.email')} htmlFor="a-email" error={errors.email?.message}><Input id="a-email" type="email" dir="ltr" {...register('email')} /></Field>
            <Field label={t('forms.phone')} htmlFor="a-phone" error={errors.phone?.message}><Input id="a-phone" type="tel" dir="ltr" {...register('phone')} /></Field>
            <Field label={t('forms.cv')} htmlFor="a-cv" error={errors.cv?.message as string | undefined}>
              <label htmlFor="a-cv" className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-line-strong p-6 text-center transition-colors duration-150 hover:border-accent">
                <Upload className="size-5 text-accent-ink" aria-hidden />
                <span className="text-sm text-fg">{file ? file.name : t('forms.cvDrop')}</span>
                <span className="text-xs text-muted">{t('forms.cvHint')}</span>
              </label>
              <input id="a-cv" type="file" accept=".pdf,.doc,.docx" className="sr-only" {...register('cv')} />
            </Field>
            <Field label={`${t('forms.message')} (${t('common.optional')})`} htmlFor="a-msg"><Textarea id="a-msg" rows={3} {...register('message')} /></Field>
            <Button type="submit" loading={isLoading} arrow>{isLoading ? t('common.sending') : t('common.submit')}</Button>
          </form>
        }
      </div>
    </div>);

}