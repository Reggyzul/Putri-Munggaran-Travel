import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  lang: 'ID' | 'EN';
  setLang: (lang: 'ID' | 'EN') => void;
  onBookingClick: () => void;
}

export default function Header({
  activeSection,
  onNavClick,
  lang,
  setLang,
  onBookingClick
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavClick(sectionId);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      
      {/* MAIN NAVBAR */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-200/90'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. LEFT: LOGO BRAND */}
            <div 
              onClick={() => handleItemClick('home')}
              className="flex items-center gap-2 cursor-pointer group shrink-0"
              id="header-logo"
            >
              <img
                src="/restu_logo.png"
                alt="Restu Tour & Transport Logo"
                className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col leading-snug">
                <span className="font-display font-black text-sm sm:text-base uppercase tracking-tight transition-colors">
                  <span className="text-red-600">RESTU TOUR</span> <span className="text-[#0f2b5c]">&amp; TRANSPORT</span>
                </span>
                <span className="font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500">
                  Solusi Transportasi &amp; Wisata
                </span>
              </div>
            </div>

            {/* 2. CENTER: DESKTOP NAV LINKS */}
            <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-xs font-sans font-bold text-slate-700 flex-1 px-4" id="desktop-nav">
              
              <button
                onClick={() => handleItemClick('home')}
                className={`hover:text-red-600 transition-colors cursor-pointer py-1 ${
                  activeSection === 'home' ? 'text-red-600 font-black border-b-2 border-red-600' : ''
                }`}
              >
                {t.nav_home}
              </button>

              <button
                onClick={() => handleItemClick('about')}
                className={`hover:text-red-600 transition-colors cursor-pointer py-1 ${
                  activeSection === 'about' ? 'text-red-600 font-black border-b-2 border-red-600' : ''
                }`}
              >
                {t.nav_about}
              </button>

              <button
                onClick={() => handleItemClick('destinations')}
                className={`hover:text-red-600 transition-colors cursor-pointer py-1 ${
                  activeSection === 'destinations' ? 'text-red-600 font-black border-b-2 border-red-600' : ''
                }`}
              >
                {t.nav_destinations}
              </button>

              <button
                onClick={() => handleItemClick('cars')}
                className={`hover:text-red-600 transition-colors cursor-pointer py-1 ${
                  activeSection === 'cars' ? 'text-red-600 font-black border-b-2 border-red-600' : ''
                }`}
              >
                {t.nav_rentals}
              </button>

            </nav>

            {/* 3. RIGHT: LANGUAGE SWITCHER TOGGLE & BOOK A TOUR BUTTON */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              
              {/* Language Switcher Toggle (ID / EN) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setLang('ID')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    lang === 'ID'
                      ? 'bg-red-600 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Bahasa Indonesia (Utama)"
                >
                  <span>🇮🇩 ID</span>
                </button>
                <button
                  onClick={() => setLang('EN')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    lang === 'EN'
                      ? 'bg-red-600 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="English Language"
                >
                  <span>🇬🇧 EN</span>
                </button>
              </div>

              <button
                onClick={onBookingClick}
                className="bg-gradient-to-r from-[#0f2b5c] via-blue-700 to-[#dc2626] hover:from-red-600 hover:to-[#0f2b5c] text-white font-display font-black text-xs uppercase px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer tracking-wider"
                id="header-book-tour-btn"
              >
                {lang === 'EN' ? 'BOOK A TOUR' : 'PESAN TOUR'}
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden text-left"
            id="mobile-menu-drawer"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              <button
                onClick={() => handleItemClick('home')}
                className="block w-full text-left font-display font-bold text-sm text-slate-800 hover:text-red-600 py-2 border-b border-slate-100"
              >
                {t.nav_home}
              </button>
              <button
                onClick={() => handleItemClick('about')}
                className="block w-full text-left font-display font-bold text-sm text-slate-800 hover:text-red-600 py-2 border-b border-slate-100"
              >
                {t.nav_about}
              </button>
              <button
                onClick={() => handleItemClick('destinations')}
                className="block w-full text-left font-display font-bold text-sm text-slate-800 hover:text-red-600 py-2 border-b border-slate-100"
              >
                {t.nav_destinations}
              </button>
              <button
                onClick={() => handleItemClick('cars')}
                className="block w-full text-left font-display font-bold text-sm text-slate-800 hover:text-red-600 py-2 border-b border-slate-100"
              >
                {t.nav_rentals}
              </button>

              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">Pilih Bahasa / Language:</span>
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setLang('ID')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      lang === 'ID'
                        ? 'bg-red-600 text-white font-extrabold'
                        : 'text-slate-600'
                    }`}
                  >
                    🇮🇩 ID
                  </button>
                  <button
                    onClick={() => setLang('EN')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      lang === 'EN'
                        ? 'bg-red-600 text-white font-extrabold'
                        : 'text-slate-600'
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookingClick();
                  }}
                  className="w-full bg-[#dc2626] text-white font-display font-bold text-xs uppercase py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <span>{lang === 'EN' ? 'BOOK A TOUR' : 'PESAN TOUR'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


