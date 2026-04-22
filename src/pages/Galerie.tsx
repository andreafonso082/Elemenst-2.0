import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Combined gallery images with specific layout hints for an editorial feel
const galleryImages = [
  { 
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-2 row-span-2",
  },
  { 
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-1 row-span-1",
  },
  { 
    url: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-1 row-span-2",
  },
  { 
    url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-1 row-span-1",
  },
  { 
    url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-2 row-span-1",
  },
  { 
    url: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-1 row-span-1",
  },
  { 
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-1 row-span-2",
  },
  { 
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-2 row-span-2",
  },
  { 
    url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    size: "col-span-1 row-span-1",
  }
];

export default function Galerie() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const titles = t('galerie.titles') as string[];

  return (
    <div className="bg-ink text-beige min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32 text-center"
        >
          <h1 className="font-serif text-6xl md:text-8xl mb-8 tracking-tight">{t('galerie.title')}</h1>
          <div className="w-12 h-px bg-gold mx-auto mb-8 opacity-50" />
          <p className="text-xs tracking-[0.4em] uppercase opacity-40 max-w-md mx-auto leading-relaxed">
            {t('galerie.subtitle')}
          </p>
        </motion.div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
          {galleryImages.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`${item.size} cursor-pointer group relative overflow-hidden bg-ink/50`}
              onClick={() => setSelectedImage(item.url)}
            >
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/10 transition-colors duration-700 z-10" />
              
              {/* Image Label - Editorial Style */}
              <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white font-medium mb-1">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-sm font-serif italic text-gold-light">{titles[index]}</h3>
              </div>

              <motion.img 
                src={item.url} 
                alt={titles[index]} 
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={selectedImage} 
              alt="Enlarged detail" 
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
