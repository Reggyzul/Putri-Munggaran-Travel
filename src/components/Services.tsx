import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navigation, MapPin, Users, Briefcase, HeartHandshake, Car, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface ServicesProps {
  lang: 'ID' | 'EN';
  onViewAllDestinations?: () => void;
}

export default function Services({ lang, onViewAllDestinations }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'routes'>('services');
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const handleWhatsAppBooking = (title: string) => {
    const waNumber = '6281321264200';
    const message = isEN
      ? `Hello Putri Munggaran Tour & Travel, I would like to consult and book: ${title}. Please provide schedule, rate quote, and vehicle availability. Thank you!`
      : `Halo Putri Munggaran Tour & Travel, saya ingin berkonsultasi & memesan layanan: ${title}. Mohon informasi jadwal, penawaran tarif, dan ketersediaan armada. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  const servicesList = [
    {
      id: 'door-to-door',
      icon: <Navigation className="w-6 h-6 text-red-600" />,
      title: t.service_1_title,
      badge: 'Layanan Utama',
      badgeEN: 'Flagship Service',
      desc: t.service_1_desc,
      highlights: isEN 
        ? ['Pickup directly from your home/doorstep', 'Drop-off directly at destination', 'No switching vehicles or additional transport']
        : ['Jemput langsung di titik yang disepakati', 'Antar tepat sampai depan alamat tujuan', 'Bebas repot tanpa berganti kendaraan']
    },
    {
      id: 'travel-antar-kota',
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: t.service_2_title,
      badge: 'Rute Populer',
      badgeEN: 'Popular Routes',
      desc: t.service_2_desc,
      highlights: isEN
        ? ['Pangandaran – Bandung (Round-trip)', 'Pangandaran – Jabodetabek (Round-trip)', 'Bandung – Jabodetabek & custom routes']
        : ['Pangandaran – Bandung (PP)', 'Pangandaran – Jabodetabek (PP)', 'Bandung – Jabodetabek & rute lainnya']
    },
    {
      id: 'private-trip',
      icon: <Car className="w-6 h-6 text-red-600" />,
      title: t.service_3_title,
      badge: 'Eksklusif & Fleksibel',
      badgeEN: 'Exclusive & Flexible',
      desc: t.service_3_desc,
      highlights: isEN
        ? ['Private vehicle solely for you and friends/family', 'Flexible departure times & stopovers', 'Comfortable & personalized schedule']
        : ['Armada khusus untuk Anda & keluarga/teman', 'Waktu keberangkatan fleksibel', 'Privasi & kenyamanan maksimal']
    },
    {
      id: 'transportasi-keluarga',
      icon: <HeartHandshake className="w-6 h-6 text-red-600" />,
      title: t.service_4_title,
      badge: 'Keluarga & Liburan',
      badgeEN: 'Family & Holiday',
      desc: t.service_4_desc,
      highlights: isEN
        ? ['Ideal for family holidays & mudik homecoming', 'Clean, comfortable & spacious cabin', 'Child & elderly friendly courteous driver']
        : ['Cocok untuk liburan keluarga & mudik', 'Kabin bersih, harum, dan lega', 'Driver ramah & mengutamakan keselamatan']
    },
    {
      id: 'perjalanan-bisnis',
      icon: <Briefcase className="w-6 h-6 text-red-600" />,
      title: t.service_5_title,
      badge: 'Dinas & Profesional',
      badgeEN: 'Corporate & Official',
      desc: t.service_5_desc,
      highlights: isEN
        ? ['Work travel, business meetings & field visits', 'Punctual & professional service', 'Official trip receipt/documentation provided']
        : ['Perjalanan kerja, dinas, meeting & kunjungan', 'Ketepatan waktu dan pengemudi profesional', 'Dukungan untuk kebutuhan instansi/perusahaan']
    },
    {
      id: 'transportasi-rombongan',
      icon: <Users className="w-6 h-6 text-red-600" />,
      title: t.service_6_title,
      badge: 'Kapasitas Besar',
      badgeEN: 'Large Capacity',
      desc: t.service_6_desc,
      highlights: isEN
        ? ['Toyota Hiace up to 14 passengers', 'Comfortable group outings & community events', 'Luggage capacity for large travel groups']
        : ['Pilihan Toyota Hiace hingga 14 penumpang', 'Cocok untuk rombongan kantor & wisata bersama', 'Ruang bagasi lega untuk barang bawaan']
    }
  ];

  const routeAreas = [
    {
      name: 'Pangandaran',
      desc: isEN ? 'Central hub & pickup coverage across Pangandaran, Parigi, Cijulang, Kalipucang and coastal tourist spots.' : 'Pusat layanan dan penjemputan di area Pangandaran, Parigi, Cijulang, Kalipucang, pantai dan sekitarnya.',
      tag: 'Wilayah Utama'
    },
    {
      name: 'Bandung',
      desc: isEN ? 'Serving Bandung City, Cimahi, Lembang, Soreang, and Greater Bandung.' : 'Melayani seluruh area Kota Bandung, Cimahi, Lembang, Soreang, dan Bandung Raya.',
      tag: 'Rute Strategis'
    },
    {
      name: 'Jabodetabek',
      desc: isEN ? 'Jakarta, Bogor, Depok, Tangerang, and Bekasi with door-to-door direct destination service.' : 'Jakarta, Bogor, Depok, Tangerang, dan Bekasi dengan penjemputan/pengantaran langsung ke alamat.',
      tag: 'Rute Strategis'
    },
    {
      name: 'Rute Antar Kota & Khusus',
      desc: isEN ? 'Serving custom inter-city destinations based on client requests. Contact admin for route and price details.' : 'Melayani tujuan ke berbagai kota lainnya sesuai permintaan pelanggan. Hubungi admin untuk ketersediaan.',
      tag: 'Sesuai Permintaan'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white text-[#0d1b37] text-left border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-600 font-extrabold text-[10px] uppercase tracking-widest border border-red-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.services_tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37] tracking-tight uppercase">
            {t.services_title}
          </h2>

          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {t.services_desc}
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isEN ? '6 Core Services' : '6 Layanan Utama'}
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-5 py-2 rounded-full font-display font-extrabold text-xs uppercase transition-all cursor-pointer ${
                activeTab === 'routes'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isEN ? 'Routes & Service Areas' : 'Rute & Wilayah Layanan'}
            </button>
          </div>
        </div>

        {/* TAB 1: 6 CORE SERVICES GRID */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-red-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      {srv.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
                      {isEN ? srv.badgeEN : srv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-xl text-[#0d1b37] group-hover:text-red-600 transition-colors uppercase">
                      {srv.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-200/80">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                      {isEN ? 'Key Features:' : 'Keunggulan Layanan:'}
                    </span>
                    <ul className="space-y-1.5">
                      {srv.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleWhatsAppBooking(srv.title)}
                    className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-display font-extrabold text-xs uppercase py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isEN ? 'Consult via WhatsApp' : 'Pesan / Konsultasi via WA'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 2: ROUTES & SERVICE AREAS */}
        {activeTab === 'routes' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {routeAreas.map((area, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="inline-block bg-red-100 text-red-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-red-200">
                    {area.tag}
                  </div>
                  <h3 className="font-display font-black text-xl text-[#0d1b37] uppercase">
                    {area.name}
                  </h3>
                  <p className="font-sans text-xs text-slate-600 font-medium leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 text-center max-w-3xl mx-auto space-y-2">
              <h4 className="font-display font-black text-sm text-[#0f2b5c] uppercase">
                {isEN ? 'Custom Destination Outside Main Routes?' : 'Ingin Bepergian ke Luar Rute Utama?'}
              </h4>
              <p className="font-sans text-xs text-slate-700 font-medium">
                {isEN 
                  ? 'For destinations outside the main Pangandaran – Bandung – Jabodetabek route, please contact our admin in advance to check fleet availability and travel costs.'
                  : 'Untuk tujuan di luar rute utama, pelanggan dapat menghubungi admin terlebih dahulu untuk mengetahui ketersediaan armada dan biaya perjalanan.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleWhatsAppBooking('Rute Khusus di Luar Rute Utama')}
                  className="bg-[#0f2b5c] hover:bg-blue-900 text-white font-display font-bold text-xs uppercase px-6 py-3 rounded-full shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-green-400" />
                  <span>{isEN ? 'Consult Custom Route via WA' : 'Hubungi Admin via WA (0813-2126-4200)'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
