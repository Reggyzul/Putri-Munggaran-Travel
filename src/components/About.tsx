import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Sparkles, CheckCircle2, UserCheck, HeartHandshake, Car, Navigation, MessageSquare } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface AboutProps {
  lang: 'ID' | 'EN';
}

export default function About({ lang }: AboutProps) {
  const t = TRANSLATIONS[lang];

  const strengths = [
    {
      icon: <Navigation className="w-5 h-5 text-red-600" />,
      title: t.strength_door_title,
      desc: t.strength_door_desc
    },
    {
      icon: <UserCheck className="w-5 h-5 text-red-600" />,
      title: t.strength_driver_title,
      desc: t.strength_driver_desc
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-600" />,
      title: t.strength_safety_title,
      desc: t.strength_safety_desc
    },
    {
      icon: <Car className="w-5 h-5 text-red-600" />,
      title: t.strength_fleet_title,
      desc: t.strength_fleet_desc
    },
    {
      icon: <Award className="w-5 h-5 text-red-600" />,
      title: t.strength_route_title,
      desc: t.strength_route_desc
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-red-600" />,
      title: t.strength_booking_title,
      desc: t.strength_booking_desc
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 text-[#0d1b37] overflow-hidden relative border-b border-slate-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3" id="about-heading">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-display font-black text-xs uppercase tracking-widest border border-red-200 shadow-sm mb-1">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{t.about_tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0d1b37] tracking-tight leading-tight uppercase">
            Putri Munggaran Tour & Travel
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />
          <p className="font-sans text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
            {t.about_desc_1}
          </p>
          <p className="font-sans text-slate-600 text-xs leading-relaxed font-normal">
            {t.about_desc_2}
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
            className="lg:col-span-5 bg-gradient-to-br from-[#0b1736] via-[#102454] to-slate-950 text-white rounded-3xl p-8 shadow-xl border border-slate-700/60 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-amber-500/30 flex items-center justify-center text-red-400 shadow-md">
                  <Award className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">
                    {t.vision_title}
                  </span>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                    PUTRI MUNGGARAN
                  </h3>
                </div>
              </div>

              {/* Visi Statement */}
              <div className="space-y-4 pt-2">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <p className="font-sans text-sm sm:text-base text-slate-100 leading-relaxed font-semibold italic">
                    "{t.vision_1}"
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Komitmen Layanan:</span>
                  <p className="font-sans text-xs text-slate-200 leading-relaxed">
                    {t.about_desc_3}
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-white/10 text-center">
              <span className="font-display font-extrabold text-xs text-amber-300 tracking-wider uppercase block">
                {t.hero_motto}
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: MISI PERUSAHAAN */}
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
                    7 PILAR UTAMA
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#0d1b37] uppercase tracking-tight">
                    {t.mission_title}
                  </h3>
                </div>
              </div>

              {/* Misi Bullet Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  t.mission_1,
                  t.mission_2,
                  t.mission_3,
                  t.mission_4,
                  t.mission_5,
                  t.mission_6,
                  t.mission_7
                ].map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 ${idx === 6 ? 'md:col-span-2' : ''}`}>
                    <span className="w-5 h-5 rounded-full bg-[#dc2626] text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="font-sans text-xs text-slate-700 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
              <span className="font-sans text-xs text-red-700 font-extrabold uppercase">
                {t.about_badge}
              </span>
            </div>
          </motion.div>

        </div>

        {/* 6 KEUNGGULAN SECTION */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-display font-black text-xs text-red-600 tracking-widest uppercase bg-red-100 px-3.5 py-1 rounded-full border border-red-200 inline-block">
              {t.strengths_tag}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0d1b37] uppercase">
              {t.strengths_title}
            </h3>
            <p className="font-sans text-xs text-slate-600 font-medium">
              {t.strengths_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shadow-xs">
                  {st.icon}
                </div>
                <h4 className="font-display font-black text-base text-[#0d1b37] uppercase">
                  {st.title}
                </h4>
                <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
