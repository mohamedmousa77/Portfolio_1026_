import { useEffect, useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick('#home');
          }}
          className="flex items-center gap-2 group"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-electric text-ink-950">
            <Code2 className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-bold text-lg tracking-tight text-white">
            Mohamed<span className="text-cyan-glow">.</span>Mousa
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="text-sm font-medium text-slate-400 hover:text-cyan-glow transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-glow transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleClick('#contact');
          }}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-electric text-ink-950 text-sm font-semibold hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300"
        >
          Let's talk
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-slate-200 p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-6 pt-4 pb-6 space-y-1 bg-ink-900/95 backdrop-blur-xl border-t border-white/5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="block py-3 px-4 rounded-lg text-slate-300 hover:bg-white/5 hover:text-cyan-glow transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#contact');
              }}
              className="block py-3 px-4 mt-2 rounded-lg text-center bg-gradient-to-r from-cyan to-electric text-ink-950 font-semibold"
            >
              Let's talk
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
