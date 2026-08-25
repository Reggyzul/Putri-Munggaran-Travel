import React from 'react';
import { Sparkles, ShieldCheck, Award, Navigation, UserCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface AboutPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function AboutPage({ lang, onNavigateHome }: AboutPageProps) {
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const servicesList = [
    { title: t.service_1_title, desc: t.service_1_desc },
    { title: t.service_2_title, desc: t.service_2_desc },
    { title: t.service_3_title, desc: t.service_3_desc },
    { title: t.service_4_title, desc: t.service_4_desc },
    { title: t.service_5_title, desc: t.service_5_desc },
    { title: t.service_6_title, desc: t.service_6_desc }
  ];

  return (
    <div className="bg-white text-[#0d1b37] min-h-screen pt-20 text-left">
      
      {/* 1. TOP HEADER BANNER */}
      <div className="relative w-full h-[220px] sm:h-[280px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920')`
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
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-display font-black text-xs sm:text-sm uppercase tracking-widest border border-red-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>{t.about_tag}</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0d1b37] uppercase tracking-tight">
              {t.about_title_1}
            </h2>
            <p className="font-sans text-sm font-bold text-red-600 uppercase">
              {t.about_title_2} • {t.hero_motto}
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {t.about_desc_1}
          </p>
          <p className="font-sans text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {t.about_desc_2}
          </p>
          <p className="font-sans text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {t.about_desc_3}
          </p>

          <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed pt-4">
            
            {/* Visi Perusahaan */}
            <div className="flex items-start gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <Award className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <span className="font-bold text-slate-900 text-base block">{t.vision_title}:</span>
                <p className="text-slate-700 font-medium">
                  {t.vision_1}
                </p>
              </div>
            </div>

            {/* Misi Perusahaan */}
            <div className="flex items-start gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <ShieldCheck className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <span className="font-bold text-slate-900 text-base block">{t.mission_title}:</span>
                <ul className="grid grid-cols-1 gap-2 text-slate-700 font-medium">
                  {[
                    t.mission_1,
                    t.mission_2,
                    t.mission_3,
                    t.mission_4,
                    t.mission_5,
                    t.mission_6,
                    t.mission_7
                  ].map((misi, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>{misi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: SCOPE OF SERVICES */}
        <section className="space-y-8 border-t border-slate-100 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-display font-black text-xs sm:text-sm uppercase tracking-widest border border-red-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{t.services_title}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicesList.map((srv, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-display font-black text-sm text-[#0d1b37] uppercase flex items-center gap-2">
                  <span className="text-red-600">0{idx + 1}.</span> {srv.title}
                </h4>
                <p className="font-sans text-xs text-slate-600 font-medium leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
            📍 <strong>{isEN ? 'Office Location:' : 'Alamat Operasional:'}</strong> {t.footer_address_text} | 📱 <strong>WhatsApp:</strong> 0813-2126-4200
          </div>
        </section>

      </div>
    </div>
  );
}
