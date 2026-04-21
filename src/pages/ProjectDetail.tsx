import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Bed, 
  Bath, 
  Maximize, 
  Home, 
  Flame, 
  Dumbbell, 
  Sun, 
  Luggage, 
  Snowflake, 
  Thermometer, 
  Wind, 
  Droplets, 
  Battery, 
  Smartphone, 
  Zap, 
  Leaf, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Users 
} from 'lucide-react';
import { properties } from '../data/properties';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const projectData = t(`projects.data.${id}`);
  const statusKey = property?.status === 'COMING SOON' ? 'comingSoon' : 
                   property?.status === 'IN DEVELOPMENT' ? 'inDevelopment' : 'available';

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Scroll to top on mount and when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    // Force immediate scroll to top for Lenis if present
    if (window.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [id]);

  // Calculate the exact distance to scroll horizontally and set container height
  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        const width = contentRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setXRange(width - viewportWidth);
        setContainerHeight(`${width}px`);
      }
    };
    
    updateDimensions();
    // Second pass after a short delay to ensure all images/content are loaded
    const timer = setTimeout(updateDimensions, 100);
    
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [property]);

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!property.formspreeEndpoint) return;
    
    setFormStatus('sending');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(property.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const [containerHeight, setContainerHeight] = useState('500vh');
  const x = useTransform(scrollYProgress, [0, 1], [0, -xRange]);

  if (!property) {
    return <div className="h-screen flex items-center justify-center text-2xl font-serif">Project not found</div>;
  }

  // Icons mapping for comfort items
  const comfortIcons = [
    <Bed className="w-6 h-6" />,
    <Bath className="w-6 h-6" />,
    <Maximize className="w-6 h-6" />,
    <Home className="w-6 h-6" />,
    <Flame className="w-6 h-6" />,
    <Dumbbell className="w-6 h-6" />,
    <Sun className="w-6 h-6" />,
    <Luggage className="w-6 h-6" />,
  ];

  // Icons mapping for tech items
  const techIcons = [
    <Snowflake className="w-6 h-6" />,
    <Thermometer className="w-6 h-6" />,
    <Wind className="w-6 h-6" />,
    <Droplets className="w-6 h-6" />,
    <Sun className="w-6 h-6" />,
    <Battery className="w-6 h-6" />,
    <Smartphone className="w-6 h-6" />,
    <Zap className="w-6 h-6" />,
    <Leaf className="w-6 h-6" />,
    <ShieldCheck className="w-6 h-6" />,
  ];

  // Icons mapping for investment items
  const investmentIcons = [
    <TrendingUp className="w-8 h-8" />,
    <Award className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
  ];

  return (
    <div className="bg-ink text-beige">
      {/* 
        The container height determines how long the user has to scroll vertically 
        to complete the horizontal movement. 500vh means 5 screens of scrolling.
      */}
      <div ref={containerRef} style={{ height: containerHeight }} className="relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div ref={contentRef} style={{ x }} className="flex h-full">
            
            {/* Section 1: Hero */}
            <div className="h-screen w-screen flex-shrink-0 relative flex items-center justify-center">
              <div className="absolute inset-0">
                <img src={property.heroImage} alt={property.name} className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
              </div>
              <div className="relative z-10 px-12 md:px-24 w-full max-w-7xl mx-auto">
                <div className="mb-6 flex gap-4">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="bg-gold/20 backdrop-blur-md text-gold px-4 py-1 text-[10px] tracking-[0.2em] uppercase font-medium border border-gold/30"
                  >
                    {t(`projects.status.${statusKey}`)}
                  </motion.span>
                </div>
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6"
                >
                  {projectData.name || property.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-sm tracking-[0.3em] uppercase text-gold"
                >
                  {projectData.location || property.location}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="absolute bottom-12 left-12 md:left-24 flex items-center gap-4 text-xs tracking-widest uppercase opacity-50"
                >
                  <div className="w-12 h-[1px] bg-beige" />
                  {t('projectDetail.scroll')}
                </motion.div>
              </div>
            </div>

            {/* Section 2: Description & Specs */}
            <div className="h-screen w-screen flex-shrink-0 flex items-center px-12 md:px-24 bg-ink">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-7xl mx-auto w-full">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-8">{t('projectDetail.concept')}</h2>
                  <p className="text-lg opacity-80 leading-relaxed max-w-xl">
                    {projectData.description || property.description}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xs tracking-widest uppercase text-gold mb-8">{t('projectDetail.specs')}</h3>
                  <div className="space-y-6 text-sm tracking-widest uppercase">
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span className="opacity-50">{t('projectDetail.internalArea')}</span>
                      <span>{property.area} m²</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span className="opacity-50">{t('projectDetail.bedrooms')}</span>
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span className="opacity-50">{t('projectDetail.bathrooms')}</span>
                      <span>{property.bathrooms}</span>
                    </div>
                    {property.specs && property.specs.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4">
                        {property.specs.map(spec => (
                          <span key={spec} className="border border-white/20 px-3 py-1 text-[10px] opacity-60">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: First Gallery Image */}
            <div className="h-screen w-screen flex-shrink-0 flex items-center justify-center bg-ink">
              <div className="w-[80vw] md:w-[60vw] h-[70vh] relative overflow-hidden shadow-2xl">
                <img src={property.gallery[0]} alt={`${property.name} detail 1`} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Section 4: Pure Architectural Vision */}
            <div className="h-screen w-screen flex-shrink-0 flex items-center px-12 md:px-24 bg-ink">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto w-full items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="space-y-8"
                >
                  <h2 className="font-serif text-5xl md:text-7xl leading-tight" dangerouslySetInnerHTML={{ __html: t('projectDetail.visionTitle') }} />
                  <div className="space-y-6 text-base opacity-70 leading-relaxed max-w-xl font-light">
                    <p>
                      {t('projectDetail.visionDesc')}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t('projectDetail.materials')}</h3>
                    <ul className="space-y-3 text-sm opacity-80">
                      {(t('projectDetail.materialsList') as string[]).map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <span className="w-1 h-1 bg-gold rounded-full" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="h-[70vh] relative overflow-hidden shadow-2xl border border-white/5"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Architectural Vision" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/10" />
                </motion.div>
              </div>
            </div>

            {/* Section 5: Comfort Living */}
            <div className="h-screen w-screen flex-shrink-0 flex items-center px-12 md:px-24 bg-ink">
              <div className="max-w-7xl mx-auto w-full space-y-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="font-serif text-4xl md:text-6xl text-center"
                >
                  {t('projectDetail.comfortTitle')}
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
                  {(t('projectDetail.comfortItems') as any[]).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center text-center p-10 bg-ink hover:bg-white/[0.02] transition-colors group"
                    >
                      <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">{comfortIcons[i]}</div>
                      <h4 className="text-[10px] tracking-[0.3em] uppercase mb-3 font-medium">{item.title}</h4>
                      <p className="text-[9px] opacity-40 leading-relaxed max-w-[150px]">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 6: Technology & Sustainability */}
            <div className="h-screen w-screen flex-shrink-0 flex items-center px-12 md:px-24 bg-ink">
              <div className="max-w-7xl mx-auto w-full space-y-20">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="font-serif text-4xl md:text-6xl text-center"
                >
                  {t('projectDetail.techTitle')}
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16 gap-x-12">
                  {(t('projectDetail.techItems') as string[]).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-6 group"
                    >
                      <div className="text-gold/40 group-hover:text-gold transition-colors duration-500 scale-90 group-hover:scale-110">{techIcons[i]}</div>
                      <span className="text-[10px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-100 transition-all duration-500 text-center">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 7: A Singular Investment */}
            <div className="h-screen w-screen flex-shrink-0 flex items-center px-12 md:px-24 bg-beige text-ink">
              <div className="max-w-7xl mx-auto w-full text-center space-y-10 pt-12">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-6xl md:text-8xl">{t('projectDetail.investmentTitle')}</h2>
                  <p className="text-xl opacity-60 max-w-2xl mx-auto font-light leading-relaxed">
                    {t('projectDetail.investmentDesc')}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
                  {(t('projectDetail.investmentItems') as any[]).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-12 bg-beige hover:bg-ink/[0.02] transition-colors group space-y-6"
                    >
                      <div className="text-gold flex justify-center group-hover:scale-110 transition-transform duration-500">{investmentIcons[i]}</div>
                      <div className="space-y-4">
                        <h3 className="text-xs tracking-[0.3em] uppercase font-bold">{item.title}</h3>
                        <p className="text-sm opacity-70 leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
                    {t('projectDetail.viewing')}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Section 8: Transition / Remaining Gallery */}
            {property.gallery.length > 1 ? (
              <div className="h-screen flex-shrink-0 flex items-center gap-12 px-12 md:px-24 bg-ink">
                {property.gallery.slice(1).map((img, idx) => (
                  <div key={idx} className="w-[80vw] md:w-[60vw] h-[70vh] relative overflow-hidden shadow-2xl">
                    <img src={img} alt={`${property.name} detail ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-screen w-screen flex-shrink-0 relative overflow-hidden bg-ink">
                <img 
                  src={property.heroImage} 
                  alt="Atmosphere" 
                  className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[1px] w-32 bg-gold/30" />
                </div>
              </div>
            )}

            {/* Section 9: CTA */}
            <div className="h-screen w-screen flex-shrink-0 flex items-center justify-center pt-20 bg-beige text-ink relative">
              <div className="w-full max-w-xl px-6">
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-ink text-beige p-12 text-center shadow-2xl relative z-10"
                  >
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h3 className="font-serif text-3xl mb-4 uppercase tracking-widest">Thanks for Requesting!</h3>
                    <p className="text-sm opacity-60 uppercase tracking-widest leading-relaxed">
                      We will contact you shortly!
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-8 text-gold text-[10px] tracking-[0.4em] uppercase hover:underline underline-offset-8 transition-all"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="text-center mb-12">
                      <h2 className="font-serif text-5xl md:text-7xl mb-4">{t('projectDetail.inquireTitle')}</h2>
                      <p className="text-sm tracking-widest uppercase opacity-60">
                        {t('projectDetail.inquireSubtitle')} {property.name}
                      </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleInquirySubmit}>
                      <input type="hidden" name="property_name" value={property.name} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] tracking-widest uppercase opacity-40 ml-1" htmlFor="inquiry-name">{t('projectDetail.form.name')}</label>
                          <input 
                            id="inquiry-name"
                            name="name"
                            required
                            type="text" 
                            placeholder={t('projectDetail.form.placeholderName')}
                            className="w-full bg-transparent border-b border-ink/20 py-3 px-1 text-sm focus:border-gold outline-none transition-colors placeholder:opacity-20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] tracking-widest uppercase opacity-40 ml-1" htmlFor="inquiry-phone">{t('projectDetail.form.phone')}</label>
                          <input 
                            id="inquiry-phone"
                            name="phone"
                            required
                            type="tel" 
                            placeholder={t('projectDetail.form.placeholderPhone')}
                            className="w-full bg-transparent border-b border-ink/20 py-3 px-1 text-sm focus:border-gold outline-none transition-colors placeholder:opacity-20"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase opacity-40 ml-1" htmlFor="inquiry-email">{t('projectDetail.form.email')}</label>
                        <input 
                          id="inquiry-email"
                          name="email"
                          required
                          type="email" 
                          placeholder={t('projectDetail.form.placeholderEmail')}
                          className="w-full bg-transparent border-b border-ink/20 py-3 px-1 text-sm focus:border-gold outline-none transition-colors placeholder:opacity-20"
                        />
                      </div>

                      <div className="space-y-2 relative">
                        <label className="text-[10px] tracking-widest uppercase opacity-40 ml-1" htmlFor="inquiry-subject">{t('projectDetail.form.subject')}</label>
                        <div className="relative">
                          <select 
                            id="inquiry-subject"
                            name="subject"
                            required
                            defaultValue=""
                            className="w-full bg-transparent border-b border-ink/20 py-3 px-1 text-sm focus:border-gold outline-none transition-colors appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="bg-beige">{t('projectDetail.form.subject')}</option>
                            <option value="visit" className="bg-beige">{t('projectDetail.form.subjects.visit')}</option>
                            <option value="info" className="bg-beige">{t('projectDetail.form.subjects.info')}</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase opacity-40 ml-1" htmlFor="inquiry-message">{t('projectDetail.form.message')}</label>
                        <textarea 
                          id="inquiry-message"
                          name="message"
                          required
                          rows={3}
                          placeholder={t('projectDetail.form.placeholderMessage')}
                          className="w-full bg-transparent border-b border-ink/20 py-3 px-1 text-sm focus:border-gold outline-none transition-colors placeholder:opacity-20 resize-none"
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="privacy-detail" 
                          required 
                          className="mt-1 accent-gold"
                        />
                        <label htmlFor="privacy-detail" className="text-[10px] tracking-widest uppercase opacity-60 leading-relaxed cursor-pointer">
                          {t('legal.privacyAgreement')}
                        </label>
                      </div>

                      {formStatus === 'error' && (
                        <p className="text-red-500 text-[10px] tracking-widest uppercase text-center mt-4">
                          An error occurred. Please try again.
                        </p>
                      )}

                      <div className="pt-6 text-center">
                        <button 
                          type="submit"
                          disabled={formStatus === 'sending'}
                          className="px-16 py-5 bg-ink text-beige text-xs tracking-[0.4em] uppercase hover:bg-gold transition-colors duration-500 shadow-xl disabled:opacity-50"
                        >
                          {formStatus === 'sending' ? 'Sending...' : t('projectDetail.form.submit')}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
              <div className="absolute bottom-12 right-12 text-xs tracking-widest uppercase opacity-40">
                Elements Architecture
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
