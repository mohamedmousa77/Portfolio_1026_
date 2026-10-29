import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

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

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

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

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl bg-ink-900/80 border text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2';

  return (
    <section id="contact" className="relative section-padding">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[500px] rounded-full bg-electric/10 blur-[120px]" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
        {/* Left — info */}
        <div className="reveal">
          <span className="text-cyan-glow font-mono text-sm tracking-widest uppercase">
            04 — Contact
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Let's build something</h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Have a project in mind or want to discuss an opportunity? Send me a message and I'll
            get back to you as soon as possible.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="https://github.com/mohamedmousa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-card hover:glow-border hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center">
                <Github className="h-5 w-5 text-cyan-glow" />
              </div>
              <div>
                <div className="text-sm text-slate-400">GitHub</div>
                <div className="font-semibold text-white group-hover:text-cyan-glow transition-colors">
                  @mohamedmousa
                </div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/mohamedmousa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-card hover:glow-border hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center">
                <Linkedin className="h-5 w-5 text-cyan-glow" />
              </div>
              <div>
                <div className="text-sm text-slate-400">LinkedIn</div>
                <div className="font-semibold text-white group-hover:text-cyan-glow transition-colors">
                  Mohamed Mousa
                </div>
              </div>
            </a>

            <a
              href="mailto:hello@mohamedmousa.dev"
              className="flex items-center gap-4 p-4 rounded-xl glass-card hover:glow-border hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center">
                <Mail className="h-5 w-5 text-cyan-glow" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Email</div>
                <div className="font-semibold text-white group-hover:text-cyan-glow transition-colors">
                  hello@mohamedmousa.dev
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Right — form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="glass-card p-8 reveal"
        >
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Your name"
                className={`${inputBase} ${
                  errors.name
                    ? 'border-red-500/50 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-cyan/40 focus:ring-cyan/20'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={`${inputBase} ${
                  errors.email
                    ? 'border-red-500/50 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-cyan/40 focus:ring-cyan/20'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                placeholder="Tell me about your project..."
                className={`${inputBase} resize-none ${
                  errors.message
                    ? 'border-red-500/50 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-cyan/40 focus:ring-cyan/20'
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                Thanks! Your message has been sent — I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan to-electric text-ink-950 font-semibold hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
