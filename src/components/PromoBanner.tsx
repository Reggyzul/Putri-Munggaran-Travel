import React from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../utils/translations';

interface PromoBannerProps {
  lang: 'EN' | 'AR';
}

export default function PromoBanner({ lang }: PromoBannerProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section className="py-20 bg-luxury-charcoal text-white relative overflow-hidden" id="promo-banner">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-luxury-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Banner Left: Text contents */}
          <div className="lg:col-span-6 space-y-6" id="promo-banner-text">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-1"
            >
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none uppercase">
                {lang === 'AR' ? (
                  <>
                    رحلات مريحة <br />
                    و<span className="text-luxury-gold">موثوقة</span> <br />
                    في إندونيسيا
                  </>
                ) : (
                  <>
                    Comfort & <br />
                    <span className="text-luxury-gold">Trustworthy</span> <br />
                    Travel
                  </>
                )}
              </h2>
            </motion.div>
            
            <p className={`font-sans text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg ${lang === 'AR' ? 'text-right' : ''}`}>
              {t.promo_desc}
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10" id="promo-metrics">
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl text-luxury-gold">100%</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">
                  {lang === 'AR' ? 'أمان تام' : 'Safe Trip'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl text-luxury-gold">24/7</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">
                  {t.promo_metric_hours}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl text-luxury-gold">0%</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">
                  {t.promo_metric_fee}
                </span>
              </div>
            </div>
          </div>

          {/* Banner Right: Glowing car front view exactly as in screenshot */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center" id="promo-banner-car">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.15)] bg-black p-4">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                  alt="Scenic Mountain Road Trip Puncak Bogor"
                  className="w-full h-auto object-cover rounded-2xl filter brightness-90 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Subtext on bottom right of image exactly as in screenshot */}
              <div className="absolute -bottom-6 right-4 bg-luxury-gold text-luxury-black font-display font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-xl border border-white/10 uppercase tracking-wider">
                {t.promo_tagline}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
