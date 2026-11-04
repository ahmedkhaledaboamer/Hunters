import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CornerDownLeft, Search, X } from 'lucide-react';
import { services } from '../../data/services';
import { industries } from '../../data/industries';
import { news } from '../../data/news';
import { partners } from '../../data/directory';
import { useL, useLocale } from '../../features/preferences/usePreferences';
import { useLabel } from '../../i18n/labels';
import { icons, type IconName } from '../lib/icons';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../motion/variants';
import { companyLinks, primaryNav } from './navigation';
import { normalize, score } from '../lib/searchText';

type Group = 'pages' | 'solutions' | 'services' | 'industries' | 'news' | 'partners';

interface Entry {
  group: Group;
  to: string;
  title: string;
  text: string;
  icon: IconName;
}

function useEntries(): Entry[] {
  const { t } = useTranslation();
  const l = useL();
  const label = useLabel();
  const locale = useLocale();
  return useMemo(() => {
    const pages: Entry[] = [
    ...primaryNav.filter((n) => n.to).map((n) => ({ group: 'pages' as const, to: n.to as string, title: t(`nav.${n.key}`), text: '', icon: 'compass' as IconName })),
    ...companyLinks.map((c) => ({ group: 'pages' as const, to: c.to, title: t(`nav.${c.key}`), text: t(`nav.${c.key}Desc`), icon: c.icon })),
    { group: 'pages', to: '/book-consultation', title: t('nav.book'), text: t('book.lead'), icon: 'clock' }];

    const solutions: Entry[] = [
    { group: 'solutions', to: '/solutions#model', title: label('THE INTELLIGENT BUSINESS MODEL'), text: t('home.modelTitle'), icon: 'layers' },
    { group: 'solutions', to: '/solutions#executive', title: label('EXECUTIVE INTELLIGENCE'), text: t('solutions.executive.title'), icon: 'gauge' },
    { group: 'solutions', to: '/solutions#customer-ai', title: label('AI FOR CUSTOMER SERVICE & SALES'), text: t('solutions.cx.title'), icon: 'messages' }];

    return [
    ...pages,
    ...solutions,
    ...services.map((s) => ({ group: 'services' as const, to: `/services/${s.slug}`, title: l(s.title), text: [l(s.short), l(s.summary), ...s.capabilities.map(l)].join(' '), icon: s.icon })),
    ...industries.map((i) => ({ group: 'industries' as const, to: `/industries/${i.slug}`, title: l(i.title), text: [...i.focus, ...i.challenges].map(l).join(' '), icon: i.icon })),
    ...news.map((a) => ({ group: 'news' as const, to: `/news/${a.slug}`, title: l(a.title), text: l(a.excerpt), icon: 'file' as IconName })),
    ...partners.map((p) => ({ group: 'partners' as const, to: `/partners/${p.slug}`, title: p.name, text: [l(p.type), l(p.description)].join(' '), icon: 'handshake' as IconName }))];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
}

const GROUP_ORDER: Group[] = ['pages', 'solutions', 'services', 'industries', 'news', 'partners'];
const MAX_RESULTS = 12;

/** Header search button + full-screen search dialog (also opens with Ctrl/⌘+K or "/"). */
export function SiteSearch({ className }: {className?: string;}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? '') || (e.target as HTMLElement)?.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey) || e.key === '/' && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('search.open')}
        title={`${t('search.open')} (Ctrl+K)`}
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-full border border-line text-fg transition-colors duration-150 hover:border-line-strong hover:bg-fg/5',
          className
        )}>

        <Search className="size-[18px]" strokeWidth={1.6} aria-hidden />
      </button>
      {createPortal(<AnimatePresence>{open && <SearchDialog onClose={() => setOpen(false)} />}</AnimatePresence>, document.body)}
    </>);

}

