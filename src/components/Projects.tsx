import { useMemo, useState } from 'react';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { projects, type ProjectCategory } from '@/data/projects';

type Filter = 'All' | ProjectCategory;

const filters: Filter[] = ['All', 'Web', 'Mobile'];

export default function Projects() {
  const [active, setActive] = useState<Filter>('All');

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="projects" className="relative section-padding">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-cyan/10 blur-[120px]" />

      <div className="relative z-10">
        <div className="text-center mb-12 reveal">
          <span className="text-cyan-glow font-mono text-sm tracking-widest uppercase">
            02 — Projects
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Things I've built</h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400">
            A selection of web and mobile applications I've designed and developed end-to-end.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 reveal">
          {filters.map((f) => {
            const count =
              f === 'All'
                ? projects.length
                : projects.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === f
                    ? 'bg-gradient-to-r from-cyan to-electric text-ink-950 shadow-lg shadow-cyan/20'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:border-cyan/30 hover:text-white'
                }`}
              >
                {f}
                <span
                  className={`ml-2 text-xs ${active === f ? 'text-ink-950/60' : 'text-slate-500'}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project, i) => (
            <article
              key={project.id}
              className="group glass-card overflow-hidden flex flex-col hover:glow-border hover:-translate-y-1 transition-all duration-300 reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              {/* Visual header */}
              <div className="relative h-40 bg-gradient-to-br from-ink-700 to-ink-850 overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-5xl font-bold text-white/10 group-hover:text-cyan/20 transition-colors duration-500">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ink-950/70 backdrop-blur border border-white/10 text-cyan-glow">
                    {project.category}
                  </span>
                </div>
                <FolderGit2 className="absolute bottom-4 right-4 h-8 w-8 text-white/20 group-hover:text-cyan-glow/60 transition-colors" />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-glow transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan/5 border border-cyan/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-glow transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-glow transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
