import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '../../shared/ui/Container';
import { Button } from '../../shared/ui/Button';
import { useSeo } from '../../shared/lib/useSeo';
import { EASE_OUT } from '../../shared/motion/variants';

export function NotFoundPage() {
  const { t } = useTranslation();
  useSeo('404', undefined, { noindex: true });
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
      <svg viewBox="0 0 400 60" className="w-full max-w-md" aria-hidden>
        <motion.line x1="20" y1="30" x2="170" y2="30" className="stroke-accent" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: EASE_OUT }} />
        <motion.line x1="230" y1="30" x2="380" y2="30" className="stroke-line-strong" strokeWidth="2" strokeDasharray="4 6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
        <circle cx="20" cy="30" r="8" className="fill-accent" />
        <motion.circle cx="200" cy="30" r="5" className="fill-accent" animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </svg>
      <p dir="ltr" className="mt-10 font-latin text-8xl font-extralight text-accent-ink">404</p>
      <h1 className="mt-4 text-3xl font-light md:text-4xl">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-muted">{t('notFound.body')}</p>
      <Button to="/" className="mt-10" arrow>
        {t('common.backHome')}
      </Button>
    </Container>);

}