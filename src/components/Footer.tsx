import React from 'react';
import { MapPin, Phone, Facebook, Instagram, Clock, MessageCircle, Navigation, Compass, ExternalLink } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  lang: 'ID' | 'EN';
}

export default function Footer({ onNavigateSection, lang }: FooterProps) {
  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

  const mapsUrl = 'https://maps.app.goo.gl/7sMozjfWKuEdYJ6P9?g_st=awb';
  const igUrl = 'https://www.instagram.com/putri_munggaran_travel?igsi=MTFidmlwbWRjY3VvYw==';
  const fbUrl = 'https://facebook.com/Tatakusmawan68';
  const waUrl = 'https://api.whatsapp.com/send?phone=6281321264200&text=Halo%20Putri%20Munggaran%20Tour%20%26%20Travel,%20saya%20ingin%20konsultasi%20layanan%20transportasi%20dan%20perjalanan';

  return (
    <footer id="footer-contact" className="bg-[#061226] text-white overflow-hidden border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-14">
        
        {/* 1. Top Callout Card */}
        <div className="bg-gradient-to-r from-[#0b1736] via-[#0d2847] to-[#081836] rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800/50">
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
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs uppercase px-7 py-4 rounded-full shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2.5 cursor-pointer transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.footer_callout_wa_btn}</span>
            </a>
          </div>
        </div>

        {/* 2. Interactive Google Maps & Location Section */}
        <div className="bg-[#0b1b36] rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 font-extrabold text-[10px] uppercase tracking-widest border border-emerald-800/50">
                <MapPin className="w-3.5 h-3.5" />
                <span>PETA LOKASI KANTOR RESMI</span>
              </div>
              <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Google Maps &amp; Titik Koordinat Kantor
              </h4>
              <p className="font-sans text-xs text-slate-300">
                <strong>Plus Code / Koordinat:</strong> 8G69+C9M PM TOUR and TRAVEL, Karangbenda, Kec. Parigi, Kab. Pangandaran, Jawa Barat 46393
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs uppercase px-6 py-3 rounded-full shadow-md transition-all self-start sm:self-center shrink-0 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>{isEN ? 'Open in Google Maps' : 'Buka di Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Embedded Google Maps View */}
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner relative bg-slate-900">
            <iframe
              title="Google Maps PM Tour & Travel"
              src="https://maps.google.com/maps?q=8G69%2BC9M+PM+TOUR+and+TRAVEL,+Jl.+Raya+Parigi,+Karangbenda,+Kec.+Parigi,+Kab.+Pangandaran,+Jawa+Barat+46393&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* 3. Core Footer Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left border-b border-slate-800/80 pb-12">
          
          {/* Column 1: Company Profile & Logo */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/pm_logo.jpg"
                alt="Putri Munggaran Tour & Travel Logo"
                className="h-14 w-14 rounded-full object-cover border-2 border-emerald-500/60 shadow-md shrink-0"
              />
              <div>
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white uppercase block">
                  PUTRI <span className="text-emerald-400">MUNGGARAN</span>
                </span>
                <span className="font-sans text-[11px] font-bold text-slate-300 tracking-wider block mt-0.5 uppercase">
                  TOUR &amp; TRAVEL • {t.hero_motto}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-md font-medium">
              {t.footer_col1_desc}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                {t.footer_motto_label}
              </span>
              <p className="font-sans text-xs text-slate-300 italic font-semibold">
                {t.footer_motto_text}
              </p>
            </div>
          </div>

          {/* Column 2: Official Address, WhatsApp & Social Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-black text-sm uppercase text-emerald-400 tracking-wider">
              {lang === 'EN' ? 'Office & Contact Information' : 'Alamat Kantor & Kontak'}
            </h4>

            <div className="space-y-3.5 text-xs text-slate-300 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">{t.footer_address_title}</span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-emerald-400 leading-relaxed block transition-colors"
                  >
                    Jl. Raya Parigi, Blok Kemplung, Karangbenda, Kec. Parigi, Kab. Pangandaran, Jawa Barat 46393
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">{t.footer_wa_title}</span>
                  <a
                    href="https://api.whatsapp.com/send?phone=6281321264200"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline block font-bold"
                  >
                    0813-2126-4200
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Instagram Resmi:</span>
                  <a
                    href={igUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 hover:underline block font-medium"
                  >
                    @putri_munggaran_travel
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-center gap-2.5">
                <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">{t.footer_facebook_title}</span>
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline block font-medium"
                  >
                    Tatakusmawan68
                  </a>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">
                    {lang === 'EN' ? 'Operational Hours:' : 'Jam Operasional:'}
                  </span>
                  <span className="text-slate-400 block">
                    {lang === 'EN' ? 'Monday - Sunday: 24 Hours Door-to-Door' : 'Senin - Minggu: 24 Jam Non-Stop'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-black text-sm uppercase text-emerald-400 tracking-wider">
              {t.footer_quick_nav_title}
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400 font-medium">
              <button
                onClick={() => onNavigateSection('home')}
                className="block hover:text-emerald-400 transition-colors text-left cursor-pointer"
              >
                ➔ {t.nav_home}
              </button>
              <button
                onClick={() => onNavigateSection('about')}
                className="block hover:text-emerald-400 transition-colors text-left cursor-pointer"
              >
                ➔ {t.nav_about}
              </button>
              <button
                onClick={() => onNavigateSection('cars')}
                className="block hover:text-emerald-400 transition-colors text-left cursor-pointer"
              >
                ➔ {t.nav_rentals}
              </button>
              <button
                onClick={() => onNavigateSection('destinations')}
                className="block hover:text-emerald-400 transition-colors text-left cursor-pointer"
              >
                ➔ {t.nav_destinations}
              </button>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-emerald-400 transition-colors text-left"
              >
                ➔ Lokasi Google Maps
              </a>
              <a
                href={igUrl}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-pink-400 transition-colors text-left"
              >
                ➔ Instagram @putri_munggaran_travel
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 font-medium">
          <p>© 2026 Putri Munggaran Tour & Travel. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
