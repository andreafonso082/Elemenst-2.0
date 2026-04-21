import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Lenis from 'lenis';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';
import CookieBanner from './CookieBanner';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Dynamic Metadata logic
  const pageNames: Record<string, string> = {
    '/': 'Home',
    '/projects': t('nav.projects'),
    '/galerie': t('nav.galerie'),
    '/contact': t('nav.contact'),
    '/terms': t('legal.terms.title'),
    '/privacy': t('legal.privacy.title'),
    '/cookies': t('legal.cookies.title')
  };

  const currentPath = location.pathname;
  let pageTitle = pageNames[currentPath] || '';

  if (currentPath.startsWith('/projects/')) {
    const slug = currentPath.split('/').pop();
    const propertyTitle = slug ? slug.toUpperCase().replace(/-/g, ' ') : '';
    pageTitle = propertyTitle || t('nav.projects');
  }

  const finalTitle = pageTitle 
    ? `${pageTitle} | Elements Algarve` 
    : 'Elements Algarve | Luxury Houses & Nordic Construction Algarve';

  // Monitor scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.galerie'), path: '/galerie' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-beige text-ink">
      <Helmet>
        <title>{finalTitle}</title>
        <meta property="og:title" content={finalTitle} />
        <link rel="canonical" href={`https://elements.pt${location.pathname}`} />
      </Helmet>
      
      <CookieBanner />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-500 md:px-12 flex justify-between items-center ${scrolled ? 'bg-ink py-4 shadow-xl text-beige' : 'py-6 text-white bg-black/10 backdrop-blur-[2px]'}`}>
        <Link to="/" className="font-serif text-2xl tracking-widest uppercase z-50">
          Elements
        </Link>

        <div className="flex items-center gap-8 z-50">
          <button 
            onClick={() => setLang(lang === 'EN' ? 'PT' : 'EN')}
            className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            {lang}
          </button>
          <button onClick={toggleMenu} className="hover:opacity-70 transition-opacity">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink text-beige flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    to={link.path}
                    className="font-serif text-5xl md:text-7xl hover:text-gold transition-colors uppercase tracking-tight"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 text-sm tracking-widest uppercase opacity-50"
            >
              {t('home.hero.tagline')}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-beige py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-3xl mb-6 uppercase tracking-widest">Elements</h2>
            <p className="text-sm opacity-70 max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-4 text-sm tracking-widest uppercase">
            <Link to="/projects" className="hover:text-gold transition-colors">{t('nav.projects')}</Link>
            <Link to="/galerie" className="hover:text-gold transition-colors">{t('nav.galerie')}</Link>
            <Link to="/contact" className="hover:text-gold transition-colors">{t('nav.contact')}</Link>
            <a href="https://wa.me/351939996924" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors mt-4">
              WhatsApp Me
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-[10px] md:text-xs opacity-50 flex flex-col md:flex-row justify-between gap-6 uppercase tracking-widest">
          <div className="flex flex-wrap gap-2 md:gap-4 items-center">
            <span>© {new Date().getFullYear()} Elements</span>
            <span className="hidden md:inline opacity-30">|</span>
            <span>
              {t('footer.developedBy')}{' '}
              <a 
                href="https://agencia-vela.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gold hover:opacity-80 transition-all underline underline-offset-4"
              >
                Agência Vela
              </a>
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8 md:justify-end items-center">
            <Link to="/terms" className="hover:text-gold transition-colors">{t('legal.terms.title')}</Link>
            <Link to="/privacy" className="hover:text-gold transition-colors">{t('legal.privacy.title')}</Link>
            <Link to="/cookies" className="hover:text-gold transition-colors">{t('legal.cookies.title')}</Link>
            <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
              {t('footer.complaints')}
            </a>
            <span className="hidden md:inline opacity-30">|</span>
            <span>{t('footer.location')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
