import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio_theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // Ignore storage read errors
  }
  return 'dark';
}

function applyThemeToDOM(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const initial = getInitialTheme();
    applyThemeToDOM(initial);
    return initial;
  });

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyThemeToDOM(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyThemeToDOM(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage write errors
      }
      return next;
    });
  }, []);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!mql) return;

    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (!window.localStorage.getItem(STORAGE_KEY)) {
          const next: Theme = e.matches ? 'light' : 'dark';
          setThemeState(next);
          applyThemeToDOM(next);
        }
      } catch {
        // Ignore storage errors
      }
    };

    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

