import { Car } from '../types';
import { CARS, TESTIMONIALS, TestimonialItem } from './cars';
import { PANGANDARAN_DESTINATIONS, DestinationItem } from '../components/Destinations';
import { TRANSLATIONS, TranslationSchema } from '../utils/translations';

export interface HeroSlideItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  descID: string;
  descEN: string;
}

export interface BookingStepItem {
  step: string;
  titleID: string;
  titleEN: string;
  descID: string;
  descEN: string;
}

export interface StrengthItem {
  id: string;
  titleID: string;
  titleEN: string;
  descID: string;
  descEN: string;
}

export interface ServiceItem {
  id: string;
  titleID: string;
  titleEN: string;
  descID: string;
  descEN: string;
}

export interface BookingServiceOption {
  value: string;
  labelID: string;
  labelEN: string;
}

export interface BrandContactConfig {
  brandFirstName: string;
  brandSecondName: string;
  brandSubtitle: string;
  motto: string;
  logoUrl: string;
  faviconUrl: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappDefaultMessageID: string;
  whatsappDefaultMessageEN: string;
  officeAddress: string;
  officeCoordinates: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookName: string;
  facebookUrl: string;
  operationalHoursID: string;
  operationalHoursEN: string;
  copyrightText: string;
}

export interface PageBannersConfig {
  aboutBannerImage: string;
  aboutBannerBadgeID: string;
  aboutBannerBadgeEN: string;
  destinationsBannerImage: string;
  destinationsBannerBadgeID: string;
  destinationsBannerBadgeEN: string;
  destinationsPageSubtitleID: string;
  destinationsPageSubtitleEN: string;
  destinationsCalloutBadge: string;
  destinationsCalloutTitleID: string;
  destinationsCalloutTitleEN: string;
  destinationsCalloutDescID: string;
  destinationsCalloutDescEN: string;
  rentalsBannerImage: string;
  rentalsBannerBadgeID: string;
  rentalsBannerBadgeEN: string;
}

export interface AboutQuickInfo {
  badgeText: string;
  companyName: string;
  tagline: string;
  servicesSummary: string;
  mainRoute: string;
  fleetSummary: string;
}

export interface SiteContent {
  _fromSupabase?: boolean;
  updatedAt: string;
  brand: BrandContactConfig;
  banners: PageBannersConfig;
  heroSlides: HeroSlideItem[];
  heroCtaPrimaryID: string;
  heroCtaPrimaryEN: string;
  heroCtaSecondaryID: string;
  heroCtaSecondaryEN: string;
  cars: Car[];
  destinations: (DestinationItem & { category?: 'pantai' | 'alam' })[];
  testimonials: TestimonialItem[];
  steps: BookingStepItem[];
  aboutQuickInfo: AboutQuickInfo;
  missionsID: string[];
  missionsEN: string[];
  strengths: StrengthItem[];
  services: ServiceItem[];
  bookingServiceOptions: BookingServiceOption[];
  translations: Record<'ID' | 'EN', TranslationSchema>;
}

