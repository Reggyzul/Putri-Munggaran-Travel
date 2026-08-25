import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ChevronRight, Phone } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface HeroProps {
  onExploreClick: () => void;
  lang: 'ID' | 'EN';
  onBookingClick?: () => void;
}

const HERO_SLIDES = [
  {
    image: '/hero_human_touch.jpg',
    title: 'PUTRI MUNGGARAN TRAVEL',
    subtitle: 'Pangandaran Tour & Travel',
    descID: 'Layanan Perjalanan Door-to-Door (Pangandaran – Bandung – Jabodetabek), Wisata Keluarga, Gathering, Private Trip, dan Antar-Jemput Rombongan.',
    descEN: 'Door-to-Door Travel Service (Pangandaran – Bandung – Jabodetabek), Family Vacations, Outings, Private Trips, and Group Passenger Transport.'
  },
  {
    image: '/hero_pangandaran.jpg',
    title: 'PUTRI MUNGGARAN TRAVEL',
    subtitle: 'Aman, Nyaman, Sampai Tujuan',
    descID: 'Didukung armada terawat (Avanza, Calya, Rush, Hiace) dan pengemudi berpengalaman yang siap mengantar perjalanan Anda dengan aman dan nyaman.',
    descEN: 'Supported by clean, well-maintained fleets (Avanza, Calya, Rush, Hiace) and experienced drivers ensuring a safe and comfortable journey.'
  },
  {
    image: '/dest_batu_hiu.jpg',
    title: 'DESTINASI PANGANDARAN',
    subtitle: 'Pesona Alam & Pantai Eksotis',
    descID: 'Jelajahi Pantai Batu Hiu, Batukaras, Madasari, Green Canyon, Citumang, hingga Pasir Putih bersama Putri Munggaran Tour & Travel.',
    descEN: 'Explore Batu Hiu Beach, Batukaras, Madasari, Green Canyon, Citumang, and White Sand Beach with Putri Munggaran Tour & Travel.'
  }
];

export default function Hero({ onExploreClick, lang, onBookingClick }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[activeSlide];

  return (
    <section id="home" className="relative w-full h-[620px] sm:h-[680px] md:h-[740px] text-white overflow-hidden text-left pt-20 sm:pt-24 flex items-center">
      
      {/* 1. BACKGROUND PHOTO SLIDER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${current.image}')` }}
          />
        </AnimatePresence>

        {/* Dark Cinematic Tint Overlay (Similar to reference image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
      </div>

      {/* 2. LEFT-ALIGNED HERO CONTENT (FASTRANS Template Style & Typography) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full py-12">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4 sm:space-y-5 text-left"
        >
          
          {/* Main Title: Large Bold Uppercase */}
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

          {/* Teal / Emerald Rounded Pill CTA Button (Exact FASTRANS screenshot button style) */}
          <div className="pt-2 sm:pt-4 flex items-center gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=6281321264200&text=Halo%20Putri%20Munggaran%20Tour%20%26%20Travel,%20saya%20ingin%20konsultasi%20dan%20reservasi%20perjalanan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 hover:text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
              id="hero-contact-btn"
            >
              <span>{isEN ? 'CONTACT' : 'CONTACT'}</span>
            </a>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/20"
            >
              <span>{isEN ? 'Lihat Armada' : 'Lihat Armada'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>

      {/* 3. BOTTOM CAROUSEL DOTS (Centered at bottom, like screenshot) */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeSlide === idx
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
