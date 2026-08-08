export interface TranslationSchema {
  // SEO & Head Metadata
  seo_title: string;
  seo_description: string;

  // Navigation
  nav_home: string;
  nav_about: string;
  nav_destinations: string;
  nav_rentals: string;
  nav_gallery: string;
  nav_contact: string;
  nav_book_btn: string;

  // Top Bar
  topbar_address: string;
  topbar_whatsapp: string;
  topbar_service: string;

  // Hero Section
  hero_explore: string;
  hero_title_1: string;
  hero_motto: string;
  hero_subtitle: string;
  hero_cta_wa: string;
  hero_cta_cars: string;
  search_dest_cat: string;
  search_travel_date: string;
  search_date_placeholder: string;
  search_btn: string;

  // Destinations Section & Page
  dest_tag: string;
  dest_title: string;
  dest_desc: string;
  dest_select_cat: string;
  dest_cat_subtitle: string;
  dest_cat_all: string;
  dest_cat_jabar: string;
  dest_cat_jateng: string;
  dest_cat_jatim: string;
  dest_cat_bali: string;
  dest_spots_label: string;
  dest_wa_consult: string;
  dest_view_all: string;
  dest_breadcrumb_home: string;
  dest_breadcrumb_page: string;

  // Package Tour Page
  pkg_tag: string;
  pkg_title: string;
  pkg_subtitle: string;
  pkg_filter_heading: string;
  pkg_filter_all: string;
  pkg_filter_domestik: string;
  pkg_filter_internasional: string;
  pkg_route_label: string;
  pkg_starting_from: string;
  pkg_per_person: string;
  pkg_detail_btn: string;
  pkg_modal_duration: string;
  pkg_modal_tier_title: string;
  pkg_modal_hotel: string;
  pkg_modal_notes: string;
  pkg_modal_highlights: string;
  pkg_modal_includes: string;
  pkg_modal_excludes: string;
  pkg_modal_selected: string;
  pkg_modal_wa_btn: string;

  // About Section & Page
  about_tag: string;
  about_title_1: string;
  about_title_2: string;
  about_desc_1: string;
  about_desc_2: string;
  about_read_more: string;
  about_read_less: string;
  about_badge: string;
  about_card_tag: string;
  about_card_sub: string;
  about_card_rating_label: string;

  // Vision
  vision_title: string;
  vision_1: string;
  vision_2: string;
  vision_3: string;

  // Mission
  mission_title: string;
  mission_1: string;
  mission_2: string;
  mission_3: string;
  mission_4: string;

  // Strengths
  strength_clean_title: string;
  strength_clean_desc: string;
  strength_driver_title: string;
  strength_driver_desc: string;
  strength_price_title: string;
  strength_price_desc: string;
  strength_time_title: string;
  strength_time_desc: string;

  // Cars Section
  cars_tag: string;
  cars_title: string;
  cars_desc: string;
  cars_seats: string;
  cars_transmission_auto: string;
  cars_transmission_manual: string;
  cars_included_label: string;
  cars_driver_friendly: string;
  cars_book_btn: string;

  // Steps
  steps_tag: string;
  steps_title: string;
  steps_desc: string;
  step_1_title: string;
  step_1_desc: string;
  step_2_title: string;
  step_2_desc: string;
  step_3_title: string;
  step_3_desc: string;

  // Testimonials
  testi_tag: string;
  testi_title: string;
  testi_desc: string;
  testi_rating_label: string;
  testi_rented_model: string;
  testi_btn_next: string;
  testi_btn_prev: string;

  // Booking Modal
  modal_title: string;
  modal_desc: string;
  modal_summary_base: string;
  modal_summary_total_days: string;
  modal_field_name: string;
  modal_field_phone: string;
  modal_field_date: string;
  modal_field_time: string;
  modal_field_duration: string;
  modal_field_extra_allin: string;
  modal_field_extra_detail: string;
  modal_field_address: string;
  modal_field_notes: string;
  modal_btn_confirm: string;
  modal_err_name: string;
  modal_err_phone: string;
  modal_err_address: string;

  // Footer Section
  footer_callout_badge: string;
  footer_callout_title: string;
  footer_callout_desc: string;
  footer_callout_wa_btn: string;
  footer_col1_desc: string;
  footer_motto_label: string;
  footer_motto_text: string;
  footer_address_title: string;
  footer_address_text: string;
  footer_wa_title: string;
  footer_quick_nav_title: string;
}