export const GALLERY_PRESET_IMAGES: { label: string; url: string; category: string }[] = [
  { label: 'Logo Putri Munggaran (JPG)', url: '/pm_logo.jpg', category: 'Logo & Brand' },
  { label: 'Logo Travel (PNG)', url: '/logo.png', category: 'Logo & Brand' },
  { label: 'Hero Armada Putri Munggaran', url: '/hero_armada_pm.jpg', category: 'Hero & Banner' },
  { label: 'Hero Pantai Pangandaran', url: '/hero_pangandaran.jpg', category: 'Hero & Banner' },
  { label: 'Toyota Avanza (AVIF)', url: '/avanza.avif', category: 'Armada' },
  { label: 'New Calya (AVIF)', url: '/calya.avif', category: 'Armada' },
  { label: 'New Calya 2 (AVIF)', url: '/calya1.avif', category: 'Armada' },
  { label: 'Toyota Rush (JPG)', url: '/rush.jpg', category: 'Armada' },
  { label: 'Toyota Hiace (AVIF)', url: '/hiace.avif', category: 'Armada' },
  { label: 'Hiace Premio (AVIF)', url: '/hiace_premio.avif', category: 'Armada' },
  { label: 'Toyota Innova (AVIF)', url: '/innova3.avif', category: 'Armada' },
  { label: 'Toyota Alphard (JPG)', url: '/alphard.jpg', category: 'Armada' },
  { label: 'Daihatsu Sigra (AVIF)', url: '/sigra.avif', category: 'Armada' },
  { label: 'Daihatsu Xenia (AVIF)', url: '/xenia.avif', category: 'Armada' },
  { label: 'Suzuki APV (AVIF)', url: '/apv.avif', category: 'Armada' },
  { label: 'Isuzu Elf Long (PNG)', url: '/elf_long.png', category: 'Armada' },
  { label: 'Pantai Batu Hiu', url: '/dest_batu_hiu.jpg', category: 'Destinasi Wisata' },
  { label: 'Pantai Batukaras', url: '/dest_batukaras.jpg', category: 'Destinasi Wisata' },
  { label: 'Pantai Madasari', url: '/dest_madasari.jpg', category: 'Destinasi Wisata' },
  { label: 'Green Canyon Pangandaran', url: '/dest_green_canyon.jpg', category: 'Destinasi Wisata' },
  { label: 'Body Rafting Citumang', url: '/dest_citumang.jpg', category: 'Destinasi Wisata' },
  { label: 'Pasir Putih Pangandaran', url: '/dest_pasir_putih.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Pangandaran', url: '/dest_pangandaran.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Bandung', url: '/dest_bandung.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Jakarta', url: '/dest_jakarta.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Jogja', url: '/dest_jogja.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Bromo', url: '/dest_bromo.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Dieng', url: '/dest_dieng.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Bali', url: '/dest_bali.jpg', category: 'Destinasi Wisata' },
  { label: 'Destinasi Lombok', url: '/dest_lombok.jpg', category: 'Destinasi Wisata' }
];

