import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight, Download, Code2 } from 'lucide-react';
import cvFile from '../../assets/Mohamed_Mousa_CV.pdf';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const connectLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/mohamedmousa77',
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohamedmousa-',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:mohamed.mousa.contact@gmail.com',
    external: false,
  },
  {
    icon: Download,
    label: 'Download CV',
    href: cvFile,
    download: 'Mohamed_Mousa_CV.pdf',
    external: false,
  },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSmoothNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(255,255,255,0.08)] bg-ink-950">
      <div aria-hidden="true" className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-6">
        {/* 12-column grid on desktop: Brand (5), Navigate (3), Connect (4) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(255,255,255,0.08)]">
          {/* Brand — spans 5 */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => handleSmoothNav(e, '#home')}
              className="inline-flex items-center gap-2 mb-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-electric text-ink-950"
              >
                <Code2 className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="font-bold text-lg text-[#F8FAFC]">
                Mohamed<span className="text-cyan-glow">.</span>Mousa
              </span>
            </a>
            <p className="text-[15px] md:text-[16px] text-[#CBD5E1] leading-relaxed max-w-sm">
              Senior Full-Stack .NET Developer building scalable, cloud-ready software.
            </p>
          </div>

          {/* Navigate — spans 3 */}
          <div className="md:col-span-3">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothNav(e, link.href)}
                    className="group relative inline-flex items-center text-[16px] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#38BDF8] transition-all duration-200 group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect — spans 4 */}
          <div className="md:col-span-4">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5">
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    download={item.download}
                    className="group inline-flex items-center gap-2.5 text-[16px] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  >
                    <item.icon
                      className="h-4 w-4 text-[#38BDF8] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#38BDF8] transition-all duration-200 group-hover:w-full"
                      />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-6">
          <p className="text-[14px] text-[#94A3B8]">
            © 2026 Mohamed Mousa. Designed &amp; built by me.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-2.5 text-[14px] font-medium text-[#CBD5E1] hover:text-[#38BDF8] rounded-lg px-2 py-1 transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>Back to top</span>
            <span
              aria-hidden="true"
              className="h-8 w-8 rounded-lg border border-[rgba(255,255,255,0.10)] bg-white/[0.04] flex items-center justify-center group-hover:border-[#38BDF8]/40 [@media(hover:hover)]:group-hover:-translate-y-0.5 transition-all duration-200"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      {/* Signature bottom-cropped wordmark */}
      <div
        aria-hidden="true"
        className="relative z-0 w-full overflow-hidden select-none pointer-events-none flex justify-center pt-2"
      >
        <span className="footer-wordmark block text-center font-extrabold tracking-[-0.04em] leading-[0.8] md:whitespace-nowrap text-[clamp(3.5rem,13vw,12rem)] translate-y-[18%]">
          Mohamed Mousa
        </span>
      </div>
    </footer>
  );
}
