import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Briefcase, Check, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { useSubmitFormMutation } from '../../features/content/contentApi';
import { contactInfo, isPlaceholder, telHref } from '../../data/directory';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { NodeLine } from '../ui/NodeLine';
import { SocialRow } from '../ui/SocialIcons';
import { Eyebrow } from '../ui/SectionHeading';
import { SplitText } from '../motion/SplitText';
import { Reveal } from '../motion/Reveal';
import { companyLinks, primaryNav } from './navigation';

export function Footer() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const showCta = !pathname.startsWith('/book-consultation');
  const explore = primaryNav.filter((n) => n.to);

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {showCta &&
      <section aria-labelledby="footer-cta" className="relative border-b border-line">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-80 start-1/2 size-[900px] -translate-x-1/2 rounded-full glow-radial rtl:translate-x-1/2" />
          <Container className="relative py-24 md:py-36">
            <Eyebrow>LET'S BUILD WHAT'S NEXT</Eyebrow>
            <div id="footer-cta">
              <SplitText
              as="h2"
              text={t('footer.ctaSub')}
              className="mt-6 max-w-5xl text-display font-extralight tracking-[-0.03em] rtl:font-light rtl:leading-[1.2] rtl:tracking-normal" />
            
            </div>
            <Reveal delay={0.1} className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <p className="max-w-2xl text-lg leading-relaxed text-muted">{t('footer.ctaBody')}</p>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button to="/book-consultation" size="lg" arrow>
                  {t('nav.book')}
                </Button>
                <Button to="/contact" size="lg" variant="ghost">
                  {t('nav.contact')}
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      }

      <Container className="relative grid gap-14 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo withTagline />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">{t('footer.partnerLine')}</p>
          <SocialRow className="mt-6" />
        </div>

        <FooterColumn title={t('footer.explore')}>
          {explore.map((n) =>
          <FooterLink key={n.key} to={n.to as string}>
              {t(`nav.${n.key}`)}
            </FooterLink>
          )}
          <FooterLink to="/book-consultation">{t('nav.book')}</FooterLink>
        </FooterColumn>

        <FooterColumn title={t('footer.companyCol')}>
          {companyLinks.map((c) =>
          <FooterLink key={c.key} to={c.to}>
              {t(`nav.${c.key}`)}
            </FooterLink>
          )}
        </FooterColumn>

        <div className="flex flex-col gap-10">
          <div>
            <h3 className="eyebrow">{t('footer.connect')}</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-accent-ink" aria-hidden />
                {t('brand.location')}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-accent-ink" aria-hidden />
                <a dir="ltr" href={`mailto:${contactInfo.email}`} className="transition-colors duration-150 hover:text-fg">{contactInfo.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Briefcase className="size-4 shrink-0 text-accent-ink" aria-hidden />
                <a dir="ltr" href={`mailto:${contactInfo.hrEmail}`} className="transition-colors duration-150 hover:text-fg" aria-label={`${t('contact.hrEmail')}: ${contactInfo.hrEmail}`}>{contactInfo.hrEmail}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-accent-ink" aria-hidden />
                <a dir="ltr" href={telHref(contactInfo.phone)} className="transition-colors duration-150 hover:text-fg">{contactInfo.phone}</a>
              </li>
              {!isPlaceholder(contactInfo.website) &&
              <li className="flex items-center gap-3">
                <Globe className="size-4 shrink-0 text-accent-ink" aria-hidden />
                <span dir="ltr">{contactInfo.website}</span>
              </li>
              }
            </ul>
          </div>
          <Newsletter />
        </div>
      </Container>

      <Container className="relative pb-10">
        <NodeLine draw={false} />
        <div className="mt-8 flex flex-col gap-4 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {t('brand.name')}. {t('footer.rights')}
          </p>
          <p className="max-w-xl text-fg/70 md:text-end">{t('footer.tagline')}</p>
        </div>
      </Container>
    </footer>);

}

function FooterColumn({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>);

}

function FooterLink({ to, children }: {to: string;children: React.ReactNode;}) {
  return (
    <li>
      <Link to={to} className="text-sm text-muted transition-colors duration-150 hover:text-fg">
        {children}
      </Link>
    </li>);

}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
  const { t } = useTranslation();
  const [submit, { isLoading }] = useSubmitFormMutation();
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  // A single field doesn't warrant the form libraries, which would otherwise load on every page with the footer.
  const validate = (value: string) =>
  !value.trim() ? t('forms.errors.required') : EMAIL.test(value.trim()) ? null : t('forms.errors.email');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = validate(email);
    setError(message);
    if (message) return;
    await submit({ kind: 'newsletter', body: { email: email.trim() } }).unwrap();
    setEmail('');
    setDone(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <h3 className="text-base font-light text-fg">{t('footer.newsletterTitle')}</h3>
      <p className="mt-1 text-sm text-muted">{t('footer.newsletterBody')}</p>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 focus-within:border-accent">
        <label htmlFor="newsletter-email" className="sr-only">
          {t('forms.newsletter')}
        </label>
        <input
          id="newsletter-email"
          type="email"
          dir="ltr"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(validate(e.target.value));
          }}
          aria-invalid={!!error}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-fg placeholder:text-muted/70 focus:outline-none rtl:text-right"
          />
        
        <button
          type="submit"
          disabled={isLoading}
          aria-label={t('footer.subscribe')}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-500 text-ink-950 transition-colors duration-150 hover:bg-lime-400 disabled:opacity-60">
          
          {done ? <Check className="size-4" aria-hidden /> : <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />}
        </button>
      </div>
      <p id="newsletter-error" role="status" className="mt-2 min-h-4 text-xs text-muted">
        {error ? <span className="text-red-600 dark:text-red-400">{error}</span> : done ? t('footer.subscribed') : null}
      </p>
    </form>);

}