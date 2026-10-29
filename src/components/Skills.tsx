import { Server, Monitor, Smartphone } from 'lucide-react';

interface SkillGroup {
  title: string;
  icon: typeof Server;
  skills: string[];
}

const groups: SkillGroup[] = [
  {
    title: 'Backend',
    icon: Server,
    skills: ['C#', '.NET', 'ASP.NET Core', 'SQL Server (SSMS)', 'Entity Framework Core'],
  },
  {
    title: 'Frontend & Web',
    icon: Monitor,
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Mobile & Other',
    icon: Smartphone,
    skills: ['Flutter', 'Dart', 'RESTful APIs', 'Git', 'Docker', 'Postman'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative section-padding">
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 h-80 w-80 rounded-full bg-electric/10 blur-[120px]" />

      <div className="relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-cyan-glow font-mono text-sm tracking-widest uppercase">
            03 — Skills
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">My tech toolbox</h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400">
            Technologies I work with across the stack, from databases and APIs to web and mobile
            interfaces.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((group, gi) => (
            <div
              key={group.title}
              className="glass-card p-8 hover:glow-border transition-all duration-300 reveal"
              style={{ transitionDelay: `${gi * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center">
                  <group.icon className="h-5 w-5 text-cyan-glow" />
                </div>
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
              </div>

              <ul className="space-y-3">
                {group.skills.map((skill, si) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 group"
                    style={{ animationDelay: `${si * 50}ms` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow group-hover:w-4 transition-all duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors text-sm">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
