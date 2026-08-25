import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, X, MapPin, Users, Globe, Eye, ZoomIn } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface GalleryPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function GalleryPage({ lang, onNavigateHome }: GalleryPageProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<{ image: string; title: string; subtitle: string; location: string } | null>(null);

  const t = TRANSLATIONS[lang];

  const galleryItems = [
    {
      id: 1,
      title: 'Tour Silaturahmi Sipiso-Piso & Danau Toba',
      subtitle: 'Keluarga Besar Sepakat bersama Restu Tour & Transport',
      location: 'Air Terjun Sipiso-Piso, Danau Toba, Sumatera Utara',
      image: '/gallery_sipisopiso.avif',
      badge: 'Danau Toba & Sipiso-Piso'
    },
    {
      id: 2,
      title: 'Tour Monumen Kapal Apung W.K.B Banda Aceh',
      subtitle: 'Kunjungan Wisata Sejarah & Edukasi Tsunami Aceh',
      location: 'Monumen Kapal Apung PLN, Banda Aceh',
      image: '/gallery_kapal_apung.avif',
      badge: 'Banda Aceh Tour'
    },
    {
      id: 3,
      title: 'Wisata Keagamaan Masjid Raya Baiturrahman',
      subtitle: 'Momentum Kebersamaan Peserta Tour Aceh Restu Tour & Transport',
      location: 'Masjid Raya Baiturrahman, Banda Aceh',
      image: '/gallery_baiturrahman.avif',
      badge: 'Masjid Baiturrahman'
    },
    {
      id: 4,
      title: 'Tour Silaturahmi Senggigi View Lombok',
      subtitle: 'Peserta Tour Nusantara di Spot Ikonik Senggigi',
      location: 'Senggigi View Beach, Lombok, NTB',
      image: '/gallery_senggigi.avif',
      badge: 'Senggigi Lombok'
    },
    {
      id: 5,
      title: 'Tour Silaturahmi Candi Prambanan Jogja',
      subtitle: 'Keluarga Besar Sepakat Jelajah Heritage Nusantara',
      location: 'Kompleks Candi Prambanan, DI Yogyakarta',
      image: '/gallery_prambanan.avif',
      badge: 'Candi Prambanan Jogja'
    },
    {
      id: 6,
      title: 'Tour Tugu Kilometer 0 Indonesia Sabang',
      subtitle: 'Titik Ujung Barat Indonesia bersama Rombongan Keluarga Besar Sepakat',
      location: 'Tugu Kilometer 0 Indonesia, Sabang, Aceh',
      image: '/gallery_sabang.avif',
      badge: 'Sabang Kilometer 0'
    },
    {
      id: 7,
      title: 'Tour Wisata Keagamaan Masjid Istiqlal Jakarta',
      subtitle: 'Kunjungan Rombongan Peserta Wisata di Masjid Istiqlal',
      location: 'Masjid Istiqlal, DKI Jakarta',
      image: '/gallery_istiqlal.avif',
      badge: 'Istiqlal Jakarta'
    },
    {
      id: 8,
      title: 'Tour Internasional Petronas Twin Towers',
      subtitle: 'Kunjungan Wisata Mancanegara Kuala Lumpur Malaysia',
      location: 'Petronas Twin Towers, Kuala Lumpur, Malaysia',
      image: '/gallery_petronas.avif',
      badge: 'Kuala Lumpur Malaysia'
    },
    {
      id: 9,
      title: 'Tour Mancanegara Bangkok & Thailand',
      subtitle: 'Peserta MT. Sakinah Warahmah BMKT Padang Panjang di Patung Sleeping Buddha',
      location: 'Bangkok & Hat Yai, Thailand',
      image: '/gallery_thailand.avif',
      badge: 'Thailand Tour'
    },
    {
      id: 10,
      title: 'Tour HeHa Sky View & Jogja bersama Bus Zivanes',
      subtitle: 'Kebersamaan Rombongan Restu Tour & Transport & Team Zivanes Bus',
      location: 'HeHa Sky View, Gunungkidul, Yogyakarta',
      image: '/gallery_heha.avif',
      badge: 'HeHa Jogja Tour'
    },
    {
      id: 11,
      title: 'Tour Jeep Offroad Gunung Bromo & Pasir Berbisik',
      subtitle: 'Petualangan Seru Peserta Rombongan Restu Tour & Transport di Bromo',
      location: 'Kawasan Wisata Gunung Bromo, Jawa Timur',
      image: '/gallery_bromo.avif',
      badge: 'Bromo Offroad'
    },
    {
      id: 12,
      title: 'Tour Silaturahmi Jam Gadang Bukittinggi',
      subtitle: 'Keluarga Besar Bagindo bersama Team Restu Tour & Transport',
      location: 'Taman Jam Gadang, Bukittinggi, Sumatera Barat',
      image: '/gallery_jam_gadang.avif',
      badge: 'Jam Gadang Bukittinggi'
    }
  ];

  return (
    <div className="bg-slate-50 text-[#0d1b37] min-h-screen pt-20 text-left">
      
      {/* 1. TOP HEADER BANNER (Bayu Buana Style Header with Real Tour Photo Background) */}
      <div className="relative w-full h-[250px] sm:h-[320px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/gallery_sipisopiso.avif')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/95" />

        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/90 text-white font-extrabold text-[11px] uppercase tracking-widest mb-1 shadow-lg"
          >
            <Camera className="w-4 h-4 text-red-300" />
            <span>GALERI DOKUMENTASI PERJALANAN PUTRI MUNGGARAN TOUR &amp; TRAVEL</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase drop-shadow-lg"
          >
            Moment & Tour Gallery
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-widest"
          >
            <span onClick={onNavigateHome} className="hover:text-red-400 cursor-pointer transition-colors">HOME</span> / GALLERY DOKUMENTASI
          </motion.p>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Subtitle Description */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37]">
            Dokumentasi Perjalanan &amp; Travel
          </h2>
          <div className="w-20 h-1 bg-[#dc2626] mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            Kumpulan momen kebersamaan dan kenangan indah perjalanan door-to-door, liburan keluarga, dan perjalanan dinas Putri Munggaran Tour &amp; Travel.
          </p>
        </div>

        {/* Gallery Grid: Modern Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              key={item.id}
              onClick={() => setSelectedPhoto({ image: item.image, title: item.title, subtitle: item.subtitle, location: item.location })}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-slate-950 border border-slate-200/60"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Badge Tag */}
              <div className="absolute top-3.5 left-3.5 bg-[#dc2626] text-white font-display font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-md z-10">
                {item.badge}
              </div>

              {/* Zoom Icon Floater */}
              <div className="absolute top-3.5 right-3.5 bg-white/90 p-2 rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                <ZoomIn className="w-4 h-4 text-[#dc2626]" />
              </div>

              {/* Card Footer Content */}
              <div className="absolute bottom-4 left-4 right-4 text-left space-y-1.5 z-10">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-300">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-red-400" />
                  <span className="truncate">{item.location}</span>
                </div>
                
                <h3 className="font-display font-black text-lg text-white leading-tight group-hover:text-red-300 transition-colors">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-slate-300 font-medium line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Zoom */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-left"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer border border-slate-700 shadow-md"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                />
              </div>

              <div className="p-6 bg-slate-900 space-y-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                  <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{selectedPhoto.location}</span>
                </div>
                <h3 className="font-display font-black text-xl text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium">
                  {selectedPhoto.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

