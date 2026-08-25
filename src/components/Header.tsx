import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
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

  const navItems = [
    { id: 'home', label: t.nav_home },
    { id: 'about-page', label: t.nav_about },
    { id: 'destinations', label: t.nav_destinations },
    { id: 'cars', label: t.nav_rentals },
    { id: 'footer-contact', label: t.nav_contact }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      
      {/* 1. TOP SLIM BAR */}
      <div className="w-full bg-[#061226] text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-sans border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Direct Phone/WhatsApp */}
          <a
            href="https://api.whatsapp.com/send?phone=6281321264200&text=Halo%20Putri%20Munggaran%20Tour%20%26%20Travel,%20saya%20ingin%20konsultasi%20layanan%20transportasi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-amber-300 hover:text-white font-bold transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>0813-2126-4200</span>
          </a>

          {/* Right: Language Switch */}
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <button
              onClick={() => setLang('ID')}
              className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                lang === 'ID' ? 'text-amber-400 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              ID
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setLang('EN')}
              className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                lang === 'EN' ? 'text-amber-400 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#081836]/95 backdrop-blur-md py-2.5 shadow-xl'
            : 'bg-[#081836] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Brand Logo & Typography with crisp white background badge */}
            <div 
              onClick={() => handleItemClick('home')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
              id="header-logo"
            >
              <div className="bg-white p-1 rounded-xl shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0 flex items-center justify-center">
                <img
                  src="/pm_logo.jpg"
                  alt="Putri Munggaran Tour & Travel Logo"
                  className="h-8 sm:h-9 w-auto object-contain rounded-lg"
                />
              </div>
              
              <div className="flex flex-col leading-tight">
                <span className="font-display font-black text-base sm:text-lg tracking-tight text-white uppercase">
                  PUTRI MUNGGARAN <span className="text-red-500">TOUR & TRAVEL</span>
                </span>
                <span className="font-sans font-bold text-[9px] sm:text-[10px] text-slate-300 tracking-wider uppercase">
                  {t.hero_motto}
                </span>
              </div>
            </div>

            {/* Center/Right: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center justify-end gap-7 text-xs uppercase tracking-wider font-sans font-extrabold text-slate-200" id="desktop-nav">
              {navItems.map((item) => {
                const isActive = activeSection === item.id || (item.id === 'about-page' && (activeSection === 'about' || activeSection === 'about-page'));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`relative py-1 transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'text-red-400 font-black' 
                        : 'text-slate-200 hover:text-red-400'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                      />
                    )}
                  </button>
                );
              })}

              {/* Book CTA Button */}
              <button
                onClick={onBookingClick}
                className="bg-[#dc2626] hover:bg-red-700 text-white font-display font-black text-xs uppercase px-5 py-2.5 rounded-xl shadow-md hover:shadow-red-600/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer tracking-wider flex items-center gap-1.5 ml-2"
                id="header-book-btn"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>{t.nav_book_btn}</span>
              </button>
            </nav>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
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
            className="lg:hidden bg-[#081836] border-b border-white/10 shadow-2xl overflow-hidden text-left"
            id="mobile-menu-drawer"
          >
            <div className="px-5 pt-3 pb-6 space-y-2 text-white">
              {navItems.map((item) => {
                const isActive = activeSection === item.id || (item.id === 'about-page' && (activeSection === 'about' || activeSection === 'about-page'));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`block w-full text-left font-display font-bold text-sm py-2.5 border-b border-slate-700 transition-colors ${
                      isActive ? 'text-red-400 font-extrabold' : 'text-slate-200 hover:text-red-400'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookingClick();
                  }}
                  className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-display font-bold text-xs uppercase py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t.nav_book_btn}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
