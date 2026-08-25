import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutPage from './components/AboutPage';
import Destinations from './components/Destinations';
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
  const [lang, setLang] = useState<'EN' | 'ID'>(() => {
    const saved = localStorage.getItem('pm_travel_lang');
    return (saved === 'ID' || saved === 'EN') ? saved : 'ID';
  });

  const t = TRANSLATIONS[lang];

  const handleSetLang = (newLang: 'EN' | 'ID') => {
    setLang(newLang);
    localStorage.setItem('pm_travel_lang', newLang);
  };

  useEffect(() => {
    // Dynamic SEO Metadata Synchronization
    document.documentElement.lang = lang === 'EN' ? 'en' : 'id';
    document.title = t.seo_title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', t.seo_description);
  }, [lang, t.seo_title, t.seo_description]);

  useEffect(() => {
    if (currentPage === 'about') {
      setActiveSection('about');
      return;
    }
    if (currentPage === 'destinations') {
      setActiveSection('destinations');
      return;
    }
    if (currentPage === 'rentals') {
      setActiveSection('cars');
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      if (currentPage === 'home') {
        const sections = ['home', 'cars', 'destinations', 'steps', 'testimonials', 'footer-contact'];
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
    if (sectionId === 'about' || sectionId === 'about-page') {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'rentals' || sectionId === 'cars-page') {
      setCurrentPage('rentals');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'destinations-page') {
      setCurrentPage('destinations');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'destinations' || sectionId === 'cars' || sectionId === 'footer-contact') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans antialiased selection:bg-emerald-600 selection:text-white">
      
      {/* Header Bar */}
      <Header
        activeSection={activeSection}
        onNavClick={handleNavClick}
        lang={lang}
        setLang={handleSetLang}
        onBookingClick={() => setSelectedCar(CARS[0])}
      />

      {/* Main Page Dynamic Router View */}
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero 
              onExploreClick={() => handleNavClick('cars')} 
              lang={lang} 
              onBookingClick={() => setSelectedCar(CARS[0])} 
            />

            <CarList 
              onSelectCar={handleSelectCar} 
              lang={lang} 
              onViewAllCars={() => handleNavClick('rentals')}
            />

            <Destinations 
              lang={lang}
              onViewAllDestinations={() => handleNavClick('destinations-page')}
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
              className="w-10 h-10 rounded-full bg-[#0d1b37] text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
              title={lang === 'EN' ? "Scroll to top" : "Kembali ke atas"}
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Action Button */}
        <motion.a
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          href="https://api.whatsapp.com/send?phone=6281321264200&text=Halo%20Putri%20Munggaran%20Tour%20%26%20Travel,%20saya%20ingin%20konsultasi%20layanan%20transportasi%20dan%20perjalanan"
          target="_blank"
          rel="noreferrer"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white cursor-pointer"
          title={lang === 'EN' ? "Chat with Putri Munggaran on WhatsApp" : "Hubungi Putri Munggaran via WhatsApp"}
        >
          {/* Authentic WhatsApp Logo SVG */}
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.333 4.988l-1.417 5.174 5.293-1.389c1.455.793 3.096 1.211 4.777 1.212h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.919-7.061-1.885-1.884-4.394-2.922-7.061-2.923zm5.952 14.183c-.251.706-1.258 1.346-1.742 1.402-.457.052-1.042.1-3.056-.731-2.585-1.066-4.227-3.704-4.356-3.876-.128-.172-1.047-1.396-1.047-2.663 0-1.267.662-1.889.897-2.14.235-.251.512-.314.683-.314.171 0 .342.002.49.009.158.007.37-.06.578.439.214.513.726 1.77.79 1.9.064.129.107.279.021.45-.085.171-.128.278-.256.427-.128.149-.27.333-.385.448-.128.128-.261.268-.112.524.15.255.664 1.096 1.427 1.776.981.874 1.808 1.144 2.064 1.272.256.128.406.107.556-.064.15-.171.641-.748.812-1.004.171-.256.342-.214.577-.128.235.085 1.493.704 1.75 1.004.256.3.256.556.005 1.262z" />
          </svg>

          {/* Active online pulse ring */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </motion.a>
      </div>

    </div>
  );
}
