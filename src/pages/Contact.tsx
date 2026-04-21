import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/xdaywzlk", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-beige min-h-screen pt-48 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 uppercase tracking-tight">{t('contact.title')}</h1>
          <p className="text-sm tracking-widest uppercase opacity-60 max-w-md">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 text-center shadow-xl border border-gold/10"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="font-serif text-3xl mb-4 uppercase tracking-widest text-ink">Thank You</h3>
                <p className="text-sm opacity-60 uppercase tracking-widest leading-relaxed">
                  Your message has been received.<br/>Our team will contact you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-gold text-[10px] tracking-[0.4em] uppercase hover:underline underline-offset-8 transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-ink/20 py-4 focus:outline-none focus:border-gold transition-colors peer placeholder-transparent text-sm"
                    placeholder={t('contact.form.name')}
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-4 text-[10px] tracking-widest uppercase opacity-40 transition-all pointer-events-none
                      peer-focus:-top-4 peer-focus:text-gold peer-focus:opacity-100
                      peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:opacity-100"
                  >
                    {t('contact.form.nameLabel')}
                  </label>
                </div>
                
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-ink/20 py-4 focus:outline-none focus:border-gold transition-colors peer placeholder-transparent text-sm"
                    placeholder={t('contact.form.email')}
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-4 text-[10px] tracking-widest uppercase opacity-40 transition-all pointer-events-none
                      peer-focus:-top-4 peer-focus:text-gold peer-focus:opacity-100
                      peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:opacity-100"
                  >
                    {t('contact.form.emailLabel')}
                  </label>
                </div>

                <div className="relative group">
                  <select 
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full bg-transparent border-b border-ink/20 py-4 focus:outline-none focus:border-gold transition-colors peer text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-beige">{t('contact.form.subject')}</option>
                    <option value="houses" className="bg-beige">{t('contact.form.subjects.houses')}</option>
                    <option value="info" className="bg-beige">{t('contact.form.subjects.info')}</option>
                    <option value="help" className="bg-beige">{t('contact.form.subjects.help')}</option>
                  </select>
                  <label 
                    htmlFor="subject" 
                    className="absolute left-0 -top-4 text-[10px] tracking-widest uppercase text-gold opacity-100 transition-all pointer-events-none"
                  >
                    {t('contact.form.subject')}
                  </label>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-ink/20 py-4 focus:outline-none focus:border-gold transition-colors peer placeholder-transparent resize-none text-sm"
                    placeholder={t('contact.form.message')}
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-4 text-[10px] tracking-widest uppercase opacity-40 transition-all pointer-events-none
                      peer-focus:-top-4 peer-focus:text-gold peer-focus:opacity-100
                      peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:opacity-100"
                  >
                    {t('contact.form.messageLabel')}
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    required 
                    className="mt-1 accent-gold"
                  />
                  <label htmlFor="privacy" className="text-[10px] tracking-widest uppercase opacity-60 leading-relaxed cursor-pointer">
                    {t('legal.privacyAgreement')}
                  </label>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-[10px] tracking-widest uppercase">
                    An error occurred. Please try again or contact us directly.
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-16 py-5 bg-ink text-beige text-xs tracking-[0.4em] uppercase hover:bg-gold transition-all duration-500 w-full md:w-auto shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : t('contact.form.submit')}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xs tracking-widest uppercase text-gold mb-4">{t('contact.info.hq')}</h3>
                <p className="font-serif text-xl leading-relaxed">
                  Avenida Mateus Teixeira Azevedo 55<br />
                  8800-379 Tavira<br />
                  Portugal
                </p>
              </div>
              <div>
                <h3 className="text-xs tracking-widest uppercase text-gold mb-4">{t('contact.info.direct')}</h3>
                <div className="space-y-4">
                  <p className="font-serif text-xl mt-4">
                    <a href="https://wa.me/351939996924" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                      WhatsApp Me <span className="text-sm">↗</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-ink/5 relative overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.873211145155!2d-7.646270423438466!3d37.12836267246231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd102434d3609825%3A0x56a6839353930432!2sAv.%20Mateus%20Teixeira%20de%20Azevedo%2055%2C%208800-337%20Tavira!5e0!3m2!1sen!2spt!4v1713739000000!5m2!1sen!2spt" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Elements Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
