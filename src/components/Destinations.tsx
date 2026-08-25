import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, MessageCircle, CheckCircle2, Sparkles, Compass } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export interface DestinationItem {
  id: string;
  name: string;
  nameEN: string;
  tagline: string;
  taglineEN: string;
  description: string;
  descriptionEN: string;
  image: string;
  badge: string;
  badgeEN: string;
  highlights: string[];
  highlightsEN: string[];
}

export const PANGANDARAN_DESTINATIONS: DestinationItem[] = [
  // 1. Pantai Batu Hiu
  {
    id: 'pantai-batu-hiu',
    name: 'Pantai Batu Hiu',
    nameEN: 'Batu Hiu Beach',
    tagline: 'Pemandangan Laut Lepas & Tebing Eksotis',
    taglineEN: 'Open Ocean Panorama & Exotic Cliffs',
    description: 'Pantai Batu Hiu merupakan salah satu destinasi wisata populer di Pangandaran yang menawarkan pemandangan laut lepas dan suasana pantai yang indah.',
    descriptionEN: 'Batu Hiu Beach is one of the popular tourist destinations in Pangandaran that offers open sea views and a beautiful coastal atmosphere.',
    image: '/dest_batu_hiu.jpg',
    badge: 'Wisata Populer',
    badgeEN: 'Popular Spot',
    highlights: [
      'Pemandangan laut lepas Samudra Hindia',
      'Bukit rumput hijau asri & spot foto tebing',
      'Suasana pantai sejuk & rindang pohon cemara',
      'Area konservasi penyu hijau'
    ],
    highlightsEN: [
      'Vast open Indian Ocean views',
      'Green grassy hills & cliff photo spots',
      'Breezy pine-shaded coastal area',
      'Sea turtle conservation center'
    ]
  },

  // 2. Pantai Batukaras
  {
    id: 'pantai-batukaras',
    name: 'Pantai Batukaras',
    nameEN: 'Batukaras Beach',
    tagline: 'Suasana Nyaman & Surfing Favorit',
    taglineEN: 'Relaxing Vibes & Surfing Paradise',
    description: 'Pantai Batukaras dikenal sebagai salah satu destinasi favorit di kawasan Pangandaran dengan suasana pantai yang nyaman dan panorama alam yang menarik.',
    descriptionEN: 'Batukaras Beach is known as a top favorite destination in Pangandaran with a comfortable coastal ambiance and attractive natural panoramas.',
    image: '/dest_batukaras.jpg',
    badge: 'Favorit Wisatawan',
    badgeEN: 'Tourist Favorite',
    highlights: [
      'Suasana pantai nyaman & ramah keluarga',
      'Ombak landai & spot surfing favorit',
      'Panorama teluk & deretan pohon kelapa',
      'Kuliner seafood & kafe tepi pantai'
    ],
    highlightsEN: [
      'Comfortable, family-friendly beach vibes',
      'Gentle waves perfect for surfing',
      'Bay panorama lined with coconut palms',
      'Beachside fresh seafood & cafes'
    ]
  },

  // 3. Pantai Madasari
  {
    id: 'pantai-madasari',
    name: 'Pantai Madasari',
    nameEN: 'Madasari Beach',
    tagline: 'Suasana Alam Tenang & Karang Eksotis',
    taglineEN: 'Serene Nature & Majestic Sea Rocks',
    description: 'Pantai Madasari menawarkan suasana alam yang lebih tenang dengan pemandangan pantai dan bentang alam yang menarik.',
    descriptionEN: 'Madasari Beach offers a more peaceful natural atmosphere with stunning coastal views and captivating landscapes.',
    image: '/dest_madasari.jpg',
    badge: 'Alam Tenang & Asri',
    badgeEN: 'Peaceful Nature',
    highlights: [
      'Suasana alami tenang & jauh dari keramaian',
      'Gugusan batu karang megah di tepi laut',
      'Lokasi favorit untuk camping tepi pantai',
      'Panorama sunset & sunrise memukau'
    ],
    highlightsEN: [
      'Serene & undisturbed natural setting',
      'Dramatic coral rock formations in the sea',
      'Top choice for seaside camping',
      'Stunning sunset and sunrise viewpoints'
    ]
  },

  // 4. Green Canyon
  {
    id: 'green-canyon',
    name: 'Green Canyon',
    nameEN: 'Green Canyon (Cukang Taneuh)',
    tagline: 'Daya Tarik Wisata Alam Utama Pangandaran',
    taglineEN: 'Primary Natural Highlight of Pangandaran',
    description: 'Green Canyon merupakan salah satu destinasi wisata alam yang menjadi daya tarik utama Pangandaran.',
    descriptionEN: 'Green Canyon is one of the premier natural attractions that has become a primary highlight of Pangandaran.',
    image: '/dest_green_canyon.jpg',
    badge: 'Ikon Wisata Alam',
    badgeEN: 'Iconic Wonder',
    highlights: [
      'Menyusuri sungai Cijulang berair hijau toska',
      'Ngarai tebing batu tinggi dengan lumut & tanaman alami',
      'Perjalanan perahu kayu & goa stalaktit',
      'Berenang di air alami yang jernih & segar'
    ],
    highlightsEN: [
      'Cruising along emerald green Cijulang river',
      'Towering lush canyon cliffs with moss & vines',
      'Traditional boat ride into natural caves',
      'Swimming in crystal clear refreshing spring water'
    ]
  },

  // 5. Body Rafting Citumang
  {
    id: 'body-rafting-citumang',
    name: 'Body Rafting Citumang',
    nameEN: 'Citumang Body Rafting',
    tagline: 'Aktivitas Petualangan Seru & Menantang',
    taglineEN: 'Exciting & Challenging River Adventure',
    description: 'Bagi wisatawan yang menyukai aktivitas penuh tantangan, Body Rafting Citumang dapat menjadi pilihan menarik.',
    descriptionEN: 'For tourists who enjoy adventurous outdoor activities, Citumang Body Rafting is an exciting and exhilarating choice.',
    image: '/dest_citumang.jpg',
    badge: 'Aktivitas Petualangan',
    badgeEN: 'Adventure Activity',
    highlights: [
      'Menyusuri aliran sungai alami berair jernih kebiruan',
      'Sensasi meluncur di arus sungai & lompat tebing',
      'Dipandu instruktur lokal berpengalaman & safety lengkap',
      'Spot air terjun bertingkat & goa alam tersembunyi'
    ],
    highlightsEN: [
      'Floating along pristine turquoise jungle river',
      'Thrilling cliff jumping and natural water sliding',
      'Guided by certified local instructors with safety gear',
      'Cascading waterfalls & hidden cave spots'
    ]
  },

  // 6. Pasir Putih Pangandaran
  {
    id: 'pasir-putih-pangandaran',
    name: 'Pasir Putih Pangandaran',
    nameEN: 'White Sand Beach Pangandaran',
    tagline: 'Pasir Putih Lembut & Keindahan Bawah Laut',
    taglineEN: 'Soft White Sand & Marine Beauty',
    description: 'Pasir Putih Pangandaran menawarkan pemandangan pantai dengan pasir putih dan suasana laut yang menarik.',
    descriptionEN: 'White Sand Beach Pangandaran offers scenic beach views with pure white sand and an inviting marine atmosphere.',
    image: '/dest_pasir_putih.jpg',
    badge: 'Eksotis & Snorkeling',
    badgeEN: 'Exotic & Snorkeling',
    highlights: [
      'Hamparan pasir putih lembut & air laut jernih',
      'Spot snorkeling terumbu karang & bangkai kapal karam',
      'Dekat dengan Cagar Alam & satwa liar ramah',
      'Akses mudah menyeberang dengan perahu wisata'
    ],
    highlightsEN: [
      'Soft white sand and crystal clear turquoise sea',
      'Coral reef snorkeling & shipwreck dive site',
      'Close to Nature Reserve with friendly wildlife',
      'Easy scenic boat crossing from East/West beach'
    ]
  }
];

