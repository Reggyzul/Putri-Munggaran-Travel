import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface DestinationHighlightsPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function DestinationHighlightsPage({
  lang,
  onNavigateHome
}: DestinationHighlightsPageProps) {
  const { content } = useSiteContent();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pantai' | 'alam'>('all');
  const t = content.translations[lang];
  const isEN = lang === 'EN';

  const handleWhatsAppBooking = (destName: string) => {
    const waNumber = content.brand.whatsappNumber;
    const message = isEN
      ? `Hello ${content.brand.brandFirstName} ${content.brand.brandSecondName}, I would like to consult on a trip to destination: ${destName}. Please provide price quote, route details & vehicle availability. Thank you!`
      : `Halo ${content.brand.brandFirstName} ${content.brand.brandSecondName}, saya ingin berkonsultasi mengenai perjalanan wisata ke: ${destName}. Mohon informasi penawaran harga, rute perjalanan & ketersediaan armada. Terima kasih!`;
    window.open(
      `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`,
      '_blank',
      'noreferrer'
    );
  };

  const filteredDestinations = content.destinations.filter((item) => {
    const cat =
      item.category ||
      (item.id.includes('green-canyon') || item.id.includes('citumang') ? 'alam' : 'pantai');
    if (selectedFilter === 'pantai') {
      return cat === 'pantai';
    }
    if (selectedFilter === 'alam') {
      return cat === 'alam';
    }
    return true;
  });

  return (
    <div className="bg-white text-[#0d1b37] min-h-screen pt-20 text-left">
      {/* TOP HEADER BANNER */}
      <div className="relative w-full h-[230px] sm:h-[290px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        {content.banners.destinationsBannerImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
            style={{
              backgroundImage: `url('${content.banners.destinationsBannerImage}')`
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

        <div className="relative z-10 text-center space-y-2 px-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600/90 text-white font-extrabold text-[10px] uppercase tracking-widest mb-1 shadow-md">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {isEN
                ? content.banners.destinationsBannerBadgeEN
                : content.banners.destinationsBannerBadgeID}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            {t.dest_title}
          </h1>

          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-emerald-400 cursor-pointer">
              {t.dest_breadcrumb_home}
            </span>{' '}
            / {t.nav_destinations}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Page Description */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37]">
            {isEN
              ? content.banners.destinationsPageSubtitleEN
              : content.banners.destinationsPageSubtitleID}
          </h2>
          <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {t.dest_desc}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {isEN
              ? `All ${content.destinations.length} Destinations`
              : `Semua ${content.destinations.length} Destinasi`}
          </button>
          <button
            onClick={() => setSelectedFilter('pantai')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              selectedFilter === 'pantai'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {isEN ? 'Beach Destinations' : 'Wisata Pantai'}
          </button>
          <button
            onClick={() => setSelectedFilter('alam')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              selectedFilter === 'alam'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {isEN ? 'Nature & River Rafting' : 'Wisata Alam & Rafting'}
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => {
            const name = isEN ? dest.nameEN : dest.name;
            const tagline = isEN ? dest.taglineEN : dest.tagline;
            const description = isEN ? dest.descriptionEN : dest.description;
            const badge = isEN ? dest.badgeEN : dest.badge;
            const highlights = isEN ? dest.highlightsEN : dest.highlights;

            return (
              <motion.div
                key={dest.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    {dest.image ? (
                      <img
                        src={dest.image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200/70 flex items-center justify-center text-slate-400 text-xs font-semibold">
                        Belum ada foto
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                      {badge}
                    </div>
                    <div className="absolute top-4 right-4 bg-emerald-600 text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display font-black text-xl text-[#0d1b37] group-hover:text-emerald-600 transition-colors uppercase">
                        {name}
                      </h3>
                      <p className="font-sans text-xs text-emerald-700 font-bold mt-0.5">
                        {tagline}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                      {description}
                    </p>

                    {/* Price / Rate Box */}
                    <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                        {isEN ? 'Package / Trip Rate' : 'Harga / Paket Wisata'}
                      </span>
                      <span className="font-display font-black text-xs sm:text-sm text-emerald-700 text-right">
                        {(isEN ? dest.priceDisplayEN || dest.priceDisplay : dest.priceDisplay) ||
                          (isEN ? 'Contact Admin' : 'Hubungi Admin')}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                        {isEN ? 'Destination Highlights:' : 'Daya Tarik & Aktivitas:'}
                      </span>
                      <ul className="space-y-1.5">
                        {highlights.map((spot, spotIdx) => (
                          <li
                            key={spotIdx}
                            className="flex items-start gap-2 text-[11px] font-semibold text-slate-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
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
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase py-3.5 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{t.dest_wa_consult}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0b1736] via-[#0d2847] to-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full inline-block">
              {content.banners.destinationsCalloutBadge}
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase">
              {isEN
                ? content.banners.destinationsCalloutTitleEN
                : content.banners.destinationsCalloutTitleID}
            </h3>
            <p className="font-sans text-xs text-slate-300 max-w-xl">
              {isEN
                ? content.banners.destinationsCalloutDescEN
                : content.banners.destinationsCalloutDescID}
            </p>
          </div>
          <button
            onClick={() => handleWhatsAppBooking('Paket Wisata Pangandaran Lengkap')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase px-7 py-3.5 rounded-full shadow-md shrink-0 flex items-center gap-2 cursor-pointer transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{isEN ? 'Book via WhatsApp' : 'Hubungi WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