// Default content WITHOUT hardcoded fallback image URLs so images never flash before Supabase loads
export const DEFAULT_SITE_CONTENT: SiteContent = {
  _fromSupabase: false,
  updatedAt: new Date().toISOString(),
  brand: {
    brandFirstName: 'PUTRI',
    brandSecondName: 'MUNGGARAN',
    brandSubtitle: 'TOUR & TRAVEL',
    motto: '“AMAN, NYAMAN, SAMPAI TUJUAN.”',
    logoUrl: '/pm_logo.jpg',
    faviconUrl: '/pm_logo.jpg',
    whatsappNumber: '6281321264200',
    whatsappDisplay: '0813-2126-4200',
    whatsappDefaultMessageID: 'Halo Putri Munggaran Tour & Travel, saya ingin konsultasi layanan transportasi dan perjalanan',
    whatsappDefaultMessageEN: 'Hello Putri Munggaran Tour & Travel, I would like to consult on transportation and travel services',
    officeAddress: 'Jl. Raya Parigi, Blok Kemplung, Karangbenda, Kec. Parigi, Kab. Pangandaran, Jawa Barat 46393',
    officeCoordinates: '8G69+C9M PM TOUR and TRAVEL, Karangbenda, Kec. Parigi, Kab. Pangandaran, Jawa Barat 46393',
    googleMapsUrl: 'https://maps.app.goo.gl/7sMozjfWKuEdYJ6P9?g_st=awb',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=8G69%2BC9M+PM+TOUR+and+TRAVEL,+Jl.+Raya+Parigi,+Karangbenda,+Kec.+Parigi,+Kab.+Pangandaran,+Jawa+Barat+46393&t=&z=16&ie=UTF8&iwloc=&output=embed',
    instagramHandle: '@putri_munggaran_travel',
    instagramUrl: 'https://www.instagram.com/putri_munggaran_travel?igsi=MTFidmlwbWRjY3VvYw==',
    facebookName: 'Tatakusmawan68',
    facebookUrl: 'https://facebook.com/Tatakusmawan68',
    operationalHoursID: 'Senin - Minggu: 24 Jam Non-Stop',
    operationalHoursEN: 'Monday - Sunday: 24 Hours Door-to-Door',
    copyrightText: '© 2026 Putri Munggaran Tour & Travel. All Rights Reserved.'
  },
  banners: {
    aboutBannerImage: '/hero_pangandaran.jpg',
    aboutBannerBadgeID: 'TENTANG KAMI • PROFIL PERUSAHAAN',
    aboutBannerBadgeEN: 'ABOUT US • COMPANY PROFILE',
    destinationsBannerImage: '/hero_pangandaran.jpg',
    destinationsBannerBadgeID: 'DESTINASI WISATA PANGANDARAN',
    destinationsBannerBadgeEN: 'PANGANDARAN TOP DESTINATIONS',
    destinationsPageSubtitleID: '6 Destinasi Wisata Favorit & Populer di Pangandaran',
    destinationsPageSubtitleEN: 'Explore Premier Attractions in Pangandaran',
    destinationsCalloutBadge: 'DOOR-TO-DOOR TRIP PANGANDARAN',
    destinationsCalloutTitleID: 'Ingin Mengunjungi Destinasi di Atas?',
    destinationsCalloutTitleEN: 'Plan Your Pangandaran Tour With Us',
    destinationsCalloutDescID: 'Kami siap menjemput Anda langsung dari rumah di Bandung, Jabodetabek, atau Pangandaran dan mengantar ke seluruh destinasi wisata favorit.',
    destinationsCalloutDescEN: 'We pick you up from your doorstep in Bandung, Jabodetabek, or Pangandaran and take you directly to your chosen destinations.',
    rentalsBannerImage: '/hero_armada_pm.jpg',
    rentalsBannerBadgeID: 'PUTRI MUNGGARAN TOUR & TRAVEL',
    rentalsBannerBadgeEN: 'PUTRI MUNGGARAN TOUR & TRAVEL'
  },
  heroSlides: [
    {
      id: 'slide-1',
      image: '/hero_armada_pm.jpg',
      title: 'PUTRI MUNGGARAN TRAVEL',
      subtitle: 'Pangandaran Tour & Travel',
      descID: 'Layanan Perjalanan Door-to-Door (Pangandaran – Bandung – Jabodetabek), Wisata Keluarga, Gathering, Private Trip, dan Antar-Jemput Rombongan.',
      descEN: 'Door-to-Door Travel Service (Pangandaran – Bandung – Jabodetabek), Family Vacations, Outings, Private Trips, and Group Passenger Transport.'
    },
    {
      id: 'slide-2',
      image: '/hero_human_touch.jpg',
      title: 'PUTRI MUNGGARAN TRAVEL',
      subtitle: 'Aman, Nyaman, Sampai Tujuan',
      descID: 'Didukung armada terawat (Avanza, Calya, Rush, Hiace) dan pengemudi berpengalaman yang siap mengantar perjalanan Anda dengan aman dan nyaman.',
      descEN: 'Supported by clean, well-maintained fleets (Avanza, Calya, Rush, Hiace) and experienced drivers ensuring a safe and comfortable journey.'
    },
    {
      id: 'slide-3',
      image: '/hero_pangandaran.jpg',
      title: 'DESTINASI PANGANDARAN',
      subtitle: 'Pesona Alam & Pantai Eksotis',
      descID: 'Jelajahi Pantai Batu Hiu, Batukaras, Madasari, Green Canyon, Citumang, hingga Pasir Putih bersama Putri Munggaran Tour & Travel.',
      descEN: 'Explore Batu Hiu Beach, Batukaras, Madasari, Green Canyon, Citumang, and White Sand Beach with Putri Munggaran Tour & Travel.'
    }
  ],
  heroCtaPrimaryID: 'CONTACT',
  heroCtaPrimaryEN: 'CONTACT',
  heroCtaSecondaryID: 'Lihat Armada',
  heroCtaSecondaryEN: 'View Fleet',
  cars: CARS.map((car) => ({
    ...car,
    includeList: [...car.includeList],
    specifications: car.specifications.map((s) => ({ ...s }))
  })),
  destinations: PANGANDARAN_DESTINATIONS.map((d) => ({
    ...d,
    category: d.id.includes('green-canyon') || d.id.includes('citumang') ? 'alam' : 'pantai',
    highlights: [...d.highlights],
    highlightsEN: [...d.highlightsEN]
  })),
  testimonials: TESTIMONIALS.map((t) => ({ ...t })),
  steps: [
    {
      step: '01',
      titleID: TRANSLATIONS.ID.step_1_title,
      titleEN: TRANSLATIONS.EN.step_1_title,
      descID: TRANSLATIONS.ID.step_1_desc,
      descEN: TRANSLATIONS.EN.step_1_desc
    },
    {
      step: '02',
      titleID: TRANSLATIONS.ID.step_2_title,
      titleEN: TRANSLATIONS.EN.step_2_title,
      descID: TRANSLATIONS.ID.step_2_desc,
      descEN: TRANSLATIONS.EN.step_2_desc
    },
    {
      step: '03',
      titleID: TRANSLATIONS.ID.step_3_title,
      titleEN: TRANSLATIONS.EN.step_3_title,
      descID: TRANSLATIONS.ID.step_3_desc,
      descEN: TRANSLATIONS.EN.step_3_desc
    }
  ],
  aboutQuickInfo: {
    badgeText: 'INFO RINGKAS',
    companyName: 'Putri Munggaran Tour & Travel',
    tagline: '“Aman, Nyaman, Sampai Tujuan.”',
    servicesSummary: 'Door-to-Door Travel, Antar-Jemput, Private Trip',
    mainRoute: 'Pangandaran – Bandung – Jabodetabek',
    fleetSummary: 'Avanza, Calya, Rush, Hiace'
  },
  missionsID: [
    TRANSLATIONS.ID.mission_1,
    TRANSLATIONS.ID.mission_2,
    TRANSLATIONS.ID.mission_3,
    TRANSLATIONS.ID.mission_4,
    TRANSLATIONS.ID.mission_5,
    TRANSLATIONS.ID.mission_6,
    TRANSLATIONS.ID.mission_7
  ],
  missionsEN: [
    TRANSLATIONS.EN.mission_1,
    TRANSLATIONS.EN.mission_2,
    TRANSLATIONS.EN.mission_3,
    TRANSLATIONS.EN.mission_4,
    TRANSLATIONS.EN.mission_5,
    TRANSLATIONS.EN.mission_6,
    TRANSLATIONS.EN.mission_7
  ],
  strengths: [
    {
      id: 'str-1',
      titleID: TRANSLATIONS.ID.strength_door_title,
      titleEN: TRANSLATIONS.EN.strength_door_title,
      descID: TRANSLATIONS.ID.strength_door_desc,
      descEN: TRANSLATIONS.EN.strength_door_desc
    },
    {
      id: 'str-2',
      titleID: TRANSLATIONS.ID.strength_driver_title,
      titleEN: TRANSLATIONS.EN.strength_driver_title,
      descID: TRANSLATIONS.ID.strength_driver_desc,
      descEN: TRANSLATIONS.EN.strength_driver_desc
    },
    {
      id: 'str-3',
      titleID: TRANSLATIONS.ID.strength_safety_title,
      titleEN: TRANSLATIONS.EN.strength_safety_title,
      descID: TRANSLATIONS.ID.strength_safety_desc,
      descEN: TRANSLATIONS.EN.strength_safety_desc
    },
    {
      id: 'str-4',
      titleID: TRANSLATIONS.ID.strength_fleet_title,
      titleEN: TRANSLATIONS.EN.strength_fleet_title,
      descID: TRANSLATIONS.ID.strength_fleet_desc,
      descEN: TRANSLATIONS.EN.strength_fleet_desc
    },
    {
      id: 'str-5',
      titleID: TRANSLATIONS.ID.strength_route_title,
      titleEN: TRANSLATIONS.EN.strength_route_title,
      descID: TRANSLATIONS.ID.strength_route_desc,
      descEN: TRANSLATIONS.EN.strength_route_desc
    },
    {
      id: 'str-6',
      titleID: TRANSLATIONS.ID.strength_booking_title,
      titleEN: TRANSLATIONS.EN.strength_booking_title,
      descID: TRANSLATIONS.ID.strength_booking_desc,
      descEN: TRANSLATIONS.EN.strength_booking_desc
    }
  ],
  services: [
    {
      id: 'srv-1',
      titleID: TRANSLATIONS.ID.service_1_title,
      titleEN: TRANSLATIONS.EN.service_1_title,
      descID: TRANSLATIONS.ID.service_1_desc,
      descEN: TRANSLATIONS.EN.service_1_desc
    },
    {
      id: 'srv-2',
      titleID: TRANSLATIONS.ID.service_2_title,
      titleEN: TRANSLATIONS.EN.service_2_title,
      descID: TRANSLATIONS.ID.service_2_desc,
      descEN: TRANSLATIONS.EN.service_2_desc
    },
    {
      id: 'srv-3',
      titleID: TRANSLATIONS.ID.service_3_title,
      titleEN: TRANSLATIONS.EN.service_3_title,
      descID: TRANSLATIONS.ID.service_3_desc,
      descEN: TRANSLATIONS.EN.service_3_desc
    },
    {
      id: 'srv-4',
      titleID: TRANSLATIONS.ID.service_4_title,
      titleEN: TRANSLATIONS.EN.service_4_title,
      descID: TRANSLATIONS.ID.service_4_desc,
      descEN: TRANSLATIONS.EN.service_4_desc
    },
    {
      id: 'srv-5',
      titleID: TRANSLATIONS.ID.service_5_title,
      titleEN: TRANSLATIONS.EN.service_5_title,
      descID: TRANSLATIONS.ID.service_5_desc,
      descEN: TRANSLATIONS.EN.service_5_desc
    },
    {
      id: 'srv-6',
      titleID: TRANSLATIONS.ID.service_6_title,
      titleEN: TRANSLATIONS.EN.service_6_title,
      descID: TRANSLATIONS.ID.service_6_desc,
      descEN: TRANSLATIONS.EN.service_6_desc
    }
  ],
  bookingServiceOptions: [
    { value: 'door-to-door', labelID: 'Door-to-Door Service', labelEN: 'Door-to-Door Service' },
    { value: 'travel-antar-kota', labelID: 'Travel Antar Kota (Pangandaran - Bandung / Jabodetabek)', labelEN: 'Inter-City Travel (Pangandaran - Bandung / Jabodetabek)' },
    { value: 'private-trip', labelID: 'Private Trip (Fleksibel & Nyaman)', labelEN: 'Private Trip (Flexible & Exclusive)' },
    { value: 'transportasi-keluarga', labelID: 'Transportasi Keluarga / Mudik', labelEN: 'Family Transportation / Mudik' },
    { value: 'perjalanan-bisnis', labelID: 'Perjalanan Bisnis & Dinas', labelEN: 'Business & Corporate Travel' },
    { value: 'transportasi-rombongan', labelID: 'Transportasi Rombongan (Hiace)', labelEN: 'Group Transportation (Hiace)' }
  ],
  translations: {
    ID: { ...TRANSLATIONS.ID },
    EN: { ...TRANSLATIONS.EN }
  }
};

