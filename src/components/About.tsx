import { Layers, Server, Smartphone, Award } from 'lucide-react';

const stats = [
  { icon: Server, value: '5+', label: 'Years Building' },
  { icon: Layers, value: '13+', label: 'Projects Shipped' },
  { icon: Smartphone, value: '8+', label: 'Mobile Apps' },
  { icon: Award, value: 'Clean', label: 'Architecture First' },
];

const pillars = [
  {
    title: 'Enterprise-Grade Architecture',
    description:
      'I design backend systems with Clean Architecture, separation of concerns and testable boundaries - so they stay maintainable as teams and requirements grow.',
  },
  {
    title: 'Full-Stack Delivery',
    description:
      'From the database layer to the UI, I own the whole stack: .NET APIs, SQL Server schemas, Angular frontends and Flutter mobile apps that talk the same language.',
  },
  {
    title: 'Cloud & Scalability',
    description:
      'I deploy to Azure with CI/CD, containerize services with Docker, and design with horizontal scale in mind - performance and reliability are not afterthoughts.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative section-padding">
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-cyan-glow font-mono text-sm tracking-widest uppercase">
            01 — About
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Engineering software that lasts
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 leading-relaxed">
            I'm a full-stack developer with a strong focus on building enterprise applications
            with robust architectures. I'm passionate about creating scalable solutions for both
            web and mobile platforms, always putting maintainability and clean code first.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 reveal">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-card p-6 text-center hover:glow-border transition-all duration-300 group"
            >
              <s.icon className="h-7 w-7 mx-auto mb-3 text-cyan-glow group-hover:scale-110 transition-transform" />
              <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6 reveal">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="glass-card p-8 hover:glow-border hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center mb-5">
                <span className="font-mono text-cyan-glow font-bold text-lg">{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
