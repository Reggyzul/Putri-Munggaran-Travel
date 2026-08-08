import React from 'react';
import { TRANSLATIONS } from '../utils/translations';

interface AboutPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function AboutPage({ lang, onNavigateHome }: AboutPageProps) {
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const servicesList = isEN ? [
    'Daily Car Rental',
    'Car Rental with Driver',
    'Tourism Bus Rental',
    'Domestic Tour Packages',
    'Leisure & Sightseeing Trips',
    'Corporate & Official Business Travel',
    'Airport Pickup & Drop Transfers',
    'Family Vacation Packages',
    'Corporate Gatherings',
    'School Study Tours',
    'Pilgrimage Trips',
    'Group Events & Delegations'
  ] : [
    'Sewa Mobil Harian',
    'Sewa Mobil dengan Sopir',
    'Sewa Bus Pariwisata',
    'Paket Tour Domestik',
    'Perjalanan Wisata',
    'Perjalanan Dinas',
    'Antar Jemput Bandara',
    'Family Trip',
    'Corporate Gathering',
    'Study Tour',
    'Ziarah',
    'Event & Perjalanan Rombongan'
  ];

  return (
    <div className="bg-white text-[#0d1b37] min-h-screen pt-20 text-left">
      
      {/* 1. TOP HEADER BANNER */}
      <div className="relative w-full h-[220px] sm:h-[280px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&q=80&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80" />

        <div className="relative z-10 text-center space-y-2 px-4">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            {t.nav_about}
          </h1>
          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-red-400 cursor-pointer">{t.dest_breadcrumb_home}</span> / {t.nav_about}
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* SECTION 1: ABOUT OUR COMPANY */}
        <section className="space-y-6">
          <span 
            className="font-serif italic text-2xl sm:text-3xl text-[#dc2626] block"
            style={{ fontFamily: "'Great Vibes', cursive, serif" }}
          >
            {t.about_tag}
          </span>

          <p className="font-sans text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
            {t.about_desc_1}
          </p>

          <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
            
            {/* Visi Perusahaan */}
            <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[#dc2626] font-black text-base shrink-0 mt-0.5">✓</span>
              <div className="space-y-1.5">
                <span className="font-bold text-slate-900 text-base block">{t.vision_title}:</span>
                <p className="text-slate-700 font-medium">
                  {t.vision_1}
                </p>
              </div>
            </div>

            {/* Misi Perusahaan */}
            <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[#dc2626] font-black text-base shrink-0 mt-0.5">✓</span>
              <div className="space-y-1.5">
                <span className="font-bold text-slate-900 text-base block">{t.mission_title}:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 font-medium">
                  <li>{t.mission_1}</li>
                  <li>{t.mission_2}</li>
                  <li>{t.mission_3}</li>
                  <li>{t.mission_4}</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: SCOPE OF SERVICES */}
        <section className="space-y-8 border-t border-slate-100 pt-12">
          <span 
            className="font-serif italic text-2xl sm:text-3xl text-[#dc2626] block"
            style={{ fontFamily: "'Great Vibes', cursive, serif" }}
          >
            {isEN ? 'Our Comprehensive Travel Services' : 'Layanan Kami & Area Operasional'}
          </span>

          <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#0d1b37]">
              {isEN ? 'Service Coverage' : 'Cakupan Layanan Perjalanan'}
            </h3>
            <p>
              {t.about_desc_2}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2 text-slate-700 font-medium">
              {servicesList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">🔹 {item}</li>
              ))}
            </ul>
            <p className="pt-2 text-slate-600 font-medium">
              {t.dest_desc}
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
