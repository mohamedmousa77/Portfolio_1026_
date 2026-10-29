export type ProjectCategory = 'Web' | 'Mobile';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  github: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Personal Finance App',
    description:
      'A full-stack personal finance manager for tracking income, expenses and budgets with interactive dashboards and recurring-transaction support.',
    technologies: ['Angular', 'ASP.NET', 'SSMS'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa',
    demo: 'https://example.com/personal-finance',
  },
  {
    id: 2,
    title: 'Wafra E-commerce',
    description:
      'A mobile commerce platform with product catalog, cart, secure checkout and order history, built around a REST API backend.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
    demo: 'https://example.com/wafra',
  },
  {
    id: 3,
    title: 'Multi Step Form',
    description:
      'An accessible, animated multi-step wizard with client-side validation, progress tracking and a polished custom UI.',
    technologies: ['Angular', 'CSS', 'TypeScript'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa',
  },
  {
    id: 4,
    title: 'Rock Paper Scissors',
    description:
      'A classic hand game with score tracking, smooth animations and a clean responsive layout playable on any device.',
    technologies: ['HTML', 'JavaScript', 'TypeScript', 'CSS'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa',
  },
  {
    id: 5,
    title: 'Connect 4 Game',
    description:
      'A two-player strategy game with drop animations, win detection and a minimalist board UI built in Angular.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa',
  },
  {
    id: 6,
    title: 'Attendance Management',
    description:
      'A mobile attendance system for tracking employee check-in/out, generating reports and managing leave requests via REST API.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
    demo: 'https://example.com/attendance',
  },
  {
    id: 7,
    title: "Let's Fly Application",
    description:
      'A flight-booking concept app with search, seat selection and a Figma-driven design system translated into a Flutter UI.',
    technologies: ['Flutter', 'Dart', 'Figma'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
  },
  {
    id: 8,
    title: 'WhatsApp Clone',
    description:
      'A real-time messaging app clone with chat lists, conversation threads and status updates powered by a REST API.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
    demo: 'https://example.com/whatsapp-clone',
  },
  {
    id: 9,
    title: 'Instagram & Facebook Clone',
    description:
      'A social media app combining feeds, stories and profile management, replicating core flows of both platforms.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
  },
  {
    id: 10,
    title: 'TikTok Application Clone',
    description:
      'A short-video feed app with vertical scroll, like/comment interactions and a profile screen built in Flutter.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
  },
  {
    id: 11,
    title: 'Lost & Found',
    description:
      'A community app to report and discover lost or found items with image uploads, search and category filters.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
    demo: 'https://example.com/lost-found',
  },
  {
    id: 12,
    title: 'E-commerce Product Page',
    description:
      'A responsive product detail page with image gallery, variant selection, cart preview and accessible markup.',
    technologies: ['HTML', 'JavaScript', 'TypeScript', 'CSS'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa',
  },
  {
    id: 13,
    title: 'Point Of Sale',
    description:
      'A mobile POS system for managing products, processing sales and printing receipts, synced with a REST API backend.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa',
    demo: 'https://example.com/pos',
  },
];
