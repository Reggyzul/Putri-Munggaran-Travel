import React, { useState } from 'react';
import { CARS } from '../data/cars';
import { Car } from '../types';
import { Users, CheckCircle2, MessageCircle, Bus, Sparkles, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../utils/translations';
import BusModal from './BusModal';

interface TransportRentPageProps {
  onSelectCar: (car: Car) => void;
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function TransportRentPage({ onSelectCar, lang, onNavigateHome }: TransportRentPageProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const categories = [
    { id: 'all', label: isEN ? 'All Fleets' : 'Semua Armada' },
    { id: 'cat1', label: isEN ? 'Car Rental' : 'Sewa Mobil' },
    { id: 'cat2', label: isEN ? 'Tourism Bus Rental' : 'Sewa Bus Pariwisata' }
  ];

  const filteredCars = CARS.filter(car => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'cat1') return car.category === 'Car Rental' || car.category === 'Sewa Mobil';
    if (filterCategory === 'cat2') return car.category === 'Tourism Bus Rental' || car.category === 'Sewa Bus Pariwisata';
    return true;
  });

  const handleCardClick = (car: Car) => {
    if (car.id === 'sewa-bus-pariwisata') {
      setIsBusModalOpen(true);
    } else {
      onSelectCar(car);
    }
  };

  const handleWhatsAppBooking = (car: Car) => {
    if (car.id === 'sewa-bus-pariwisata') {
      setIsBusModalOpen(true);
      return;
    }
    const waNumber = '628562042336';
    const message = isEN
      ? `Hello Restu Tour & Transport, I am interested in renting: ${car.name}. Please inform price quote, schedule & unit availability. Thank you!`
      : `Halo Restu Tour & Transport, saya berminat sewa armada: ${car.name}. Mohon informasi penawaran harga, jadwal & ketersediaan unit. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <div className="bg-white text-[#0d1b37] min-h-screen pt-20 text-left">
      {/* Bus Popup Modal */}
      <BusModal isOpen={isBusModalOpen} onClose={() => setIsBusModalOpen(false)} lang={lang} />

      {/* TOP HEADER BANNER */}
      <div className="relative w-full h-[230px] sm:h-[290px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

        <div className="relative z-10 text-center space-y-2 px-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-[10px] uppercase tracking-widest mb-1 shadow-md">
            <Bus className="w-3.5 h-3.5 text-red-300" />
            <span>RESTU TOUR &amp; TRANSPORTATION</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            {t.cars_title}
          </h1>

          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-red-400 cursor-pointer">{t.dest_breadcrumb_home}</span> / {t.nav_rentals}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Page Description */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37]">
            {t.cars_title}
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {t.cars_desc}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-5 py-3 rounded-2xl font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-[#dc2626] text-white shadow-lg shadow-red-600/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => {
            const isBus = car.id === 'sewa-bus-pariwisata';

            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => handleCardClick(car)}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isBus 
                    ? 'border-red-500 ring-2 ring-red-500/30 shadow-xl hover:shadow-2xl hover:scale-[1.02]' 
                    : 'border-slate-200/90 shadow-md hover:shadow-2xl'
                }`}
              >
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                      {isBus 
                        ? (isEN ? 'Tourism Bus Rental' : 'Sewa Bus Pariwisata') 
                        : (isEN ? 'Car Rental' : 'Sewa Mobil')}
                    </div>

                    {isBus && (
                      <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        <span>{isEN ? 'Click for 4 Bus Types & Details' : 'Klik untuk Detail 4 Tipe Bus'}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4 text-left">
                    <div>
                      <h3 className="font-display font-black text-xl text-[#0d1b37] tracking-tight group-hover:text-red-600 transition-colors uppercase">
                        {isBus ? (isEN ? 'Tourism Bus Rental' : 'Sewa Bus Pariwisata') : car.name}
                      </h3>
                      <p className="font-sans text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                        {car.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-700 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Users className="w-4 h-4 text-red-600" />
                        <span>{isBus ? '18 - 59 Seats' : `${car.seats} ${isEN ? 'Seats' : 'Kursi'}`}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Bus className="w-4 h-4 text-red-600" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                        {isBus 
                          ? (isEN ? 'Tourism Bus Categories:' : 'Pilihan Tipe Bus Pariwisata:') 
                          : t.cars_included_label}
                      </span>
                      <ul className="space-y-1">
                        {car.includeList.map((inc, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(car);
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-display font-black text-xs uppercase py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 tracking-wider"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {isBus 
                        ? (isEN ? 'View 4 Bus Types & Details' : 'Lihat 4 Tipe Bus & Detail') 
                        : (isEN ? 'Book Vehicle Service' : 'Pesan Layanan Armada')}
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppBooking(car);
                    }}
                    className="w-full bg-[#0f2b5c] hover:bg-[#0a1c3f] text-white font-display font-black text-xs uppercase py-3 rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {isBus 
                        ? (isEN ? 'View Bus Type Details' : 'Lihat Detail Tipe Bus') 
                        : (isEN ? 'Consult via WA' : 'Konsultasi WA')}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
