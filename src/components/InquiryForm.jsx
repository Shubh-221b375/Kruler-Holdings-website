import { useState, useCallback } from 'react';
import { ArrowIcon } from './Header';
import { INQUIRY_FORM_ENDPOINT, INQUIRY_FORM_CC } from '../config/inquiryForm';

const INQUIRY_TYPES = [
  { value: 'investment', label: 'Investment & acquisitions' },
  { value: 'partnership', label: 'Partnership & joint venture' },
  { value: 'leasing', label: 'Leasing & tenancy' },
  { value: 'hospitality', label: 'Hospitality & operations' },
  { value: 'sports', label: 'Sports & wellness' },
  { value: 'general', label: 'General enquiry' },
];

function validatePhone(phone) {
  if (!phone || !String(phone).trim()) return false;
  const digits = String(phone).replace(/\D/g, '');
  return digits.length >= 8;
}

export default function InquiryForm({ variant = 'contact' }) {
  const [status, setStatus] = useState('idle');

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fd = new FormData(form);
      const first = String(fd.get('firstName') || '').trim();
      const last = String(fd.get('lastName') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const phone = String(fd.get('phone') || '').trim();
      const message = String(fd.get('message') || '').trim();
      const inquiryType = String(fd.get('inquiryType') || '').trim();
      const gotcha = String(fd.get('_gotcha') || '').trim();

      if (gotcha) return;
      if (!first || !last || !email || !validatePhone(phone) || !message || !inquiryType) {
        setStatus('error');
        return;
      }

      const typeLabel = INQUIRY_TYPES.find((t) => t.value === inquiryType)?.label || inquiryType;
      fd.append('_subject', `Kruler website · ${typeLabel}`);
      fd.append('_template', 'table');

      setStatus('sending');
      try {
        const res = await fetch(INQUIRY_FORM_ENDPOINT, {
          method: 'POST',
          body: fd,
          headers: { Accept: 'application/json' },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok && data.error) throw new Error(data.error);
        if (!res.ok) throw new Error('Request failed');
        setStatus('success');
        form.reset();
      } catch {
        setStatus('error');
      }
    },
    []
  );

  const isFooter = variant === 'footer';

  if (isFooter) {
    return (
      <form className="footer-query-form inquiry-form inquiry-form--footer" onSubmit={onSubmit} noValidate>
        <input type="hidden" name="_cc" value={INQUIRY_FORM_CC} />
        <input type="text" name="_gotcha" className="honeypot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="footer-form-row">
          <input type="text" name="firstName" placeholder="First name" required autoComplete="given-name" />
          <input type="text" name="lastName" placeholder="Last name" required autoComplete="family-name" />
        </div>
        <div className="footer-form-row">
          <input type="email" name="email" placeholder="Email" required autoComplete="email" />
          <input type="tel" name="phone" placeholder="Phone (required)" required autoComplete="tel" />
        </div>
        <input type="text" name="company" placeholder="Company (optional)" autoComplete="organization" />
        <select name="inquiryType" className="footer-inquiry-select" required defaultValue="">
          <option value="" disabled>
            Inquiry type
          </option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <textarea name="message" placeholder="Your message" rows="3" required />
        <button type="submit" className="footer-submit-btn" disabled={status === 'sending'}>
          <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
          <ArrowIcon />
        </button>
        {status === 'success' && <p className="inquiry-form-status inquiry-form-status--ok">Thank you — we will reply shortly.</p>}
        {status === 'error' && (
          <p className="inquiry-form-status inquiry-form-status--err">Please check all fields (including a valid phone) and try again.</p>
        )}
      </form>
    );
  }

  return (
    <form className="contact-enquiry-form inquiry-form inquiry-form--page" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="_cc" value={INQUIRY_FORM_CC} />
      <input type="text" name="_gotcha" className="honeypot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="contact-form-row">
        <label className="contact-field">
          <span>First name</span>
          <input type="text" name="firstName" placeholder="Given name" required autoComplete="given-name" />
        </label>
        <label className="contact-field">
          <span>Last name</span>
          <input type="text" name="lastName" placeholder="Family name" required autoComplete="family-name" />
        </label>
      </div>
      <div className="contact-form-row">
        <label className="contact-field">
          <span>Email</span>
          <input type="email" name="email" placeholder="you@company.com" required autoComplete="email" />
        </label>
        <label className="contact-field">
          <span>Phone</span>
          <input type="tel" name="phone" placeholder="+84 …" required autoComplete="tel" />
        </label>
      </div>
      <label className="contact-field contact-field-full">
        <span>Company (optional)</span>
        <input type="text" name="company" placeholder="Organisation" autoComplete="organization" />
      </label>
      <label className="contact-field contact-field-full">
        <span>Inquiry type</span>
        <select name="inquiryType" defaultValue="" required>
          <option value="" disabled>
            Select a focus
          </option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="contact-field contact-field-full">
        <span>Message</span>
        <textarea name="message" placeholder="Project scope, timeline, or questions—we read every detail." rows="6" required />
      </label>
      <button type="submit" className="contact-submit-btn" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'Sending…' : 'Submit enquiry'}</span>
        <ArrowIcon />
      </button>
      {status === 'success' && (
        <p className="inquiry-form-status inquiry-form-status--ok">Your enquiry was sent. Our directors will respond as soon as possible.</p>
      )}
      {status === 'error' && (
        <p className="inquiry-form-status inquiry-form-status--err">Please complete every required field, including a valid phone number, and try again.</p>
      )}
    </form>
  );
}

export function NewsletterSignup() {
  const [status, setStatus] = useState('idle');

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get('email') || '').trim();
    const gotcha = String(fd.get('_gotcha') || '').trim();
    if (gotcha || !email) {
      setStatus('error');
      return;
    }
    fd.append('_subject', 'Kruler website · Newsletter subscription');
    fd.append('firstName', 'Newsletter');
    fd.append('lastName', 'Subscriber');
    fd.append('phone', '00000000');
    fd.append('inquiryType', 'general');
    fd.append('message', 'Please add this address to the Kruler newsletter list.');
    setStatus('sending');
    try {
      const res = await fetch(INQUIRY_FORM_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }, []);

  return (
    <form className="footer-newsletter-form" onSubmit={onSubmit}>
      <input type="hidden" name="_cc" value={INQUIRY_FORM_CC} />
      <input type="text" name="_gotcha" className="honeypot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="email" name="email" placeholder="Enter email address" required autoComplete="email" />
      <button type="submit" aria-label="Subscribe" disabled={status === 'sending'}>
        <ArrowIcon />
      </button>
      {status === 'success' && <span className="newsletter-form-note">Subscribed.</span>}
      {status === 'error' && <span className="newsletter-form-note newsletter-form-note--err">Check your email.</span>}
    </form>
  );
}
