import React from 'react';
import { Compass, Clock, MapPin, MessageSquare } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { motion } from 'motion/react';

interface ToursListProps {
  lang: 'ID' | 'EN';
}

export default function ToursList({ lang }: ToursListProps) {
  const t = TRANSLATIONS[lang];

  const tourPackages = [
    {
      id: 'tour-bromo',
      title: lang === 'EN' ? '3D2N Malang Batu Bromo' : '3D2N Malang Batu Bromo',
      duration: lang === 'EN' ? '3 Days 2 Nights' : '3 Hari 2 Malam (3D2N)',
      location: 'Malang, Batu, Bromo',
      price: 'Mulai Rp 4.600.000',
      description: lang === 'EN' 
        ? 'Best private family trip package covering Mount Bromo sunrise, Batu attractions, and Malang city highlights.'
        : 'Paket trip keluarga terbaik meliputi sunrise Gunung Bromo, objek wisata Batu, dan ikon Kota Malang.',
      image: '/tours_bromo.avif',
      waMessage: 'Halo Yoga Transport, saya tertarik memesan paket wisata 3D2N Malang Batu Bromo. Mohon info detailnya.'
    },
    {
      id: 'tour-city',
      title: lang === 'EN' ? 'City Tour Malang & Batu' : 'City Tour Malang & Batu',
      duration: lang === 'EN' ? '1 Day Tour' : '1 Hari Penuh (1 Day)',
      location: 'Malang & Batu',
      price: 'Mulai Rp 1.500.000',
      description: lang === 'EN'
        ? 'Flexible private city tour guide around Batu city, theme parks (Jatim Park), and local Malang culinary spots.'
        : 'Panduan wisata kota fleksibel keliling kota Batu, theme park (Jatim Park), dan wisata kuliner Malang.',
      image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600',
      waMessage: 'Halo Yoga Transport, saya tertarik memesan paket City Tour Malang & Batu. Mohon info ketersediaannya.'
    },
    {
      id: 'tour-shuttle',
      title: lang === 'EN' ? 'Shuttle & Drop Juanda Airport' : 'Shuttle & Drop Bandara Juanda',
      duration: lang === 'EN' ? 'One Way' : 'Sekali Jalan',
      location: 'Surabaya / Malang',
      price: 'Mulai Rp 750.000',
      description: lang === 'EN'
        ? 'Punctual private pickup or drop off shuttle service from Malang to Surabaya Juanda Airport.'
        : 'Layanan antar-jemput privat tepat waktu dari Malang ke Bandara Juanda Surabaya atau sebaliknya.',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
      waMessage: 'Halo Yoga Transport, saya ingin memesan layanan Drop Bandara Juanda. Mohon konfirmasi tarifnya.'
    }
  ];

  const handleWhatsApp = (msg: string) => {
    const waNumber = '6282178284459';
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(msg)}`, '_blank', 'noreferrer');
  };

  return (
    <section id="tours-view" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-display font-bold text-sm text-luxury-gold tracking-widest uppercase">
            OUR PACKAGES
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight uppercase">
            Popular Tour Packages
          </h2>
          <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed">
            {lang === 'EN' 
              ? 'Choose our curated premium tour and travel packages for your holiday in East Java.'
              : 'Pilih berbagai paket wisata premium pilihan kami untuk liburan terbaik Anda di Jawa Timur.'}
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((pkg) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              key={pkg.id}
              className="bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group overflow-hidden"
            >
              {/* Image & Price Overlay */}
              <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Price Overlay Badge on Right */}
                <div className="absolute top-4 right-0 bg-[#2563eb] text-white px-4 py-1.5 rounded-l-full rounded-r-none font-display font-bold text-xs shadow-md">
                  {pkg.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow space-y-4 text-left">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-gray-900 group-hover:text-luxury-gold transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Info Spec Row */}
                <div className="flex gap-4 text-gray-500 text-xs py-2 border-t border-b border-gray-50">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{pkg.location}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 mt-auto flex items-center gap-3">
                  <button
                    onClick={() => handleWhatsApp(pkg.waMessage)}
                    className="flex-grow bg-[#2563eb] hover:bg-blue-700 text-white font-display font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer text-center"
                  >
                    {lang === 'EN' ? 'View Details' : 'Pesan Paket'}
                  </button>
                  
                  {/* WhatsApp Direct Green button next to it */}
                  <button
                    onClick={() => handleWhatsApp(pkg.waMessage)}
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-sm shrink-0"
                    title="Pesan via WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
