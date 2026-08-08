import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass, Globe, Star, MessageCircle, CheckCircle2, Sparkles, ChevronDown } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface ServicesProps {
  lang: 'ID' | 'EN';
  onViewAllDestinations?: () => void;
}

export default function Services({ lang, onViewAllDestinations }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'jabar' | 'jateng' | 'jatim' | 'bali'>('all');
  const t = TRANSLATIONS[lang];

  const handleWhatsAppBooking = (highlightTitle: string, categoryName: string) => {
    const waNumber = '628562042336';
    const message = `Halo Restu Tour & Transport, saya ingin berkonsultasi mengenai rute destinasi: ${highlightTitle} (${categoryName}). Mohon informasi ketersediaan armada, fasilitas & penawaran harga terbaik. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  const allDestinationHighlights = [
    // 1. WISATA JAWA BARAT
    {
      id: 'bandung-lembang',
      categoryKey: 'jabar',
      categoryName: 'Wisata Jawa Barat',
      title: 'Bandung & Lembang',
      subtitle: 'Udara Sejuk, Floating Market & Factory Outlet',
      badge: 'Jawa Barat',
      image: '/dest_bandung.avif',
      rating: 4.9,
      reviews: 185,
      spots: ['Lembang Floating Market & Farmhouse', 'Dusun Bambu & Orchid Forest', 'Kawah Putih Ciwidey & Rancabali', 'Gedung Sate, Asia Afrika & Shopping Outlet']
    },
    {
      id: 'pangandaran-bogor',
      categoryKey: 'jabar',
      categoryName: 'Wisata Jawa Barat',
      title: 'Pangandaran & Pelabuhan Ratu',
      subtitle: 'Wisata Pantai, Green Canyon & Bogor',
      badge: 'Pantai & Alam',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      reviews: 120,
      spots: ['Pantai Pangandaran & Candi Datar', 'Body Rafting Green Canyon', 'Wisata Pantai Pelabuhan Ratu Sukabumi', 'Kebun Raya Bogor & Puncak']
    },

    // 2. WISATA JAWA TENGAH & JOGJA
    {
      id: 'jogja-magelang',
      categoryKey: 'jateng',
      categoryName: 'Wisata Jawa Tengah & Jogja',
      title: 'Yogyakarta & Magelang',
      subtitle: 'Candi Borobudur, Prambanan & Malioboro',
      badge: 'Budaya & Sejarah',
      image: '/dest_jogja.avif',
      rating: 5.0,
      reviews: 210,
      spots: ['Candi Borobudur & Candi Prambanan', 'Jeep Lava Tour Merapi', 'Wisata Belanja & Kuliner Malioboro', 'Taman Sari & Keraton Yogyakarta']
    },
    {
      id: 'dieng-solo',
      categoryKey: 'jateng',
      categoryName: 'Wisata Jawa Tengah & Jogja',
      title: 'Dataran Tinggi Dieng & Solo',
      subtitle: 'Negeri di Atas Awan & Wisata Batik',
      badge: 'Jawa Tengah',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      reviews: 145,
      spots: ['Telaga Warna & Candi Arjuna Dieng', 'Sunrise Sikunir Dieng', 'Keraton Surakarta & Pasar Klewer Solo', 'Kota Tua Semarang & Lawang Sewu']
    },

    // 3. WISATA JAWA TIMUR & BROMO
    {
      id: 'bromo-malang',
      categoryKey: 'jatim',
      categoryName: 'Wisata Jawa Timur',
      title: 'Gunung Bromo & Batu Malang',
      subtitle: 'Sunrise Bromo & Museum Angkut',
      badge: 'Gunung & Alam',
      image: '/dest_bromo.avif',
      rating: 5.0,
      reviews: 230,
      spots: ['Penanjakan 1 Golden Sunrise Bromo', 'Jeep 4x4 Lautan Pasir & Bukit Teletubbies', 'Museum Angkut & Jatim Park 3 Batu', 'Kebun Apel Malang & Alun-alun Batu']
    },

    // 4. WISATA BALI EXOTIC
    {
      id: 'bali-exotic',
      categoryKey: 'bali',
      categoryName: 'Wisata Bali & Nusantara',
      title: 'Bali Paradise & Nusa Penida',
      subtitle: 'Pantai Kuta, Tanah Lot & Nusa Penida',
      badge: 'Pulau Dewata',
      image: '/dest_padang.avif',
      rating: 5.0,
      reviews: 260,
      spots: ['Kelingking Beach Nusa Penida', 'Pura Tanah Lot & Bedugul Ulun Danu', 'Pantai Kuta & Sunset Jimbaran Seafood', 'Garuda Wisnu Kencana (GWK)']
    }
  ];

  const filteredHighlights = allDestinationHighlights.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.categoryKey === activeCategory;
  });

  return (
    <section id="destinations" className="py-16 bg-slate-50 text-[#0d1b37] text-left border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-600 font-extrabold text-[10px] uppercase tracking-widest border border-red-200">
            <Compass className="w-3.5 h-3.5" />
            <span>DESTINASI & RUTE POPULER</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37] tracking-tight uppercase">
            Rute Wisata Pilihan Restu Tour & Transport
          </h2>

          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            Melayani perjalanan di Kota Bandung, Jawa Barat, Jawa Tengah, Jawa Timur, Bali, dan berbagai destinasi terbaik lainnya di Indonesia.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Semua Rute
          </button>
          <button
            onClick={() => setActiveCategory('jabar')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'jabar'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Jawa Barat
          </button>
          <button
            onClick={() => setActiveCategory('jateng')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'jateng'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Jawa Tengah & Jogja
          </button>
          <button
            onClick={() => setActiveCategory('jatim')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'jatim'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Jawa Timur & Bromo
          </button>
          <button
            onClick={() => setActiveCategory('bali')}
            className={`px-5 py-2.5 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'bali'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Bali & Nusantara
          </button>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHighlights.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 bg-slate-200 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    {dest.badge}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-[#0d1b37] group-hover:text-red-600 transition-colors uppercase">
                      {dest.title}
                    </h3>
                    <p className="font-sans text-xs text-red-500 font-bold mt-0.5">
                      {dest.subtitle}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Spot Utama Wisata:</span>
                    <ul className="space-y-1.5">
                      {dest.spots.map((spot, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
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
                  onClick={() => handleWhatsAppBooking(dest.title, dest.categoryName)}
                  className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-display font-extrabold text-xs uppercase py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Konsultasi Rute via WA</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {onViewAllDestinations && (
          <div className="text-center pt-4">
            <button
              onClick={onViewAllDestinations}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-display font-extrabold text-xs uppercase px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
            >
              <span>Lihat Selengkapnya</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
