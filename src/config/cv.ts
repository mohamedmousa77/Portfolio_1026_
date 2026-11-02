import type { Language } from '@/i18n';
import fallbackCv from '../../assets/Mohamed_Mousa_CV_IT.pdf';

// Automatically resolves localized CV files from /assets/ when added,
// falling back to Mohamed_Mousa_CV.pdf so the download link never breaks.
// TODO: Place Mohamed_Mousa_CV_EN.pdf and Mohamed_Mousa_CV_IT.pdf in /assets/ (or public/assets/).
const cvAssets = import.meta.glob<string>('../../assets/*.pdf', {
  eager: true,
  import: 'default',
});

export const CV_CONFIG: Record<Language, { href: string; downloadName: string }> = {
  en: {
    href: cvAssets['../../assets/Mohamed_Mousa_CV_EN.pdf'] ?? fallbackCv,
    downloadName: 'Mohamed_Mousa_CV_EN.pdf',
  },
  it: {
    href: cvAssets['../../assets/Mohamed_Mousa_CV_IT.pdf'] ?? fallbackCv,
    downloadName: 'Mohamed_Mousa_CV_IT.pdf',
  },
};

export function getCvForLang(lang: Language) {
  return CV_CONFIG[lang];
}

