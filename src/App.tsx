import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';
import { LanguageProvider } from '@/i18n';
import { ThemeProvider } from '@/context/ThemeContext';

function App() {
  useReveal();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-app w-full max-w-full overflow-x-clip bg-ink-950 transition-colors duration-300">
          <Navbar />
          <main className="w-full max-w-full">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
