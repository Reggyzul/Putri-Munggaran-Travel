import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface HeroProps {
  onExploreClick: () => void;
  lang: 'ID' | 'EN';
  onBookingClick?: () => void;
}

export default function Hero({ onExploreClick, lang }: HeroProps) {
  const { content } = useSiteContent();
  const [activeSlide, setActiveSlide] = useState(0);
  const isEN = lang === 'EN';

  const slides = content.heroSlides.length > 0 ? content.heroSlides : [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const safeIndex = activeSlide < slides.length ? activeSlide : 0;
  const current = slides[safeIndex];

  if (!current) return null;

  const waUrl = `https://api.whatsapp.com/send?phone=${content.brand.whatsappNumber}&text=${encodeURIComponent(
    isEN ? content.brand.whatsappDefaultMessageEN : content.brand.whatsappDefaultMessageID
  )}`;

  return (
    <section
      id="home"
      className="relative w-full h-[620px] sm:h-[680px] md:h-[740px] text-white overflow-hidden text-left pt-20 sm:pt-24 flex items-center"
    >
      {/* 1. BACKGROUND PHOTO SLIDER */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <AnimatePresence mode="wait">
          {current.image ? (
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${current.image}')` }}
            />
          ) : (
            <div key={safeIndex} className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0d2847] to-emerald-950" />
          )}
        </AnimatePresence>

        {/* Dark Cinematic Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
      </div>

      {/* 2. LEFT-ALIGNED HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full py-12">
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4 sm:space-y-5 text-left"
        >
          {/* Main Title */}
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight drop-shadow-md">
            {current.title}
          </h1>

          {/* Subtitle */}
          <h2 className="font-sans text-lg sm:text-2xl text-slate-100 font-semibold tracking-wide drop-shadow-sm">
            {current.subtitle}
          </h2>

          {/* Description Paragraph */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-sm">
            {isEN ? current.descEN : current.descID}
          </p>

          {/* Emerald Rounded Pill CTA Button */}
          <div className="pt-2 sm:pt-4 flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg shadow-emerald-950/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              id="hero-contact-btn"
            >
              <span>{isEN ? content.heroCtaPrimaryEN : content.heroCtaPrimaryID}</span>
            </a>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/20"
            >
              <span>{isEN ? content.heroCtaSecondaryEN : content.heroCtaSecondaryID}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3. BOTTOM CAROUSEL DOTS */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              safeIndex === idx
                ? 'w-3.5 h-3.5 bg-white shadow-md'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
