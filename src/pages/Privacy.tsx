import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();
  const content = t('legal.privacy');

  return (
    <div className="bg-beige min-h-screen pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl mb-12 uppercase tracking-tight">
            {content.title}
          </h1>
          
          <div className="space-y-12">
            {content.sections.map((section: any, idx: number) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xs tracking-[0.3em] uppercase text-gold font-medium">
                  {section.title}
                </h2>
                <div className="text-sm opacity-70 leading-relaxed space-y-4">
                  {section.content.map((p: string, pIdx: number) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
