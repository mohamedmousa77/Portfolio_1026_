import attendanceImg from '../../assets/Attendance.png';
import lostAndFoundImg from '../../assets/L&F.png';
import posImg from '../../assets/pos1.png';
import connect4Img from '../../assets/connect-four-game.png';
import personalFinImgance from '../../assets/Personal-finance.png';
import rbs from '../../assets/rock-paper-scissors.png';
import productPage from '../../assets/product-page.png';
import multiApp from '../../assets/multi-aoo.png';

export type ProjectCategory = 'Web' | 'Mobile';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  github: string;
  demo?: string;
  image?: string;
  thumbnail?: string;
  resultKey?: string;
  placeholderType?: 'wafra' | 'default';
}

export interface FeaturedProjectMetric {
  value: string;
  label: string;
}

export interface FeaturedProjectImage {
  src?: string;
  alt: string;
  caption: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  badges: { label: string; variant: 'featured' | 'category' }[];
  metrics: FeaturedProjectMetric[];
  tags: string[];
  images: [FeaturedProjectImage, FeaturedProjectImage];
  codeUrl: string;
  liveUrl?: string;
}

// Automatically resolves audio-store-storefront.png and audio-store-admin.png from /assets/
// when added, without failing the Vite build if the files are not placed in /assets/ yet.
// TODO: Place audio-store-storefront.png and audio-store-admin.png in the root /assets/ folder.
const assetImages = import.meta.glob<string>('../../assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

export const featuredProject: FeaturedProject = {
  title: 'Audio Store: Enterprise E-\u2060Commerce Platform',
  description:
    'A production-ready e-\u2060commerce platform built end-\u2060to-\u2060end during my internship at Exprivia: a customer storefront plus an admin panel for sales analytics, order tracking and promo codes. Built on 4-layer Clean Architecture with DDD, 50+ JWT-secured REST endpoints and an Angular SPA with NgRx and 8 lazy-loaded modules.',
  badges: [
    { label: 'Featured', variant: 'featured' },
    { label: 'Web', variant: 'category' },
  ],
  metrics: [
    { value: '50+', label: 'REST endpoints' },
    { value: '<200 ms', label: 'avg API response' },
    { value: '70%+', label: 'test coverage' },
  ],
  tags: [
    'ASP.NET Core',
    'Angular',
    'SQL Server',
    'EF Core',
    'NgRx',
    'Docker',
    'GitHub Actions',
    'xUnit',
  ],
  images: [
    {
      src: assetImages['../../assets/audio-store-storefront.png'],
      alt: 'Audio Store storefront home page with a featured headphone product',
      caption: 'Storefront',
    },
    {
      src: assetImages['../../assets/audio-store-admin.png'],
      alt: 'Audio Store admin dashboard with sales totals, orders by status and sales by category',
      caption: 'Admin panel',
    },
  ],
  codeUrl: 'https://github.com/mohamedmousa77/Audio-Store',
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Personal Finance App',
    description:
      'A full-\u2060stack personal finance manager with interactive dashboards, budgets and recurring-transaction support.',
    resultKey: 'projects.items.1.result',
    technologies: ['Angular', 'ASP.NET Core', 'SQL Server', 'EF Core', 'Chart.js'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa7777/FinancialApp',
    image: personalFinImgance,
  },
  {
    id: 2,
    title: 'Rock Paper Scissors',
    description:
      'A classic hand game with score tracking, smooth animations and a clean responsive layout playable on any device.',
    technologies: ['HTML', 'JavaScript', 'TypeScript', 'CSS'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa7777/Rock--Paper--Scissors-game',
    image: rbs,
  },
  {
    id: 3,
    title: 'Connect 4 Game',
    description:
      'A two-player strategy game with drop animations, win detection and a minimalist board UI built in Angular.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa7777/Connect-Four-Game',
    image: connect4Img,
  },
  {
    id: 4,
    title: 'Multi-\u2060Step Form',
    description:
      'An accessible, animated multi-\u2060step wizard with client-side validation, progress tracking and a polished custom UI.',
    technologies: ['Angular', 'CSS', 'TypeScript'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa77/multi-step-form',
    image: multiApp,
  },
  {
    id: 5,
    title: 'Wafra E-\u2060commerce',
    description:
      'A mobile commerce platform with product catalog, cart, secure checkout and order history, built around a REST API backend.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa77',
    thumbnail: assetImages['../../assets/wafra.png'],
    placeholderType: 'wafra',
  },
  {
    id: 6,
    title: 'E-\u2060commerce Product Page',
    description:
      'A responsive product detail page with image gallery, variant selection, cart preview and accessible markup.',
    technologies: ['HTML', 'JavaScript', 'TypeScript', 'CSS'],
    category: 'Web',
    github: 'https://github.com/mohamedmousa77',
    image: productPage,
  },
  {
    id: 7,
    title: 'Attendance Management',
    description:
      'A mobile attendance system for tracking employee check-in/out, generating reports and managing leave requests via REST API.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa7777/Attendance-App',
    image: attendanceImg,
  },
  {
    id: 8,
    title: "Let's Fly Application",
    description:
      'A flight-booking concept app with search, seat selection and a Figma-driven design system translated into a Flutter UI.',
    technologies: ['Flutter', 'Dart', 'Figma'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa77',
  },
  {
    id: 9,
    title: 'WhatsApp Clone',
    description:
      'A real-time messaging app clone with chat lists, conversation threads and status updates powered by a REST API.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa77',
  },
  {
    id: 10,
    title: 'Instagram & Facebook Clone',
    description:
      'A social media app combining feeds, stories and profile management, replicating core flows of both platforms.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa77',
  },
  {
    id: 11,
    title: 'TikTok Application Clone',
    description:
      'A short-video feed app with vertical scroll, like/comment interactions and a profile screen built in Flutter.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa77',
  },
  {
    id: 12,
    title: 'Lost & Found',
    description:
      'A community app to report and discover lost or found items with image uploads, search and category filters.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa77',
    image: lostAndFoundImg,
  },
  {
    id: 13,
    title: 'Point Of Sale',
    description:
      'A mobile POS system for managing products, processing sales and printing receipts, synced with a REST API backend.',
    technologies: ['Flutter', 'Dart', 'REST API'],
    category: 'Mobile',
    github: 'https://github.com/mohamedmousa77',
    image: posImg,
  },
];
