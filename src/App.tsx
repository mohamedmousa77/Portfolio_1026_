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
        <div className="relative min-h-screen bg-ink-950 transition-colors duration-300">
          <Navbar />
          <main>
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