interface DestinationsProps {
  lang: 'ID' | 'EN';
  onViewAllDestinations?: () => void;
}

export default function Destinations({ lang, onViewAllDestinations }: DestinationsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pantai' | 'alam'>('all');
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const handleWhatsAppConsult = (destName: string) => {
    const waNumber = '6281321264200';
    const message = isEN
      ? `Hello Putri Munggaran Tour & Travel, I would like to consult travel & vehicle trip to: ${destName}. Please provide price quote, route details & vehicle availability. Thank you!`
      : `Halo Putri Munggaran Tour & Travel, saya ingin berkonsultasi mengenai perjalanan wisata ke: ${destName}. Mohon informasi penawaran harga, rute perjalanan & ketersediaan armada. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  const filteredDestinations = PANGANDARAN_DESTINATIONS.filter((item) => {
    if (selectedFilter === 'pantai') {
      return item.id.includes('pantai') || item.id.includes('pasir-putih');
    }
    if (selectedFilter === 'alam') {
      return item.id.includes('green-canyon') || item.id.includes('citumang');
    }
    return true;
  });

  return (
    <section id="destinations" className="py-20 bg-slate-50 text-[#0d1b37] text-left border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest border border-emerald-200">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>DESTINASI WISATA PANGANDARAN</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0d1b37] tracking-tight uppercase">
            {isEN ? 'Pangandaran Top Destinations' : 'Destinasi Wisata Pilihan'}
          </h2>

          <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full" />

          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {isEN 
              ? 'Explore the most captivating beaches and natural attractions in Pangandaran with our door-to-door transportation service.'
              : 'Jelajahi keindahan pantai eksotis dan wisata alam terbaik di Pangandaran bersama layanan perjalanan Putri Munggaran Tour & Travel.'}
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-5 py-2 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isEN ? 'All 6 Destinations' : 'Semua 6 Destinasi'}
            </button>
            <button
              onClick={() => setSelectedFilter('pantai')}
              className={`px-5 py-2 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
                selectedFilter === 'pantai'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isEN ? 'Beach Destinations' : 'Wisata Pantai'}
            </button>
            <button
              onClick={() => setSelectedFilter('alam')}
              className={`px-5 py-2 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
                selectedFilter === 'alam'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isEN ? 'Adventure & River' : 'Wisata Alam & Rafting'}
            </button>
          </div>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => {
            const name = isEN ? dest.nameEN : dest.name;
            const tagline = isEN ? dest.taglineEN : dest.tagline;
            const description = isEN ? dest.descriptionEN : dest.description;
            const badge = isEN ? dest.badgeEN : dest.badge;
            const highlights = isEN ? dest.highlightsEN : dest.highlights;

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image with Tag */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                      {badge}
                    </div>
                    <div className="absolute top-4 right-4 bg-emerald-600 text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Content */}
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

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                        {isEN ? 'Destination Highlights:' : 'Daya Tarik & Aktivitas:'}
                      </span>
                      <ul className="space-y-1.5">
                        {highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] font-semibold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleWhatsAppConsult(name)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase tracking-wider py-3.5 rounded-full shadow-sm hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isEN ? 'Consult Trip via WA' : 'Konsultasi Perjalanan via WA'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
