import { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Lock, 
  Menu, 
  X, 
  ChevronUp, 
  Briefcase, 
  User, 
  Sliders, 
  Award, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents import
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import { PortfolioData } from '../server-db';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Core structured data states
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch critical portfolio schema on startup
  useEffect(() => {
    async function loadPortfolio() {
      try {
        const response = await fetch('/api/portfolio-data');
        if (response.ok) {
          const data = await response.json();
          setPortfolio(data);
        }
      } catch (err) {
        console.error('Initial index fetch suffered a connection break.', err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();

    // Trace dynamic visitor analytics
    fetch('/api/analytics/visitor', { method: 'POST' })
      .catch((err) => console.error('Analytics handshake break:', err));
  }, []);

  // Back to top button visibility scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update portfolio state in real-time when edited from admin panel
  const handleUpdatePortfolio = (newData: PortfolioData) => {
    setPortfolio(newData);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading || !portfolio) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3 font-mono text-sm">
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 animate-pulse mb-2">
          <Sparkles className="w-6 h-6" />
        </div>
        <span>COMPUTING HOST ENTIRETY...</span>
        <span className="text-[10px] text-slate-650 tracking-widest uppercase">Kangeshwaran Portfolio Workspace</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* --- STICKY NAVIGATION HEADER --- */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition ${
        darkMode ? 'bg-slate-950/85 border-white/10' : 'bg-white/85 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 text-left cursor-pointer select-none group focus:outline-none"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">K</div>
            <div>
              <h1 className={`text-sm font-bold tracking-tight leading-tight transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kangeshwaran</h1>
              <p className="text-[9px] uppercase tracking-widest text-cyan-500 font-semibold leading-none mt-0.5">CSE Student • AI Developer</p>
            </div>
          </button>

          {/* Desktop Navigation Paths */}
          <nav className={`hidden md:flex items-center gap-6 text-xs font-mono tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition cursor-pointer select-none">/ABOUT</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-cyan-400 transition cursor-pointer select-none">/ABILITIES</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-400 transition cursor-pointer select-none">/SYSTEMS</button>
            <button onClick={() => scrollToSection('achievements')} className="hover:text-cyan-400 transition cursor-pointer select-none">/HONORS</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition cursor-pointer select-none">/CONNECT</button>
          </nav>

          {/* Action Tools: Admin login button, theme toggle, and mobile burger */}
          <div className="flex items-center gap-4">
            
            {/* Admin trigger logo */}
            <button
              onClick={() => setAdminOpen(true)}
              className={`p-2 rounded-xl transition cursor-pointer select-none border ${
                darkMode 
                  ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-teal-400 hover:border-slate-700' 
                  : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-teal-500'
              }`}
              title="Admin configurations portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition cursor-pointer select-none border ${
                darkMode 
                  ? 'border-slate-800 bg-slate-900 text-teal-400' 
                  : 'border-slate-200 bg-slate-100 text-amber-500'
              }`}
              title="Adjust visual light spectrum"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 md:hidden rounded-xl transition border text-slate-400 ${
                darkMode ? 'border-slate-850 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>
      </header>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed inset-x-0 top-16 z-30 border-b p-6 md:hidden flex flex-col gap-4 font-mono text-sm shadow-xl ${
              darkMode ? 'bg-slate-950 border-slate-900 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-teal-400 transition cursor-pointer">/about</button>
            <button onClick={() => scrollToSection('skills')} className="text-left py-2 hover:text-teal-400 transition cursor-pointer">/abilities</button>
            <button onClick={() => scrollToSection('projects')} className="text-left py-2 hover:text-teal-400 transition cursor-pointer">/systems</button>
            <button onClick={() => scrollToSection('achievements')} className="text-left py-2 hover:text-teal-400 transition cursor-pointer">/honors</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 hover:text-teal-400 transition cursor-pointer">/connect</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTENT LAYOUTS SECTIONS --- */}
      <main className="relative">
        <Hero 
          portfolio={portfolio} 
          onNavigateToContact={() => scrollToSection('contact')} 
          darkMode={darkMode}
        />
        
        <About 
          portfolio={portfolio} 
          darkMode={darkMode} 
        />
        
        <Skills 
          portfolio={portfolio} 
          darkMode={darkMode} 
        />
        
        <Projects 
          projects={portfolio.projects} 
          darkMode={darkMode} 
        />
        
        <Achievements 
          achievements={portfolio.achievements} 
          darkMode={darkMode} 
        />
        
        <Certifications 
          certifications={portfolio.certifications} 
          darkMode={darkMode} 
        />
        
        <Contact 
          darkMode={darkMode} 
        />
      </main>

      {/* --- SITE STICKY FOOTER --- */}
      <footer className={`py-12 border-t text-center px-6 transition ${
        darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-white border-slate-200 text-slate-500 shadow-inner'
      }`}>
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs font-mono">
            &copy; {new Date().getFullYear()} Kangeshwaran &bull; Built with premium engineering layouts & real-time telemetry parameters.
          </p>
          <div className="flex justify-center gap-6 text-[10px] font-mono tracking-wider text-slate-600">
            <span>REACT 19 / EXPRESS / DRIZZLE COMPATIBLE</span>
            <span>&bull;</span>
            <span>GEMINI INFERENCE ENGAGED</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION INTERFACE: Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            onClick={() => scrollToSection('hero')}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-teal-500 text-slate-950 text-xs shadow-lg shadow-teal-500/20 z-40 transition cursor-pointer"
            title="Siphon to top"
          >
            <ChevronUp className="w-5 h-5 font-extrabold" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ADMIN CONTROL PANEL OVERLAY MODAL */}
      <AdminDashboard
        portfolio={portfolio}
        onUpdatePortfolio={handleUpdatePortfolio}
        darkMode={darkMode}
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

    </div>
  );
}
