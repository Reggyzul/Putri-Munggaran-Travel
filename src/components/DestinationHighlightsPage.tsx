import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, MessageCircle, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { PANGANDARAN_DESTINATIONS, DestinationItem } from './Destinations';

interface DestinationHighlightsPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function DestinationHighlightsPage({ lang, onNavigateHome }: DestinationHighlightsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pantai' | 'alam'>('all');
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const handleWhatsAppBooking = (destName: string) => {
    const waNumber = '6281321264200';
    const message = isEN
      ? `Hello Putri Munggaran Tour & Travel, I would like to consult on a trip to destination: ${destName}. Please provide price quote, route details & vehicle availability. Thank you!`
      : `Halo Putri Munggaran Tour & Travel, saya ingin berkonsultasi mengenai perjalanan wisata ke: ${destName}. Mohon informasi penawaran harga, rute perjalanan & ketersediaan armada. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  const filteredDestinations = PANGANDARAN_DESTINATIONS.filter((item) => {
    if (selectedFilter === 'pantai') {
      return item.id.includes('pantai') || item.id.includes('pasir-putih');
    }
    if (selectedFilter === 'alam') {
      return item.id.includes('green-canyon') || item.id.includes('citumang');
    }
    return true;
  });

  return (
    <div className="bg-white text-[#0d1b37] min-h-screen pt-20 text-left">
      
      {/* TOP HEADER BANNER */}
      <div className="relative w-full h-[230px] sm:h-[290px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

        <div className="relative z-10 text-center space-y-2 px-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-[10px] uppercase tracking-widest mb-1 shadow-md">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>DESTINASI WISATA PANGANDARAN</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            {isEN ? 'Pangandaran Top Destinations' : 'Destinasi Wisata Pilihan'}
          </h1>

          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-red-400 cursor-pointer">{t.dest_breadcrumb_home}</span> / {isEN ? 'DESTINATIONS' : 'DESTINASI WISATA'}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Page Description */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37]">
            {isEN ? 'Explore 6 Premier Attractions in Pangandaran' : '6 Destinasi Wisata Favorit & Populer di Pangandaran'}
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {isEN
              ? 'Enjoy seamless, safe, and comfortable door-to-door transport to all prominent beaches and nature attractions in Pangandaran.'
              : 'Nikmati perjalanan liburan yang aman, nyaman, dan praktis bersama Putri Munggaran Tour & Travel langsung dari rumah Anda menuju destinasi wisata impian.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {isEN ? 'All 6 Destinations' : 'Semua 6 Destinasi'}
          </button>
          <button
            onClick={() => setSelectedFilter('pantai')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              selectedFilter === 'pantai'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {isEN ? 'Beach Destinations' : 'Wisata Pantai'}
          </button>
          <button
            onClick={() => setSelectedFilter('alam')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              selectedFilter === 'alam'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {isEN ? 'Nature & River Rafting' : 'Wisata Alam & Rafting'}
          </button>
        </div>

        {/* 6 Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => {
            const name = isEN ? dest.nameEN : dest.name;
            const tagline = isEN ? dest.taglineEN : dest.tagline;
            const description = isEN ? dest.descriptionEN : dest.description;
            const badge = isEN ? dest.badgeEN : dest.badge;
            const highlights = isEN ? dest.highlightsEN : dest.highlights;

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                      {badge}
                    </div>
                    <div className="absolute top-4 right-4 bg-red-600 text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                      0{idx + 1}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display font-black text-xl text-[#0d1b37] group-hover:text-red-600 transition-colors uppercase">
                        {name}
                      </h3>
                      <p className="font-sans text-xs text-red-600 font-bold mt-0.5">
                        {tagline}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                      {description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                        {isEN ? 'Destination Highlights:' : 'Daya Tarik & Aktivitas:'}
                      </span>
                      <ul className="space-y-1.5">
                        {highlights.map((spot, spotIdx) => (
                          <li key={spotIdx} className="flex items-start gap-2 text-[11px] font-semibold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{spot}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleWhatsAppBooking(name)}
                    className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-display font-extrabold text-xs uppercase py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isEN ? 'Consult Trip via WA' : 'Konsultasi Perjalanan via WA'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0f2b5c] via-blue-900 to-[#0b1736] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full inline-block">
              DOOR-TO-DOOR TRIP PANGANDARAN
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase">
              {isEN ? 'Plan Your Pangandaran Tour With Us' : 'Ingin Mengunjungi Destinasi di Atas?'}
            </h3>
            <p className="font-sans text-xs text-slate-300 max-w-xl">
              {isEN 
                ? 'We pick you up from your doorstep in Bandung, Jabodetabek, or Pangandaran and take you directly to your chosen destinations.' 
                : 'Kami siap menjemput Anda langsung dari rumah di Bandung, Jabodetabek, atau Pangandaran dan mengantar ke seluruh destinasi wisata favorit.'}
            </p>
          </div>
          <button
            onClick={() => handleWhatsAppBooking('Paket Wisata Pangandaran Lengkap')}
            className="bg-red-600 hover:bg-red-700 text-white font-display font-black text-xs uppercase px-6 py-3.5 rounded-2xl shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{isEN ? 'Book via WhatsApp' : 'Hubungi WhatsApp'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
