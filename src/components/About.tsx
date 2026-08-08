import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-display font-black text-xs uppercase tracking-widest border border-red-200 shadow-sm mb-1">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{t.about_tag}</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0d1b37] tracking-tight leading-tight uppercase">
            Restu Tour & Transport
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            "{t.hero_motto}" — {t.about_desc_1}
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
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 block">
                    {t.vision_title}
                  </span>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                    RESTU TOUR & TRANSPORT
                  </h3>
                </div>
              </div>

              {/* Visi Statement */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <p className="font-sans text-sm text-slate-100 leading-relaxed font-medium">
                    "{t.vision_1}"
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#dc2626] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  <p className="font-sans text-xs text-slate-200 leading-relaxed font-medium">
                    {t.strength_clean_title}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#dc2626] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  <p className="font-sans text-xs text-slate-200 leading-relaxed font-medium">
                    {t.strength_driver_title}
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-center">
              <span className="font-display font-extrabold text-xs text-red-400 tracking-wider uppercase block">
                {t.hero_motto}
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
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    {t.mission_title}
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#0d1b37] uppercase tracking-tight">
                    {t.mission_title}
                  </h3>
                </div>
              </div>

              {/* Misi Bullet Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-display font-black text-xs text-red-600 uppercase">
                    <span>01.</span>
                    <span>{t.mission_1}</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                    {t.mission_1}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-display font-black text-xs text-red-600 uppercase">
                    <span>02.</span>
                    <span>{t.mission_2}</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                    {t.mission_2}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-display font-black text-xs text-red-600 uppercase">
                    <span>03.</span>
                    <span>{t.mission_3}</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                    {t.mission_3}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-display font-black text-xs text-red-600 uppercase">
                    <span>04.</span>
                    <span>{t.mission_4}</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                    {t.mission_4}
                  </p>
                </div>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
              <span className="font-sans text-xs text-red-700 font-extrabold uppercase">
                {t.about_badge}
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
