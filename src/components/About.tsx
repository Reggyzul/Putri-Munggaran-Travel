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
      icon: <Navigation className="w-5 h-5 text-emerald-600" />,
      title: t.strength_door_title,
      desc: t.strength_door_desc
    },
    {
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      title: t.strength_driver_title,
      desc: t.strength_driver_desc
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: t.strength_safety_title,
      desc: t.strength_safety_desc
    },
    {
      icon: <Car className="w-5 h-5 text-emerald-600" />,
      title: t.strength_fleet_title,
      desc: t.strength_fleet_desc
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      title: t.strength_route_title,
      desc: t.strength_route_desc
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
      title: t.strength_booking_title,
      desc: t.strength_booking_desc
    }
  ];

  return (
    <section id="about" className="py-20 bg-white text-[#0d1b37] overflow-hidden border-b border-slate-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: Intro About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.about_tag}</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0d1b37] tracking-tight leading-tight uppercase">
                PUTRI <span className="text-emerald-600">MUNGGARAN</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-wide">
                {t.about_title_2} • “{t.hero_motto}”
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              <p>{t.about_desc_1}</p>
              <p>{t.about_desc_2}</p>
              <p className="font-semibold text-slate-900">{t.about_desc_3}</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-[#0b1736] via-[#0d2847] to-slate-950 text-white rounded-3xl p-8 shadow-2xl space-y-6 border border-slate-800">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <img
                  src="/pm_logo.jpg"
                  alt="Putri Munggaran Logo"
                  className="h-12 w-12 rounded-xl object-contain border-2 border-emerald-500 shadow-md"
                />
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
                    TOUR &amp; TRAVEL
                  </span>
                  <h3 className="font-display font-black text-xl text-white uppercase">
                    PUTRI MUNGGARAN
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
                  {t.vision_title}
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-200 italic leading-relaxed font-semibold">
                  "{t.vision_1}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>📍 Pangandaran, Jawa Barat</span>
                <span className="text-emerald-400 font-bold">24 Jam Door-to-Door</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: 6 Keunggulan */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-display font-black text-xs text-emerald-700 tracking-widest uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
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
            {strengths.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center shadow-xs">
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
