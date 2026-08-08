import React, { useState } from 'react';
import { CARS } from '../data/cars';
import { Car } from '../types';
import { Users, CheckCircle2, MessageCircle, Bus, Sparkles, Layers, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../utils/translations';
import BusModal from './BusModal';

interface CarListProps {
  onSelectCar: (car: Car) => void;
  lang: 'ID' | 'EN';
  onViewAllCars?: () => void;
}

export default function CarList({ onSelectCar, lang, onViewAllCars }: CarListProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const categories = [
    { id: 'all', label: lang === 'EN' ? 'All Fleets' : 'Semua Armada' },
    { id: 'cat1', label: lang === 'EN' ? 'Car Rental' : 'Sewa Mobil' },
    { id: 'cat2', label: lang === 'EN' ? 'Tourism Bus Rental' : 'Sewa Bus Pariwisata' }
  ];

  const filteredCars = CARS.filter(car => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'cat1') return car.category === 'Car Rental' || car.category === 'Sewa Mobil';
    if (filterCategory === 'cat2') return car.category === 'Tourism Bus Rental' || car.category === 'Sewa Bus Pariwisata';
    return true;
  });

  // Display 1 single row (3 cards) on landing page
  const displayedCars = filteredCars.slice(0, 3);

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
    const message = lang === 'EN'
      ? `Hello Restu Tour & Transport, I am interested in renting: ${car.name}. Please inform price quote & date availability. Thank you!`
      : `Halo Restu Tour & Transport, saya berminat sewa armada: ${car.name}. Mohon informasi penawaran harga & ketersediaan tanggal. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <section id="cars" className="py-20 bg-slate-50 text-[#0d1b37] overflow-hidden relative border-b border-slate-200 text-left">
      {/* Bus Popup Modal */}
      <BusModal isOpen={isBusModalOpen} onClose={() => setIsBusModalOpen(false)} lang={lang} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-3" id="cars-heading">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0d1b37] tracking-tight leading-tight uppercase">
            {lang === 'EN' ? 'Restu Tour & Transport Fleet Catalog' : 'Katalog Armada Restu Tour & Transport'}
          </h2>

          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />

          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl mx-auto">
            {lang === 'EN' 
              ? 'Clean, Comfortable, Well-Maintained Fleets with Professional Licensed Drivers and Trusted Service.' 
              : 'Armada Bersih, Nyaman, Terawat dengan Sopir Profesional dan Pelayanan Terpercaya.'}
          </p>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full font-display font-extrabold text-xs transition-all cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid (1 Single Row - 3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCars.map((car) => {
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
                        ? (lang === 'EN' ? 'Tourism Bus Rental' : 'Sewa Bus Pariwisata') 
                        : (lang === 'EN' ? 'Car Rental' : 'Sewa Mobil')}
                    </div>

                    {isBus && (
                      <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        <span>{lang === 'EN' ? 'Click for 4 Bus Types & Details' : 'Klik untuk Detail 4 Tipe Bus'}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4 text-left">
                    <div>
                      <h3 className="font-display font-black text-xl text-[#0d1b37] tracking-tight group-hover:text-red-600 transition-colors uppercase">
                        {isBus ? (lang === 'EN' ? 'Tourism Bus Rental' : 'Sewa Bus Pariwisata') : car.name}
                      </h3>
                      <p className="font-sans text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                        {car.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-700 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Users className="w-4 h-4 text-red-600" />
                        <span>{isBus ? '18 - 59 Seats' : `${car.seats} ${lang === 'EN' ? 'Seats' : 'Kursi'}`}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Bus className="w-4 h-4 text-red-600" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                        {isBus 
                          ? (lang === 'EN' ? 'Tourism Bus Categories:' : 'Pilihan Tipe Bus Pariwisata:') 
                          : (lang === 'EN' ? 'Key Amenities:' : 'Fasilitas Utama:')}
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
                        ? (lang === 'EN' ? 'View 4 Bus Types & Details' : 'Lihat 4 Tipe Bus & Detail') 
                        : (lang === 'EN' ? 'Book Vehicle Service' : 'Pesan Layanan Armada')}
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
                        ? (lang === 'EN' ? 'View Bus Type Details' : 'Lihat Detail Tipe Bus') 
                        : (lang === 'EN' ? 'Consult via WA' : 'Konsultasi WA')}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Fleet Trigger (Text Above Down Arrow, No Circle) */}
        {onViewAllCars && (
          <div className="mt-12 text-center flex flex-col items-center justify-center">
            <button
              onClick={onViewAllCars}
              className="group flex flex-col items-center justify-center gap-1.5 cursor-pointer text-slate-700 hover:text-red-600 transition-colors py-2"
            >
              <span className="font-display font-black text-xs uppercase tracking-widest text-slate-800 group-hover:text-red-600 transition-colors">
                {lang === 'ID' ? 'Selengkapnya' : 'See More'}
              </span>
              <ChevronDown className="w-6 h-6 text-red-600 animate-bounce group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
