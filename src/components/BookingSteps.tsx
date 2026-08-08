import React from 'react';
import { Smartphone, MessageSquareText, ShieldAlert, Sparkles, Map } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { motion } from 'motion/react';

interface BookingStepsProps {
  lang: 'ID' | 'EN';
}

export default function BookingSteps({ lang }: BookingStepsProps) {
  const t = TRANSLATIONS[lang];

  const stepsList = [
    {
      step: '01',
      title: t.step_1_title,
      description: t.step_1_desc,
    },
    {
      step: '02',
      title: t.step_2_title,
      description: t.step_2_desc,
    },
    {
      step: '03',
      title: t.step_3_title,
      description: t.step_3_desc,
    },
  ];

  return (
    <section id="steps" className="py-24 bg-gray-50 overflow-hidden border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-display font-bold text-sm text-luxury-gold tracking-widest uppercase">
            {t.steps_tag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight uppercase">
            {t.steps_title}
          </h2>
          <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.steps_desc}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-luxury-gold/30 via-luxury-gold to-luxury-gold/30 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {stepsList.map((stepItem, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-luxury-gold/10 transition-all duration-300 flex flex-col items-center text-center relative group"
              >
                {/* Step Number Circle */}
                <div className="w-16 h-16 rounded-full bg-luxury-gold text-white flex items-center justify-center font-display font-black text-xl shadow-lg shadow-luxury-gold/20 mb-6 group-hover:scale-105 transition-transform duration-300">
                  {stepItem.step}
                </div>
                
                <h3 className="font-display font-bold text-lg text-gray-900 mb-3 group-hover:text-luxury-gold transition-colors">
                  {stepItem.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
                  {stepItem.description}
                </p>

                {/* Corner light shine decorative */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
