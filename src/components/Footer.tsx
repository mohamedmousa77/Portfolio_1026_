import { Github, Linkedin, Mail, ArrowUp, Code2 } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/mohamedmousa77', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohamedmousa-', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:mohamed.mousa.contact@gmail.com', label: 'Email' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-electric text-ink-950">
                <Code2 className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="font-bold text-lg text-white">
                Mohamed<span className="text-cyan-glow">.</span>Mousa
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Full Stack Web Developer & Senior .NET Backend Developer building scalable software
              for web and mobile.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-glow transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-glow hover:border-cyan/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Mohamed Mousa.
          </p>
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-glow transition-colors group"
          >
            Back to top
            <span className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-cyan/30 group-hover:-translate-y-0.5 transition-all">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
