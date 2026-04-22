import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wind, Sun, Maximize, Heart } from 'lucide-react';
import { properties } from '../data/properties';
import { useLanguage } from '../context/LanguageContext';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
];

export default function Home() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrorIndices, setImageErrorIndices] = useState<number[]>([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityScroll = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => {
        let nextIndex = (prev + 1) % HERO_IMAGES.length;
        // Skip indices that have failed to load
        while (imageErrorIndices.includes(nextIndex) && imageErrorIndices.length < HERO_IMAGES.length) {
          nextIndex = (nextIndex + 1) % HERO_IMAGES.length;
        }
        return nextIndex;
      });
    }, 7000);
    return () => clearInterval(timer);
  }, [imageErrorIndices]);

  const handleImageError = (index: number) => {
    setImageErrorIndices(prev => [...prev, index]);
    // Immediately move to next image if current one failed
    setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  return (
    <div className="bg-beige">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden bg-ink">
        <motion.div style={{ y, opacity: opacityScroll }} className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentImageIndex}
              src={HERO_IMAGES[currentImageIndex]} 
              alt="Luxury Architecture" 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
              onError={() => handleImageError(currentImageIndex)}
            />
          </AnimatePresence>
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 text-gold-light"
          >
            {t('home.hero.nordic')}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[0.9] tracking-tight mb-12"
          >
            {t('home.hero.title')}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link to="/projects" className="px-8 py-4 bg-white text-ink text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-300">
              {t('home.hero.cta')}
            </Link>
            <Link to="/contact" className="px-8 py-4 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-ink transition-colors duration-300">
              {t('home.hero.visit')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - Updated with content from image */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h2 className="font-serif text-5xl md:text-7xl mb-4 uppercase tracking-tight">ELEMENTS Algarve</h2>
            <p className="text-sm tracking-widest uppercase opacity-60">{t('home.philosophy.subtitle')}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center space-y-16 mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl font-serif italic opacity-60">{t('home.philosophy.p1')}</p>
              <p className="text-3xl md:text-5xl font-serif leading-tight">
                {t('home.philosophy.p2')}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="w-24 h-[1px] bg-gold mx-auto origin-center" 
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl font-serif italic opacity-60">{t('home.philosophy.p3')}</p>
              <p className="text-3xl md:text-5xl font-serif leading-tight">
                {t('home.philosophy.p4')}
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium border-y border-ink/5 py-12"
          >
            <span>Tavira</span>
            <span>Lagos</span>
            <span>Loulé</span>
            <span>Faro</span>
            <span>Almancil</span>
            <span>Quinta do Lago</span>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pt-16 pb-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-serif text-4xl md:text-6xl">{t('home.featured.title')}</h2>
            <Link to="/projects" className="text-sm tracking-widest uppercase hover:text-gold transition-colors pb-2 border-b border-ink hover:border-gold">
              {t('home.featured.viewAll')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {properties.slice(0, 2).map((prop) => {
              const projectData = t(`projects.data.${prop.id}`);
              
              return (
                <Link to={`/projects/${prop.id}`} key={prop.id} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6">
                    <img 
                      src={prop.heroImage} 
                      alt={projectData.name || prop.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-3xl mb-2">{projectData.name || prop.name}</h3>
                      <p className="text-sm tracking-widest uppercase opacity-60">{projectData.location || prop.location}</p>
                    </div>
                    <div className="text-xs tracking-widest uppercase opacity-40 text-right mt-2">
                      <div>{prop.area} m²</div>
                      <div>{prop.bedrooms} {t('projectDetail.form.beds') || 'Beds'}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Performance Pillars Section */}
      <section className="bg-white px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto border-t border-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start">
            {[
              { 
                id: '01',
                name: t('home.pillars.comfort.name'), 
                icon: <Wind size={24} strokeWidth={1} />,
                tagline: t('home.pillars.comfort.tagline'),
                description: t('home.pillars.comfort.description'),
                stat: t('home.pillars.comfort.stat'),
                statLabel: t('home.pillars.comfort.statLabel')
              },
              { 
                id: '02',
                name: t('home.pillars.light.name'), 
                icon: <Sun size={24} strokeWidth={1} />,
                tagline: t('home.pillars.light.tagline'),
                description: t('home.pillars.light.description'),
                stat: t('home.pillars.light.stat'),
                statLabel: t('home.pillars.light.statLabel')
              },
              { 
                id: '03',
                name: t('home.pillars.space.name'), 
                icon: <Maximize size={24} strokeWidth={1} />,
                tagline: t('home.pillars.space.tagline'),
                description: t('home.pillars.space.description'),
                stat: t('home.pillars.space.stat'),
                statLabel: t('home.pillars.space.statLabel')
              },
              { 
                id: '04',
                name: t('home.pillars.wellbeing.name'), 
                icon: <Heart size={24} strokeWidth={1} />,
                tagline: t('home.pillars.wellbeing.tagline'),
                description: t('home.pillars.wellbeing.description'),
                stat: t('home.pillars.wellbeing.stat'),
                statLabel: t('home.pillars.wellbeing.statLabel')
              }
            ].map((pillar, idx) => (
              <motion.div 
                key={pillar.name}
                initial={{ opacity: 0, y: 20, height: 300 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ height: 520 }}
                viewport={{ once: true }}
                transition={{ 
                  height: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                  opacity: { duration: 0.8, delay: 0.2 + idx * 0.1 },
                  y: { duration: 0.8, delay: 0.2 + idx * 0.1 }
                }}
                className="relative px-8 flex flex-col items-center border-r last:border-r-0 border-b lg:border-b-0 border-ink/10 group hover:bg-beige transition-colors duration-700 cursor-default overflow-hidden"
              >
                {/* Background Number */}
                <div className="absolute top-10 right-10 font-serif text-8xl opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                  {pillar.id}
                </div>

                {/* Default State (Centered in the 300px height) */}
                <div className="h-[300px] flex flex-col items-center justify-center gap-6 group-hover:opacity-0 group-hover:-translate-y-10 transition-all duration-500 ease-in-out shrink-0">
                  <div className="text-gold scale-125">{pillar.icon}</div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">{pillar.id}</span>
                    <span className="text-xl tracking-[0.3em] uppercase font-medium">{pillar.name}</span>
                  </div>
                </div>

                {/* Hover State Content (Revealed as card elongates) */}
                <div className="absolute top-0 left-0 w-full h-full p-10 flex flex-col justify-center items-start text-left opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100 pointer-events-none group-hover:pointer-events-auto">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-gold">{pillar.icon}</div>
                    <div className="text-xs tracking-[0.3em] uppercase font-medium">{pillar.name}</div>
                  </div>
                  
                  <h4 className="font-serif text-2xl italic text-gold mb-6">{pillar.tagline}</h4>
                  <p className="text-sm leading-relaxed opacity-70 mb-10 font-light">
                    {pillar.description}
                  </p>

                  <div className="mt-auto">
                    <div className="text-4xl font-serif mb-1">{pillar.stat}</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase opacity-40">{pillar.statLabel}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Approach */}
      <section className="py-32 px-6 md:px-12 bg-ink text-beige">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-20">{t('home.services.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <div className="text-gold text-2xl mb-4 font-serif">01</div>
              <h3 className="text-xl tracking-widest uppercase mb-4">{t('home.services.s1.title')}</h3>
              <p className="opacity-70 leading-relaxed text-sm">{t('home.services.s1.desc')}</p>
            </div>
            <div>
              <div className="text-gold text-2xl mb-4 font-serif">02</div>
              <h3 className="text-xl tracking-widest uppercase mb-4">{t('home.services.s2.title')}</h3>
              <p className="opacity-70 leading-relaxed text-sm">{t('home.services.s2.desc')}</p>
            </div>
            <div>
              <div className="text-gold text-2xl mb-4 font-serif">03</div>
              <h3 className="text-xl tracking-widest uppercase mb-4">{t('home.services.s3.title')}</h3>
              <p className="opacity-70 leading-relaxed text-sm">{t('home.services.s3.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnership Section */}
      <section className="py-32 px-6 md:px-12 bg-beige overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xs tracking-[0.3em] uppercase text-gold mb-6">{t('home.partnership.tag')}</h3>
              <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
                {t('home.partnership.title')}
              </h2>
              <div className="space-y-6 text-lg opacity-70 leading-relaxed mb-12 max-w-xl">
                <p>
                  {t('home.partnership.p1')}
                </p>
                <p>
                  {t('home.partnership.p2')}
                </p>
              </div>
              <a 
                href="https://realbuilder-academy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-5 bg-ink text-beige text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300"
              >
                {t('home.partnership.cta')} <span className="ml-3 text-lg">↗</span>
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gold/10 blur-2xl group-hover:bg-gold/20 transition-colors duration-700 -z-10" />
              <div className="relative aspect-video overflow-hidden shadow-2xl border border-ink/5">
                <img 
                  src="https://lh3.googleusercontent.com/d/1rxuwL71mYa_-_z9qNeTNh7tFzH23JFlc" 
                  alt="Real Builder Academy" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
