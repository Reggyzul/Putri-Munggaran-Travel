import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, MessageCircle, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface DestinationHighlightsPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function DestinationHighlightsPage({ lang, onNavigateHome }: DestinationHighlightsPageProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'jabar' | 'jateng' | 'jatim' | 'bali'>('all');
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const handleWhatsAppBooking = (highlightTitle: string, categoryName: string) => {
    const waNumber = '628562042336';
    const message = isEN
      ? `Hello Restu Tour & Transport, I would like to consult on the destination route: ${highlightTitle} (${categoryName}). Please inform schedule, amenities & best price quote. Thank you!`
      : `Halo Restu Tour & Transport, saya ingin berkonsultasi mengenai rute destinasi: ${highlightTitle} (${categoryName}). Mohon informasi jadwal, fasilitas & penawaran harga terbaik. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  const allDestinationHighlights = [
    // 1. WISATA JAWA BARAT
    {
      id: 'bandung-lembang',
      categoryKey: 'jabar',
      categoryNameEN: 'West Java Tours',
      categoryNameID: 'Wisata Jawa Barat',
      titleEN: 'Bandung & Lembang Excursions',
      titleID: 'Bandung & Lembang',
      subtitleEN: 'Cool Mountain Breeze, Floating Market & Outlets',
      subtitleID: 'Udara Sejuk, Floating Market & Factory Outlet',
      badgeEN: 'West Java',
      badgeID: 'Jawa Barat',
      image: '/dest_bandung.avif',
      rating: 4.9,
      reviews: 185,
      spotsEN: ['Lembang Floating Market & Farmhouse', 'Dusun Bambu & Orchid Forest', 'Kawah Putih Ciwidey & Rancabali Tea Gardens', 'Gedung Sate, Asia Afrika & Shopping Outlets'],
      spotsID: ['Lembang Floating Market & Farmhouse', 'Dusun Bambu & Orchid Forest', 'Kawah Putih Ciwidey & Rancabali', 'Gedung Sate, Asia Afrika & Shopping Outlet']
    },
    {
      id: 'pangandaran-bogor',
      categoryKey: 'jabar',
      categoryNameEN: 'West Java Tours',
      categoryNameID: 'Wisata Jawa Barat',
      titleEN: 'Pangandaran Beach & Bogor Botanical',
      titleID: 'Pangandaran & Pelabuhan Ratu',
      subtitleEN: 'Coastal Wonders, Body Rafting & Botanical Gardens',
      subtitleID: 'Wisata Pantai, Green Canyon & Bogor',
      badgeEN: 'Beach & Nature',
      badgeID: 'Pantai & Alam',
      image: '/dest_pangandaran.jpg',
      rating: 4.8,
      reviews: 120,
      spotsEN: ['Pangandaran Beach & Candi Datar Coast', 'Green Canyon Body Rafting Adventure', 'Pelabuhan Ratu Sukabumi Beach Scenery', 'Bogor Botanical Gardens & Puncak Highlands'],
      spotsID: ['Pantai Pangandaran & Candi Datar', 'Body Rafting Green Canyon', 'Wisata Pantai Pelabuhan Ratu Sukabumi', 'Kebun Raya Bogor & Puncak']
    },

    // 2. WISATA JAWA TENGAH & JOGJA
    {
      id: 'jogja-magelang',
      categoryKey: 'jateng',
      categoryNameEN: 'Central Java & Jogja Tours',
      categoryNameID: 'Wisata Jawa Tengah & Jogja',
      titleEN: 'Yogyakarta & Magelang Cultural Heritage',
      titleID: 'Yogyakarta & Magelang',
      subtitleEN: 'Borobudur Temple, Prambanan & Malioboro Street',
      subtitleID: 'Candi Borobudur, Prambanan & Malioboro',
      badgeEN: 'Culture & History',
      badgeID: 'Budaya & Sejarah',
      image: '/dest_jogja.avif',
      rating: 5.0,
      reviews: 210,
      spotsEN: ['Borobudur Temple & Prambanan UNESCO Sites', 'Mount Merapi Jeep Lava Tour Expedition', 'Malioboro Street Culinary & Craft Shopping', 'Taman Sari Water Castle & Yogyakarta Palace'],
      spotsID: ['Candi Borobudur & Candi Prambanan', 'Jeep Lava Tour Merapi', 'Wisata Belanja & Kuliner Malioboro', 'Taman Sari & Keraton Yogyakarta']
    },
    {
      id: 'dieng-solo',
      categoryKey: 'jateng',
      categoryNameEN: 'Central Java & Jogja Tours',
      categoryNameID: 'Wisata Jawa Tengah & Jogja',
      titleEN: 'Dieng Plateau & Solo Heritage',
      titleID: 'Dataran Tinggi Dieng & Solo',
      subtitleEN: 'Land Above the Clouds & Traditional Batik Hubs',
      subtitleID: 'Negeri di Atas Awan & Wisata Batik',
      badgeEN: 'Central Java',
      badgeID: 'Jawa Tengah',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      reviews: 145,
      spotsEN: ['Telaga Warna Lake & Arjuna Temple Complex', 'Sikunir Golden Sunrise Trekking Spot', 'Surakarta Palace & Klewer Traditional Market', 'Semarang Old Town & Lawang Sewu Landmark'],
      spotsID: ['Telaga Warna & Candi Arjuna Dieng', 'Sunrise Sikunir Dieng', 'Keraton Surakarta & Pasar Klewer Solo', 'Kota Tua Semarang & Lawang Sewu']
    },

    // 3. WISATA JAWA TIMUR & BROMO
    {
      id: 'bromo-malang',
      categoryKey: 'jatim',
      categoryNameEN: 'East Java & Bromo Tours',
      categoryNameID: 'Wisata Jawa Timur',
      titleEN: 'Mount Bromo & Batu Malang Highlights',
      titleID: 'Gunung Bromo & Batu Malang',
      subtitleEN: 'Golden Sunrise Bromo & Transportation Museum',
      subtitleID: 'Sunrise Bromo & Museum Angkut',
      badgeEN: 'Volcano & Nature',
      badgeID: 'Gunung & Alam',
      image: '/dest_bromo.avif',
      rating: 5.0,
      reviews: 230,
      spotsEN: ['Penanjakan 1 Golden Sunrise Viewpoint', '4x4 Jeep Sand Sea & Teletubbies Savannah', 'Museum Angkut & Jatim Park 3 Theme Park', 'Malang Apple Orchards & Batu Town Square'],
      spotsID: ['Penanjakan 1 Golden Sunrise Bromo', 'Jeep 4x4 Lautan Pasir & Bukit Teletubbies', 'Museum Angkut & Jatim Park 3 Batu', 'Kebun Apel Malang & Alun-alun Batu']
    },

    // 4. WISATA BALI EXOTIC
    {
      id: 'bali-exotic',
      categoryKey: 'bali',
      categoryNameEN: 'Bali & Island Tours',
      categoryNameID: 'Wisata Bali & Nusantara',
      titleEN: 'Bali Tropical Paradise & Nusa Penida',
      titleID: 'Bali Paradise & Nusa Penida',
      subtitleEN: 'Kuta Beach Sunset, Tanah Lot & Nusa Penida Coast',
      subtitleID: 'Pantai Kuta, Tanah Lot & Nusa Penida',
      badgeEN: 'Island of Gods',
      badgeID: 'Pulau Dewata',
      image: '/dest_padang.avif',
      rating: 5.0,
      reviews: 260,
      spotsEN: ['Kelingking Beach & Broken Beach Nusa Penida', 'Tanah Lot Sea Temple & Ulun Danu Beratan', 'Kuta Beach & Jimbaran Sunset Seafood Dinner', 'Garuda Wisnu Kencana (GWK) Cultural Park'],
      spotsID: ['Kelingking Beach Nusa Penida', 'Pura Tanah Lot & Bedugul Ulun Danu', 'Pantai Kuta & Sunset Jimbaran Seafood', 'Garuda Wisnu Kencana (GWK)']
    }
  ];

  const filteredHighlights = allDestinationHighlights.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.categoryKey === activeCategory;
  });

  return (
    <div className="bg-slate-50 text-[#0d1b37] min-h-screen pt-20 text-left">
      
      {/* TOP HEADER BANNER */}
      <div className="relative w-full h-[230px] sm:h-[290px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

        <div className="relative z-10 text-center space-y-2 px-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-[10px] uppercase tracking-widest mb-1 shadow-md">
            <Globe className="w-3.5 h-3.5 text-red-300" />
            <span>RESTU TOUR &amp; TRANSPORTATION OFFICIAL</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            {t.dest_title}
          </h1>

          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-red-400 cursor-pointer">{t.dest_breadcrumb_home}</span> / {t.dest_breadcrumb_page}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Subtitle Description */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37]">
            {t.dest_cat_subtitle}
          </h2>
          <div className="w-20 h-1 bg-[#dc2626] mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {t.dest_desc}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-2xl font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.dest_cat_all}
          </button>
          <button
            onClick={() => setActiveCategory('jabar')}
            className={`px-5 py-2.5 rounded-2xl font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'jabar'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.dest_cat_jabar}
          </button>
          <button
            onClick={() => setActiveCategory('jateng')}
            className={`px-5 py-2.5 rounded-2xl font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'jateng'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.dest_cat_jateng}
          </button>
          <button
            onClick={() => setActiveCategory('jatim')}
            className={`px-5 py-2.5 rounded-2xl font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'jatim'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.dest_cat_jatim}
          </button>
          <button
            onClick={() => setActiveCategory('bali')}
            className={`px-5 py-2.5 rounded-2xl font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
              activeCategory === 'bali'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.dest_cat_bali}
          </button>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHighlights.map((dest) => {
            const title = isEN ? dest.titleEN : dest.titleID;
            const subtitle = isEN ? dest.subtitleEN : dest.subtitleID;
            const badge = isEN ? dest.badgeEN : dest.badgeID;
            const spots = isEN ? dest.spotsEN : dest.spotsID;
            const categoryName = isEN ? dest.categoryNameEN : dest.categoryNameID;

            return (
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
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                      {badge}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display font-black text-xl text-[#0d1b37] group-hover:text-red-600 transition-colors uppercase">
                        {title}
                      </h3>
                      <p className="font-sans text-xs text-red-500 font-bold mt-0.5">
                        {subtitle}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                        {t.dest_spots_label}
                      </span>
                      <ul className="space-y-1.5">
                        {spots.map((spot, idx) => (
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
                    onClick={() => handleWhatsAppBooking(title, categoryName)}
                    className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-display font-extrabold text-xs uppercase py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{t.dest_wa_consult}</span>
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