export const TRANSLATIONS: Record<'EN' | 'ID', TranslationSchema> = {
  EN: {
    // SEO & Head Metadata
    seo_title: "Restu Tour & Transport | Car Rental & Tourist Bus",
    seo_description: "Reliable car rental, tourist bus, and travel services for comfortable journeys across Bandung, Java, Bali, and destinations throughout Indonesia.",

    // Navigation
    nav_home: "Home",
    nav_about: "About Us",
    nav_destinations: "Routes & Services",
    nav_rentals: "Fleet Rental",
    nav_packages: "Tour Packages",
    nav_gallery: "Gallery",
    nav_contact: "Contact & Location",
    nav_book_btn: "CONTACT US",

    // Top Bar
    topbar_address: "📍 Jl. Yudo No. 7, Arcamanik Endah, Bandung, West Java",
    topbar_whatsapp: "WhatsApp: 0856-2042-336",
    topbar_service: "Trusted Transportation & Tour Solution",

    // Hero Section
    hero_explore: "Your Trusted Travel Partner across Indonesia",
    hero_title_1: "Restu Tour & Transport",
    hero_motto: "TRUSTED TRANSPORTATION & TOUR SOLUTION",
    hero_subtitle: "Transportation and tour service provider for individuals, families, corporate, and institutions. Well-maintained fleet, professional drivers, and comfort-first service.",
    hero_cta_wa: "Contact via WhatsApp",
    hero_cta_cars: "Explore Buses & Cars",
    search_dest_cat: "Select Tour Destination",
    search_travel_date: "Planned Travel Date",
    search_date_placeholder: "When is your trip planned?",
    search_btn: "CONSULT TRIP",

    // Destinations Section & Page
    dest_tag: "SERVICE AREA & POPULAR ROUTES",
    dest_title: "Travel Destinations",
    dest_desc: "Serving Bandung city, West Java, and trips to major cities across Java, Bali, and across Indonesia.",
    dest_select_cat: "SELECT DESTINATION AREA",
    dest_cat_subtitle: "Explore Dream Travel Destinations",
    dest_cat_all: "All Destinations",
    dest_cat_jabar: "West Java",
    dest_cat_jateng: "Central Java & Jogja",
    dest_cat_jatim: "East Java & Bromo",
    dest_cat_bali: "Bali & Indonesia",
    dest_spots_label: "Popular Services:",
    dest_wa_consult: "Consult Route via WA",
    dest_view_all: "View All Destinations",
    dest_breadcrumb_home: "HOME",
    dest_breadcrumb_page: "ROUTES & SERVICES",

    // Package Tour Page
    pkg_tag: "TOP TOUR PACKAGES",
    pkg_title: "JAVA, BALI & INDONESIA TOUR PACKAGES",
    pkg_subtitle: "Integrated travel package options for families, institutions, schools, and companies.",
    pkg_filter_heading: "SELECT TOUR CATEGORY",
    pkg_filter_all: "All Tour Packages",
    pkg_filter_domestik: "Java & Bali Trips",
    pkg_filter_internasional: "Other Indonesia Destinations",
    pkg_route_label: "Tour Route",
    pkg_starting_from: "Starting From",
    pkg_per_person: "/ person",
    pkg_detail_btn: "View Details",
    pkg_modal_duration: "Duration",
    pkg_modal_tier_title: "FLEET & AMENITIES OPTIONS",
    pkg_modal_hotel: "Accommodation",
    pkg_modal_notes: "Notes",
    pkg_modal_highlights: "Highlights & Destinations",
    pkg_modal_includes: "Includes",
    pkg_modal_excludes: "Excludes",
    pkg_modal_selected: "Selected Option",
    pkg_modal_wa_btn: "Book via WhatsApp",

    // About Section
    about_tag: "PROFILE & OUR SERVICES",
    about_title_1: "Restu Tour & Transport",
    about_title_2: "Trusted Transportation & Tour Solution",
    about_desc_1: "Restu Tour & Transport is a transportation and tour service provider catering to individuals, families, corporate clients, and government institutions with clean fleets and licensed professional drivers.",
    about_desc_2: "Services include Daily Car Rental, Car Rental with Driver, Tourism Bus Rental, Domestic Tour Packages, Business Trips, Airport Transfers, Family & Corporate Gatherings, Study Tours, and Group Events.",
    about_read_more: "Read More",
    about_read_less: "Close Details",
    about_badge: "COMPLETE FLEET & PRO DRIVERS",
    about_card_tag: "Restu Tour & Transport",
    about_card_sub: "TRUSTED TRANSPORTATION & TOUR SOLUTION",
    about_card_rating_label: "CUSTOMER SATISFACTION",

    // Vision
    vision_title: "Company Vision",
    vision_1: "To be the most trusted transportation and tour company providing the best travel experience for every customer.",
    vision_2: "Upholding safety standards, fleet cleanliness, and top-tier service quality.",
    vision_3: "Becoming the primary travel partner for Bandung, West Java, and nationwide.",

    // Mission
    mission_title: "Our Main Mission",
    mission_1: "Prioritizing customer satisfaction and comfort.",
    mission_2: "Providing safe, clean, and high-quality fleets.",
    mission_3: "Delivering professional, friendly, and punctual service.",
    mission_4: "Being a reliable travel partner for all transportation and tourism needs.",

    // Strengths
    strength_clean_title: "Clean & Maintained Fleet",
    strength_clean_desc: "Vehicles are always clean, fresh, and well-maintained for all trips.",
    strength_driver_title: "Pro & Punctual Drivers",
    strength_driver_desc: "Experienced, friendly, route-savvy drivers who value punctuality.",
    strength_price_title: "Competitive Pricing",
    strength_price_desc: "Best transparent rates tailored to your trip requirements.",
    strength_time_title: "Local & Inter-City Service",
    strength_time_desc: "Serving Bandung, West Java, Central Java, East Java, Bali, and across Indonesia.",

    // Cars Section
    cars_tag: "FLEET CATALOG",
    cars_title: "Car & Tourism Bus Rental Options",
    cars_desc: "We offer complete Car Rental (Avanza, Innova Reborn, Alphard, Hiace, Elf) and Tourism Bus Rentals (Medium & Big Bus).",
    cars_seats: "Seats",
    cars_transmission_auto: "Automatic",
    cars_transmission_manual: "Manual",
    cars_included_label: "Amenities:",
    cars_driver_friendly: "Pro Driver + Fuel Options",
    cars_book_btn: "Consult & Rent via WA",

    // Steps
    steps_tag: "EASY BOOKING PROCESS",
    steps_title: "3 Easy Booking Steps",
    steps_desc: "Fast, friendly, and transparent booking process with Restu Tour & Transport.",
    step_1_title: "Select Fleet & Service",
    step_1_desc: "Choose Car Rental (Avanza, Innova, Hiace, Elf) or Tourism Bus based on group size.",
    step_2_title: "Consult Route & Date",
    step_2_desc: "Contact us via WhatsApp for availability, itinerary, and price quotes.",
    step_3_title: "Enjoy Comfortable Travel",
    step_3_desc: "Our professional driver will pick you up on time and take you safely to your destination.",

    // Testimonials
    testi_tag: "CUSTOMER REVIEWS",
    testi_title: "Experience With Restu Tour & Transport",
    testi_desc: "Your satisfaction and comfort are our top priority.",
    testi_rating_label: "SATISFACTION RATING",
    testi_rented_model: "Fleet / Service:",
    testi_btn_next: "Next",
    testi_btn_prev: "Previous",

    // Booking Modal
    modal_title: "RESERVATION FORM",
    modal_desc: "Fill in the reservation draft below to connect directly with Restu Tour & Transport WhatsApp.",
    modal_summary_base: "Service / Fleet",
    modal_summary_total_days: "Duration",
    modal_field_name: "Customer Name",
    modal_field_phone: "WhatsApp Number",
    modal_field_date: "Departure Date",
    modal_field_time: "Pickup Time",
    modal_field_duration: "Duration (Days)",
    modal_field_extra_allin: "Driver & Fuel Included",
    modal_field_extra_detail: "Includes professional driver service & estimated fuel",
    modal_field_address: "Pickup Location",
    modal_field_notes: "Group Count & Travel Notes",
    modal_btn_confirm: "Send Draft via WhatsApp ➔",
    modal_err_name: "Customer name is required.",
    modal_err_phone: "WhatsApp number is required.",
    modal_err_address: "Pickup location is required.",

    // Footer Section
    footer_callout_badge: "TRIP CONSULTATION 24/7",
    footer_callout_title: "Plan Your Trip With Us Today",
    footer_callout_desc: "Get affordable vehicle rentals & travel packages with well-maintained fleets and top service.",
    footer_callout_wa_btn: "WhatsApp: 08562042336",
    footer_col1_desc: "Transportation and tour service provider catering to individuals, families, companies, and institutions with clean fleets and licensed professional drivers.",
    footer_motto_label: "COMPANY MOTTO",
    footer_motto_text: "\"Trusted Transportation & Tour Solution\"",
    footer_address_title: "Official Head Office Address:",
    footer_address_text: "Jl. Yudo No. 7, Arcamanik Endah, Bandung, West Java",
    footer_wa_title: "Quick Response WhatsApp:",
    footer_quick_nav_title: "Quick Navigation"
  },
  ID: {
    // SEO & Head Metadata
    seo_title: "Restu Tour & Transport - Solusi Transportasi & Wisata Terpercaya",
    seo_description: "Restu Tour & Transport - Penyedia layanan sewa mobil, bus pariwisata, dan paket wisata terpercaya di Bandung, Jawa Barat. Melayani sewa mobil Avanza, Innova, Alphard, Hiace, Elf, Medium Bus & Big Bus ke berbagai destinasi di Indonesia.",

    // Navigation
    nav_home: "Beranda",
    nav_about: "Profil & Visi Misi",
    nav_destinations: "Rute & Layanan",
    nav_rentals: "Sewa Armada",
    nav_packages: "Paket Wisata",
    nav_gallery: "Galeri",
    nav_contact: "Kontak & Alamat",
    nav_book_btn: "HUBUNGI KAMI",

    // Top Bar
    topbar_address: "📍 Jl. Yudo No. 7, Arcamanik Endah, Bandung",
    topbar_whatsapp: "WhatsApp: 0856-2042-336",
    topbar_service: "Solusi Transportasi & Wisata Terpercaya",

    // Hero Section
    hero_explore: "Partner Perjalanan Terpercaya ke Seluruh Indonesia",
    hero_title_1: "Restu Tour & Transport",
    hero_motto: "SOLUSI TRANSPORTASI & WISATA TERPERCAYA",
    hero_subtitle: "Penyedia layanan transportasi dan perjalanan wisata melayani kebutuhan individu, keluarga, perusahaan, hingga instansi. Dengan armada yang terawat, pengemudi profesional, dan pelayanan mengutamakan kenyamanan.",
    hero_cta_wa: "Hubungi via WhatsApp",
    hero_cta_cars: "Pilihan Mobil & Bus",
    search_dest_cat: "Pilih Destinasi Tour",
    search_travel_date: "Tanggal Rencana Perjalanan",
    search_date_placeholder: "Kapan rencana perjalanan Anda?",
    search_btn: "KONSULTASI PERJALANAN",

    // Destinations Section & Page
    dest_tag: "AREA LAYANAN & RUTE POPULER",
    dest_title: "Destinasi Perjalanan Wisata",
    dest_desc: "Melayani rute dalam Kota Bandung, Jawa Barat, serta perjalanan ke berbagai kota di Pulau Jawa, Bali, dan destinasi lainnya di Indonesia.",
    dest_select_cat: "PILIH AREA DESTINASI",
    dest_cat_subtitle: "Jelajahi Destinasi Wisata Impian Anda",
    dest_cat_all: "Semua Destinasi",
    dest_cat_jabar: "Jawa Barat",
    dest_cat_jateng: "Jawa Tengah & Jogja",
    dest_cat_jatim: "Jawa Timur & Bromo",
    dest_cat_bali: "Bali & Nusantara",
    dest_spots_label: "Layanan Populer:",
    dest_wa_consult: "Konsultasi Rute via WA",
    dest_view_all: "Lihat Selengkapnya",
    dest_breadcrumb_home: "BERANDA",
    dest_breadcrumb_page: "RUTE & LAYANAN",

    // Package Tour Page
    pkg_tag: "PAKET WISATA TERFAVORIT",
    pkg_title: "PAKET TOUR JAWA, BALI & NUSANTARA",
    pkg_subtitle: "Pilihan paket perjalanan wisata terpadu untuk keluarga, instansi, sekolah, dan perusahaan dengan fasilitas lengkap.",
    pkg_filter_heading: "PILIH KATEGORI WISATA",
    pkg_filter_all: "Semua Paket Wisata",
    pkg_filter_domestik: "Wisata Pulau Jawa & Bali",
    pkg_filter_internasional: "Destinasi Nusantara Lainnya",
    pkg_route_label: "Rute Perjalanan",
    pkg_starting_from: "Mulai Dari",
    pkg_per_person: "/ org",
    pkg_detail_btn: "Detail Paket",
    pkg_modal_duration: "Durasi Perjalanan",
    pkg_modal_tier_title: "PILIHAN ARMADA & FASILITAS",
    pkg_modal_hotel: "Fasilitas Akomodasi",
    pkg_modal_notes: "Catatan",
    pkg_modal_highlights: "Destinasi & Highlight Tour",
    pkg_modal_includes: "Termasuk (Include)",
    pkg_modal_excludes: "Tidak Termasuk (Exclude)",
    pkg_modal_selected: "Pilihan Terpilih",
    pkg_modal_wa_btn: "Pesan via WhatsApp",

    // About Section (Visi & Misi)
    about_tag: "PROFIL & LAYANAN KAMI",
    about_title_1: "Restu Tour & Transport",
    about_title_2: "Solusi Transportasi & Wisata Terpercaya",
    about_desc_1: "Restu Tour & Transport adalah penyedia layanan transportasi dan perjalanan wisata yang melayani kebutuhan individu, keluarga, perusahaan, hingga instansi. Dengan armada yang terawat, pengemudi profesional, dan pelayanan yang mengutamakan kenyamanan, kami siap menjadi partner perjalanan Anda ke berbagai destinasi di Indonesia.",
    about_desc_2: "Layanan kami meliputi Sewa Mobil Harian, Sewa Mobil dengan Sopir, Sewa Bus Pariwisata, Paket Tour Domestik, Perjalanan Wisata, Perjalanan Dinas, Antar Jemput Bandara, Family Trip, Corporate Gathering, Study Tour, Ziarah, hingga Event & Perjalanan Rombongan.",
    about_read_more: "Lihat Selengkapnya",
    about_read_less: "Tutup Detail",
    about_badge: "ARMADA LENGKAP & SOPIR PROFESIONAL",
    about_card_tag: "Restu Tour & Transport",
    about_card_sub: "SOLUSI TRANSPORTASI & WISATA TERPERCAYA",
    about_card_rating_label: "KEPUASAN PELANGGAN",

    // Vision
    vision_title: "Visi Perusahaan",
    vision_1: "Menjadi perusahaan transportasi dan tour terpercaya yang memberikan pengalaman perjalanan terbaik bagi setiap pelanggan.",
    vision_2: "Mengedepankan standar keselamatan, kebersihan armada, serta kualitas pelayanan nomor satu.",
    vision_3: "Menjadi mitra perjalanan utama dan terbaik untuk wilayah Bandung, Jawa Barat, hingga seluruh Nusantara.",

    // Mission
    mission_title: "Misi Utama Kami",
    mission_1: "Mengutamakan kepuasan dan kenyamanan pelanggan.",
    mission_2: "Menyediakan armada yang aman, bersih, dan berkualitas.",
    mission_3: "Memberikan pelayanan yang profesional, ramah, dan tepat waktu.",
    mission_4: "Menjadi mitra perjalanan yang dapat diandalkan untuk berbagai kebutuhan transportasi dan wisata.",

    // Strengths
    strength_clean_title: "Armada Bersih & Terawat",
    strength_clean_desc: "Kendaraan selalu dalam kondisi prima, bersih, harum, dan nyaman untuk segala jenis perjalanan.",
    strength_driver_title: "Sopir Profesional & Tepat Waktu",
    strength_driver_desc: "Pengemudi berpengalaman, ramah, menguasai rute, dan selalu mengutamakan ketepatan waktu.",
    strength_price_title: "Harga Kompetitif",
    strength_price_desc: "Penawaran harga terbaik dan transparan sesuai dengan kebutuhan perjalanan Anda.",
    strength_time_title: "Layanan Dalam & Luar Kota",
    strength_time_desc: "Melayani rute Bandung, Jawa Barat, Jawa Tengah, Jawa Timur, Bali hingga berbagai kota di Indonesia.",

    // Cars Section
    cars_tag: "KATALOG ARMADA KENDARAAN",
    cars_title: "Pilihan Sewa Mobil & Bus Pariwisata",
    cars_desc: "Kami menyediakan pilihan Sewa Mobil (Avanza, Innova Reborn, Alphard, Hiace, Elf) dan Sewa Bus Pariwisata (Medium Bus & Big Bus) terlengkap.",
    cars_seats: "Kursi",
    cars_transmission_auto: "Matic",
    cars_transmission_manual: "Manual",
    cars_included_label: "Fasilitas & Layanan:",
    cars_driver_friendly: "Sopir Profesional + BBM Terjangkau",
    cars_book_btn: "Konsultasi & Sewa via WA",

    // Steps
    steps_tag: "CARA PEMESANAN PRAKTIS",
    steps_title: "3 Langkah Pemesanan Mudah",
    steps_desc: "Proses reservasi cepat, ramah, dan transparan bersama Restu Tour & Transport.",
    step_1_title: "Pilih Armada & Layanan",
    step_1_desc: "Tentukan pilihan Sewa Mobil (Avanza, Innova, Hiace, Elf) atau Bus Pariwisata sesuai jumlah rombongan.",
    step_2_title: "Konsultasi Rute & Tanggal",
    step_2_desc: "Hubungi tim kami via WhatsApp untuk ketersediaan armada, itinerary, dan penawaran harga.",
    step_3_title: "Nikmati Perjalanan Nyaman",
    step_3_desc: "Sopir profesional kami siap menjemput tepat waktu dan mengantar Anda ke destinasi impian dengan aman.",

    // Testimonials
    testi_tag: "TESTIMONI PELANGGAN",
    testi_title: "Pengalaman Bersama Restu Tour & Transport",
    testi_desc: "Kepuasan dan kenyamanan perjalanan Anda adalah komitmen utama kami.",
    testi_rating_label: "RATING KEPUASAN",
    testi_rented_model: "Armada / Layanan:",
    testi_btn_next: "Selanjutnya",
    testi_btn_prev: "Sebelumnya",

    // Booking Modal
    modal_title: "FORM RESERVASI KENDARAAN & TOUR",
    modal_desc: "Isi draf reservasi di bawah ini untuk terhubung langsung dengan WhatsApp Restu Tour & Transport.",
    modal_summary_base: "Layanan / Armada",
    modal_summary_total_days: "Durasi Sewa / Perjalanan",
    modal_field_name: "Nama Pemesan",
    modal_field_phone: "Nomor WhatsApp",
    modal_field_date: "Tanggal Keberangkatan",
    modal_field_time: "Jam Penjemputan",
    modal_field_duration: "Durasi (Hari)",
    modal_field_extra_allin: "Sewa Lengkap Sopir & BBM",
    modal_field_extra_detail: "Termasuk layanan pengemudi profesional & estimasi bahan bakar",
    modal_field_address: "Lokasi Penjemputan",
    modal_field_notes: "Jumlah Rombongan & Catatan Perjalanan",
    modal_btn_confirm: "Kirim Draf via WhatsApp ➔",
    modal_err_name: "Nama pemesan wajib diisi.",
    modal_err_phone: "Nomor WhatsApp wajib diisi.",
    modal_err_address: "Lokasi penjemputan wajib diisi.",

    // Footer Section
    footer_callout_badge: "KONSULTASI PERJALANAN 24/7",
    footer_callout_title: "Rencanakan Perjalanan Anda Bersama Kami",
    footer_callout_desc: "Dapatkan penawaran sewa kendaraan & paket wisata terjangkau dengan armada terawat dan pelayanan prima.",
    footer_callout_wa_btn: "WhatsApp: 08562042336",
    footer_col1_desc: "Penyedia layanan transportasi dan perjalanan wisata melayani kebutuhan individu, keluarga, perusahaan, hingga instansi dengan armada terawat, pengemudi profesional, dan pelayanan mengutamakan kenyamanan.",
    footer_motto_label: "MOTTO PERUSAHAAN",
    footer_motto_text: "\"Solusi Transportasi & Wisata Terpercaya\"",
    footer_address_title: "Alamat Kantor Resmi:",
    footer_address_text: "Jl. Yudo No. 7, Arcamanik Endah, Bandung, Jawa Barat",
    footer_wa_title: "WhatsApp Respon Cepat:",
    footer_quick_nav_title: "Navigasi Cepat"
  }
};

// AUTOMATED 1:1 KEY VALIDATION
(() => {
  const enKeys = Object.keys(TRANSLATIONS.EN) as Array<keyof TranslationSchema>;
  const idKeys = Object.keys(TRANSLATIONS.ID) as Array<keyof TranslationSchema>;

  const missingInID = enKeys.filter(k => !(k in TRANSLATIONS.ID));
  const missingInEN = idKeys.filter(k => !(k in TRANSLATIONS.ID));

  if (missingInID.length > 0) {
    console.error('CRITICAL I18N ERROR: Missing keys in ID dictionary:', missingInID);
  }
  if (missingInEN.length > 0) {
    console.error('CRITICAL I18N ERROR: Missing keys in EN dictionary:', missingInEN);
  }
})();

// Strict Translation Getter Function (Throws explicit warning if key is missing)
export function getTranslation(lang: 'EN' | 'ID', key: keyof TranslationSchema): string {
  const dict = TRANSLATIONS[lang];
  if (!dict || !dict[key]) {
    console.error(`MISSING TRANSLATION KEY: [${lang}] "${key}"`);
    return TRANSLATIONS.EN[key] || key;
  }
  return dict[key];
}
