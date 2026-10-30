import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  Copy,
  Check,
  Download,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import cvFile from '../../assets/Mohamed_Mousa_CV.pdf';

type Status = 'idle' | 'loading' | 'success' | 'error';

const topics = [
  'Job opportunity',
  'Freelance project',
  'Collaboration',
  'Just saying hi',
] as const;

type Topic = (typeof topics)[number];

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_ADDRESS = 'mohamed.mousa.contact@gmail.com';

function formatRomeTime(): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Rome',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '';
  }
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState<string>(() => formatRomeTime());

  const topicRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setLocalTime(formatRomeTime());
    const interval = window.setInterval(() => {
      setLocalTime(formatRomeTime());
    }, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleSpotlightMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleCopyEmail = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  const handleTopicKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % topics.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + topics.length) % topics.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = topics.length - 1;
    }

    if (nextIndex !== null) {
      topicRefs.current[nextIndex]?.focus();
      setSelectedTopic(topics[nextIndex]);
    }
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!emailRegex.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please enter a message.';
    else if (form.message.trim().length < 10)
      next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (status === 'error') setStatus('idle');
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const trimmedMessage = form.message.trim();
      const finalMessage = selectedTopic
        ? `[Topic: ${selectedTopic}] ${trimmedMessage}`
        : trimmedMessage;

      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: finalMessage,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setSelectedTopic(null);
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full px-4 py-3 text-[16px] rounded-[12px] bg-ink-900/80 border text-[#F8FAFC] placeholder-slate-500 transition-all duration-200 focus:outline-none';

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-[108px]">
      {/* Hero-consistent background treatment */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[500px] rounded-full bg-electric/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-12 lg:items-stretch">
        {/* Left — info */}
        <div className="flex flex-col justify-between reveal">
          <div>
            <span className="section-eyebrow">04 — CONTACT</span>
            <h2 className="mt-3 text-[40px] md:text-[48px] leading-tight font-bold tracking-[-0.02em] text-[#F8FAFC]">
              Let's build something that{' '}
              <span className="gradient-text animate-gradient-shift">lasts</span>.
            </h2>
            <p className="mt-4 text-[16px] md:text-[18px] text-[#CBD5E1] leading-[1.6] max-w-xl">
              Open to full-time roles, freelance projects and collaborations. Tell me what you're
              building and I'll get back to you as soon as possible.
            </p>

            {/* Availability pill */}
            <div className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] text-sm font-medium text-[#F8FAFC]">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#34D399] animate-emerald-pulse" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34D399]" />
              </span>
              Available for new opportunities
            </div>

            {/* Contact Cards */}
            <div className="mt-8 space-y-3.5">
              {/* GitHub */}
              <a
                href="https://github.com/mohamedmousa77"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleSpotlightMove}
                className="spotlight-card relative overflow-hidden flex items-center justify-between gap-4 p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-ink-850/60 backdrop-blur-xl hover:glow-border [@media(hover:hover)]:hover:-translate-y-0.5 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center"
                  >
                    <Github className="h-5 w-5 text-[#38BDF8]" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8]">GitHub</div>
                    <div className="font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                      @mohamedmousa77
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-[#94A3B8] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mohamedmousa-"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleSpotlightMove}
                className="spotlight-card relative overflow-hidden flex items-center justify-between gap-4 p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-ink-850/60 backdrop-blur-xl hover:glow-border [@media(hover:hover)]:hover:-translate-y-0.5 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center"
                  >
                    <Linkedin className="h-5 w-5 text-[#38BDF8]" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8]">LinkedIn</div>
                    <div className="font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                      Mohamed Mousa
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-[#94A3B8] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                />
              </a>

              {/* Email with mailto fallback + copy icon button */}
              <div
                onMouseMove={handleSpotlightMove}
                className="spotlight-card relative overflow-hidden flex items-center justify-between gap-3 p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-ink-850/60 backdrop-blur-xl hover:glow-border [@media(hover:hover)]:hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="relative z-10 flex items-center gap-4 flex-1 min-w-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow"
                >
                  <div
                    aria-hidden="true"
                    className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center"
                  >
                    <Mail className="h-5 w-5 text-[#38BDF8]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-[#94A3B8]">Email</div>
                    <div className="font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors truncate">
                      {EMAIL_ADDRESS}
                    </div>
                  </div>
                </a>

                <div className="relative z-10 flex items-center gap-2 shrink-0">
                  <span
                    aria-live="polite"
                    className={`text-xs font-medium text-[#34D399] transition-opacity duration-200 ${
                      copied ? 'opacity-100' : 'opacity-0 sr-only'
                    }`}
                  >
                    {copied ? 'Copied!' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="h-9 w-9 rounded-lg border border-[rgba(255,255,255,0.10)] bg-white/[0.04] flex items-center justify-center text-[#CBD5E1] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-[#34D399]" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom left meta row + Download CV button */}
          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#94A3B8]">
              <span>Puglia, Italy · Italian · English · Arabic</span>
              {localTime && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#CBD5E1]">
                  <Clock className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
                  {localTime} local time
                </span>
              )}
            </div>

            <div>
              <a
                href={cvFile}
                download="Mohamed_Mousa_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[rgba(255,255,255,0.15)] bg-white/[0.04] text-sm font-semibold text-[#F8FAFC] hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/[0.08] [@media(hover:hover)]:hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <Download className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Right — form card */}
        <div
          onMouseMove={handleSpotlightMove}
          style={{ transitionDelay: '80ms' }}
          className="spotlight-card relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-ink-850/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-center transition-all duration-300 focus-within:border-[#38BDF8]/45 focus-within:shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_0_36px_-8px_rgba(56,189,248,0.28)] reveal"
        >
          {status === 'success' ? (
            <div className="relative z-10 py-12 px-4 text-center flex flex-col items-center justify-center my-auto">
              <div
                aria-hidden="true"
                className="h-16 w-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-5 animate-check-pop"
              >
                <CheckCircle2 className="h-8 w-8 text-[#34D399]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">
                Message sent. Thanks, I'll get back to you soon.
              </h3>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#38BDF8] hover:text-white hover:bg-white/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === 'loading'}
              className="relative z-10 space-y-5"
            >
              {/* Topic selectable chips (radiogroup) */}
              <div>
                <span
                  id="topic-group-label"
                  className="block text-sm font-medium text-[#CBD5E1] mb-2.5"
                >
                  What's this about?
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="topic-group-label"
                  className="flex flex-wrap gap-2"
                >
                  {topics.map((topic, idx) => {
                    const isSelected = selectedTopic === topic;
                    const isTabStop =
                      selectedTopic === null ? idx === 0 : isSelected;
                    return (
                      <button
                        key={topic}
                        ref={(el) => {
                          topicRefs.current[idx] = el;
                        }}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={isTabStop ? 0 : -1}
                        onClick={() =>
                          setSelectedTopic((prev) => (prev === topic ? null : topic))
                        }
                        onKeyDown={(e) => handleTopicKeyDown(e, idx)}
                        className={`px-3 py-1.5 rounded-[10px] text-[13px] font-mono transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow ${
                          isSelected
                            ? 'bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.4)] text-[#7DD3FC] font-medium'
                            : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] text-[#CBD5E1] hover:border-[rgba(255,255,255,0.22)] hover:text-[#F8FAFC]'
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#CBD5E1] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`${inputBase} ${
                    errors.name
                      ? 'border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.18)]'
                      : 'border-[rgba(255,255,255,0.10)] focus:border-[#38BDF8] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]'
                  }`}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#CBD5E1] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`${inputBase} ${
                    errors.email
                      ? 'border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.18)]'
                      : 'border-[rgba(255,255,255,0.10)] focus:border-[#38BDF8] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]'
                  }`}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#CBD5E1] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Tell me about your project or the role..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputBase} resize-none ${
                    errors.message
                      ? 'border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.18)]'
                      : 'border-[rgba(255,255,255,0.10)] focus:border-[#38BDF8] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Error state with Retry */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
                    Something went wrong. Please try again or email me directly.
                  </span>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-semibold text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#6366F1] text-ink-950 font-semibold hover:shadow-xl hover:shadow-cyan/30 [@media(hover:hover)]:hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
