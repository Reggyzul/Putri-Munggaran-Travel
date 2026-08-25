export interface TranslationSchema {
  // SEO & Head Metadata
  seo_title: string;
  seo_description: string;

  // Navigation
  nav_home: string;
  nav_about: string;
  nav_destinations: string;
  nav_rentals: string;
  nav_services: string;
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
  dest_cat_pangandaran: string;
  dest_cat_bandung: string;
  dest_cat_jabodetabek: string;
  dest_cat_other: string;
  dest_spots_label: string;
  dest_wa_consult: string;
  dest_view_all: string;
  dest_breadcrumb_home: string;
  dest_breadcrumb_page: string;

  // About Section & Page
  about_tag: string;
  about_title_1: string;
  about_title_2: string;
  about_desc_1: string;
  about_desc_2: string;
  about_desc_3: string;
  about_read_more: string;
  about_read_less: string;
  about_badge: string;
  about_card_tag: string;
  about_card_sub: string;
  about_card_rating_label: string;

  // Vision
  vision_title: string;
  vision_1: string;

  // Mission
  mission_title: string;
  mission_1: string;
  mission_2: string;
  mission_3: string;
  mission_4: string;
  mission_5: string;
  mission_6: string;
  mission_7: string;

  // Strengths / Keunggulan
  strengths_tag: string;
  strengths_title: string;
  strengths_desc: string;
  strength_door_title: string;
  strength_door_desc: string;
  strength_driver_title: string;
  strength_driver_desc: string;
  strength_safety_title: string;
  strength_safety_desc: string;
  strength_fleet_title: string;
  strength_fleet_desc: string;
  strength_route_title: string;
  strength_route_desc: string;
  strength_booking_title: string;
  strength_booking_desc: string;

  // Services Section
  services_tag: string;
  services_title: string;
  services_desc: string;
  service_1_title: string;
  service_1_desc: string;
  service_2_title: string;
  service_2_desc: string;
  service_3_title: string;
  service_3_desc: string;
  service_4_title: string;
  service_4_desc: string;
  service_5_title: string;
  service_5_desc: string;
  service_6_title: string;
  service_6_desc: string;

  // Cars Section
  cars_tag: string;
  cars_title: string;
  cars_desc: string;
  cars_note: string;
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
  footer_facebook_title: string;
  footer_facebook_link: string;
  footer_quick_nav_title: string;
}

