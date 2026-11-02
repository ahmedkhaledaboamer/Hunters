import { describe, expect, it } from 'vitest';
import { cn } from './cn';
import { photoSmall, photoSrcSet } from './image';
import { contactInfo, isPlaceholder, telHref } from '../../data/directory';

describe('cn', () => {
  it('keeps custom font sizes next to text colours', () => {
    // Regression: tailwind-merge used to read text-display as a colour and drop it.
    expect(cn('text-display text-fg')).toBe('text-display text-fg');
    expect(cn('text-headline', 'text-muted')).toBe('text-headline text-muted');
  });

  it('still resolves real conflicts', () => {
    expect(cn('px-2 px-4')).toBe('px-4');
    expect(cn('text-sm', 'text-display')).toBe('text-display');
  });
});

describe('image helpers', () => {
  it('builds a srcset for project photos only', () => {
    expect(photoSrcSet('/a.webp')).toBe('/a-640.webp 640w, /a.webp 1376w');
    expect(photoSrcSet('/og-image.jpg')).toBeUndefined();
    expect(photoSmall('/a.webp')).toBe('/a-640.webp');
  });
});

describe('contact info', () => {
  it('exposes the confirmed contacts', () => {
    expect(contactInfo).toMatchObject({
      email: 'info@h.hunters.ai',
      hrEmail: 'hr.hunters2022@gmail.com',
      phone: '+971 50 978 2770'
    });
  });

  it('formats dialable phone links and spots placeholders', () => {
    expect(telHref('+971 50 978 2770')).toBe('tel:+971509782770');
    expect(isPlaceholder('[www.example.com]')).toBe(true);
    expect(isPlaceholder(contactInfo.email)).toBe(false);
  });
});
