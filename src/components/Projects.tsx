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
import { projects, type ProjectCategory } from '@/data/projects';

type Filter = 'All' | ProjectCategory;

const filterOptions: { value: Filter; label: string; icon: typeof LayoutGrid }[] = [
  { value: 'All', label: 'All', icon: LayoutGrid },
  { value: 'Web', label: 'Web', icon: Globe },
  { value: 'Mobile', label: 'Mobile', icon: Smartphone },
];

export default function Projects() {
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
  }, [active]);

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
          <span className="section-eyebrow">02 — Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle">
            A selection of web and mobile applications I've designed and developed end-to-end.
          </p>
          <p className="mt-3 text-[14px] text-[#94A3B8]">
            Selected work. Client projects under NDA are not shown.
          </p>
        </div>

        {/* Segmented Filter Control */}
        <div className="flex flex-col items-center mb-12 reveal">
          <div
            role="radiogroup"
            aria-label="Filter projects by category"
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
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="mt-3 text-center text-[13px] md:text-[14px] text-[#94A3B8]"
          >
            Showing {activeCount} {activeCount === 1 ? 'project' : 'projects'}
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
                            alt={project.title}
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
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[22px] leading-snug font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors mb-2.5">
                        {project.title}
                      </h3>
                      <p className="text-[15px] md:text-[16px] text-[#CBD5E1] leading-[1.6] line-clamp-4 mb-5">
                        {project.description}
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
                          Code
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
                            Live Demo
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
                    <span>Show less</span>
                    <ChevronUp className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>
                      Show {hiddenCount} more {hiddenCount === 1 ? 'project' : 'projects'}
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
