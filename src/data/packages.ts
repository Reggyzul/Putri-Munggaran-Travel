export interface TourTier {
  busType: string;
  capacity: string;
  pricePerPerson: string;
  hotelDetails: string;
  notes: string;
}

export interface TourPackage {
  id: string;
  title: string;
  categoryKey: 'domestik' | 'internasional';
  duration: string;
  route: string[];
  routeDisplay: string;
  image: string;
  badge: string;
  minPrice: string;
  tiers: TourTier[];
  highlights: string[];
  includes: string[];
  excludes: string[];
}

export const TOUR_PACKAGES: TourPackage[] = [
  // 1. WISATA JAWA BARAT
  {
    id: 'tour-jawa-barat',
    title: 'PAKET WISATA JAWA BARAT (BANDUNG & LEMBANG)',
    categoryKey: 'domestik',
    duration: '3 Hari 2 Malam',
    route: ['Bandung City Tour', 'Lembang Floating Market', 'Kawah Putih Ciwidey', 'Dusun Bambu', 'Pusat Oleh-oleh Bandung'],
    routeDisplay: 'Bandung - Lembang - Ciwidey - Dusun Bambu',
    image: '/dest_bandung.avif',
    badge: 'Jawa Barat',
    minPrice: 'Rp 1.450.000',
    tiers: [
      {
        busType: 'Hiace Premio / Medium Bus Eksekutif',
        capacity: 'Min. 10 - 30 Orang',
        pricePerPerson: 'Rp 1.450.000',
        hotelDetails: 'Hotel Bintang 3 (2 Malam) di Pusat Kota Bandung + Sarapan',
        notes: 'Sudah termasuk Tiket Masuk Objek Wisata & Transportasi AC'
      },
      {
        busType: 'Big Bus Eksekutif Legrest',
        capacity: 'Min. 45 Orang',
        pricePerPerson: 'Rp 1.250.000',
        hotelDetails: 'Hotel Bintang 3/4 di Bandung (2 Malam) + Makan 6x',
        notes: 'Sudah Termasuk Tour Leader, Snorkeling/Wahana & Spanduk Group'
      }
    ],
    highlights: [
      'Menikmati keindahan alam dingin Kawah Putih Ciwidey & Kebun Teh Rancabali',
      'Wisata kuliner unik Floating Market Lembang & Farmhouse Susu Lembang',
      'Shopping tour di Factory Outlet Riau & Pusat Oleh-Oleh Kartika Sari/Prima Rasa',
      'City Tour Gedung Sate, Jalan Asia Afrika, dan Alun-alun Bandung'
    ],
    includes: [
      'Armada Bus Pariwisata / Hiace AC Clean & Disinfected',
      'Sopir Profesional, BBM, Tol & Parkir',
      'Akomodasi Hotel Bintang 3 (2 Malam) termasuk Breakfast',
      'Tiket Masuk Semua Objek Wisata Sesuai Itinerary',
      'Tour Leader Ramah & Dokumentasi Perjalanan'
    ],
    excludes: [
      'Pengeluaran Pribadi (Laundry, Mini Bar, Belanja)',
      'Tipping Driver & Tour Leader (Sukarela)'
    ]
  },

  // 2. WISATA JAWA TENGAH & JOGJA
  {
    id: 'tour-jawa-tengah-jogja',
    title: 'PAKET WISATA JOGJA & JAWA TENGAH',
    categoryKey: 'domestik',
    duration: '4 Hari 3 Malam',
    route: ['Candi Borobudur Magelang', 'Candi Prambanan', 'Malioboro Jogja', 'Jeep Lava Tour Merapi', 'Dataran Tinggi Dieng'],
    routeDisplay: 'Borobudur - Prambanan - Malioboro - Merapi - Dieng',
    image: '/dest_jogja.avif',
    badge: 'Jawa Tengah & Jogja',
    minPrice: 'Rp 1.850.000',
    tiers: [
      {
        busType: 'Medium Bus Pariwisata 31 Seat',
        capacity: 'Min. 25 - 30 Orang',
        pricePerPerson: 'Rp 1.850.000',
        hotelDetails: 'Hotel Bintang 3 (3 Malam) Kawasan Malioboro',
        notes: 'Termasuk Wisata Jeep Offroad Lava Tour Merapi'
      },
      {
        busType: 'Big Bus Eksekutif Legrest',
        capacity: 'Min. 45 - 50 Orang',
        pricePerPerson: 'Rp 1.650.000',
        hotelDetails: 'Hotel Bintang 4 di Yogyakarta + Makan 9x',
        notes: 'Bonus Wisata Sunrise Dieng Plateau & Candi Borobudur'
      }
    ],
    highlights: [
      'Eksplor keajaiban Candi Borobudur & Candi Prambanan',
      'Petualangan memicu adrenalin Jeep Offroad Lava Tour Gunung Merapi',
      'Wisata malam, belanja cinderamata & kuliner Bakpia di Malioboro',
      'Wisata alam negeri di atas awan Dataran Tinggi Dieng & Telaga Warna'
    ],
    includes: [
      'Transportasi Bus Pariwisata Full AC, TV Karaoke & Charger Port',
      'Sopir Pengalaman, BBM, Tol Trans-Jawa & Parkir',
      'Hotel Bintang 3/4 selama 3 Malam + Makan Sesuai Program',
      'Sewa Jeep Offroad Merapi & Tiket Wisata',
      'Tour Leader Berlisensi & Spanduk Rombongan'
    ],
    excludes: [
      'Pengeluaran Pribadi & Penginapan Luar Program'
    ]
  },

  // 3. WISATA JAWA TIMUR & BROMO
  {
    id: 'tour-jawa-timur-bromo',
    title: 'PAKET WISATA JAWA TIMUR & BROMO SUNRISE',
    categoryKey: 'domestik',
    duration: '4 Hari 3 Malam',
    route: ['Gunung Bromo Sunrise', 'Penanjakan 1', 'Kawah Bromo & Pasir Berbisik', 'Museum Angkut Batu Malang', 'Jatim Park 3'],
    routeDisplay: 'Bromo Sunrise - Pasir Berbisik - Batu Malang - Surabaya',
    image: '/dest_bromo.avif',
    badge: 'Jawa Timur',
    minPrice: 'Rp 2.250.000',
    tiers: [
      {
        busType: 'Medium / Big Bus Pariwisata',
        capacity: 'Min. 30 - 45 Orang',
        pricePerPerson: 'Rp 2.250.000',
        hotelDetails: 'Hotel Bintang 3 di Kota Batu Malang & Bromo',
        notes: 'Sudah termasuk Sewa Jeep 4x4 Bromo'
      }
    ],
    highlights: [
      'Menyaksikan keindahan Golden Sunrise Gunung Bromo dari Penanjakan',
      'Petualangan Jeep 4x4 melintasi Lautan Pasir Berbisik & Bukit Teletubbies',
      'Wisata edukasi & sejarah transportasi di Museum Angkut Malang',
      'Petik Buah Apel Malang langsung di kebun petani'
    ],
    includes: [
      'Bus Pariwisata Full AC Legrest',
      'Sewa Jeep Hardtop 4x4 Bromo (4-6 pax/jeep)',
      'Akomodasi Hotel 3 Malam + Makan Sesuai Program',
      'Tiket Masuk Taman Nasional Bromo Tengger Semeru',
      'Tour Leader & Banner Foto Rombongan'
    ],
    excludes: [
      'Sewa Kuda Bromo & Pengeluaran Pribadi'
    ]
  },

  // 4. WISATA BALI EXOTIC
  {
    id: 'tour-bali-exotic',
    title: 'PAKET WISATA BALI PARADISE & NUSA PENIDA',
    categoryKey: 'domestik',
    duration: '5 Hari 4 Malam',
    route: ['Pantai Kuta', 'Tanah Lot', 'Pura Ulun Danu Bedugul', 'Nusa Penida Kelingking Beach', 'Garuda Wisnu Kencana (GWK)'],
    routeDisplay: 'Kuta - Bedugul - Tanah Lot - GWK - Nusa Penida',
    image: '/dest_padang.avif',
    badge: 'Wisata Bali',
    minPrice: 'Rp 2.950.000',
    tiers: [
      {
        busType: 'Big Bus Eksekutif Legrest',
        capacity: 'Min. 40 - 45 Orang',
        pricePerPerson: 'Rp 2.950.000',
        hotelDetails: 'Hotel Bintang 3 di Kuta / Legian Bali (3 Malam)',
        notes: 'Termasuk Fastboat Penyeberangan Sanur - Nusa Penida PP'
      }
    ],
    highlights: [
      'Foto ikonik di Kelingking Beach & Broken Beach Nusa Penida',
      'Menikmati keindahan sunset Candi di Atas Laut Pura Tanah Lot',
      'Makan malam romantis Seafood Jimbaran di tepi pantai',
      'Melihat keagungan Patung Garuda Wisnu Kencana (GWK)'
    ],
    includes: [
      'Bus Pariwisata Eksekutif Full AC + Driver & BBM',
      'Tiket Fastboat Sanur ke Nusa Penida (PP)',
      'Hotel Bintang 3 di Bali (3 Malam) + Sarapan & Makan Malam Seafood',
      'Tiket Masuk Seluruh Objek Wisata Bali',
      'Tour Guide Lokal Bali & Tour Leader'
    ],
    excludes: [
      'Tipping Guide & Pengeluaran Pribadi'
    ]
  },

  // 5. DESTINASI NUSANTARA LAINNYA
  {
    id: 'tour-nusantara-lainnya',
    title: 'PAKET TOUR EXOTIC LOMBOK & NUSANTARA',
    categoryKey: 'domestik',
    duration: '4 Hari 3 Malam',
    route: ['Gili Trawangan', 'Pantai Kuta Mandalika', 'Sirkuit Mandalika', 'Desa Sade Sasak', 'Bukit Merese'],
    routeDisplay: 'Gili Trawangan - Mandalika - Desa Sade - Bukit Merese',
    image: '/dest_lombok.avif',
    badge: 'Nusantara',
    minPrice: 'Rp 3.100.000',
    tiers: [
      {
        busType: 'Hiace Premio / Medium Bus',
        capacity: 'Min. 12 - 30 Orang',
        pricePerPerson: 'Rp 3.100.000',
        hotelDetails: 'Hotel Bintang 3/4 Senggigi Lombok (3 Malam)',
        notes: 'Termasuk Public Speedboat ke Gili Trawangan PP'
      }
    ],
    highlights: [
      'Snorkeling & wisata pulau tropis di Gili Trawangan',
      'Foto di Sirkuit Internasional Mandalika & Pantai Kuta Lombok',
      'Mengenal kebudayaan asli Suku Sasak di Desa Tradisional Sade',
      'Menikmati panorama sunset eksotis dari atas Bukit Merese'
    ],
    includes: [
      'Transportasi AC Pariwisata di Lombok',
      'Speedboat Penyeberangan Gili Trawangan PP',
      'Hotel Bintang 3/4 (3 Malam) + Makan Sesuai Itinerary',
      'Tiket Wisata, Tour Guide & Dokumentasi'
    ],
    excludes: [
      'Tiket Pesawat & Pengeluaran Pribadi'
    ]
  }
];
