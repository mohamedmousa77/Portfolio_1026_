import { useEffect, useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 180;
      for (let i = links.length - 1; i >= 0; i--) {
        const section = document.getElementById(links[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActiveId(links[i].id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string, id: string) => {
    setOpen(false);
    setActiveId(id);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick('#home', 'home');
          }}
          className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 group"
        >
          <span
            aria-hidden="true"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-electric text-ink-950"
          >
            <Code2 className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className="font-bold text-lg tracking-tight text-[#F8FAFC]">
            Mohamed<span className="text-cyan-glow">.</span>Mousa
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href, link.id);
                  }}
                  className={`text-sm font-medium transition-colors duration-200 relative group py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
                    isActive ? 'text-cyan-glow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-glow transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleClick('#contact', 'contact');
          }}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-electric text-ink-950 text-sm font-semibold hover:shadow-lg hover:shadow-cyan/30 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          Let's talk
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation-menu"
          className="md:hidden text-slate-200 hover:text-white p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-navigation-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="px-6 pt-4 pb-6 space-y-1 bg-ink-900/95 backdrop-blur-xl border-t border-[rgba(255,255,255,0.08)]">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href, link.id);
                  }}
                  className={`block py-3 px-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow ${
                    isActive
                      ? 'bg-cyan/10 text-cyan-glow font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#contact', 'contact');
              }}
              className="block py-3 px-4 mt-2 rounded-lg text-center bg-gradient-to-r from-cyan to-electric text-ink-950 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow"
            >
              Let's talk
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
