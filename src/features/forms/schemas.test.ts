import { describe, expect, it } from 'vitest';
import type { TFunction } from 'i18next';
import { makeBookingDetailsSchema, makeContactSchema } from './schemas';

// Echo the key so assertions can check which message was produced.
const t = ((key: string) => key) as unknown as TFunction;

const validDetails = {
  fullName: 'Test User',
  company: 'ACME',
  jobTitle: 'CTO',
  email: 'test@example.com',
  countryCode: '+971',
  phone: '50 978 2770',
  companySize: '11-50',
  challenge: 'We need to modernise our ERP and reporting stack.',
  language: 'en' as const
};

describe('booking details schema', () => {
  const schema = makeBookingDetailsSchema(t);

  it('accepts a complete form', () => {
    expect(schema.safeParse(validDetails).success).toBe(true);
  });

  it.each([
  ['email', 'not-an-email', 'forms.errors.email'],
  ['phone', 'abc', 'forms.errors.phone'],
  ['challenge', 'too short', 'forms.errors.min'],
  ['fullName', ' ', 'forms.errors.required']] as const)(
    'rejects an invalid %s', (field, value, message) => {
      const result = schema.safeParse({ ...validDetails, [field]: value });
      expect(result.success).toBe(false);
      expect(result.error?.issues.find((i) => i.path[0] === field)?.message).toBe(message);
    });
});

describe('contact schema', () => {
  const schema = makeContactSchema(t);

  it('treats company as optional', () => {
    const ok = schema.safeParse({ fullName: 'Al', email: 'a@b.co', subject: 'Hi', message: 'A message that is long enough.' });
    expect(ok.success).toBe(true);
  });
});
