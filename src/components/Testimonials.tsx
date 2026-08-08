import React, { useState, useEffect } from 'react';
import { TESTIMONIALS, TestimonialItem } from '../data/cars';
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../utils/translations';

interface TestimonialsProps {
  lang: 'ID' | 'EN';
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const [reviews] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [activeIdx, setActiveIdx] = useState(0);
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

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

  const currentRev = reviews[activeIdx];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden text-left border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3" id="testimonials-heading">
          <span className="font-display font-extrabold text-xs text-red-600 tracking-widest uppercase bg-red-100 px-3 py-1 rounded-full border border-red-200 inline-block">
            {t.testi_tag}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37] tracking-tight uppercase">
            {t.testi_title}
          </h2>
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
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
                className="w-full bg-white rounded-[32px] p-8 sm:p-12 border border-slate-200 shadow-xl relative"
                id={`testimonial-bubble-${activeIdx}`}
              >
                {/* Decorative quote icon */}
                <div className="absolute top-8 right-8 text-slate-200">
                  <Quote className="w-16 h-16 transform -scale-x-100 fill-current opacity-60" />
                </div>

                <div className="space-y-6 relative z-10 text-left">
                  {/* Stars row */}
                  <div className="flex text-amber-400">
                    {[...Array(currentRev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial text block */}
                  <p className="font-sans text-slate-700 italic text-base sm:text-xl leading-relaxed font-medium">
                    "{isEN ? currentRev.textEN : currentRev.textID}"
                  </p>

                  {/* Renter profile */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <img
                      src={currentRev.image}
                      alt={currentRev.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-red-500 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-black text-base text-[#0d1b37] uppercase tracking-wide">
                        {currentRev.name}
                      </h4>
                      <p className="font-sans text-xs text-slate-500 font-semibold">
                        {isEN ? currentRev.roleEN : currentRev.roleID}
                      </p>
                      <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-red-200 mt-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>
                          {t.testi_rented_model} {isEN ? currentRev.carModelEN : currentRev.carModelID} ({isEN ? currentRev.dateEN : currentRev.dateID})
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white hover:bg-red-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors shadow-md border border-slate-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIdx === idx ? 'w-8 bg-red-600' : 'w-2.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white hover:bg-red-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors shadow-md border border-slate-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
