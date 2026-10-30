import { ArrowDown, Download, FolderGit2, Mail, Sparkles } from 'lucide-react';
import personalImg from '../../assets/Personal.jpg';

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-8"
    >
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-radial-glow" />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-electric/20 blur-[120px] animate-glow-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-cyan/20 blur-[120px] animate-glow-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="relative z-10 flex-1 flex items-center max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 py-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left column — Name, Title & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/20 bg-cyan/5 text-cyan-glow text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Available for new opportunities · Italy & Remote
            </div>

            <h1
              className="font-bold tracking-[-0.02em] leading-[1.08] mb-5 animate-fade-up"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                animationDelay: '0.1s',
                opacity: 0,
              }}
            >
              <span className="block text-[#F8FAFC]">Mohamed</span>
              <span className="gradient-text animate-gradient-shift">Mousa</span>
            </h1>

            <p
              className="text-[22px] md:text-[26px] lg:text-[28px] leading-snug text-[#F8FAFC] font-semibold mb-5 animate-fade-up"
              style={{ animationDelay: '0.25s', opacity: 0 }}
            >
              Senior Full-Stack .NET Developer
            </p>

            <p
              className="max-w-[60ch] mx-auto lg:mx-0 text-base md:text-lg text-slate-300 leading-relaxed mb-9 animate-fade-up"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              I design and build scalable enterprise software with{' '}
              <span className="text-cyan-glow font-medium">Clean Architecture</span>,{' '}
              <span className="text-cyan-glow font-medium">.NET</span>,{' '}
              <span className="text-cyan-glow font-medium">Angular</span>,{' '}
              <span className="text-cyan-glow font-medium">SQL Server</span> and{' '}
              <span className="text-cyan-glow font-medium">Azure</span>, from database to
              deployment, for web and mobile.
            </p>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-up"
              style={{ animationDelay: '0.55s', opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#6366F1] text-ink-950 font-semibold hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <FolderGit2 className="h-5 w-5" aria-hidden="true" />
                Explore Projects
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 text-[#F8FAFC] font-semibold hover:border-cyan/40 hover:bg-cyan/5 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                Get in Touch
              </button>
              <a
                href="/assets/Mohamed_Mousa_CV.pdf"
                download="Mohamed_Mousa_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-cyan-glow hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <Download className="h-4 w-4 text-cyan-glow" aria-hidden="true" />
                Download CV
              </a>
            </div>

            <p
              className="mt-5 text-sm text-slate-400 font-medium tracking-wide animate-fade-up"
              style={{ animationDelay: '0.65s', opacity: 0 }}
            >
              Puglia, Italy · Italian · English · Arabic
            </p>
          </div>

          {/* Right column — Personal photo */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-up"
            style={{ animationDelay: '0.35s', opacity: 0 }}
          >
            <div className="relative group">
              {/* Soft cyan glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#38BDF8]/35 via-[#6366F1]/25 to-[#38BDF8]/35 opacity-60 blur-2xl group-hover:opacity-85 transition-opacity duration-500"
              />
              <div className="relative w-64 sm:w-72 md:w-80 lg:w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.12)] bg-ink-900 shadow-2xl">
                <img
                  src={personalImg}
                  alt="Portrait of Mohamed Mousa, Senior Full-Stack .NET Developer"
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center mt-4">
        <button
          type="button"
          onClick={() => scrollTo('#about')}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-glow rounded-lg p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow"
          aria-label="Scroll down to About section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <span
            aria-hidden="true"
            className="flex h-9 w-5 justify-center rounded-full border-2 border-current pt-1.5"
          >
            <span className="h-1.5 w-1 rounded-full bg-current animate-scroll-down" />
          </span>
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
