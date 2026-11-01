import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Github,
  ExternalLink,
  FolderGit2,
  LayoutGrid,
  Globe,
  Smartphone,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  projects,
  featuredProject,
  type ProjectCategory,
  type FeaturedProject,
  type FeaturedProjectImage,
} from '@/data/projects';
import { useTranslation } from '@/i18n';

type Filter = 'All' | ProjectCategory;

const filterOptions: { value: Filter; labelKey: string; icon: typeof LayoutGrid }[] = [
  { value: 'All', labelKey: 'projects.filters.All', icon: LayoutGrid },
  { value: 'Web', labelKey: 'projects.filters.Web', icon: Globe },
  { value: 'Mobile', labelKey: 'projects.filters.Mobile', icon: Smartphone },
];

function BrowserFrame({
  image,
  altText,
  captionText,
  className = '',
}: {
  image: FeaturedProjectImage;
  altText: string;
  captionText: string;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(image.src) && !imgError;

  return (
    <div
      className={`rounded-[14px] border border-[rgba(255,255,255,0.10)] bg-[#111827] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-[transform,box-shadow] duration-300 ease-out ${className}`}
    >
      {/* Slim dark title bar */}
      <div
        aria-hidden="true"
        className="h-[28px] bg-[#111827] border-b border-[rgba(255,255,255,0.06)] px-3 flex items-center gap-1.5"
      >
        <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.2)]" />
        <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.2)]" />
        <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.2)]" />
      </div>

      {/* Screenshot or neutral placeholder */}
      <div className="relative aspect-[16/10] w-full bg-[#0d1322] overflow-hidden">
        {showImage ? (
          <img
            src={image.src}
            alt={altText}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-left-top"
          />
        ) : (
          // TODO: Add audio-store-storefront.png and audio-store-admin.png to the /assets/ folder
          <div
            role="img"
            aria-label={altText}
            className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#111827] via-[#0e1525] to-[#0B0F1A] p-4 text-center"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
            <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              {captionText}
            </span>
          </div>
        )}

        {/* Bottom-left caption pill */}
        <span className="absolute bottom-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full text-[12px] leading-none font-medium text-[#F8FAFC] bg-[rgba(11,15,26,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)]">
          {captionText}
        </span>
      </div>
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  const { t } = useTranslation();
  const [storefrontImg, adminImg] = project.images;

  const translatedMetrics = [
    { value: t('projects.featured.m1Value'), label: t('projects.featured.m1Label') },
    { value: t('projects.featured.m2Value'), label: t('projects.featured.m2Label') },
    { value: t('projects.featured.m3Value'), label: t('projects.featured.m3Label') },
  ];

  return (
    <div className="mb-16">
      <div className="mb-4 reveal">
        <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-[#38BDF8]">
          {t('projects.featuredLabel')}
        </span>
      </div>

      <article
        aria-labelledby="featured-project-title"
        className="relative w-full rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 lg:p-10 overflow-hidden reveal reveal-featured"
      >
        {/* Soft radial cyan glow at top-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.10)_0%,transparent_70%)]"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
          {/* Image composition — top on <1024px, right column (~55%) on >=1024px */}
          <div className="w-full lg:w-[55%] order-1 lg:order-2">
            <div className="featured-mockup-group relative w-full pb-[14%]">
              {/* Storefront base frame (88% width so the offset admin frame fits within 100% column width) */}
              <div className="w-[88%]">
                <BrowserFrame
                  image={storefrontImg}
                  altText={t('projects.featured.img1Alt')}
                  captionText={t('projects.featured.img1Caption')}
                  className="mockup-frame-base"
                />
              </div>

              {/* Admin panel overlapping frame (~78% of base = ~68.6% width, offset ~12% horizontally & ~14% vertically) */}
              <div className="reveal-admin-frame absolute bottom-0 right-0 w-[68.6%] z-10">
                <BrowserFrame
                  image={adminImg}
                  altText={t('projects.featured.img2Alt')}
                  captionText={t('projects.featured.img2Caption')}
                  className="mockup-frame-overlay"
                />
              </div>
            </div>
          </div>

          {/* Text column — bottom on <1024px, left column (~45%) on >=1024px */}
          <div className="w-full lg:w-[45%] order-2 lg:order-1 flex flex-col items-start">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.badges.map((b) =>
                b.variant === 'featured' ? (
                  <span
                    key={b.label}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#38BDF8] to-[#6366F1] text-ink-950"
                  >
                    {t('projects.featured.badgeFeatured')}
                  </span>
                ) : (
                  <span
                    key={b.label}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-ink-950/75 backdrop-blur border border-[rgba(255,255,255,0.10)] text-[#38BDF8]"
                  >
                    {t('projects.featured.badgeWeb')}
                  </span>
                ),
              )}
            </div>

            {/* Title */}
            <h3
              id="featured-project-title"
              className="text-[28px] md:text-[32px] lg:text-[36px] font-bold tracking-[-0.02em] leading-tight text-[#F8FAFC] mb-4"
            >
              {t('projects.featured.title')}
            </h3>

            {/* Description */}
            <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#CBD5E1] mb-6">
              {t('projects.featured.description')}
            </p>

            {/* Metrics row */}
            <ul className="w-full grid grid-cols-2 sm:grid-cols-3 gap-y-4 py-4 mb-6 border-y border-[rgba(255,255,255,0.08)]">
              {translatedMetrics.map((m, idx) => (
                <li
                  key={m.label}
                  className={`${
                    idx === 1
                      ? 'border-l border-[rgba(255,255,255,0.08)] pl-4 sm:px-4'
                      : idx === 2
                        ? 'col-span-2 sm:col-span-1 sm:border-l sm:border-[rgba(255,255,255,0.08)] sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[rgba(255,255,255,0.08)]'
                        : 'pr-4'
                  }`}
                >
                  <div className="text-[24px] md:text-[28px] font-bold leading-tight metric-gradient">
                    {m.value}
                  </div>
                  <div className="text-[13px] text-[#94A3B8] mt-0.5">{m.label}</div>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <ul className="flex flex-wrap gap-2 mb-7">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-2.5 py-1 rounded-[12px] text-[12px] md:text-[13px] font-mono bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] text-[#CBD5E1]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('projects.featured.viewCodeAria')}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.15)] bg-white/[0.04] text-sm font-semibold text-[#F8FAFC] hover:border-[#38BDF8]/45 hover:bg-[#38BDF8]/[0.08] [@media(hover:hover)]:hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <Github className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                <span>{t('projects.featured.viewCode')}</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.15)] bg-white/[0.04] text-sm font-semibold text-[#F8FAFC] hover:border-[#38BDF8]/45 hover:bg-[#38BDF8]/[0.08] [@media(hover:hover)]:hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  <ExternalLink className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                  <span>{t('projects.featured.liveDemo')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* "More projects" divider with 64px spacing above and below */}
      <div className="mt-16 mb-16 flex items-center gap-4 reveal" aria-hidden="true">
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
        <span className="text-[13px] text-[#94A3B8] font-medium">{t('projects.moreProjects')}</span>
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
      </div>
    </div>
  );
}

export default function Projects() {
  const { lang, t } = useTranslation();
  const [active, setActive] = useState<Filter>('All');
  const [displayedFilter, setDisplayedFilter] = useState<Filter>('All');
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const [expanded, setExpanded] = useState(false);
  const [ newlyRevealed, setNewlyRevealed] = useState(false);

  // Segmented control thumb metrics
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState<{ left: number; width: number }>({ left: 4, width: 0 });

  // Grid measurement for 2-row + 96px peek
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      displayedFilter === 'All'
        ? projects
        : projects.filter((p) => p.category === displayedFilter),
    [displayedFilter],
  );

  const activeCount = useMemo(
    () => (active === 'All' ? projects.length : projects.filter((p) => p.category === active).length),
    [active],
  );

  const hiddenCount = Math.max(0, visible.length - visibleCount);
  const canCollapse = hiddenCount > 0;

  // Measure active radio button for the sliding thumb
  const updateThumb = useCallback(() => {
    const idx = filterOptions.findIndex((o) => o.value === active);
    const btn = optionRefs.current[idx];
    if (btn) {
      setThumb({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [active, lang]);

  useEffect(() => {
    updateThumb();
    window.addEventListener('resize', updateThumb);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateThumb).catch(() => {});
    }
    return () => window.removeEventListener('resize', updateThumb);
  }, [updateThumb]);

  // Handle filter selection with 150ms outgoing + 300ms incoming transition (instant if reduced motion)
  const selectFilter = (next: Filter) => {
    if (next === active) return;
    setActive(next);
    setExpanded(false);
    setNewlyRevealed(false);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedFilter(next);
      setPhase('idle');
      return;
    }

    setPhase('out');
    window.setTimeout(() => {
      setDisplayedFilter(next);
      setPhase('in');
    }, 150);
  };

  const handleRadioKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % filterOptions.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + filterOptions.length) % filterOptions.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = filterOptions.length - 1;
    }

    if (nextIndex !== null) {
      const nextOption = filterOptions[nextIndex];
      optionRefs.current[nextIndex]?.focus();
      selectFilter(nextOption.value);
    }
  };

  // Measure grid rows & heights via ResizeObserver
  const measureGrid = useCallback(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const width = window.innerWidth;
    const cols = width >= 1100 ? 3 : width >= 700 ? 2 : 1;
    const vCount = width >= 700 ? cols * 2 : 3;
    setVisibleCount(vCount);

    const children = Array.from(gridEl.children) as HTMLElement[];
    const totalH = gridEl.scrollHeight;
    setFullHeight(totalH);

    if (children.length <= vCount) {
      setCollapsedHeight(null);
      return;
    }

    const lastVisibleCard = children[vCount - 1];
    if (lastVisibleCard) {
      const twoRowsBottom = lastVisibleCard.offsetTop + lastVisibleCard.offsetHeight;
      const peekTarget = Math.min(totalH, twoRowsBottom + 96);
      setCollapsedHeight(peekTarget);
    }
  }, []);

  useEffect(() => {
    measureGrid();
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const ro = new ResizeObserver(() => {
      measureGrid();
    });
    ro.observe(gridEl);
    window.addEventListener('resize', measureGrid);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureGrid);
    };
  }, [measureGrid, visible]);

  const handleToggleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setNewlyRevealed(true);
    } else {
      setExpanded(false);
      setNewlyRevealed(false);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const wrapperHeight =
    !canCollapse || collapsedHeight === null
      ? undefined
      : expanded
        ? fullHeight ?? undefined
        : collapsedHeight;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 md:py-[108px] px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-cyan/10 blur-[120px]"
      />

      <div className="relative z-10">
        <div className="text-center mb-12 reveal">
          <span className="section-eyebrow">{t('projects.eyebrow')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
          <p className="mt-3 text-[14px] text-[#94A3B8]">{t('projects.ndaNote')}</p>
        </div>

        {/* Featured Project Block (always visible, outside filter & grid) */}
        <FeaturedProjectCard project={featuredProject} />

        {/* Segmented Filter Control */}
        <div className="flex flex-col items-center mb-12 reveal">
          <div
            role="radiogroup"
            aria-label={t('projects.filterAria')}
            className="relative inline-flex w-full sm:w-auto items-center justify-center p-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] backdrop-blur-[8px]"
          >
            {/* Sliding thumb */}
            <span
              aria-hidden="true"
              style={{
                transform: `translateX(${thumb.left}px)`,
                width: `${thumb.width}px`,
              }}
              className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[linear-gradient(135deg,rgba(56,189,248,0.25),rgba(99,102,241,0.25))] border border-[rgba(56,189,248,0.4)] shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-[transform,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />

            {filterOptions.map((opt, idx) => {
              const isSelected = active === opt.value;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectFilter(opt.value)}
                  onKeyDown={(e) => handleRadioKeyDown(e, idx)}
                  className={`relative z-10 flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-[18px] py-[10px] rounded-full text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
                    isSelected ? 'text-[#FFFFFF]' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t(opt.labelKey)}</span>
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="mt-3 text-center text-[13px] md:text-[14px] text-[#94A3B8]"
          >
            {activeCount === 1
              ? t('projects.showingSingular', { n: activeCount })
              : t('projects.showingPlural', { n: activeCount })}
          </p>
        </div>

        {/* Grid Wrapper with Peek + Fade */}
        <div className="relative">
          <div
            id="projects-grid-wrapper"
            style={wrapperHeight !== undefined ? { maxHeight: `${wrapperHeight}px` } : undefined}
            className="overflow-hidden transition-[max-height] duration-[450ms] ease-in-out"
          >
            <div
              ref={gridRef}
              className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-7 items-stretch pt-1 pb-2"
            >
              {visible.map((project, i) => {
                const isClipped = canCollapse && !expanded && i >= visibleCount;
                const isNewlyExpanded = newlyRevealed && expanded && i >= visibleCount;
                const translatedTitle = t(`projects.items.${project.id}.title`);
                const translatedDescription = t(`projects.items.${project.id}.description`);

                const animClass =
                  phase === 'out'
                    ? 'card-outgoing'
                    : phase === 'in' || isNewlyExpanded
                      ? 'animate-card-enter'
                      : 'reveal is-visible';

                const staggerDelay =
                  phase === 'in'
                    ? `${i * 40}ms`
                    : isNewlyExpanded
                      ? `${(i - visibleCount) * 40}ms`
                      : `${(i % 3) * 60}ms`;

                return (
                  <article
                    key={`${displayedFilter}-${project.id}`}
                    aria-hidden={isClipped ? 'true' : undefined}
                    style={{
                      animationDelay: staggerDelay,
                      transitionDelay: phase === 'idle' && !isNewlyExpanded ? `${(i % 3) * 60}ms` : '0ms',
                    }}
                    className={`group h-full rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[rgba(56,189,248,0.3)] [@media(hover:hover)]:hover:shadow-[0_12px_36px_-10px_rgba(56,189,248,0.18)] ${animClass} ${
                      isClipped ? 'pointer-events-none select-none' : ''
                    }`}
                  >
                    {/* Visual header */}
                    <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-ink-700 to-ink-850 overflow-hidden rounded-t-[20px]">
                      {project.image ? (
                        <>
                          <img
                            src={project.image}
                            alt={translatedTitle}
                            loading="lazy"
                            className="h-full w-full object-cover object-center [@media(hover:hover)]:group-hover:scale-105 transition-transform duration-500"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent"
                          />
                        </>
                      ) : (
                        <>
                          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className="font-mono text-5xl font-bold text-white/10 group-hover:text-cyan/20 transition-colors duration-500">
                              {String(project.id).padStart(2, '0')}
                            </span>
                          </div>
                          <FolderGit2
                            aria-hidden="true"
                            className="absolute bottom-4 right-4 h-8 w-8 text-white/20 group-hover:text-cyan-glow/60 transition-colors"
                          />
                        </>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ink-950/75 backdrop-blur border border-[rgba(255,255,255,0.10)] text-[#38BDF8]">
                          {t(`projects.categories.${project.category}`)}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[22px] leading-snug font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors mb-2.5">
                        {translatedTitle}
                      </h3>
                      <p className="text-[15px] md:text-[16px] text-[#CBD5E1] leading-[1.6] line-clamp-4 mb-5">
                        {translatedDescription}
                      </p>

                      {/* Tech badges */}
                      <ul className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {project.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="px-2.5 py-1 rounded-[12px] text-[12px] md:text-[13px] font-mono bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] text-[#CBD5E1]"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={isClipped ? -1 : 0}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-[#38BDF8] rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 transition-colors"
                        >
                          <Github className="h-4 w-4" aria-hidden="true" />
                          {t('projects.code')}
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isClipped ? -1 : 0}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-[#38BDF8] rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                            {t('projects.liveDemo')}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Gradient fade overlay over peeking row when collapsed */}
          {canCollapse && !expanded && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-b from-transparent via-[#0B0F1A]/85 to-[#0B0F1A]"
            />
          )}

          {/* Centered Show More / Show Less pill button */}
          {canCollapse && (
            <div
              className={`relative z-20 flex justify-center ${
                !expanded ? '-mt-7' : 'mt-8'
              }`}
            >
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="projects-grid-wrapper"
                onClick={handleToggleExpand}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#F8FAFC] border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md hover:border-[rgba(56,189,248,0.4)] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                {expanded ? (
                  <>
                    <span>{t('projects.showLess')}</span>
                    <ChevronUp className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>
                      {hiddenCount === 1
                        ? t('projects.showMoreSingular', { n: hiddenCount })
                        : t('projects.showMorePlural', { n: hiddenCount })}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 text-[#38BDF8] animate-chevron-bounce"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
