import { Layers, Server, Smartphone, Award, FolderGit2, Mail } from 'lucide-react';

interface StatItem {
  icon: typeof Server;
  value: string;
  label: string;
}

interface PillarItem {
  title: string;
  description: string;
  chips: string[];
}

interface HighlightItem {
  metric: string;
  label: string;
  context: string;
}

const stats: StatItem[] = [
  { icon: Server, value: '5+', label: 'Years Building' },
  { icon: Layers, value: '13+', label: 'Projects Shipped' },
  { icon: Smartphone, value: '10+', label: 'Mobile Apps' },
  { icon: Award, value: 'Clean', label: 'Architecture First' },
];

const pillars: PillarItem[] = [
  {
    title: 'Enterprise-Grade Architecture',
    description:
      'Clean Architecture, DDD and CQRS give every system clear boundaries and testable layers, so it stays maintainable as it grows.',
    chips: ['Clean Architecture', 'DDD', 'CQRS', 'SOLID'],
  },
  {
    title: 'Full-Stack Ownership',
    description:
      'From SQL Server schemas and .NET APIs to Angular frontends and Flutter mobile apps, I deliver the whole stack in one consistent language.',
    chips: ['ASP.NET Core', 'SQL Server', 'Angular', 'Flutter'],
  },
  {
    title: 'Cloud & Quality',
    description:
      'Dockerized services, CI/CD on Azure DevOps and GitHub Actions, 70%+ unit test coverage and SonarQube checks, so performance and reliability are built in from the start.',
    chips: ['Azure DevOps', 'Docker', 'xUnit & Moq', 'SonarQube'],
  },
];

const highlights: HighlightItem[] = [
  {
    metric: '50+',
    label: 'REST endpoints',
    context: 'Under 200 ms avg response, e-commerce platform',
  },
  {
    metric: '70%+',
    label: 'Unit test coverage',
    context: 'xUnit + Moq, SonarQube',
  },
  {
    metric: '~35%',
    label: 'Faster queries',
    context: 'T-SQL index tuning, finance app',
  },
  {
    metric: '~40%',
    label: 'Faster perceived load',
    context: 'Angular lazy-loading, 8 modules',
  },
  {
    metric: '200+',
    label: 'Active users',
    context: 'Personal finance SPA at peak',
  },
];

export default function About() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="relative section-padding">
      <div aria-hidden="true" className="absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative z-10">
        {/* Centered Header Block */}
        <div className="text-center max-w-[720px] mx-auto mb-16 reveal">
          <span className="section-eyebrow">
            01 — About
          </span>
          <h2 className="section-title">
            Engineering software that lasts
          </h2>
          <p className="section-subtitle">
            I'm a Senior Full-Stack .NET developer who builds enterprise applications meant to
            survive growth, not just launch. I own the whole path, from SQL Server schema to
            Angular UI to Azure deployment, using Clean Architecture, DDD and CQRS so codebases
            stay readable and testable as teams and requirements change. I work in Italian, English
            and Arabic, and I've delivered for clients in Italy, the UAE and the USA.
          </p>
        </div>

        {/* Stats (2x2 on mobile, 4 cols on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 reveal">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-card p-8 text-center hover:glow-border hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <s.icon
                aria-hidden="true"
                className="h-7 w-7 mx-auto mb-3 text-[#38BDF8] group-hover:scale-110 transition-transform duration-200"
              />
              <div className="text-[36px] md:text-[44px] leading-none font-bold text-[#F8FAFC]">
                {s.value}
              </div>
              <div className="text-[14px] md:text-[15px] text-slate-300 mt-2 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pillars (equal-height cards with top-aligned content & tech chips at bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="glass-card p-8 md:p-9 flex flex-col justify-between hover:glow-border hover:-translate-y-0.5 transition-all duration-200"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div>
                <div
                  aria-hidden="true"
                  className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center mb-5"
                >
                  <span className="font-mono text-[#38BDF8] font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#F8FAFC] mb-3">
                  {p.title}
                </h3>
                <p className="text-[16px] text-slate-300 leading-[1.6]">{p.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-[rgba(255,255,255,0.08)]">
                {p.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-white/[0.03] border border-[rgba(255,255,255,0.08)]"
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
            Highlights
          </h3>

          <div className="w-full rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-white/[0.02] p-8">
            <ul className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 sm:gap-6 lg:gap-0">
              {highlights.map((item, idx) => {
                // On tablet (sm: 640-1023px), 6-col grid lets first 3 items span 2 cols each (3 cols row 1),
                // and items 4 & 5 span 2 cols with col-start-2 on item 4 to center the 2 items on row 2.
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
                    key={item.label}
                    style={{ transitionDelay: `${idx * 60}ms` }}
                    className={`reveal-strip text-center lg:text-left transition-transform duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-0.5 group ${tabletSpan} ${dividers} ${mobilePadding} ${desktopRightPad}`}
                  >
                    <div className="text-[36px] md:text-[40px] leading-tight font-bold tracking-[-0.02em] metric-gradient [@media(hover:hover)]:group-hover:brightness-110 transition-all duration-200">
                      {item.metric}
                    </div>
                    <div className="mt-1 text-[16px] font-semibold text-[#F8FAFC]">
                      {item.label}
                    </div>
                    <div className="mt-1 text-[14px] leading-[1.5] text-[#94A3B8]">
                      {item.context}
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
            See my projects
          </button>
          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 text-[#F8FAFC] font-semibold hover:border-cyan/40 hover:bg-cyan/5 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            Let's talk
          </button>
        </div>
      </div>
    </section>
  );
}
