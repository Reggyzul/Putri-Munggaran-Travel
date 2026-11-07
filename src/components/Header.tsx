import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteContent } from '../context/SiteContentContext';

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
  setLang
}: HeaderProps) {
  const { content } = useSiteContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = content.translations[lang];
  const isEN = lang === 'EN';

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
    { id: 'home', label: t.nav_home || (isEN ? 'HOME' : 'BERANDA') },
    { id: 'about-page', label: t.nav_about || (isEN ? 'ABOUT US' : 'TENTANG KAMI') },
    { id: 'cars', label: t.nav_rentals || (isEN ? 'ARMADA' : 'ARMADA') },
    { id: 'destinations', label: t.nav_destinations || (isEN ? 'DESTINATIONS' : 'DESTINASI WISATA') },
    { id: 'footer-contact', label: t.nav_contact || (isEN ? 'CONTACT' : 'KONTAK') }
  ];

  const waUrl = `https://api.whatsapp.com/send?phone=${content.brand.whatsappNumber}&text=${encodeURIComponent(
    isEN ? content.brand.whatsappDefaultMessageEN : content.brand.whatsappDefaultMessageID
  )}`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* MAIN CLEAN WHITE NAVBAR */}
      <div
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'py-3 shadow-md border-b border-slate-200/80'
            : 'py-3.5 border-b border-slate-100 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Brand Logo + Typography */}
            <div
              onClick={() => handleItemClick('home')}
              className="flex items-center gap-3.5 cursor-pointer group shrink-0"
              id="header-logo"
            >
              {content.brand.logoUrl ? (
                <img
                  src={content.brand.logoUrl}
                  alt={`${content.brand.brandFirstName} ${content.brand.brandSecondName} Logo`}
                  className="h-11 sm:h-12 w-auto object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform shrink-0"
                />
              ) : (
                <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-xl bg-emerald-50 border border-emerald-200 shrink-0" />
              )}

              <div className="flex flex-col leading-tight">
                <span className="font-display font-black text-lg sm:text-2xl tracking-tight text-slate-900 uppercase">
                  {content.brand.brandFirstName}{' '}
                  <span className="text-emerald-600">{content.brand.brandSecondName}</span>
                </span>
                <span className="font-sans font-bold text-[9.5px] sm:text-[10.5px] text-slate-500 tracking-widest uppercase">
                  {content.brand.brandSubtitle}
                </span>
              </div>
            </div>

            {/* Right: Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center justify-end gap-7 text-[13px] uppercase tracking-wider font-sans font-extrabold text-slate-800"
              id="desktop-nav"
            >
              {navItems.map((item) => {
                const isActive =
                  activeSection === item.id ||
                  (item.id === 'about-page' && (activeSection === 'about' || activeSection === 'about-page'));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`relative py-1 transition-all duration-200 cursor-pointer uppercase ${
                      isActive
                        ? 'text-emerald-600 font-black'
                        : 'text-slate-800 hover:text-emerald-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                      />
                    )}
                  </button>
                );
              })}

              {/* Language Switcher Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-bold text-slate-600 ml-1">
                <button
                  onClick={() => setLang('ID')}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    lang === 'ID' ? 'text-emerald-600 font-black' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  ID
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setLang('EN')}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    lang === 'EN' ? 'text-emerald-600 font-black' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Quick WhatsApp Contact Pill */}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs uppercase px-5 py-2.5 rounded-full shadow-sm hover:shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>{isEN ? content.heroCtaPrimaryEN : content.heroCtaPrimaryID}</span>
              </a>
            </nav>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
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
            className="lg:hidden bg-white border-b border-slate-200 shadow-2xl overflow-hidden text-left"
            id="mobile-menu-drawer"
          >
            <div className="px-5 pt-3 pb-6 space-y-2 text-slate-800">
              {navItems.map((item) => {
                const isActive =
                  activeSection === item.id ||
                  (item.id === 'about-page' && (activeSection === 'about' || activeSection === 'about-page'));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`block w-full text-left font-display font-bold text-sm py-2.5 border-b border-slate-100 uppercase transition-colors ${
                      isActive ? 'text-emerald-600 font-extrabold' : 'text-slate-800 hover:text-emerald-600'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {lang === 'EN' ? 'Language:' : 'Pilih Bahasa:'}
                </span>
                <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">
                  <button
                    onClick={() => setLang('ID')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      lang === 'ID' ? 'text-emerald-600 font-black' : 'text-slate-600'
                    }`}
                  >
                    ID
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => setLang('EN')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      lang === 'EN' ? 'text-emerald-600 font-black' : 'text-slate-600'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Mobile Contact Button */}
              <div className="pt-3 space-y-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs uppercase py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>CONTACT WHATSAPP</span>
                </a>
                <button
                  onClick={() => handleItemClick('admin')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs py-2.5 rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dashboard Admin</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
