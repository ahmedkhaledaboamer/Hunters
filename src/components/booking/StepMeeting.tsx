import { useTranslation } from 'react-i18next';
import { Building2, Video } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setDuration, setMode, setPlatform, type BookingState } from '../../features/booking/bookingSlice';
import { Tabs } from '../../shared/ui/Tabs';
import { SelectableCard } from './SelectableCard';

export function StepMeeting() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { mode, platform, duration } = useAppSelector((s) => s.booking);

  const modes = [
  { value: 'online' as const, icon: Video, title: t('book.online'), desc: t('book.onlineDesc') },
  { value: 'in-person' as const, icon: Building2, title: t('book.inPerson'), desc: t('book.inPersonDesc') }];


  return (
    <div>
      <h2 className="text-2xl font-light md:text-3xl">{t('book.meetingTitle')}</h2>
      <div role="radiogroup" aria-label={t('book.meetingTitle')} className="mt-8 grid gap-3 sm:grid-cols-2">
        {modes.map((m) =>
        <SelectableCard key={m.value} selected={mode === m.value} onSelect={() => dispatch(setMode(m.value))} className="p-6">
            <m.icon className="size-6 text-accent-ink" strokeWidth={1.4} aria-hidden />
            <span className="mt-6 text-lg font-light text-fg">{m.title}</span>
            <span className="mt-1 text-sm text-muted">{m.desc}</span>
          </SelectableCard>
        )}
      </div>

      {mode === 'online' &&
      <div className="mt-10">
          <p className="text-sm text-fg/85">{t('book.platform')}</p>
          <Tabs<BookingState['platform']>
          className="mt-3"
          label={t('book.platform')}
          value={platform}
          onChange={(v) => dispatch(setPlatform(v))}
          items={(['teams', 'zoom', 'meet'] as const).map((p) => ({ value: p, label: t(`book.platforms.${p}`) }))} />
        
        </div>
      }

      <div className="mt-8">
        <p className="text-sm text-fg/85">{t('book.duration')}</p>
        <Tabs<'30' | '60'>
          className="mt-3"
          label={t('book.duration')}
          value={String(duration) as '30' | '60'}
          onChange={(v) => dispatch(setDuration(Number(v) as 30 | 60))}
          items={[
          { value: '30', label: t('book.minutes', { count: 30 }) },
          { value: '60', label: t('book.minutes', { count: 60 }) }]
          } />
        
      </div>
    </div>);

}