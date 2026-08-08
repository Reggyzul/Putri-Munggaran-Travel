import React from 'react';
import { motion } from 'motion/react';
import { Check, MapPin, Phone, Award, ShieldCheck, Bus } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface AboutPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function AboutPage({ lang, onNavigateHome }: AboutPageProps) {
  const t = TRANSLATIONS[lang];

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
            Profil & Visi Misi
          </h1>
          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-red-400 cursor-pointer">BERANDA</span> / PROFIL KAMI
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
            Tentang Perusahaan Kami
          </span>

          <p className="font-sans text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
            Restu Tour & Transport adalah penyedia layanan transportasi dan perjalanan wisata yang melayani kebutuhan individu, keluarga, perusahaan, hingga instansi. Dengan armada yang terawat, pengemudi profesional, dan pelayanan yang mengutamakan kenyamanan, kami siap menjadi partner perjalanan Anda ke berbagai destinasi di Indonesia.
          </p>

          <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
            
            {/* Visi Perusahaan */}
            <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[#dc2626] font-black text-base shrink-0 mt-0.5">✓</span>
              <div className="space-y-1.5">
                <span className="font-bold text-slate-900 text-base block">Visi Perusahaan:</span>
                <p className="text-slate-700 font-medium">
                  Menjadi perusahaan transportasi dan tour terpercaya yang memberikan pengalaman perjalanan terbaik bagi setiap pelanggan.
                </p>
              </div>
            </div>

            {/* Misi Perusahaan */}
            <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[#dc2626] font-black text-base shrink-0 mt-0.5">✓</span>
              <div className="space-y-1.5">
                <span className="font-bold text-slate-900 text-base block">Misi Utama Kami:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 font-medium">
                  <li>Mengutamakan kepuasan dan kenyamanan pelanggan.</li>
                  <li>Menyediakan armada yang aman, bersih, dan berkualitas.</li>
                  <li>Memberikan pelayanan yang profesional, ramah, dan tepat waktu.</li>
                  <li>Menjadi mitra perjalanan yang dapat diandalkan untuk berbagai kebutuhan transportasi dan wisata.</li>
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
            Layanan Kami & Area Operasional
          </span>

          <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#0d1b37]">
              Cakupan Layanan Perjalanan
            </h3>
            <p>
              Restu Tour & Transport menyediakan layanan transportasi komprehensif yang meliputi:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2 text-slate-700 font-medium">
              <li className="flex items-center gap-2">🔹 Sewa Mobil Harian</li>
              <li className="flex items-center gap-2">🔹 Sewa Mobil dengan Sopir</li>
              <li className="flex items-center gap-2">🔹 Sewa Bus Pariwisata</li>
              <li className="flex items-center gap-2">🔹 Paket Tour Domestik</li>
              <li className="flex items-center gap-2">🔹 Perjalanan Wisata</li>
              <li className="flex items-center gap-2">🔹 Perjalanan Dinas</li>
              <li className="flex items-center gap-2">🔹 Antar Jemput Bandara</li>
              <li className="flex items-center gap-2">🔹 Family Trip</li>
              <li className="flex items-center gap-2">🔹 Corporate Gathering</li>
              <li className="flex items-center gap-2">🔹 Study Tour</li>
              <li className="flex items-center gap-2">🔹 Ziarah</li>
              <li className="flex items-center gap-2">🔹 Event & Perjalanan Rombongan</li>
            </ul>
            <p className="pt-2 text-slate-600 font-medium">
              Melayani rute dalam Kota Bandung, Jawa Barat, serta perjalanan ke berbagai kota di Pulau Jawa, Bali, dan destinasi lainnya di Indonesia.
            </p>
          </div>
        </section>

        {/* SECTION 3: NETWORK & FLEET SERVICES */}
        <section className="space-y-8 border-t border-slate-100 pt-12">
          <span 
            className="font-serif italic text-2xl sm:text-3xl text-[#dc2626] block"
            style={{ fontFamily: "'Great Vibes', cursive, serif" }}
          >
            Mengapa Memilih Kami?
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-display font-bold text-base text-[#0d1b37] mb-1">
                Armada Bersih, Nyaman & Terawat
              </h4>
              <p className="text-slate-600">
                Setiap unit kendaraan selalu diperiksa berkala, bersih, dan harum untuk keamanan ekstra.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-display font-bold text-base text-[#0d1b37] mb-1">
                Sopir Profesional & Berpengalaman
              </h4>
              <p className="text-slate-600">
                Pengemudi ramah, paham rute dalam & luar kota, serta mengutamakan keselamatan.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-display font-bold text-base text-[#0d1b37] mb-1">
                Harga Kompetitif & Transparan
              </h4>
              <p className="text-slate-600">
                Penawaran biaya sewa yang terjangkau tanpa biaya tersembunyi.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-display font-bold text-base text-[#0d1b37] mb-1">
                Tepat Waktu & Handal
              </h4>
              <p className="text-slate-600">
                Penjemputan dan jadwal perjalanan dikelola dengan tingkat kedisiplinan waktu tinggi.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
