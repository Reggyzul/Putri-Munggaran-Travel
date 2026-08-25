import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, MessageCircle, Car, MapPin, CheckCircle2, ShieldCheck, UserCheck, Navigation } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface HeroProps {
  onExploreClick: () => void;
  lang: 'ID' | 'EN';
  onBookingClick?: () => void;
}

export default function Hero({ onExploreClick, lang, onBookingClick }: HeroProps) {
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  return (
    <section id="home" className="relative bg-[#061226] text-slate-900 overflow-hidden text-left">
      
      {/* 1. PANORAMIC HERO PHOTO BANNER (~75% spacious view) */}
      <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] pt-24 sm:pt-28 bg-[#061226] text-white overflow-hidden flex flex-col justify-between">
        
        {/* Background Pangandaran Coastal Sunset Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/hero_pangandaran.jpg')`
          }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061226]/85 via-black/30 to-[#061226]/90" />

        {/* Location Pill in Top Banner */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-start">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEN ? 'Pangandaran, Bandung, Jabodetabek & Surrounding Areas' : 'Pangandaran, Bandung, Jabodetabek & Sekitarnya'}</span>
          </div>
        </div>

        {/* Spacer for spacious photo presentation */}
        <div className="h-12" />

      </div>

      {/* 2. WHITE CONTENT CARD (Overlapping 25% onto hero banner) */}
      <div className="bg-slate-50 relative pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 -mt-28 sm:-mt-36 md:-mt-40">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-t-[32px] sm:rounded-t-[40px] rounded-b-3xl p-7 sm:p-10 md:p-12 shadow-2xl border border-slate-100/90 text-center space-y-6"
          >
            
            {/* Breadcrumb Line */}
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span className="text-red-600 font-black">Putri Munggaran Tour &amp; Travel</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500">
                {isEN ? 'Door-to-Door Travel & Transport' : 'Travel & Transportasi Door-to-Door'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-2xl sm:text-4xl md:text-[40px] text-[#081836] tracking-tight leading-snug sm:leading-tight uppercase">
              {isEN ? (
                <>Putri Munggaran Travel — <span className="text-red-600">Safe, Comfortable, To Destination</span></>
              ) : (
                <>Putri Munggaran Travel — <span className="text-red-600">Aman, Nyaman, Sampai Tujuan</span></>
              )}
            </h1>

            {/* Human-Touch Simple & Elegant Description */}
            <p className="font-sans text-xs sm:text-sm md:text-[15px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed text-center">
              {isEN
                ? "Reliable travel and transportation service serving Pangandaran to Bandung, Jabodetabek, and various destinations. Enjoy practical door-to-door service with experienced drivers and clean, well-maintained fleets for family, business, and group trips."
                : "Layanan transportasi dan perjalanan terpercaya yang melayani rute Pangandaran menuju Bandung, Jabodetabek, serta berbagai tujuan lainnya. Nikmati kepraktisan door-to-door service bersama pengemudi berpengalaman dan pilihan armada prima untuk perjalanan keluarga, dinas, maupun rombongan."}
            </p>

            {/* 3 Value Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                <Navigation className="w-4 h-4 text-red-600" />
                <span>Door-to-Door Service</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                <UserCheck className="w-4 h-4 text-red-600" />
                <span>Pengemudi Berpengalaman</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                <Car className="w-4 h-4 text-red-600" />
                <span>Avanza • Calya • Rush • Hiace</span>
              </div>
            </div>

            {/* Quick CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="https://api.whatsapp.com/send?phone=6281321264200&text=Halo%20Putri%20Munggaran%20Tour%20%26%20Travel,%20saya%20ingin%20konsultasi%20jadwal%20dan%20pemesanan%20travel"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#dc2626] hover:bg-red-700 text-white font-display font-black text-xs uppercase px-8 py-3.5 rounded-xl shadow-md hover:shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat WhatsApp Admin</span>
              </a>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-[#081836] hover:bg-[#0c2340] text-white font-display font-black text-xs uppercase px-7 py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Car className="w-4 h-4 text-amber-300" />
                <span>{isEN ? 'View Fleet' : 'Lihat Pilihan Armada'}</span>
              </button>
            </div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}
