import React from 'react';
import { Sparkles, ShieldCheck, Award, Navigation, UserCheck, HeartHandshake, CheckCircle2, Car, MessageCircle, MapPin, Phone, Facebook } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { motion } from 'motion/react';

interface AboutPageProps {
  lang: 'ID' | 'EN';
  onNavigateHome: () => void;
}

export default function AboutPage({ lang, onNavigateHome }: AboutPageProps) {
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

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
      icon: <MessageCircle className="w-5 h-5 text-red-600" />,
      title: t.strength_booking_title,
      desc: t.strength_booking_desc
    }
  ];

  const servicesList = [
    { title: t.service_1_title, desc: t.service_1_desc },
    { title: t.service_2_title, desc: t.service_2_desc },
    { title: t.service_3_title, desc: t.service_3_desc },
    { title: t.service_4_title, desc: t.service_4_desc },
    { title: t.service_5_title, desc: t.service_5_desc },
    { title: t.service_6_title, desc: t.service_6_desc }
  ];

  const handleWhatsAppClick = () => {
    const waNumber = '6281321264200';
    const message = isEN
      ? `Hello Putri Munggaran Tour & Travel, I would like to ask more about your profile & travel services. Thank you!`
      : `Halo Putri Munggaran Tour & Travel, saya ingin berkonsultasi mengenai layanan transportasi dan perjalanan. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <div className="bg-white text-[#0d1b37] min-h-screen pt-20 text-left">
      
      {/* 1. TOP HEADER BANNER */}
      <div className="relative w-full h-[230px] sm:h-[290px] bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

        <div className="relative z-10 text-center space-y-2 px-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-[10px] uppercase tracking-widest mb-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>TENTANG KAMI • PROFIL PERUSAHAAN</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
            {t.nav_about}
          </h1>

          <p className="font-sans text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span onClick={onNavigateHome} className="hover:text-red-400 cursor-pointer">{t.dest_breadcrumb_home}</span> / {t.nav_about}
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* SECTION 1: BUSINESS PROFILE & DESCRIPTION */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <img
              src="/pm_logo.jpg"
              alt="Putri Munggaran Tour & Travel Logo"
              className="h-20 w-20 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-100 text-red-600 font-extrabold text-[10px] uppercase tracking-widest border border-red-200">
                <span>{t.about_tag}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#0d1b37] uppercase tracking-tight">
                {t.about_title_1}
              </h2>
              <p className="font-sans text-xs sm:text-sm font-bold text-red-600 uppercase tracking-wide">
                {t.about_title_2} • “{t.hero_motto}”
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-display font-black text-lg text-[#0d1b37] uppercase">
                  {isEN ? 'Company Background & Concept' : 'Deskripsi & Konsep Layanan'}
                </h3>
                <p className="font-sans text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {t.about_desc_1}
                </p>
                <p className="font-sans text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {t.about_desc_2}
                </p>
                <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                  {t.about_desc_3}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0b1736] via-[#102454] to-slate-950 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full inline-block">
                  INFO RINGKAS
                </span>
                <div className="space-y-2 text-xs text-slate-200">
                  <p><strong>Nama:</strong> Putri Munggaran Tour &amp; Travel</p>
                  <p><strong>Tagline:</strong> “Aman, Nyaman, Sampai Tujuan.”</p>
                  <p><strong>Layanan:</strong> Door-to-Door Travel, Antar-Jemput, Private Trip</p>
                  <p><strong>Rute Utama:</strong> Pangandaran – Bandung – Jabodetabek</p>
                  <p><strong>Armada:</strong> Avanza, Calya, Rush, Hiace</p>
                </div>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs uppercase py-3 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isEN ? 'Chat Admin via WA' : 'Hubungi Admin via WA'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: VISI & MISI */}
        <section className="space-y-6 border-t border-slate-100 pt-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-display font-black text-xs text-red-600 tracking-widest uppercase bg-red-100 px-3.5 py-1 rounded-full border border-red-200 inline-block">
              VISI &amp; MISI PERUSAHAAN
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0d1b37] uppercase">
              Landasan &amp; Komitmen Pelayanan
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visi */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0b1736] via-[#102454] to-slate-950 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between space-y-6 border border-slate-700/60">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">
                      {t.vision_title}
                    </span>
                    <h4 className="font-display font-black text-xl text-white uppercase tracking-tight">
                      PUTRI MUNGGARAN
                    </h4>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <p className="font-sans text-sm sm:text-base text-slate-100 leading-relaxed font-semibold italic">
                    "{t.vision_1}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-center">
                <span className="font-display font-extrabold text-xs text-amber-300 tracking-wider uppercase block">
                  {t.hero_motto}
                </span>
              </div>
            </div>

            {/* 7 Misi */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-lg space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-[#dc2626]" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    7 PILAR UTAMA
                  </span>
                  <h4 className="font-display font-black text-2xl text-[#0d1b37] uppercase tracking-tight">
                    {t.mission_title}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

          </div>
        </section>

        {/* SECTION 3: 6 KEUNGGULAN */}
        <section className="space-y-6 border-t border-slate-100 pt-12">
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
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-red-200 flex items-center justify-center shadow-xs">
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
        </section>

        {/* SECTION 4: 6 LAYANAN UTAMA */}
        <section className="space-y-6 border-t border-slate-100 pt-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-display font-black text-xs text-red-600 tracking-widest uppercase bg-red-100 px-3.5 py-1 rounded-full border border-red-200 inline-block">
              {t.services_tag}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0d1b37] uppercase">
              {t.services_title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesList.map((srv, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h4 className="font-display font-black text-sm text-[#0d1b37] uppercase flex items-center gap-2">
                  <span className="text-red-600">0{idx + 1}.</span> {srv.title}
                </h4>
                <p className="font-sans text-xs text-slate-600 font-medium leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: ALAMAT & KONTAK LENGKAP */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <h3 className="font-display font-black text-xl text-[#0d1b37] uppercase">
            {isEN ? 'Office Location & Official Contact' : 'Lokasi Kantor & Kontak Resmi'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <MapPin className="w-4 h-4" />
                <span>Alamat Kantor:</span>
              </div>
              <p className="text-slate-700">
                Jl. Raya Parigi, Blok Kemplung, Kabupaten Pangandaran
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <Phone className="w-4 h-4" />
                <span>WhatsApp / HP:</span>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=6281321264200"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 font-bold hover:underline block"
              >
                0813-2126-4200
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <Facebook className="w-4 h-4" />
                <span>Facebook Resmi:</span>
              </div>
              <a
                href="https://facebook.com/Tatakusmawan68"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline block"
              >
                Tatakusmawan68
              </a>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-display font-bold text-xs uppercase cursor-pointer"
            >
              ➔ {isEN ? 'Back to Home' : 'Kembali ke Beranda'}
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs uppercase flex items-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isEN ? 'Consult Trip via WA' : 'Konsultasi Perjalanan via WhatsApp'}</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
