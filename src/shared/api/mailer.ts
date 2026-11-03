import { consultants, contactInfo } from '../../data/directory';
import { services } from '../../data/services';
import type { BookingRequest } from '../../entities';

/**
 * Delivers form submissions by email through FormSubmit (https://formsubmit.co): no backend or account needed.
 * The first message sent to each address triggers a one-time "Activate form" email from FormSubmit; after the
 * recipient clicks it, every submission is delivered.
 */
const ENDPOINT = 'https://formsubmit.co/ajax/';

type Fields = Record<string, string | undefined>;

interface Email {
  to: string;
  subject: string;
  fields: Fields;
  replyTo?: string;
  attachment?: File;
}

async function send({ to, subject, fields, replyTo, attachment }: Email) {
  const data = new FormData();
  data.append('_subject', subject);
  data.append('_template', 'table');
  data.append('_captcha', 'false');
  data.append('_honey', ''); // spam trap: bots fill it, FormSubmit drops those
  if (replyTo) data.append('_replyto', replyTo);
  for (const [label, value] of Object.entries(fields)) if (value) data.append(label, value);
  if (attachment) data.append('attachment', attachment, attachment.name);

  const res = await fetch(ENDPOINT + encodeURIComponent(to), { method: 'POST', body: data, headers: { Accept: 'application/json' } });
  const json = (await res.json().catch(() => null)) as {success?: string | boolean;message?: string;} | null;
  if (!res.ok || json?.success === false || json?.success === 'false') throw new Error(json?.message || `Email delivery failed (${res.status})`);
}

const reference = () => `HH-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

type Body = Record<string, unknown>;
const str = (v: unknown) => v === undefined || v === null || v === '' ? undefined : String(v);

/** Sends one form by email and returns what the UI expects back. */
export async function submitByEmail(resource: string, body: unknown): Promise<unknown> {
  const b = (body ?? {}) as Body;

  switch (resource) {
    case 'bookings':{
        const req = body as BookingRequest;
        const ref = reference();
        const service = services.find((s) => s.slug === req.serviceSlug);
        const consultant = consultants.find((c) => c.id === req.consultantId);
        const d = req.details;
        await send({
          to: contactInfo.email,
          subject: `New consultation booking ${ref} — ${d.fullName}`,
          replyTo: d.email,
          fields: {
            'Booking reference': ref,
            Service: service?.title.en ?? req.serviceSlug,
            Consultant: consultant?.name.en ?? 'Any available consultant',
            Meeting: req.mode === 'online' ? `Online${req.platform ? ` (${req.platform})` : ''}` : 'In person',
            Duration: `${req.duration} minutes`,
            'Date & time': `${req.date} at ${req.time} (GST, UTC+4)`,
            Name: d.fullName,
            Company: d.company,
            'Job title': d.jobTitle,
            Email: d.email,
            Phone: `${d.countryCode} ${d.phone}`,
            'Company size': d.companySize,
            'Preferred language': d.language === 'ar' ? 'Arabic' : 'English',
            Challenge: d.challenge
          }
        });
        return { reference: ref };
      }
    case 'contact':
      await send({
        to: contactInfo.email,
        subject: `New contact message — ${str(b.subject) ?? str(b.fullName)}`,
        replyTo: str(b.email),
        fields: { Name: str(b.fullName), Email: str(b.email), Company: str(b.company), Subject: str(b.subject), Message: str(b.message) }
      });
      return { ok: true };
    case 'partner-applications':
      await send({
        to: contactInfo.email,
        subject: `New partnership request — ${str(b.company)}`,
        replyTo: str(b.email),
        fields: { Name: str(b.fullName), Company: str(b.company), Email: str(b.email), Website: str(b.website), 'Partner type': str(b.partnerType), Message: str(b.message) }
      });
      return { ok: true };
    case 'job-applications':
      await send({
        to: contactInfo.hrEmail,
        subject: `Job application — ${str(b.position)} — ${str(b.fullName)}`,
        replyTo: str(b.email),
        fields: { Position: str(b.position), Name: str(b.fullName), Email: str(b.email), Phone: str(b.phone), Message: str(b.message) },
        attachment: b.cv instanceof File ? b.cv : undefined
      });
      return { ok: true };
    case 'newsletter':
      await send({
        to: contactInfo.email,
        subject: 'New newsletter subscriber',
        replyTo: str(b.email),
        fields: { Email: str(b.email) }
      });
      return { ok: true };
    default:
      throw new Error(`Unknown form: ${resource}`);
  }
}
