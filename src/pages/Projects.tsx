import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();

  const sortedProperties = [...properties].sort((a, b) => {
    if (a.status === 'AVAILABLE' && b.status !== 'AVAILABLE') return -1;
    if (a.status !== 'AVAILABLE' && b.status === 'AVAILABLE') return 1;
    return 0;
  });
  
  return (
    <div className="bg-beige min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6">{t('projects.title')}</h1>
          <p className="text-sm tracking-widest uppercase opacity-60 max-w-md">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {sortedProperties.map((prop, index) => {
            const projectData = t(`projects.data.${prop.id}`);
            const statusKey = prop.status === 'COMING SOON' ? 'comingSoon' : 
                             prop.status === 'IN DEVELOPMENT' ? 'inDevelopment' : 'available';
            
            return (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index % 2 === 0 ? 0 : 0.2 }}
                className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                <Link to={`/projects/${prop.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden mb-8">
                    <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-beige/90 backdrop-blur-sm text-ink px-4 py-1 text-[10px] tracking-[0.2em] uppercase font-medium">
                        {t(`projects.status.${statusKey}`)}
                      </span>
                    </div>

                    <img 
                      src={prop.heroImage} 
                      alt={projectData.name || prop.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-serif text-3xl md:text-4xl mb-2">{projectData.name || prop.name}</h2>
                      <p className="text-xs tracking-widest uppercase opacity-60">{projectData.location || prop.location}</p>
                    </div>
                    <div className="text-xs tracking-widest uppercase opacity-40 text-right">
                      <div>{prop.area} m²</div>
                      <div>{prop.bedrooms} {t('projectDetail.form.beds') || 'Beds'}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
