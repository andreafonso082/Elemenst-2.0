import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Small delay for better UX but faster than before
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'declined') => {
    localStorage.setItem('cookie_consent', choice);
    setIsVisible(false);
    
    // If declined, we could trigger a cleanup of existing non-essential cookies here
    if (choice === 'declined') {
      console.log('User declined cookies. Non-essential scripts should be disabled.');
      // Example: window.disableAnalytics()
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[9999]"
        >
          <div className="bg-ink text-beige p-6 rounded-2xl shadow-2xl border border-gold/20 backdrop-blur-md bg-opacity-95">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif text-xl uppercase tracking-wider text-gold">
                {t('legal.cookies.title')}
              </h3>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-beige/40 hover:text-beige transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              {t('legal.cookies.banner.message')}{' '}
              <Link to="/cookies" className="text-gold hover:underline underline-offset-4 decoration-gold/50">
                {t('legal.cookies.banner.policy')}
              </Link>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleConsent('accepted')}
                className="flex-1 bg-gold text-ink font-medium px-6 py-2.5 rounded-lg text-sm transition-all hover:bg-gold-light active:scale-95"
              >
                {t('legal.cookies.banner.accept')}
              </button>
              <button
                onClick={() => handleConsent('declined')}
                className="flex-1 bg-transparent border border-beige/20 text-beige px-6 py-2.5 rounded-lg text-sm transition-all hover:bg-beige/10 active:scale-95"
              >
                {t('legal.cookies.banner.decline')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
