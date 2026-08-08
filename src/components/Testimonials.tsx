import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/cars';
import { Testimonial } from '../types';
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../utils/translations';

interface TestimonialsProps {
  lang: 'ID' | 'EN';
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const [reviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [activeIdx, setActiveIdx] = useState(0);
  const t = TRANSLATIONS[lang];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll testimonials periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section id="testimonials" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4" id="testimonials-heading">
          <span className="font-display font-bold text-sm text-luxury-gold tracking-widest uppercase">
            {t.testi_tag}
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 tracking-tight uppercase">
            {t.testi_title}
          </h2>
          <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.testi_desc}
          </p>
        </div>

        {/* Full-width Testimonial Carousel */}
        <div className="flex flex-col items-center" id="testimonials-carousel-section">

          <AnimatePresence mode="wait">
            {reviews.length > 0 && (
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45 }}
                className="w-full bg-white rounded-[32px] p-8 sm:p-12 border border-gray-100 shadow-xl relative"
                id={`testimonial-bubble-${activeIdx}`}
              >
                {/* Decorative quote icon */}
                <div className="absolute top-8 right-8 text-gold-100">
                  <Quote className="w-16 h-16 transform -scale-x-100 fill-current opacity-60" />
                </div>

                <div className="space-y-6 relative z-10 text-left">
                  {/* Stars row */}
                  <div className="flex text-yellow-500">
                    {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial text block */}
                  <p className="font-sans text-gray-700 italic text-base sm:text-xl leading-relaxed">
                    "{reviews[activeIdx].text}"
                  </p>

                  {/* Renter profile */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <img
                      src={reviews[activeIdx].image}
                      alt={reviews[activeIdx].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-base text-gray-900 uppercase tracking-wide">
                        {reviews[activeIdx].name}
                      </h4>
                      <p className="font-sans text-xs text-gray-500">
                        {reviews[activeIdx].role}
                      </p>
                      <span className="inline-flex items-center gap-1 bg-gold-50 text-luxury-gold text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold-200/20 mt-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{t.testi_rented_model} {reviews[activeIdx].carModel} ({reviews[activeIdx].date})</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel Navigation */}
          <div className="flex items-center justify-between w-full mt-8 gap-4" id="carousel-controls">

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 bg-white hover:bg-luxury-gold hover:text-white text-gray-700 font-display font-bold text-xs py-2.5 px-5 rounded-xl border border-gray-200 shadow-sm transition-all cursor-pointer"
              id="testi-prev-btn"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.testi_btn_prev}</span>
            </button>

            {/* Dots + Counter */}
            <div className="flex items-center gap-2" id="carousel-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIdx === i ? 'w-8 bg-luxury-gold' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={`Page ${i + 1}`}
                />
              ))}
              <span className="font-mono text-xs text-gray-400 font-semibold ml-2">
                {activeIdx + 1}/{reviews.length}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="flex items-center gap-1 bg-white hover:bg-luxury-gold hover:text-white text-gray-700 font-display font-bold text-xs py-2.5 px-5 rounded-xl border border-gray-200 shadow-sm transition-all cursor-pointer"
              id="testi-next-btn"
            >
              <span>{t.testi_btn_next}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
