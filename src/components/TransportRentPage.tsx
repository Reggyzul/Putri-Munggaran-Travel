import React from 'react';
import { CARS } from '../data/cars';
import { Car } from '../types';
import { Users, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, Car as CarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../utils/translations';

interface TransportRentPageProps {
  onSelectCar: (car: Car) => void;
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function TransportRentPage({ onSelectCar, lang, onNavigateHome }: TransportRentPageProps) {
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const handleWhatsAppBooking = (car: Car) => {
    const waNumber = '6281321264200';
    const message = isEN
      ? `Hello Putri Munggaran Tour & Travel, I am interested in reserving: ${car.name}. Please inform rate quotes, schedule & unit availability. Thank you!`
      : `Halo Putri Munggaran Tour & Travel, saya berminat memesan armada: ${car.name}. Mohon informasi penawaran tarif, jadwal & ketersediaan armada. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <div className="bg-white text-[#0d1b37] min-h-screen pt-20 text-left">
      
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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600/90 text-white font-extrabold text-[10px] uppercase tracking-widest mb-1 shadow-md">
            <CarIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>PUTRI MUNGGARAN TOUR &amp; TRAVEL</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            {t.cars_title}
          </h1>

          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-emerald-400 cursor-pointer">{t.dest_breadcrumb_home}</span> / {t.nav_rentals}
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
          <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {t.cars_desc}
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARS.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#0d1b37]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <span>{car.seats} {t.cars_seats}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
                      {car.specifications?.[2]?.value || 'Pilihan Armada'}
                    </span>
                    <h3 className="font-display font-black text-xl text-[#0d1b37] uppercase group-hover:text-emerald-600 transition-colors">
                      {car.name}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                    {car.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                      {t.cars_included_label}
                    </span>
                    <ul className="space-y-1">
                      {car.includeList.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => onSelectCar(car)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-black text-xs uppercase py-2.5 rounded-full transition-all cursor-pointer"
                >
                  {isEN ? 'Reservation Draft' : 'Form Reservasi'}
                </button>
                <button
                  onClick={() => handleWhatsAppBooking(car)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase py-3 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{t.cars_book_btn}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note from section 7 */}
        <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-block bg-emerald-200 text-emerald-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">
            Informasi Tarif &amp; Ketersediaan
          </span>
          <p className="font-sans text-xs text-emerald-950 font-semibold leading-relaxed">
            {t.cars_note}
          </p>
        </div>

      </div>
    </div>
  );
}