export function mergeSiteContent(raw?: Partial<SiteContent> | null): SiteContent {
  if (!raw || typeof raw !== 'object') {
    return structuredClone(DEFAULT_SITE_CONTENT);
  }

  const defaultCarsMap = new Map(DEFAULT_SITE_CONTENT.cars.map((c) => [c.id, c.image]));
  const defaultDestMap = new Map(DEFAULT_SITE_CONTENT.destinations.map((d) => [d.id, d.image]));
  const defaultTestiMap = new Map(DEFAULT_SITE_CONTENT.testimonials.map((t) => [t.id, t.image]));
  const defaultSlideMap = new Map(DEFAULT_SITE_CONTENT.heroSlides.map((s) => [s.id, s.image]));

  return {
    ...DEFAULT_SITE_CONTENT,
    ...raw,
    brand: {
      ...DEFAULT_SITE_CONTENT.brand,
      ...(raw.brand || {}),
      logoUrl: raw.brand?.logoUrl || DEFAULT_SITE_CONTENT.brand.logoUrl,
      faviconUrl: raw.brand?.faviconUrl || DEFAULT_SITE_CONTENT.brand.faviconUrl
    },
    banners: {
      ...DEFAULT_SITE_CONTENT.banners,
      ...(raw.banners || {}),
      aboutBannerImage:
        raw.banners?.aboutBannerImage || DEFAULT_SITE_CONTENT.banners.aboutBannerImage,
      destinationsBannerImage:
        raw.banners?.destinationsBannerImage ||
        DEFAULT_SITE_CONTENT.banners.destinationsBannerImage,
      rentalsBannerImage:
        raw.banners?.rentalsBannerImage || DEFAULT_SITE_CONTENT.banners.rentalsBannerImage
    },
    aboutQuickInfo: {
      ...DEFAULT_SITE_CONTENT.aboutQuickInfo,
      ...(raw.aboutQuickInfo || {})
    },
    heroSlides: Array.isArray(raw.heroSlides)
      ? raw.heroSlides.map((s, idx) => ({
          ...s,
          image:
            s.image ||
            defaultSlideMap.get(s.id) ||
            DEFAULT_SITE_CONTENT.heroSlides[idx]?.image ||
            '/hero_armada_pm.jpg'
        }))
      : DEFAULT_SITE_CONTENT.heroSlides,
    cars: Array.isArray(raw.cars)
      ? raw.cars.map((c, idx) => ({
          ...c,
          image:
            c.image ||
            defaultCarsMap.get(c.id) ||
            DEFAULT_SITE_CONTENT.cars[idx]?.image ||
            '/avanza.avif'
        }))
      : DEFAULT_SITE_CONTENT.cars,
    destinations: Array.isArray(raw.destinations)
      ? raw.destinations.map((d, idx) => ({
          ...d,
          image:
            d.image ||
            defaultDestMap.get(d.id) ||
            DEFAULT_SITE_CONTENT.destinations[idx]?.image ||
            '/dest_batu_hiu.jpg'
        }))
      : DEFAULT_SITE_CONTENT.destinations,
    testimonials: Array.isArray(raw.testimonials)
      ? raw.testimonials.map((t, idx) => ({
          ...t,
          image:
            t.image ||
            defaultTestiMap.get(t.id) ||
            DEFAULT_SITE_CONTENT.testimonials[idx]?.image ||
            '/nyaman_holiday.avif'
        }))
      : DEFAULT_SITE_CONTENT.testimonials,
    steps: Array.isArray(raw.steps) ? raw.steps : DEFAULT_SITE_CONTENT.steps,
    missionsID: Array.isArray(raw.missionsID) ? raw.missionsID : DEFAULT_SITE_CONTENT.missionsID,
    missionsEN: Array.isArray(raw.missionsEN) ? raw.missionsEN : DEFAULT_SITE_CONTENT.missionsEN,
    strengths: Array.isArray(raw.strengths) ? raw.strengths : DEFAULT_SITE_CONTENT.strengths,
    services: Array.isArray(raw.services) ? raw.services : DEFAULT_SITE_CONTENT.services,
    bookingServiceOptions: Array.isArray(raw.bookingServiceOptions)
      ? raw.bookingServiceOptions
      : DEFAULT_SITE_CONTENT.bookingServiceOptions,
    translations: {
      ID: {
        ...DEFAULT_SITE_CONTENT.translations.ID,
        ...(raw.translations?.ID || {})
      },
      EN: {
        ...DEFAULT_SITE_CONTENT.translations.EN,
        ...(raw.translations?.EN || {})
      }
    }
  };
}