export const TRANSLATIONS: Record<'EN' | 'ID', TranslationSchema> = {
  EN: {
    // SEO & Head Metadata
    seo_title: "Putri Munggaran Tour & Travel - Safe, Comfortable, Reach the Destination",
    seo_description: "Putri Munggaran Tour & Travel provides reliable door-to-door transportation & tour service connecting Pangandaran, Bandung, Jabodetabek, and surrounding routes.",

    // Navigation
    nav_home: "Home",
    nav_about: "About Us",
    nav_destinations: "Destinations",
    nav_rentals: "Armada / Fleet",
    nav_services: "Services",
    nav_contact: "Contact & Location",
    nav_book_btn: "BOOK VIA WHATSAPP",

    // Top Bar
    topbar_address: "📍 Jl. Raya Parigi, Blok Kemplung, Pangandaran Regency",
    topbar_whatsapp: "WhatsApp: 0813-2126-4200",
    topbar_service: "Door-to-Door Tour & Transportation Service",

    // Hero Section
    hero_explore: "Safe, Comfortable, Reach the Destination",
    hero_title_1: "Putri Munggaran Tour & Travel",
    hero_motto: "“AMAN, NYAMAN, SAMPAI TUJUAN.”",
    hero_subtitle: "Reliable travel and transportation service serving Pangandaran to Bandung, Jabodetabek, and various destinations with a practical door-to-door concept.",
    hero_cta_wa: "Chat via WhatsApp",
    hero_cta_cars: "View Fleet",
    search_dest_cat: "Select Travel Route",
    search_travel_date: "Planned Travel Date",
    search_date_placeholder: "When is your trip planned?",
    search_btn: "CONSULT ROUTE",

    // Destinations Section & Page
    dest_tag: "SERVICE ROUTES & COVERAGE",
    dest_title: "Routes & Service Areas",
    dest_desc: "Connecting Pangandaran, Bandung, Jabodetabek, and various destinations according to customer requests with convenient door-to-door pickup.",
    dest_select_cat: "SELECT ROUTE CATEGORY",
    dest_cat_subtitle: "Explore Our Core Travel Routes",
    dest_cat_all: "All Routes",
    dest_cat_pangandaran: "Pangandaran",
    dest_cat_bandung: "Bandung",
    dest_cat_jabodetabek: "Jabodetabek",
    dest_cat_other: "Inter-City & Others",
    dest_spots_label: "Service Highlights:",
    dest_wa_consult: "Consult via WhatsApp",
    dest_view_all: "View All Routes",
    dest_breadcrumb_home: "HOME",
    dest_breadcrumb_page: "ROUTES & COVERAGE",

    // About Section
    about_tag: "BUSINESS PROFILE",
    about_title_1: "Putri Munggaran Tour & Travel",
    about_title_2: "Tour & Travel, Transportation & Shuttle Service",
    about_desc_1: "Putri Munggaran Tour & Travel is a transportation and travel service catering to journeys from Pangandaran to Bandung, Jabodetabek, and various other destinations tailored to customer needs.",
    about_desc_2: "With our door-to-door service concept, customers can enjoy a practical journey without the hassle of changing vehicles. Supported by experienced drivers and a versatile fleet tailored to your travel requirements.",
    about_desc_3: "We are committed to delivering safe, comfortable, and punctual journeys for personal travel, families, business trips, and group outings.",
    about_read_more: "Read More",
    about_read_less: "Close Details",
    about_badge: "DOOR-TO-DOOR & EXPERIENCED DRIVERS",
    about_card_tag: "Putri Munggaran Tour & Travel",
    about_card_sub: "“AMAN, NYAMAN, SAMPAI TUJUAN.”",
    about_card_rating_label: "CUSTOMER SATISFACTION",

    // Vision
    vision_title: "Our Vision",
    vision_1: "To be a trusted tour & travel service providing safe, comfortable, practical, and high-quality travel experiences for every customer.",

    // Mission
    mission_title: "Our Mission",
    mission_1: "Provide practical and convenient door-to-door service for customers.",
    mission_2: "Provide experienced drivers who prioritize passenger safety.",
    mission_3: "Maintain passenger comfort throughout the journey.",
    mission_4: "Provide fleet options according to travel needs.",
    mission_5: "Deliver friendly, professional, and responsive customer service.",
    mission_6: "Prioritize customer satisfaction from booking until reaching the destination.",
    mission_7: "Build customer trust through consistent and high-quality transportation services.",

    // Strengths
    strengths_tag: "WHY CHOOSE US",
    strengths_title: "Our Advantages",
    strengths_desc: "Key reasons why customers trust Putri Munggaran Tour & Travel for their journeys.",
    strength_door_title: "Door-to-Door Service",
    strength_door_desc: "No need to look for additional transport; we pick you up at your agreed location and drop you off directly at your destination.",
    strength_driver_title: "Experienced Drivers",
    strength_driver_desc: "Supported by skilled, polite drivers experienced in inter-city routes.",
    strength_safety_title: "Safe & Comfortable",
    strength_safety_desc: "Customer safety and comfort remain our top priority on every trip.",
    strength_fleet_title: "Armada / Fleet Options",
    strength_fleet_desc: "Various vehicle options suitable for passenger count and trip requirements.",
    strength_route_title: "Strategic Routes",
    strength_route_desc: "Specialized in Pangandaran – Bandung – Jabodetabek and custom destinations on request.",
    strength_booking_title: "Easy Reservation",
    strength_booking_desc: "Simple, fast, and transparent booking directly via WhatsApp.",

    // Services Section
    services_tag: "OUR SERVICES",
    services_title: "Complete Travel & Transportation Services",
    services_desc: "Comprehensive transportation solutions designed for your maximum convenience and safety.",
    service_1_title: "Door-to-Door Service",
    service_1_desc: "Passengers are picked up from agreed points and dropped off straight at their destination without switching vehicles.",
    service_2_title: "Inter-City Travel",
    service_2_desc: "Serving trips from Pangandaran to Bandung, Jabodetabek, and other routes based on agreement and availability.",
    service_3_title: "Private Trip",
    service_3_desc: "Personalized trip service for customers seeking flexible and comfortable travel with family or friends.",
    service_4_title: "Family Transportation",
    service_4_desc: "Comfortable vehicles for family holidays, homecoming (mudik), family visits, and general travel needs.",
    service_5_title: "Business Travel",
    service_5_desc: "Reliable transportation for work trips, business visits, meetings, and corporate activities.",
    service_6_title: "Group Transportation",
    service_6_desc: "Larger capacity vehicle options available for group travel, gatherings, and shared events.",

    // Cars Section
    cars_tag: "ARMADA / FLEET",
    cars_title: "Fleet Choices",
    cars_desc: "Putri Munggaran Tour & Travel provides well-maintained vehicles for various travel needs.",
    cars_note: "*Note: Rates may vary depending on route, passenger count, travel date, duration, and chosen service. Contact admin for latest rates and availability.",
    cars_seats: "Seats",
    cars_transmission_auto: "Automatic",
    cars_transmission_manual: "Manual",
    cars_included_label: "Highlights:",
    cars_driver_friendly: "Experienced Driver + Clean Cabin",
    cars_book_btn: "Consult via WhatsApp",

    // Steps
    steps_tag: "HOW TO BOOK",
    steps_title: "3 Easy Booking Steps",
    steps_desc: "Quick, hassle-free reservation process with Putri Munggaran Tour & Travel.",
    step_1_title: "Choose Vehicle & Service",
    step_1_desc: "Select Avanza, Calya, Rush, or Hiace based on your passenger count and comfort needs.",
    step_2_title: "Consult Route & Date",
    step_2_desc: "Chat with our admin on WhatsApp (0813-2126-4200) to confirm pickup location and schedule.",
    step_3_title: "Enjoy Your Journey",
    step_3_desc: "Our experienced driver will pick you up at your doorstep and take you safely to your destination.",

    // Testimonials
    testi_tag: "CUSTOMER REVIEWS",
    testi_title: "What Our Customers Say",
    testi_desc: "Commitment to providing safe, comfortable, and reliable journeys.",
    testi_rating_label: "SATISFACTION",
    testi_rented_model: "Vehicle / Route:",
    testi_btn_next: "Next",
    testi_btn_prev: "Previous",

    // Booking Modal
    modal_title: "TRIP RESERVATION DRAFT",
    modal_desc: "Fill in the details below to connect directly with Putri Munggaran Tour & Travel WhatsApp.",
    modal_summary_base: "Selected Vehicle",
    modal_summary_total_days: "Trip Duration",
    modal_field_name: "Customer Name *",
    modal_field_phone: "WhatsApp Number *",
    modal_field_date: "Departure Date *",
    modal_field_time: "Pickup Time",
    modal_field_duration: "Trip Duration",
    modal_field_extra_allin: "Door-to-Door Service Included",
    modal_field_extra_detail: "Direct pickup at agreed location with experienced driver",
    modal_field_address: "Pickup Address *",
    modal_field_notes: "Destination & Special Notes",
    modal_btn_confirm: "Send Reservation via WhatsApp ➔",
    modal_err_name: "Customer name is required.",
    modal_err_phone: "WhatsApp number is required.",
    modal_err_address: "Pickup address is required.",

    // Footer Section
    footer_callout_badge: "DOOR-TO-DOOR TRAVEL 24/7",
    footer_callout_title: "Plan Your Trip With Putri Munggaran",
    footer_callout_desc: "Pangandaran – Bandung – Jabodetabek with experienced drivers and comfortable fleet.",
    footer_callout_wa_btn: "WhatsApp: 0813-2126-4200",
    footer_col1_desc: "Layanan transportasi dan perjalanan Pangandaran – Bandung – Jabodetabek dengan konsep door-to-door service. Aman, Nyaman, Sampai Tujuan.",
    footer_motto_label: "TAGLINE",
    footer_motto_text: "“Aman, Nyaman, Sampai Tujuan.”",
    footer_address_title: "Office Location:",
    footer_address_text: "Jl. Raya Parigi, Blok Kemplung, Kabupaten Pangandaran",
    footer_wa_title: "WhatsApp / Contact:",
    footer_facebook_title: "Official Facebook:",
    footer_facebook_link: "Tatakusmawan68",
    footer_quick_nav_title: "Quick Navigation"
  },
  ID: {
    // SEO & Head Metadata
    seo_title: "Putri Munggaran Tour & Travel - Aman, Nyaman, Sampai Tujuan",
    seo_description: "Putri Munggaran Tour & Travel - Layanan transportasi dan perjalanan Pangandaran – Bandung – Jabodetabek dengan konsep door-to-door service. Aman, Nyaman, Sampai Tujuan.",

    // Navigation
    nav_home: "Beranda",
    nav_about: "Tentang Kami",
    nav_destinations: "Destinasi Wisata",
    nav_rentals: "Armada",
    nav_services: "Layanan",
    nav_contact: "Kontak & Alamat",
    nav_book_btn: "PESAN VIA WHATSAPP",

    // Top Bar
    topbar_address: "📍 Jl. Raya Parigi, Blok Kemplung, Kabupaten Pangandaran",
    topbar_whatsapp: "WhatsApp: 0813-2126-4200",
    topbar_service: "Layanan Transportasi & Antar-Jemput Door-to-Door",

    // Hero Section
    hero_explore: "Aman, Nyaman, Sampai Tujuan",
    hero_title_1: "Putri Munggaran Tour & Travel",
    hero_motto: "“AMAN, NYAMAN, SAMPAI TUJUAN.”",
    hero_subtitle: "Layanan transportasi dan perjalanan yang melayani rute Pangandaran menuju Bandung, Jabodetabek, serta berbagai tujuan lainnya dengan konsep praktis Door-to-Door Service.",
    hero_cta_wa: "Hubungi via WhatsApp",
    hero_cta_cars: "Lihat Pilihan Armada",
    search_dest_cat: "Pilih Rute Perjalanan",
    search_travel_date: "Tanggal Rencana Perjalanan",
    search_date_placeholder: "Kapan rencana perjalanan Anda?",
    search_btn: "KONSULTASI PERJALANAN",

    // Destinations Section & Page
    dest_tag: "RUTE & AREA LAYANAN",
    dest_title: "Rute & Area Layanan",
    dest_desc: "Melayani perjalanan dari Pangandaran menuju Bandung, Jabodetabek, serta berbagai tujuan lainnya sesuai kebutuhan pelanggan dengan penjemputan door-to-door.",
    dest_select_cat: "PILIH KATEGORI RUTE",
    dest_cat_subtitle: "Jelajahi Rute Perjalanan Populer Kami",
    dest_cat_all: "Semua Rute",
    dest_cat_pangandaran: "Pangandaran",
    dest_cat_bandung: "Bandung",
    dest_cat_jabodetabek: "Jabodetabek",
    dest_cat_other: "Antar Kota & Lainnya",
    dest_spots_label: "Keunggulan Rute:",
    dest_wa_consult: "Konsultasi via WA",
    dest_view_all: "Lihat Semua Rute",
    dest_breadcrumb_home: "BERANDA",
    dest_breadcrumb_page: "RUTE & AREA LAYANAN",

    // About Section
    about_tag: "PROFIL BISNIS",
    about_title_1: "Putri Munggaran Tour & Travel",
    about_title_2: "Tour & Travel, Transportasi & Antar-Jemput",
    about_desc_1: "Putri Munggaran Tour & Travel merupakan layanan transportasi dan perjalanan yang melayani kebutuhan perjalanan dari Pangandaran menuju Bandung, Jabodetabek, serta berbagai tujuan lainnya sesuai kebutuhan pelanggan.",
    about_desc_2: "Dengan konsep door-to-door service, pelanggan dapat menikmati perjalanan yang lebih praktis tanpa harus repot berpindah kendaraan. Putri Munggaran Tour & Travel didukung oleh pengemudi yang berpengalaman dan pilihan armada yang dapat disesuaikan dengan kebutuhan perjalanan.",
    about_desc_3: "Kami berkomitmen memberikan perjalanan yang aman, nyaman, dan tepat sampai tujuan, baik untuk perjalanan pribadi, keluarga, perjalanan bisnis, maupun kebutuhan rombongan.",
    about_read_more: "Lihat Selengkapnya",
    about_read_less: "Tutup Detail",
    about_badge: "DOOR-TO-DOOR SERVICE & PENGEMUDI BERPENGALAMAN",
    about_card_tag: "Putri Munggaran Tour & Travel",
    about_card_sub: "“AMAN, NYAMAN, SAMPAI TUJUAN.”",
    about_card_rating_label: "KEPUASAN PELANGGAN",

    // Vision
    vision_title: "Visi Kami",
    vision_1: "Menjadi layanan tour & travel terpercaya yang memberikan pengalaman perjalanan aman, nyaman, praktis, dan berkualitas bagi setiap pelanggan.",

    // Mission
    mission_title: "Misi Kami",
    mission_1: "Memberikan layanan door-to-door yang praktis dan memudahkan pelanggan.",
    mission_2: "Menyediakan pengemudi yang berpengalaman dan mengutamakan keselamatan.",
    mission_3: "Menjaga kenyamanan pelanggan selama perjalanan.",
    mission_4: "Menyediakan pilihan armada sesuai kebutuhan perjalanan.",
    mission_5: "Memberikan pelayanan yang ramah, profesional, dan responsif.",
    mission_6: "Mengutamakan kepuasan pelanggan dari proses pemesanan hingga sampai tujuan.",
    mission_7: "Membangun kepercayaan pelanggan melalui pelayanan transportasi yang konsisten dan berkualitas.",

    // Strengths
    strengths_tag: "KEUNGGULAN KAMI",
    strengths_title: "Keunggulan Putri Munggaran Tour & Travel",
    strengths_desc: "Alasan mengapa pelanggan mempercayakan perjalanan mereka bersama Putri Munggaran Tour & Travel.",
    strength_door_title: "Door-to-Door Service",
    strength_door_desc: "Pelanggan tidak perlu repot mencari transportasi tambahan karena perjalanan dapat dilakukan dari titik penjemputan menuju tujuan.",
    strength_driver_title: "Pengemudi Berpengalaman",
    strength_driver_desc: "Didukung pengemudi yang berpengalaman dalam melayani perjalanan antarkota dengan aman dan ramah.",
    strength_safety_title: "Aman & Nyaman",
    strength_safety_desc: "Keselamatan dan kenyamanan pelanggan selalu menjadi prioritas utama selama perjalanan.",
    strength_fleet_title: "Pilihan Armada",
    strength_fleet_desc: "Tersedia beberapa pilihan kendaraan (Avanza, Calya, Rush, Hiace) yang dapat disesuaikan dengan jumlah penumpang.",
    strength_route_title: "Rute Strategis",
    strength_route_desc: "Melayani perjalanan Pangandaran – Bandung – Jabodetabek dan tujuan lainnya sesuai kebutuhan.",
    strength_booking_title: "Reservasi Mudah",
    strength_booking_desc: "Pemesanan tiket / armada dapat dilakukan dengan sangat mudah dan cepat melalui WhatsApp.",

    // Services Section
    services_tag: "LAYANAN KAMI",
    services_title: "Layanan Transportasi & Perjalanan Terlengkap",
    services_desc: "Solusi perjalanan lengkap untuk kebutuhan individu, keluarga, dinas, hingga rombongan.",
    service_1_title: "Door-to-Door Service",
    service_1_desc: "Pelanggan dapat dijemput dari lokasi yang telah disepakati dan diantar langsung menuju tujuan tanpa perlu repot berganti kendaraan.",
    service_2_title: "Travel Antar Kota",
    service_2_desc: "Melayani perjalanan dari Pangandaran menuju Bandung, Jabodetabek, serta rute lainnya sesuai kesepakatan dan ketersediaan.",
    service_3_title: "Private Trip",
    service_3_desc: "Layanan perjalanan pribadi untuk pelanggan yang menginginkan perjalanan lebih fleksibel dan nyaman bersama keluarga atau teman.",
    service_4_title: "Transportasi Keluarga",
    service_4_desc: "Pilihan kendaraan yang dapat digunakan untuk perjalanan keluarga, mudik, kunjungan keluarga, maupun kebutuhan perjalanan lainnya.",
    service_5_title: "Perjalanan Bisnis",
    service_5_desc: "Mendukung kebutuhan transportasi untuk perjalanan kerja, kunjungan bisnis, meeting, maupun kegiatan perusahaan.",
    service_6_title: "Transportasi Rombongan",
    service_6_desc: "Tersedia pilihan kendaraan dengan kapasitas lebih besar untuk kebutuhan perjalanan bersama atau rombongan.",

    // Cars Section
    cars_tag: "PILIHAN ARMADA",
    cars_title: "Pilihan Kendaraan",
    cars_desc: "Putri Munggaran Tour & Travel menyediakan beberapa pilihan kendaraan terawat untuk kenyamanan perjalanan Anda.",
    cars_note: "*Catatan: Harga setiap kendaraan dapat disesuaikan berdasarkan rute, jumlah penumpang, tanggal perjalanan, durasi, serta jenis layanan yang dipilih. Hubungi admin untuk mendapatkan informasi harga dan ketersediaan terbaru.",
    cars_seats: "Kursi",
    cars_transmission_auto: "Matic",
    cars_transmission_manual: "Manual",
    cars_included_label: "Fasilitas & Karakter:",
    cars_driver_friendly: "Driver Berpengalaman + AC Nyaman",
    cars_book_btn: "Konsultasi via WhatsApp",

    // Steps
    steps_tag: "CARA PEMESANAN",
    steps_title: "3 Langkah Pemesanan Mudah",
    steps_desc: "Proses reservasi cepat, ramah, dan transparan bersama Putri Munggaran Tour & Travel.",
    step_1_title: "Pilih Armada & Layanan",
    step_1_desc: "Tentukan pilihan kendaraan (Avanza, Calya, Rush, Hiace) sesuai jumlah penumpang dan jenis layanan.",
    step_2_title: "Konsultasi Rute & Tanggal",
    step_2_desc: "Hubungi admin kami via WhatsApp (0813-2126-4200) untuk titik penjemputan, jadwal & ketersediaan armada.",
    step_3_title: "Nikmati Perjalanan Anda",
    step_3_desc: "Pengemudi berpengalaman kami akan menjemput di lokasi yang disepakati dan mengantar Anda sampai tujuan dengan aman dan nyaman.",

    // Testimonials
    testi_tag: "TESTIMONI PELANGGAN",
    testi_title: "Pengalaman Bersama Putri Munggaran Tour & Travel",
    testi_desc: "Kepuasan dan kenyamanan perjalanan Anda adalah komitmen utama kami.",
    testi_rating_label: "RATING KEPUASAN",
    testi_rented_model: "Armada / Rute:",
    testi_btn_next: "Selanjutnya",
    testi_btn_prev: "Sebelumnya",

    // Booking Modal
    modal_title: "FORM RESERVASI PERJALANAN",
    modal_desc: "Isi draf reservasi di bawah ini untuk terhubung langsung dengan WhatsApp Putri Munggaran Tour & Travel.",
    modal_summary_base: "Armada Pilihan",
    modal_summary_total_days: "Durasi / Jenis Perjalanan",
    modal_field_name: "Nama Pemesan *",
    modal_field_phone: "Nomor WhatsApp *",
    modal_field_date: "Tanggal Keberangkatan *",
    modal_field_time: "Jam Penjemputan",
    modal_field_duration: "Durasi / Jenis Layanan",
    modal_field_extra_allin: "Termasuk Layanan Door-to-Door",
    modal_field_extra_detail: "Penjemputan langsung di lokasi yang disepakati & diantar ke tujuan",
    modal_field_address: "Lokasi Penjemputan *",
    modal_field_notes: "Kota Tujuan & Catatan Tambahan",
    modal_btn_confirm: "Kirim Reservasi via WhatsApp ➔",
    modal_err_name: "Nama pemesan wajib diisi.",
    modal_err_phone: "Nomor WhatsApp wajib diisi.",
    modal_err_address: "Lokasi penjemputan wajib diisi.",

    // Footer Section
    footer_callout_badge: "LAYANAN DOOR-TO-DOOR 24 JAM",
    footer_callout_title: "Rencanakan Perjalanan Anda Bersama Kami",
    footer_callout_desc: "Pangandaran – Bandung – Jabodetabek dengan pengemudi berpengalaman dan armada terawat.",
    footer_callout_wa_btn: "WhatsApp: 0813-2126-4200",
    footer_col1_desc: "Layanan transportasi dan perjalanan Pangandaran – Bandung – Jabodetabek dengan konsep door-to-door service. Aman, Nyaman, Sampai Tujuan.",
    footer_motto_label: "TAGLINE BISNIS",
    footer_motto_text: "“Aman, Nyaman, Sampai Tujuan.”",
    footer_address_title: "Alamat Kantor / Garasi:",
    footer_address_text: "Jl. Raya Parigi, Blok Kemplung, Kabupaten Pangandaran",
    footer_wa_title: "WhatsApp & Kontak Admin:",
    footer_facebook_title: "Facebook Resmi:",
    footer_facebook_link: "Tatakusmawan68",
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

// Strict Translation Getter Function
export function getTranslation(lang: 'EN' | 'ID', key: keyof TranslationSchema): string {
  const dict = TRANSLATIONS[lang];
  if (!dict || !dict[key]) {
    console.error(`MISSING TRANSLATION KEY: [${lang}] "${key}"`);
    return TRANSLATIONS.EN[key] || key;
  }
  return dict[key];
}
