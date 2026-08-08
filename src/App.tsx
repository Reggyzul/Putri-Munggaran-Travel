import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutPage from './components/AboutPage';
import Services from './components/Services';
import CarList from './components/CarList';
import DestinationHighlightsPage from './components/DestinationHighlightsPage';
import TransportRentPage from './components/TransportRentPage';
import BookingSteps from './components/BookingSteps';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Car } from './types';
import { CARS } from './data/cars';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from './utils/translations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'rentals' | 'destinations'>('home');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      if (currentPage === 'home') {
        const sections = ['home', 'destinations', 'cars', 'footer-contact'];
        const scrollPosition = window.scrollY + 250;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'about-page' || sectionId === 'about') {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('about');
    } else if (sectionId === 'cars' || sectionId === 'rentals' || sectionId === 'transport-rent') {
      setCurrentPage('rentals');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('rentals');
    } else if (sectionId === 'destinations-page' || sectionId === 'destinations') {
      setCurrentPage('destinations');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('destinations');
    } else if (sectionId === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }
    }
  };

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppChat = () => {
    const waNumber = '628562042336';
    const text = encodeURIComponent('Halo Restu Tour & Transport, saya ingin berkonsultasi mengenai sewa armada & paket wisata. Mohon informasi.');
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${text}`, '_blank', 'noreferrer');
  };

  return (
    <div 
      className="relative min-h-screen bg-white text-slate-900 selection:bg-red-600 selection:text-white font-sans" 
      id="main-app-container"
    >
      
      {/* Navigation Header */}
      <Header 
        activeSection={activeSection} 
        onNavClick={handleNavClick} 
        lang={lang} 
        setLang={setLang} 
        onBookingClick={() => setSelectedCar(CARS[0])}
      />

      {/* Main Page Content Flow */}
      <main className="relative z-10">
        {currentPage === 'home' ? (
          <>
            <Hero 
              onExploreClick={() => handleNavClick('destinations')} 
              lang={lang} 
              onBookingClick={() => setSelectedCar(CARS[0])} 
            />

            <CarList 
              onSelectCar={handleSelectCar} 
              lang={lang} 
              onViewAllCars={() => handleNavClick('rentals')}
            />

            <Services 
              lang={lang} 
              onViewAllDestinations={() => handleNavClick('destinations')}
            />

            <BookingSteps lang={lang} />

            <Testimonials lang={lang} />
          </>
        ) : currentPage === 'about' ? (
          <AboutPage lang={lang} onNavigateHome={() => handleNavClick('home')} />
        ) : currentPage === 'destinations' ? (
          <DestinationHighlightsPage lang={lang} onNavigateHome={() => handleNavClick('home')} />
        ) : (
          <TransportRentPage 
            onSelectCar={handleSelectCar} 
            lang={lang} 
            onNavigateHome={() => handleNavClick('home')} 
          />
        )}
      </main>

      {/* Footer Contact */}
      <Footer onNavigateSection={handleNavClick} lang={lang} />

      {/* Booking Popup Modal */}
      <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} lang={lang} onCarChange={setSelectedCar} />

      {/* FLOATING ASSISTANT AVATAR WIDGET */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700 mb-1"
              title="Kembali ke atas"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Official WhatsApp Floating Action Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppChat}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-all cursor-pointer border-2 border-white relative group"
          id="floating-whatsapp-widget"
          title="Chat WhatsApp Resmi Restu Tour & Transport"
        >
          {/* Official Full WhatsApp SVG Logo */}
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.826 0-3.623-.49-5.196-1.42l-.372-.222-3.864 1.013 1.031-3.765-.244-.388a10.026 10.026 0 0 1-1.536-5.356c0-5.545 4.512-10.057 10.06-10.057 2.684 0 5.207 1.046 7.104 2.946a10.007 10.007 0 0 1 2.945 7.108c-.001 5.547-4.514 10.059-10.062 10.059m0-18.061v.003c-4.41 0-8.001 3.59-8.003 8.002-.001 1.411.367 2.788 1.065 4.001l.163.284-.704 2.571 2.632-.69.274.163a7.973 7.973 0 0 0 4.573 1.412h.004c4.409 0 8.001-3.59 8.003-8.003 0-2.137-.832-4.146-2.343-5.658a7.962 7.962 0 0 0-5.66-2.34"/>
          </svg>

          {/* Online Pulse Status Dot */}
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white absolute bottom-0 right-0 shadow-xs animate-pulse" />
        </motion.div>

      </div>

    </div>
  );
}


