import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOUR_PACKAGES, TourPackage, TourTier } from '../data/packages';
import { MapPin, Calendar, Bus, ArrowRight, X, MessageCircle, CheckCircle2, Globe, Plane } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface PackageTourPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome?: () => void;
}

export default function PackageTourPage({ lang, onNavigateHome }: PackageTourPageProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'domestik' | 'internasional'>('all');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [selectedTier, setSelectedTier] = useState<TourTier | null>(null);
  const t = TRANSLATIONS[lang];

  const handleOpenModal = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setSelectedTier(pkg.tiers[0]);
  };

  const handleCloseModal = () => {
    setSelectedPackage(null);
    setSelectedTier(null);
  };

  React.useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPackage]);

  const handleWhatsAppBooking = (pkg: TourPackage, tier: TourTier) => {
    const waNumber = '628562042336';
    const message = `Halo Restu Tour & Transport, saya ingin berkonsultasi mengenai reservasi paket tour:\n\nPaket Tour: ${pkg.title} (${pkg.duration})\nPilihan Armada: ${tier.busType} (${tier.capacity})\nBiaya: ${tier.pricePerPerson}/org\nFasilitas Akomodasi: ${tier.hotelDetails}\nRute Perjalanan: ${pkg.routeDisplay}\n\nMohon informasi ketersediaan jadwal & mekanisme reservasi. Terima kasih.`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (activeCategory === 'all') return true;
    return pkg.categoryKey === activeCategory;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md relative overflow-hidden mb-10">
        <div className="max-w-6xl mx-auto text-center space-y-3 relative z-10">
          <span className="inline-block bg-white/10 px-3 py-1 rounded-full border border-white/20 text-[11px] font-bold uppercase tracking-widest text-red-200">
            {t.pkg_tag}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
            {t.pkg_title}
          </h1>
          <p className="font-sans text-white/90 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            {t.pkg_subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* CATEGORY SELECTOR TABS BAR (Dalam Negeri vs Luar Negeri) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-md max-w-3xl mx-auto text-center space-y-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block">
              {t.pkg_filter_heading}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`py-3 px-4 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>{t.pkg_filter_all}</span>
            </button>

            <button
              onClick={() => setActiveCategory('domestik')}
              className={`py-3 px-4 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeCategory === 'domestik'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0 text-red-500" />
              <span>{t.pkg_filter_domestik}</span>
            </button>

            <button
              onClick={() => setActiveCategory('internasional')}
              className={`py-3 px-4 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeCategory === 'internasional'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Plane className="w-4 h-4 shrink-0 text-blue-500" />
              <span>{t.pkg_filter_internasional}</span>
            </button>
          </div>
        </div>
        
        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md shadow-sm">
                    {pkg.badge}
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border border-slate-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-red-400" />
                    <span>{pkg.duration}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-display font-black text-lg tracking-tight uppercase leading-snug">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3.5 text-left">
                  {/* Route Summary */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {t.pkg_route_label}
                    </span>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      {pkg.routeDisplay}
                    </p>
                  </div>

                  {/* Pricing Tiers Preview */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.pkg_starting_from}</span>
                      <span className="font-display font-black text-base text-red-600">
                        {pkg.minPrice} <span className="text-[10px] font-normal text-slate-500">{t.pkg_per_person}</span>
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      Eksekutif &amp; VIP
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenModal(pkg)}
                  className="w-full bg-slate-900 hover:bg-red-600 text-white font-display font-bold text-xs uppercase py-3 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.pkg_detail_btn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PRECISE & PROFESSIONAL DETAIL MODAL */}
      <AnimatePresence>
        {selectedPackage && selectedTier && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-24 sm:pt-28 pb-6 px-3 sm:px-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-0"
            />

            {/* Modal Precision Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 text-left max-h-[calc(100vh-8.5rem)] flex flex-col my-auto"
            >
              {/* Header */}
              <div className="relative bg-slate-900 text-white p-4 sm:p-5 shrink-0 border-b border-slate-800 z-20">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all flex items-center justify-center shadow-xl cursor-pointer z-50 hover:scale-110 border-2 border-white"
                  title="Tutup Modal (Kembali)"
                  id="close-tour-modal"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>

                <div className="space-y-1.5 pr-14">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded shadow-xs">
                      {t.pkg_modal_duration}: {selectedPackage.duration}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300">
                      {t.pkg_route_label}: {selectedPackage.routeDisplay}
                    </span>
                  </div>
                  <h2 className="font-display font-black text-base sm:text-xl uppercase tracking-tight text-white leading-tight pt-0.5">
                    {selectedPackage.title}
                  </h2>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-slate-800 text-xs">
                
                {/* 1. TIER SELECTION CARDS */}
                <div>
                  <h3 className="font-display font-bold text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                    {t.pkg_modal_tier_title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedPackage.tiers.map((tier, idx) => {
                      const isSelected = selectedTier.busType === tier.busType;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedTier(tier)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-red-600 bg-red-50/50 shadow-xs ring-1 ring-red-600'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-display font-extrabold text-xs sm:text-sm text-slate-900">
                                  {tier.busType}
                                </h4>
                                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                                  {tier.capacity}
                                </span>
                              </div>
                              {isSelected && (
                                <span className="text-[9px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                                  {t.pkg_modal_selected}
                                </span>
                              )}
                            </div>

                            <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-700">
                              <span className="font-bold text-slate-900 block">{t.pkg_modal_hotel}:</span>
                              <span>{tier.hotelDetails}</span>
                            </div>

                            <div className="text-[10px] text-slate-500 bg-slate-100/80 p-1.5 rounded border border-slate-200/60">
                              <span className="font-bold text-slate-700">{t.pkg_modal_notes}:</span> {tier.notes}
                            </div>
                          </div>

                          <div className="mt-2.5 pt-1.5 border-t border-slate-200/80 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">{t.pkg_starting_from}</span>
                            <span className="font-display font-black text-xs sm:text-sm text-red-600">
                              {tier.pricePerPerson} <span className="text-[9px] font-normal text-slate-500">{t.pkg_per_person}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. HIGHLIGHTS & DESTINASI */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-display font-bold text-[11px] uppercase tracking-wider text-slate-700">
                    {t.pkg_modal_highlights}
                  </h4>
                  <ul className="space-y-1 text-slate-700 text-[11px] font-medium">
                    {selectedPackage.highlights.map((spot, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                        <span>{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. INCLUDES & EXCLUDES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  {/* Includes */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <h5 className="font-display font-bold text-[11px] uppercase tracking-wide text-slate-800">
                      {t.pkg_modal_includes}
                    </h5>
                    <ul className="space-y-0.5 text-slate-600 font-medium">
                      {selectedPackage.includes.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excludes */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <h5 className="font-display font-bold text-[11px] uppercase tracking-wide text-slate-800">
                      {t.pkg_modal_excludes}
                    </h5>
                    <ul className="space-y-0.5 text-slate-600 font-medium">
                      {selectedPackage.excludes.map((exc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Sticky Footer */}
              <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex items-center justify-between gap-3 border-t border-slate-800 shrink-0 z-20">
                <div className="min-w-0">
                  <span className="text-[9px] text-slate-400 block font-medium uppercase tracking-wider">{t.pkg_modal_selected}:</span>
                  <span className="font-display font-bold text-xs text-white truncate block">
                    {selectedTier.busType} — <span className="text-red-400">{selectedTier.pricePerPerson}{t.pkg_per_person}</span>
                  </span>
                </div>

                <button
                  onClick={() => handleWhatsAppBooking(selectedPackage, selectedTier)}
                  className="bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs uppercase py-2.5 px-4 sm:px-5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t.pkg_modal_wa_btn}</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
