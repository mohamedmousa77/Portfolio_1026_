import { Server, Layers, Cloud, Monitor, Database, CheckCircle2 } from 'lucide-react';

interface SkillItem {
  name: string;
  core?: boolean;
}

interface SkillGroup {
  title: string;
  icon: typeof Server;
  skills: SkillItem[];
}

const groups: SkillGroup[] = [
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'C#', core: true },
      { name: 'ASP.NET Core Web API', core: true },
      { name: '.NET' },
      { name: 'Dapper' },
      { name: 'LINQ' },
      { name: 'SignalR' },
      { name: 'JWT / OAuth2' },
    ],
  },
  {
    title: 'Architecture & Patterns',
    icon: Layers,
    skills: [
      { name: 'Clean Architecture', core: true },
      { name: 'DDD', core: true },
      { name: 'CQRS (MediatR)' },
      { name: 'Microservices' },
      { name: 'Repository & Unit of Work' },
      { name: 'SOLID' },
      { name: 'Design Patterns' },
    ],
  },
  {
    title: 'Cloud & DevOps (Azure)',
    icon: Cloud,
    skills: [
      {
        name: 'Microsoft Azure (App Services, Functions, SQL Database, Service Bus)',
        core: true,
      },
      { name: 'Azure DevOps', core: true },
      { name: 'Docker' },
      { name: 'GitHub Actions (CI/CD)' },
      { name: 'Git' },
    ],
  },
  {
    title: 'Frontend & Web',
    icon: Monitor,
    skills: [
      { name: 'Angular', core: true },
      { name: 'TypeScript', core: true },
      { name: 'RxJS' },
      { name: 'NgRx' },
      { name: 'JavaScript' },
      { name: 'HTML5' },
      { name: 'CSS3/SCSS' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'Data & Messaging',
    icon: Database,
    skills: [
      { name: 'SQL Server', core: true },
      { name: 'T-SQL' },
      { name: 'Stored Procedures & Query Optimization' },
      { name: 'PostgreSQL' },
      { name: 'SSIS (ETL)' },
      { name: 'RabbitMQ' },
      { name: 'Redis' },
    ],
  },
  {
    title: 'Testing & Quality',
    icon: CheckCircle2,
    skills: [
      { name: 'xUnit', core: true },
      { name: 'NUnit' },
      { name: 'Moq' },
      { name: 'TDD' },
      { name: 'Integration Testing' },
      { name: 'SonarQube' },
      { name: 'Swagger / OpenAPI' },
      { name: 'Postman' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-16 md:py-[108px] px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 -right-40 h-80 w-80 rounded-full bg-electric/10 blur-[120px]"
      />

      <div className="relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="section-eyebrow">
            03 — Skills
          </span>
          <h2 className="section-title">My tech toolbox</h2>
          <p className="section-subtitle">
            Technologies I work with across the stack, from databases and APIs to web and mobile
            interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {groups.map((group, gi) => {
            const isAzureHighlight = group.title === 'Cloud & DevOps (Azure)';

            return (
              <div
                key={group.title}
                style={{ transitionDelay: `${gi * 60}ms` }}
                className={`flex flex-col p-6 rounded-[20px] transition-all duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-0.5 reveal ${
                  isAzureHighlight
                    ? 'border border-[rgba(56,189,248,0.35)] bg-gradient-to-b from-[rgba(56,189,248,0.05)] to-transparent shadow-[0_0_48px_rgba(56,189,248,0.10)] [@media(hover:hover)]:hover:border-[rgba(56,189,248,0.5)]'
                    : 'border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] [@media(hover:hover)]:hover:border-[rgba(255,255,255,0.16)]'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    aria-hidden="true"
                    className="h-10 w-10 shrink-0 rounded-[12px] bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center"
                  >
                    <group.icon className="h-5 w-5 text-[#38BDF8]" aria-hidden="true" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#F8FAFC] leading-snug lg:whitespace-nowrap">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={`max-w-full px-3 py-1.5 rounded-[10px] text-[13px] leading-snug font-mono break-words transition-colors ${
                        skill.core
                          ? 'bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.35)] text-[#7DD3FC] font-medium'
                          : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] text-[#CBD5E1]'
                      }`}
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[14px] md:text-[15px] text-[#94A3B8] reveal">
          Also: Flutter · Dart · Firebase · Agile/Scrum · Code Review · Visual Studio · Rider
        </p>
      </div>
    </section>
  );
}