function SearchDialog({ onClose }: {onClose: () => void;}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const entries = useEntries();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const words = normalize(query).split(' ').filter(Boolean);
    if (!words.length) return [];
    return entries.
    map((e) => ({ e, s: score(e, words) })).
    filter((r) => r.s > 0).
    sort((a, b) => b.s - a.s || GROUP_ORDER.indexOf(a.e.group) - GROUP_ORDER.indexOf(b.e.group)).
    slice(0, MAX_RESULTS).
    map((r) => r.e);
  }, [entries, query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    lockScroll();
    const previous = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      unlockScroll();
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (entry: Entry | undefined) => {
    if (!entry) return;
    onClose();
    navigate(entry.to);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();else
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active]);
    }
  };

  const suggestions = ['services', 'industries', 'solutions', 'contact', 'careers'] as const;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/55 px-4 pt-[12vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}>

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t('search.open')}
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        onKeyDown={onKeyDown}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-bg shadow-2xl">

        <div className="flex items-center gap-3 border-b border-line px-5 transition-colors focus-within:border-lime-500">
          <Search className="size-5 shrink-0 text-muted" strokeWidth={1.6} aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.placeholder')}
            aria-controls="site-search-results"
            aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
            className="site-search-input h-16 min-w-0 flex-1 bg-transparent text-lg text-fg outline-none placeholder:text-muted/70 [&::-webkit-search-cancel-button]:hidden" />

          <button type="button" onClick={onClose} aria-label={t('common.close')} className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg">
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto">
          {!query.trim() ?
          <div className="p-5">
              <p className="text-xs text-muted">{t('search.suggestions')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((k) =>
              <button
                key={k}
                type="button"
                onClick={() => setQuery(t(`nav.${k}`))}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent-ink">

                    {t(`nav.${k}`)}
                  </button>
              )}
              </div>
            </div> :
          results.length === 0 ?
          <p role="status" className="p-8 text-center text-sm text-muted">{t('search.empty', { query: query.trim() })}</p> :

          <ul ref={listRef} id="site-search-results" role="listbox" className="p-2">
              {results.map((r, i) => {
              const Icon = icons[r.icon];
              const on = i === active;
              return (
                <li key={r.group + r.to} id={`search-result-${i}`} role="option" aria-selected={on} data-index={i}>
                    <button
                    type="button"
                    onMouseMove={() => setActive(i)}
                    onClick={() => go(r)}
                    className={cn('flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-start transition-colors', on ? 'bg-fg/[0.06]' : 'hover:bg-fg/[0.04]')}>

                      <span className={cn('inline-flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors', on ? 'border-lime-500 bg-lime-500 text-ink-950' : 'border-line text-accent-ink')}>
                        <Icon className="size-[18px]" strokeWidth={1.6} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] text-fg">{r.title}</span>
                        <span className="mt-0.5 block text-xs text-muted">{t(`search.groups.${r.group}`)}</span>
                      </span>
                      <ArrowUpRight className={cn('size-4 shrink-0 text-muted transition-opacity rtl:-scale-x-100', on ? 'opacity-100' : 'opacity-0')} aria-hidden />
                    </button>
                  </li>);

            })}
            </ul>
          }
        </div>

        <div className="hidden items-center gap-4 border-t border-line px-5 py-3 text-[11px] text-muted sm:flex">
          <span className="inline-flex items-center gap-1.5"><kbd className="rounded border border-line px-1.5 py-0.5 font-latin">↑</kbd><kbd className="rounded border border-line px-1.5 py-0.5 font-latin">↓</kbd>{t('search.navigate')}</span>
          <span className="inline-flex items-center gap-1.5"><kbd className="inline-flex items-center rounded border border-line px-1.5 py-0.5"><CornerDownLeft className="size-3" aria-hidden /></kbd>{t('search.select')}</span>
          <span className="inline-flex items-center gap-1.5"><kbd className="rounded border border-line px-1.5 py-0.5 font-latin">Esc</kbd>{t('search.close')}</span>
        </div>
      </motion.div>
    </motion.div>);

}
