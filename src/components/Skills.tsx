import { Server, Layers, Cloud, Monitor, Database, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/i18n';

interface SkillItem {
  name: string;
  nameKey?: string;
  core?: boolean;
}

interface SkillGroup {
  id: string;
  titleKey: string;
  icon: typeof Server;
  skills: SkillItem[];
}

const groups: SkillGroup[] = [
  {
    id: 'backend',
    titleKey: 'skills.groups.backend',
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
    id: 'architecture',
    titleKey: 'skills.groups.architecture',
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
    id: 'cloud',
    titleKey: 'skills.groups.cloud',
    icon: Cloud,
    skills: [
      { name: 'Microsoft Azure', core: true },
      { name: 'App Services' },
      { name: 'Azure Functions' },
      { name: 'Azure SQL Database' },
      { name: 'Service Bus' },
      { name: 'Azure DevOps', core: true },
      { name: 'Docker' },
      { name: 'GitHub Actions (CI/CD)' },
      { name: 'Git' },
    ],
  },
  {
    id: 'frontend',
    titleKey: 'skills.groups.frontend',
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
    id: 'data',
    titleKey: 'skills.groups.data',
    icon: Database,
    skills: [
      { name: 'SQL Server', core: true },
      { name: 'T-\u2060SQL' },
      { name: 'Stored Procedures', nameKey: 'skills.skillNames.storedProcedures' },
      { name: 'Query Optimization', nameKey: 'skills.skillNames.queryOptimization' },
      { name: 'PostgreSQL' },
      { name: 'SSIS (ETL)' },
      { name: 'RabbitMQ' },
      { name: 'Redis' },
    ],
  },
  {
    id: 'testing',
    titleKey: 'skills.groups.testing',
    icon: CheckCircle2,
    skills: [
      { name: 'xUnit', core: true },
      { name: 'NUnit' },
      { name: 'Moq' },
      { name: 'TDD' },
      { name: 'Integration Testing', nameKey: 'skills.skillNames.integrationTesting' },
      { name: 'SonarQube' },
      { name: 'Swagger / OpenAPI' },
      { name: 'Postman' },
    ],
  },
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="relative overflow-hidden section-block">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 -right-40 h-80 w-80 rounded-full bg-electric/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 site-container">
        <div className="text-center mb-14 reveal">
          <span className="section-eyebrow">
            {t('skills.eyebrow')}
          </span>
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="section-subtitle">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {groups.map((group, gi) => {
            const isAzureHighlight = group.id === 'cloud';

            return (
              <div
                key={group.id}
                style={{ transitionDelay: `${gi * 60}ms` }}
                className={`min-w-0 flex flex-col p-6 rounded-[20px] transition-all duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-0.5 reveal ${
                  isAzureHighlight
                    ? 'surface-card border-[rgba(56,189,248,0.35)] bg-gradient-to-b from-[rgba(56,189,248,0.05)] to-transparent shadow-[0_0_48px_rgba(56,189,248,0.10)] [@media(hover:hover)]:hover:border-[rgba(56,189,248,0.5)]'
                    : 'surface-card [@media(hover:hover)]:hover:border-[rgba(255,255,255,0.16)]'
                }`}
              >
                <div className="flex items-center gap-3 mb-5 min-w-0">
                  <div
                    aria-hidden="true"
                    className="h-10 w-10 shrink-0 rounded-[12px] bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/20 flex items-center justify-center"
                  >
                    <group.icon className="h-5 w-5 text-[#38BDF8]" aria-hidden="true" />
                  </div>
                  <h3 className="min-w-0 text-[20px] font-semibold text-[#F8FAFC] leading-snug lg:whitespace-nowrap [text-wrap:balance]">
                    {t(group.titleKey)}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={`max-w-full px-3 py-1.5 rounded-[10px] text-[13px] leading-snug font-mono break-words transition-colors ${
                        skill.core ? 'chip-core' : 'chip-normal'
                      }`}
                    >
                      {skill.nameKey ? t(skill.nameKey) : skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[14px] md:text-[15px] text-[#94A3B8] reveal">
          {t('skills.also')}
        </p>
      </div>
    </section>
  );
}
