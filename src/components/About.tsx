import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Compass, Award, CheckCircle2, Bus, Hotel, Utensils, Music, Coffee, Building2 } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface AboutProps {
  lang: 'ID' | 'EN';
}

export default function About({ lang }: AboutProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="about" className="py-20 bg-slate-50 text-[#0d1b37] overflow-hidden relative border-b border-slate-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3" id="about-heading">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0d1b37] tracking-tight leading-tight uppercase">
            Restu Tour & Transport
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            "SOLUSI TRANSPORTASI & WISATA TERPERCAYA" — Penyedia Layanan Transportasi dan Perjalanan Wisata Terpercaya Berpusat di Bandung, Jawa Barat.
          </p>
        </div>

        {/* 2-COLUMN VISION & MISSION CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: VISI PERUSAHAAN */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 shadow-xl border border-slate-700/60 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-amber-500/30 flex items-center justify-center text-red-400 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 block">VISI UTAMA</span>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                    RESTU TOUR & TRANSPORT
                  </h3>
                </div>
              </div>

              {/* Visi Statement */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <p className="font-sans text-sm text-slate-100 leading-relaxed font-medium">
                    "Menjadi perusahaan transportasi dan tour terpercaya yang memberikan pengalaman perjalanan terbaik bagi setiap pelanggan."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#dc2626] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  <p className="font-sans text-xs text-slate-200 leading-relaxed font-medium">
                    Armada Bersih, Nyaman, dan Terawat
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#dc2626] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  <p className="font-sans text-xs text-slate-200 leading-relaxed font-medium">
                    Sopir Profesional dan Berpengalaman
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-center">
              <span className="font-display font-extrabold text-xs text-red-400 tracking-wider uppercase block">
                SLOGAN: Solusi Transportasi & Wisata Terpercaya
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: MISI UTAMA PERUSAHAAN */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-lg flex flex-col justify-between space-y-6"
          >
            <div className="space-y-5">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-[#dc2626]" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">KOMITMEN LAYANAN</span>
                  <h3 className="font-display font-black text-xl text-[#0d1b37] uppercase tracking-tight">
                    Misi Utama Kami
                  </h3>
                </div>
              </div>

              {/* 4 Point Mission */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs font-semibold text-slate-700">
                    Mengutamakan kepuasan dan kenyamanan pelanggan.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs font-semibold text-slate-700">
                    Menyediakan armada yang aman, bersih, dan berkualitas.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs font-semibold text-slate-700">
                    Memberikan pelayanan yang profesional, ramah, dan tepat waktu.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs font-semibold text-slate-700">
                    Menjadi mitra perjalanan yang dapat diandalkan untuk berbagai kebutuhan transportasi dan wisata.
                  </p>
                </div>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center">
              <span className="font-display font-extrabold text-xs text-red-600 tracking-wider uppercase block">
                ALAMAT KANTOR: Jl. Yudo No. 7, Arcamanik Endah, Bandung
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
