import React from 'react';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface FooterProps {
  lang: 'ID' | 'EN';
  onNavigateSection: (sectionId: string) => void;
}

export default function Footer({ lang, onNavigateSection }: FooterProps) {
  const t = TRANSLATIONS[lang];

  return (
    <footer id="footer-contact" className="bg-[#0b1736] text-white pt-16 pb-12 overflow-hidden relative border-t border-slate-800">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Callout Box */}
        <div className="bg-gradient-to-r from-[#0f2b5c] via-[#1e3a8a] to-[#0b1736] rounded-3xl p-8 border border-blue-800/60 shadow-2xl mb-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 text-left space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-950/80 px-3.5 py-1 rounded-full border border-red-800/50">
              {t.footer_callout_badge}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              {t.footer_callout_title}
            </h3>
            <p className="font-sans text-xs text-slate-300 font-medium max-w-xl leading-relaxed">
              {t.footer_callout_desc}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <a
              href="https://api.whatsapp.com/send?phone=628562042336&text=Halo%20Restu%20Tour%20%26%20Transport,%20saya%20ingin%20konsultasi%20layanan%20sewa%20armada%20dan%20paket%20wisata"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-600 hover:to-amber-700 text-white font-sans font-bold text-xs uppercase px-7 py-4 rounded-full shadow-lg shadow-red-600/25 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.footer_callout_wa_btn}</span>
            </a>
          </div>
        </div>

        {/* Core Footer Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left border-b border-slate-800/80 pb-12">
          
          {/* Column 1: Company Profile & Logo */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/restu_logo.avif"
                alt="Restu Tour & Transport Logo"
                className="h-14 w-auto object-contain shrink-0"
              />
              <div>
                <span className="font-display font-black text-xl tracking-tight text-white uppercase block">
                  RESTU TOUR <span className="text-red-500">& TRANSPORT</span>
                </span>
                <span className="font-sans text-[10px] font-bold text-red-400 tracking-wider block mt-0.5 uppercase">
                  {t.hero_motto}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-md font-medium">
              {t.footer_col1_desc}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-extrabold text-red-400 uppercase tracking-wider block">
                {t.footer_motto_label}
              </span>
              <p className="font-sans text-xs text-slate-300 italic">
                {t.footer_motto_text}
              </p>
            </div>
          </div>

          {/* Column 2: Official Address & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-black text-sm uppercase text-red-500 tracking-wider">
              {lang === 'EN' ? 'Head Office & Contact' : 'Alamat Kantor & Kontak'}
            </h4>

            <div className="space-y-3 text-xs text-slate-300 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">{t.footer_address_title}</span>
                  <span className="text-slate-400 leading-relaxed block">
                    {t.footer_address_text}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <span className="font-bold text-white block">{t.footer_wa_title}</span>
                  <a
                    href="https://api.whatsapp.com/send?phone=628562042336"
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-400 hover:underline block"
                  >
                    08562042336
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <span className="font-bold text-white block">
                    {lang === 'EN' ? 'Service Operating Hours:' : 'Jam Operasional Layanan:'}
                  </span>
                  <span className="text-slate-400 block">
                    {lang === 'EN' ? 'Monday - Sunday: 24/7 Non-Stop' : 'Senin - Minggu: 24 Jam Non-Stop'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-black text-sm uppercase text-red-500 tracking-wider">
              {t.footer_quick_nav_title}
            </h4>

            <div className="space-y-2 text-xs text-slate-400 font-medium">
              <button
                onClick={() => onNavigateSection('home')}
                className="block hover:text-red-400 transition-colors text-left"
              >
                ➔ {t.nav_home}
              </button>
              <button
                onClick={() => onNavigateSection('about')}
                className="block hover:text-red-400 transition-colors text-left"
              >
                ➔ {t.nav_about}
              </button>
              <button
                onClick={() => onNavigateSection('services')}
                className="block hover:text-red-400 transition-colors text-left"
              >
                ➔ {t.nav_destinations}
              </button>
              <button
                onClick={() => onNavigateSection('cars')}
                className="block hover:text-red-400 transition-colors text-left"
              >
                ➔ {t.nav_rentals}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
