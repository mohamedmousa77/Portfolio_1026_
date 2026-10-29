import { ArrowDown, FolderGit2, Mail, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-electric/20 blur-[120px] animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-cyan/20 blur-[120px] animate-glow-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/20 bg-cyan/5 text-cyan-glow text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4" />
          Available for new opportunities
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <span className="block text-white">Mohamed</span>
          <span className="gradient-text animate-gradient-shift">Mousa</span>
        </h1>

        <p
          className="text-lg md:text-2xl text-slate-300 font-medium mb-4 animate-fade-up"
          style={{ animationDelay: '0.25s', opacity: 0 }}
        >
          Full Stack Web Developer & Senior .NET Backend Developer
        </p>

        <p
          className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          I build scalable, well-architected software using{' '}
          <span className="text-cyan-glow font-medium">Clean Architecture</span>,{' '}
          <span className="text-cyan-glow font-medium">.NET</span>,{' '}
          <span className="text-cyan-glow font-medium">Angular</span>,{' '}
          <span className="text-cyan-glow font-medium">SQL Server</span> and{' '}
          <span className="text-cyan-glow font-medium">Azure</span> — delivering robust solutions
          for web and mobile.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.55s', opacity: 0 }}
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan to-electric text-ink-950 font-semibold hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <FolderGit2 className="h-5 w-5" />
            Explore Projects
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-semibold hover:border-cyan/40 hover:bg-cyan/5 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Mail className="h-5 w-5" />
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-glow transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border-2 border-current pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-current animate-scroll-down" />
        </span>
        <ArrowDown className="h-4 w-4" />
      </button>
    </section>
  );
}
