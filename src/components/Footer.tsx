import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight, Download, Code2 } from 'lucide-react';
import { getCvForLang } from '@/config/cv';
import { useTranslation } from '@/i18n';

const navLinks = [
  { labelKey: 'nav.home', href: '#home' },
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.projects', href: '#projects' },
  { labelKey: 'nav.skills', href: '#skills' },
  { labelKey: 'nav.contact', href: '#contact' },
];

export default function Footer() {
  const { lang, t } = useTranslation();
  const cv = getCvForLang(lang);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const connectLinks = [
    {
      icon: Github,
      labelKey: 'footer.github',
      href: 'https://github.com/mohamedmousa77',
      external: true,
    },
    {
      icon: Linkedin,
      labelKey: 'footer.linkedin',
      href: 'https://www.linkedin.com/in/mohamedmousa-',
      external: true,
    },
    {
      icon: Mail,
      labelKey: 'footer.email',
      href: 'mailto:mohamed.mousa.contact@gmail.com',
      external: false,
    },
    {
      icon: Download,
      labelKey: 'footer.downloadCv',
      href: cv.href,
      download: cv.downloadName,
      external: false,
    },
  ];

  const handleSmoothNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.08)] bg-ink-950"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <div className="relative z-10 site-container pt-16 pb-6">
        {/* 12-column grid on desktop: Brand (5), Navigate (3), Connect (4) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(255,255,255,0.08)]">
          {/* Brand — spans 5 */}
          <div className="md:col-span-5 min-w-0">
            <a
              href="#home"
              onClick={(e) => handleSmoothNav(e, '#home')}
              className="inline-flex items-center gap-2 mb-4 rounded-lg min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-electric text-ink-950"
              >
                <Code2 className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="font-bold text-lg text-[#F8FAFC]">
                Mohamed<span className="text-cyan-glow">.</span>Mousa
              </span>
            </a>
            <p className="text-[15px] md:text-[16px] text-[#CBD5E1] leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigate — spans 3 */}
          <div className="md:col-span-3 min-w-0">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">
              {t('footer.navigate')}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothNav(e, link.href)}
                    className="group relative inline-flex items-center min-h-[40px] sm:min-h-0 py-1 text-[16px] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  >
                    <span>{t(link.labelKey)}</span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-0 h-px w-0 bg-[#38BDF8] transition-all duration-200 group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect — spans 4 */}
          <div className="md:col-span-4 min-w-0">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">
              {t('footer.connect')}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {connectLinks.map((item) => (
                <li key={item.labelKey}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    download={item.download}
                    className="group inline-flex items-center gap-2.5 min-h-[40px] sm:min-h-0 py-1 text-[16px] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  >
                    <item.icon
                      className="h-4 w-4 text-[#38BDF8] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="relative">
                      {t(item.labelKey)}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#38BDF8] transition-all duration-200 group-hover:w-full"
                      />
                    </span>
                    {item.external && (
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-6">
          <p className="text-[14px] text-[#94A3B8] text-center sm:text-left">
            {t('footer.copyright')}
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-2.5 min-h-[44px] text-[14px] font-medium text-[#CBD5E1] hover:text-[#38BDF8] rounded-lg px-2 py-1 transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{t('footer.backToTop')}</span>
            <span
              aria-hidden="true"
              className="h-9 w-9 rounded-lg border border-[rgba(255,255,255,0.10)] bg-white/[0.04] flex items-center justify-center group-hover:border-[#38BDF8]/40 [@media(hover:hover)]:group-hover:-translate-y-0.5 transition-all duration-200"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      {/* 7.3: Signature bottom-cropped wordmark — font-size min(11.5vw, 12rem), white-space nowrap, centered, cropped only at bottom */}
      <div
        aria-hidden="true"
        className="relative z-0 w-full overflow-hidden select-none pointer-events-none flex justify-center pt-2"
      >
        <span
          style={{ fontSize: 'min(11.5vw, 12rem)' }}
          className="footer-wordmark block text-center font-extrabold tracking-[-0.04em] leading-[0.8] whitespace-nowrap translate-y-[18%]"
        >
          Mohamed Mousa
        </span>
      </div>
    </footer>
  );
}
