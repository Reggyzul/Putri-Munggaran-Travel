import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Camera, Sparkles, X, ChevronRight, Bus, MapPin, Users } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface GallerySectionProps {
  lang: 'ID' | 'EN';
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'armada' | 'gathering' | 'destinasi'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  const galleryItems = [
    {
      id: 1,
      category: 'armada',
      title: 'Big Bus Eksekutif Legrest',
      subtitle: 'Armada Zivanes & Miyor Full AC',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      category: 'gathering',
      title: 'Tour Gathering Mandeh',
      subtitle: 'Keluarga Besar & Instansi Perusahaan',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      category: 'destinasi',
      title: 'Jam Gadang & Ngarai Sianok',
      subtitle: 'Bukittinggi, Sumatera Barat',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      category: 'armada',
      title: 'Toyota Hiace Premio Eksekutif',
      subtitle: 'Unit Nyaman & Kabin Luas',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      category: 'destinasi',
      title: 'Danau Diatas & Danau Dibawah',
      subtitle: 'Alahan Panjang, Solok',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      category: 'gathering',
      title: 'Tour Outbound Bromo & Malang',
      subtitle: 'Peserta Tour Nusantara',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 7,
      category: 'destinasi',
      title: 'Marina Bay Sands Singapura',
      subtitle: 'Rute Tour Internasional',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 8,
      category: 'armada',
      title: 'Medium Bus Pariwisata 31 Seat',
      subtitle: 'Fasilitas TV, Karaoke & Selimut',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="gallery" className="py-20 bg-slate-900 text-white overflow-hidden relative border-b border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3" id="gallery-heading">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/20 border border-amber-500/40 text-red-400 font-display font-extrabold text-xs tracking-wider uppercase">
            <Camera className="w-4 h-4 text-red-400" />
            <span>GALERI DOKUMENTASI & FLEET</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            Galeri <span className="text-red-400">Putri Munggaran Tour &amp; Travel</span>
          </h2>

          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />

          <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
            Dokumentasi armada mobil, perjalanan door-to-door, family trip &amp; perjalanan wisata Putri Munggaran Tour &amp; Travel.
          </p>

          {/* FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full font-display font-extrabold text-xs transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#dc2626] text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              Semua Foto
            </button>
            <button
              onClick={() => setActiveFilter('armada')}
              className={`px-4 py-2 rounded-full font-display font-extrabold text-xs transition-all cursor-pointer ${
                activeFilter === 'armada'
                  ? 'bg-[#dc2626] text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              Armada Bus & Mobil
            </button>
            <button
              onClick={() => setActiveFilter('gathering')}
              className={`px-4 py-2 rounded-full font-display font-extrabold text-xs transition-all cursor-pointer ${
                activeFilter === 'gathering'
                  ? 'bg-[#dc2626] text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              Tour & Gathering
            </button>
            <button
              onClick={() => setActiveFilter('destinasi')}
              className={`px-4 py-2 rounded-full font-display font-extrabold text-xs transition-all cursor-pointer ${
                activeFilter === 'destinasi'
                  ? 'bg-[#dc2626] text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              Destinasi Wisata
            </button>
          </div>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={item.id}
              onClick={() => setSelectedPhoto(item.image)}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-white/10 group cursor-pointer bg-slate-950"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                <h3 className="font-display font-black text-lg text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-slate-300 font-medium line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white hover:text-red-400 p-2 rounded-full bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto}
              alt="Preview Galeri"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


