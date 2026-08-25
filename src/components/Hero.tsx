import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Search, ChevronDown, ShieldCheck, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface HeroProps {
  onExploreClick: () => void;
  lang: 'ID' | 'EN';
  onBookingClick?: () => void;
}

export default function Hero({ onExploreClick, lang, onBookingClick }: HeroProps) {
  const [destinationInput, setDestinationInput] = useState('Pangandaran – Bandung (PP)');
  const [travelDateInput, setTravelDateInput] = useState('');

  const t = TRANSLATIONS[lang];

  const destOptions = lang === 'EN' ? [
    { value: 'Pangandaran – Bandung (Round-Trip / One-Way)', label: 'Pangandaran – Bandung (Door-to-Door)' },
    { value: 'Pangandaran – Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)', label: 'Pangandaran – Jabodetabek' },
    { value: 'Bandung – Jabodetabek (Round-Trip / One-Way)', label: 'Bandung – Jabodetabek' },
    { value: 'Private Trip (Pangandaran, Bandung, Jabodetabek & Surrounding)', label: 'Private Trip / Family Travel' },
    { value: 'Inter-City & Other Destinations by Request', label: 'Inter-City & Custom Destinations' }
  ] : [
    { value: 'Pangandaran – Bandung (PP / Sekali Jalan)', label: 'Pangandaran – Bandung (Door-to-Door)' },
    { value: 'Pangandaran – Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)', label: 'Pangandaran – Jabodetabek' },
    { value: 'Bandung – Jabodetabek (PP / Sekali Jalan)', label: 'Bandung – Jabodetabek' },
    { value: 'Private Trip (Pangandaran, Bandung, Jabodetabek & Sekitarnya)', label: 'Private Trip / Transportasi Keluarga' },
    { value: 'Perjalanan Antar Kota & Rute Lainnya Sesuai Permintaan', label: 'Antar Kota & Destinasi Lainnya' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waNumber = '6281321264200';
    const message = lang === 'EN'
      ? `Hello Putri Munggaran Tour & Travel, I would like to consult route / vehicle reservation for: ${destinationInput}${travelDateInput ? ` (Planned Date: ${travelDateInput})` : ''}. Please provide price quotes & availability. Thank you!`
      : `Halo Putri Munggaran Tour & Travel, saya ingin berkonsultasi mengenai rute perjalanan / sewa armada: ${destinationInput}${travelDateInput ? ` (Rencana Tanggal: ${travelDateInput})` : ''}. Mohon informasi ketersediaan dan penawaran harga terbaik. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <section id="home" className="relative pt-16 pb-6 bg-slate-50 overflow-hidden text-center">
      
      {/* 1. HERO SCENIC BANNER */}
      <div className="relative w-full min-h-[520px] sm:min-h-[560px] flex flex-col justify-between bg-slate-950 text-white overflow-hidden border-b border-slate-200">
        
        {/* Full-width Scenic Landscape Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920')`
          }}
        />

        {/* Soft Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/85 backdrop-blur-[0.5px]" />

        {/* Top Spacer */}
        <div className="h-16 sm:h-20" />

        {/* Hero Central Typography */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 text-center space-y-3 sm:space-y-4">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-black uppercase tracking-widest shadow-lg border border-red-400/40 mx-auto"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>DOOR-TO-DOOR SERVICE • PANGANDARAN – BANDUNG – JABODETABEK</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight drop-shadow-xl"
          >
            {t.hero_title_1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-amber-300 drop-shadow-lg"
            style={{ fontFamily: "'Great Vibes', cursive, serif" }}
          >
            {t.hero_motto}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-sans text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium"
          >
            {t.hero_subtitle}
          </motion.p>
        </div>

        {/* Bottom Spacer inside Banner */}
        <div className="h-20 sm:h-24" />

      </div>

      {/* 2. ELEVATED SEARCH TOUR BOX */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/90 text-left">
          
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Field 1: Route Selection */}
            <div className="md:col-span-5 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                {t.search_dest_cat}
              </label>
              <div className="flex items-center gap-2 mt-1 relative">
                <MapPin className="w-4 h-4 text-[#dc2626] shrink-0" />
                <select
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  className="w-full text-xs sm:text-sm font-black text-slate-900 focus:outline-none bg-transparent cursor-pointer appearance-none pr-4"
                >
                  {destOptions.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Travel Dates */}
            <div className="md:col-span-4 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                {t.search_travel_date}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-red-500 shrink-0" />
                <input
                  type="text"
                  value={travelDateInput}
                  onChange={(e) => setTravelDateInput(e.target.value)}
                  placeholder={t.search_date_placeholder}
                  className="w-full text-xs font-semibold text-slate-700 focus:outline-none bg-transparent placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Button 3: Search Action */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0f2b5c] via-blue-800 to-[#dc2626] hover:from-[#dc2626] hover:to-[#0f2b5c] text-white font-display font-black text-xs uppercase py-4 px-4 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer tracking-wider"
              >
                <Search className="w-4 h-4" />
                <span>{t.search_btn}</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
