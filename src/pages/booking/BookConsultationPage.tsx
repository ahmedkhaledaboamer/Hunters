import { useEffect, useRef, useState, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { confirmBooking, goToStep, nextStep, prevStep, BOOKING_STEPS } from '../../features/booking/bookingSlice';
import { useCreateBookingMutation } from '../../features/booking/bookingApi';
import { useIsRtl } from '../../features/preferences/usePreferences';
import { BookingProgress } from '../../components/booking/BookingProgress';
import { StepService } from '../../components/booking/StepService';
import { StepConsultant } from '../../components/booking/StepConsultant';
import { StepMeeting } from '../../components/booking/StepMeeting';
import { StepDateTime } from '../../components/booking/StepDateTime';
import { DETAILS_FORM_ID, StepDetails } from '../../components/booking/StepDetails';
import { StepReview } from '../../components/booking/StepReview';
import { BookingSuccess } from '../../components/booking/BookingSuccess';
import { BookingSummary } from '../../components/booking/BookingSummary';
import { useSeo } from '../../shared/lib/useSeo';
import { Container } from '../../shared/ui/Container';
import { Button } from '../../shared/ui/Button';
import { Eyebrow } from '../../shared/ui/SectionHeading';
import { SplitText } from '../../shared/motion/SplitText';
import { EASE_OUT } from '../../shared/motion/variants';
import { cn } from '../../shared/lib/cn';
import { scrollToTarget } from '../../shared/lib/scroll';

const steps: ComponentType<{onPicked?: () => void;}>[] = [StepService, StepConsultant, StepMeeting, StepDateTime, StepDetails];

/** Single-choice steps advance on their own once something is picked; the rest keep the Continue button. */
const AUTO_ADVANCE = new Set([0, 1, 3]);
const ADVANCE_DELAY = 280; // long enough to see the selection register

export function BookConsultationPage() {
  const { t } = useTranslation();
  useSeo(t('book.title'), t('book.lead'));
  const dispatch = useAppDispatch();
  const rtl = useIsRtl();
  const booking = useAppSelector((s) => s.booking);
  const [createBooking, { isLoading, isError }] = useCreateBookingMutation();
  const [direction, setDirection] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const { step } = booking;

  useEffect(() => {
    const el = panelRef.current;
    if (el && el.getBoundingClientRect().top < 0) scrollToTarget(el, -112);
  }, [step]);

  const canContinue = [!!booking.serviceSlug, !!booking.consultantId, true, !!booking.date && !!booking.time, true, true][step];
  const advanceTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  const go = (target: number) => {
    setDirection(target > step ? 1 : -1);
    dispatch(goToStep(target));
  };
  const next = () => {
    setDirection(1);
    dispatch(nextStep());
  };
  const picked = () => {
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(next, ADVANCE_DELAY);
  };
  const back = () => {
    window.clearTimeout(advanceTimer.current);
    setDirection(-1);
    dispatch(prevStep());
  };

  const confirm = async () => {
    if (!booking.serviceSlug || !booking.consultantId || !booking.date || !booking.time || !booking.details) return;
    try {
      const res = await createBooking({
        serviceSlug: booking.serviceSlug,
        consultantId: booking.consultantId,
        mode: booking.mode,
        platform: booking.mode === 'online' ? booking.platform : null,
        duration: booking.duration,
        date: booking.date,
        time: booking.time,
        details: booking.details
      }).unwrap();
      dispatch(confirmBooking(res.reference));
    } catch {

      /* error surfaced via isError */}
  };

  const offset = (dir: number) => dir * 28 * (rtl ? -1 : 1);
  const StepComponent = steps[step];

  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <Container className="relative pb-24 pt-36 md:pt-44">
        <Eyebrow>BOOK A CONSULTATION</Eyebrow>
        <SplitText as="h1" trigger="mount" text={t('book.title')} className="mt-5 text-headline font-extralight tracking-tight rtl:font-light rtl:leading-[1.25] rtl:tracking-normal" />
        <p className="mt-5 max-w-xl text-lg text-muted">{t('book.lead')}</p>

        <div
          ref={panelRef}
          className={cn(
            'mt-14 grid scroll-mt-28 gap-8',
            booking.reference ? 'mx-auto max-w-3xl' : 'lg:grid-cols-[1fr_320px]'
          )}>
          <div className="glass rounded-3xl p-6 md:p-10">
            {booking.reference ?
            <BookingSuccess /> :

            <>
                <BookingProgress step={step} onStepClick={go} />
                <div className="mt-12 min-h-[420px]">
                  {/* Enter-only transition: the new step mounts immediately, so it can never be left hidden mid-exit. */}
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: offset(direction) }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}>

                    {step < steps.length ? <StepComponent onPicked={AUTO_ADVANCE.has(step) ? picked : undefined} /> : <StepReview error={isError} />}
                  </motion.div>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
                  <Button variant="ghost" onClick={back} disabled={step === 0} className={step === 0 ? 'invisible' : ''}>
                    {t('common.back')}
                  </Button>
                  {step === 4 ?
                <Button type="submit" form={DETAILS_FORM_ID} onClick={() => setDirection(1)} arrow>
                      {t('book.continue')}
                    </Button> :
                step === BOOKING_STEPS - 1 ?
                <Button onClick={confirm} loading={isLoading} size="lg">
                      {isLoading ? t('book.submitting') : t('book.confirm')}
                    </Button> :
                AUTO_ADVANCE.has(step) ?
                null :

                <Button onClick={next} disabled={!canContinue} arrow>
                      {t('book.continue')}
                    </Button>
                }
                </div>
              </>
            }
          </div>

          {!booking.reference &&
          <aside className="hidden lg:block">
              <div className="glass sticky top-28 rounded-3xl p-6">
                <Eyebrow>SUMMARY</Eyebrow>
                <BookingSummary className="mt-5" />
                <p className="mt-6 border-t border-line pt-4 text-xs text-muted">{t('book.timezone')}</p>
              </div>
            </aside>
          }
        </div>
      </Container>
    </div>);

}