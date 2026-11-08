import React from 'react';
import { Car } from '../types';
import { Users, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteContent } from '../context/SiteContentContext';

interface CarListProps {
  onSelectCar: (car: Car) => void;
  lang: 'ID' | 'EN';
  onViewAllCars?: () => void;
}

export default function CarList({ onSelectCar, lang }: CarListProps) {
  const { content } = useSiteContent();
  const t = content.translations[lang];
  const isEN = lang === 'EN';

  const handleWhatsAppBooking = (car: Car) => {
    const waNumber = content.brand.whatsappNumber;
    const message = isEN
      ? `Hello ${content.brand.brandFirstName} ${content.brand.brandSecondName} ${content.brand.brandSubtitle}, I am interested in reserving vehicle: ${car.name}. Please inform price quote & schedule availability. Thank you!`
      : `Halo ${content.brand.brandFirstName} ${content.brand.brandSecondName} ${content.brand.brandSubtitle}, saya berminat sewa armada: ${car.name}. Mohon informasi penawaran harga & ketersediaan tanggal. Terima kasih!`;
    window.open(
      `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`,
      '_blank',
      'noreferrer'
    );
  };

  return (
    <section
      id="cars"
      className="py-20 bg-slate-50 text-[#0d1b37] overflow-hidden relative border-b border-slate-200 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-3" id="cars-heading">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.cars_tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0d1b37] tracking-tight leading-tight uppercase">
            {t.cars_title}
          </h2>

          <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full" />

          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl mx-auto">
            {t.cars_desc}
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.cars.map((car, index) => (
            <motion.div
              key={car.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Car Image Preview */}
                <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-2">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-slate-200/70 flex items-center justify-center text-slate-400 text-xs font-semibold">
                      Belum ada foto
                    </div>
                  )}

                  {/* Capacity Badge */}
                  <div className="absolute top-4 right-4 bg-[#0d1b37]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <span>
                      {car.seats} {t.cars_seats}
                    </span>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
                      {car.specifications?.[2]?.value || 'Pilihan Armada'}
                    </span>
                    <h3 className="font-display font-black text-xl text-[#0d1b37] group-hover:text-emerald-600 transition-colors uppercase">
                      {car.name}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                    {car.description}
                  </p>

                  {/* Price / Rate Box */}
                  <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                      {isEN ? 'Rate / Price' : 'Harga / Tarif'}
                    </span>
                    <span className="font-display font-black text-xs sm:text-sm text-emerald-700 text-right">
                      {car.priceDisplay ||
                        (car.pricePerDay > 0
                          ? `Rp ${car.pricePerDay.toLocaleString('id-ID')}`
                          : isEN
                          ? 'Contact Admin'
                          : 'Hubungi Admin')}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                      {t.cars_included_label}
                    </span>
                    <ul className="space-y-1">
                      {car.includeList.slice(0, 5).map((inc, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] font-semibold text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => onSelectCar(car)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-black text-xs uppercase py-2.5 rounded-full transition-all cursor-pointer"
                >
                  {isEN ? 'Reservation Draft' : 'Form Reservasi'}
                </button>
                <button
                  onClick={() => handleWhatsAppBooking(car)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase tracking-wider py-3 rounded-full shadow-sm hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{t.cars_book_btn}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs text-emerald-950 font-semibold leading-relaxed">
            {t.cars_note}
          </p>
        </div>
      </div>
    </section>
  );
}
