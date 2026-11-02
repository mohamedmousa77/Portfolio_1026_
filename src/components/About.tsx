import { Layers, Clock, Smartphone, Award, FolderGit2, Mail } from 'lucide-react';
import { useTranslation } from '@/i18n';

interface StatItem {
  icon: typeof Clock;
  valueKey: string;
  labelKey: string;
}

interface PillarItem {
  titleKey: string;
  descriptionKey: string;
  chips: string[];
}

interface HighlightItem {
  metricKey: string;
  labelKey: string;
  contextKey: string;
}

const stats: StatItem[] = [
  { icon: Clock, valueKey: 'about.stats.yearsValue', labelKey: 'about.stats.yearsLabel' },
  { icon: Layers, valueKey: 'about.stats.projectsValue', labelKey: 'about.stats.projectsLabel' },
  { icon: Smartphone, valueKey: 'about.stats.mobileValue', labelKey: 'about.stats.mobileLabel' },
  { icon: Award, valueKey: 'about.stats.cleanValue', labelKey: 'about.stats.cleanLabel' },
];

const pillars: PillarItem[] = [
  {
    titleKey: 'about.pillars.p1Title',
    descriptionKey: 'about.pillars.p1Desc',
    chips: ['Clean Architecture', 'DDD', 'CQRS', 'SOLID'],
  },
  {
    titleKey: 'about.pillars.p2Title',
    descriptionKey: 'about.pillars.p2Desc',
    chips: ['ASP.NET Core', 'SQL Server', 'Angular', 'Flutter'],
  },
  {
    titleKey: 'about.pillars.p3Title',
    descriptionKey: 'about.pillars.p3Desc',
    chips: ['Azure DevOps', 'Docker', 'xUnit & Moq', 'SonarQube'],
  },
];

const highlights: HighlightItem[] = [
  {
    metricKey: 'about.highlights.h1Metric',
    labelKey: 'about.highlights.h1Label',
    contextKey: 'about.highlights.h1Context',
  },
  {
    metricKey: 'about.highlights.h2Metric',
    labelKey: 'about.highlights.h2Label',
    contextKey: 'about.highlights.h2Context',
  },
  {
    metricKey: 'about.highlights.h3Metric',
    labelKey: 'about.highlights.h3Label',
    contextKey: 'about.highlights.h3Context',
  },
  {
    metricKey: 'about.highlights.h4Metric',
    labelKey: 'about.highlights.h4Label',
    contextKey: 'about.highlights.h4Context',
  },
  {
    metricKey: 'about.highlights.h5Metric',
    labelKey: 'about.highlights.h5Label',
    contextKey: 'about.highlights.h5Context',
  },
];

export default function About() {
  const { t } = useTranslation();
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="relative section-block">
      <div aria-hidden="true" className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />

      <div className="relative z-10 site-container">
        {/* Centered Header Block (4.2) */}
        <div className="text-center max-w-[720px] mx-auto mb-16 reveal">
          <span className="section-eyebrow">
            {t('about.eyebrow')}
          </span>
          <h2 className="section-title">
            {t('about.title')}
          </h2>
          <p className="mt-5 text-[20px] md:text-[22px] leading-[1.55] font-medium text-[#F8FAFC] max-w-[720px] mx-auto [text-wrap:pretty]">
            {t('about.intro1')}
          </p>
          <p className="mt-4 text-[17px] md:text-[18px] leading-[1.7] text-[#CBD5E1] max-w-[720px] mx-auto [text-wrap:pretty]">
            {t('about.intro2')}
          </p>
        </div>

        {/* Stats (2x2 on mobile, 4 cols on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 reveal">
          {stats.map((s) => (
            <div
              key={s.labelKey}
              className="glass-card p-8 text-center hover:glow-border hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <s.icon
                aria-hidden="true"
                className="h-7 w-7 mx-auto mb-3 text-[#38BDF8] group-hover:scale-110 transition-transform duration-200"
              />
              <div className="text-[36px] md:text-[44px] leading-none font-bold text-[#F8FAFC]">
                {t(s.valueKey)}
              </div>
              <div className="text-[14px] md:text-[15px] text-slate-300 mt-2 font-medium">
                {t(s.labelKey)}
              </div>
            </div>
          ))}
        </div>

        {/* Pillars (4.3: CSS subgrid across the 3 cards so badge, title, description and chips align) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-0 pillars-subgrid reveal">
          {pillars.map((p, i) => (
            <div
              key={p.titleKey}
              className="pillar-card-subgrid glass-card p-8 md:p-9 flex flex-col hover:glow-border hover:-translate-y-0.5 transition-all duration-200"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div
                aria-hidden="true"
                className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center mb-5"
              >
                <span className="font-mono text-[#38BDF8] font-bold text-lg">{i + 1}</span>
              </div>

              <h3 className="text-[20px] md:text-[22px] font-semibold text-[#F8FAFC] mb-3 [text-wrap:balance]">
                {t(p.titleKey)}
              </h3>

              <p className="text-[16px] text-slate-300 leading-[1.6]">{t(p.descriptionKey)}</p>

              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-[rgba(255,255,255,0.08)]">
                {p.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-md text-xs font-mono chip-normal"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Strip — 64px above and 64px below */}
        <section aria-labelledby="highlights-title" className="mt-16 mb-16 reveal">
          <h3
            id="highlights-title"
            className="text-center font-mono text-[13px] md:text-[14px] uppercase tracking-[0.15em] text-[#38BDF8] mb-6"
          >
            {t('about.highlights.heading')}
          </h3>

          <div className="w-full rounded-[20px] surface-card p-8">
            <ul className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 sm:gap-6 lg:gap-0">
              {highlights.map((item, idx) => {
                const tabletSpan =
                  idx === 3
                    ? 'sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto'
                    : 'sm:col-span-2 lg:col-span-1';

                const dividers =
                  idx > 0
                    ? 'border-t border-[rgba(255,255,255,0.08)] pt-5 sm:border-t-0 sm:pt-0 lg:border-l lg:border-[rgba(255,255,255,0.08)] lg:pl-6'
                    : '';

                const mobilePadding = idx < highlights.length - 1 ? 'pb-5 sm:pb-0' : '';
                const desktopRightPad = idx < highlights.length - 1 ? 'lg:pr-6' : '';

                return (
                  <li
                    key={item.labelKey}
                    style={{ transitionDelay: `${idx * 60}ms` }}
                    className={`reveal-strip text-center lg:text-left transition-transform duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-0.5 group ${tabletSpan} ${dividers} ${mobilePadding} ${desktopRightPad}`}
                  >
                    <div className="text-[36px] md:text-[40px] leading-tight font-bold tracking-[-0.02em] metric-gradient [@media(hover:hover)]:group-hover:brightness-110 transition-all duration-200">
                      {t(item.metricKey)}
                    </div>
                    <div className="mt-1 text-[16px] font-semibold text-[#F8FAFC]">
                      {t(item.labelKey)}
                    </div>
                    <div className="mt-1 text-[14px] leading-[1.5] text-[#94A3B8]">
                      {t(item.contextKey)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
          <button
            type="button"
            onClick={() => scrollTo('#projects')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#6366F1] text-ink-950 font-semibold hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <FolderGit2 className="h-5 w-5" aria-hidden="true" />
            {t('about.ctaProjects')}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 text-[#F8FAFC] font-semibold hover:border-cyan/40 hover:bg-cyan/5 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {t('about.ctaContact')}
          </button>
        </div>
      </div>
    </section>
  );
}
