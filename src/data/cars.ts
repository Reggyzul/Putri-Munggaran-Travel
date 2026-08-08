import { Car, Testimonial } from '../types';

export const CARS: Car[] = [
  // 1. SEWA MOBIL (MPV, VIP & HIACE/ELF)
  {
    id: 'avanza',
    name: 'Toyota Avanza',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga Terbaik',
    image: '/avanza.avif',
    seats: 7,
    transmission: 'Manual/Matic',
    fuel: 'Bensin (Included/Option)',
    includeList: ['AC Dingin & Multi Blower', 'Audio Bluetooth/USB', 'Reclining Seats', 'Kabin Bersih & Harum', 'Sopir Profesional & BBM Option'],
    description: 'Mobil MPV paling favorit untuk kebutuhan perjalanan keluarga, dinas, antar-jemput bandara, maupun keliling Bandung & luar kota.',
    rating: 4.9,
    reviewsCount: 145,
    specifications: [
      { label: 'Kapasitas', value: '6 - 7 Penumpang' },
      { label: 'Layanan', value: 'Sewa Harian + Sopir / All-In' },
      { label: 'Peruntukan', value: 'Keluarga, Dinas & Antar Jemput Bandara' }
    ]
  },
  {
    id: 'innova-reborn',
    name: 'Toyota Innova Reborn',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga Terbaik',
    image: '/innova3.avif',
    seats: 7,
    transmission: 'Manual/Matic',
    fuel: 'Bensin / Diesel Euro 4',
    includeList: ['AC Triple Zone', 'Kabin Ekstra Senyap & Luas', 'Audio Touchscreen', 'Captain/Standard Seat', 'Sopir Profesional Berpengalaman'],
    description: 'Pilihan mobil MPV premium dengan kenyamanan tinggi, suspensi empuk, cocok untuk perjalanan dinas pejabat, bisnis, & family trip luar kota.',
    rating: 5.0,
    reviewsCount: 182,
    specifications: [
      { label: 'Kapasitas', value: '7 Penumpang' },
      { label: 'Fitur', value: 'Suspensi Empuk, AC Per-Baris, Kabin Senyap' },
      { label: 'Pelayanan', value: 'Sopir Pengalaman Rute Jawa & Bali' }
    ]
  },
  {
    id: 'alphard',
    name: 'Toyota Alphard / Vellfire',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga VIP Terbaik',
    image: '/alphard.avif',
    seats: 7,
    transmission: 'Matic',
    fuel: 'Bensin Premium',
    includeList: ['First Class Captain Seats', 'Power Sliding Door', 'Sunroof / Moonroof', 'AC Climate Control', 'Sopir VIP Berbusana Rapi'],
    description: 'Mobil VIP kemewahan kelas atas untuk tamu kehormatan, pejabat instansi, event pernikahan, dan eksekutif perusahaan.',
    rating: 5.0,
    reviewsCount: 94,
    specifications: [
      { label: 'Kapasitas', value: '6 - 7 Kursi VIP' },
      { label: 'Interior', value: 'Leather Captain Seat + Ottoman' },
      { label: 'Layanan', value: 'Sopir VIP Berbusana Rapi & Tepat Waktu' }
    ]
  },
  {
    id: 'hiace-premio-luxury',
    name: 'Toyota Hiace Premio Luxury',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga Terbaik',
    image: '/hiace_premio.avif',
    seats: 10,
    transmission: 'Manual',
    fuel: 'Diesel High Power',
    includeList: ['Captain Leather Seats (8, 9 & 10 Seat)', 'Smart TV & Sound System', 'Port Charger USB tiap Kursi', 'AC Ducting Dingin', 'Pengemudi Profesional'],
    description: 'Microbus kemewahan tipe Premio Luxury dengan konfigurasi 8, 9 & 10 kursi Captain Seat untuk perjalanan rombongan eksklusif.',
    rating: 5.0,
    reviewsCount: 110,
    specifications: [
      { label: 'Pilihan Kursi', value: '8, 9 & 10 Seat (Captain Seats)' },
      { label: 'Fasilitas', value: 'Smart TV, Audio Sound, USB Charger, AC Ducting' },
      { label: 'Layanan', value: 'Corporate Gathering & VIP Tour' }
    ]
  },
  {
    id: 'hiace-commuter',
    name: 'Toyota Hiace Commuter',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga Terbaik',
    image: '/hiace.avif',
    seats: 14,
    transmission: 'Manual',
    fuel: 'Diesel',
    includeList: ['14 Kursi Reclining', 'AC Plafon Dingin', 'Audio Audio Player', 'Kabin Lapang & Nyaman', 'Pengemudi Ramah & Berlisensi'],
    description: 'Toyota Hiace Commuter 14 seat favorit rombongan keluarga, instansi, study tour, & acara rombongan antar kota.',
    rating: 4.9,
    reviewsCount: 168,
    specifications: [
      { label: 'Kapasitas', value: '14 Kursi Penumpang' },
      { label: 'Fasilitas', value: 'AC Plafon, Reclining Seats, Bagasi Belakang' },
      { label: 'Penggunaan', value: 'City Tour Bandung & Tour Jawa-Bali' }
    ]
  },
  {
    id: 'hiace-premio-standard',
    name: 'Toyota Hiace Premio (14 Seat)',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga Terbaik',
    image: '/hiace_premio.avif',
    seats: 14,
    transmission: 'Manual',
    fuel: 'Diesel Euro 4',
    includeList: ['14 Kursi Ergonomis', 'Desain Monocoque Senyap', 'AC Ducting Individual', 'Sistem Pengereman ABS/VSC', 'Sopir Profesional'],
    description: 'Generasi terbaru Hiace Premio 14 seat dengan desain modern, kabin lebih senyap, dan keselamatan ekstra tinggi.',
    rating: 4.9,
    reviewsCount: 125,
    specifications: [
      { label: 'Kapasitas', value: '14 Kursi Penumpang' },
      { label: 'Suspensi', value: 'Lebih Halus & Stabil' },
      { label: 'Layanan', value: 'Perjalanan Luar Kota & Family Trip' }
    ]
  },
  {
    id: 'elf-short-coaster',
    name: 'Isuzu Elf Short / Coaster',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga Terbaik',
    image: '/elf_long.avif',
    seats: 17,
    transmission: 'Manual',
    fuel: 'Diesel',
    includeList: ['17 Kursi Penumpang', 'AC Multi Blower', 'Audio Karaoke', 'Sopir Handal Menguasai Medan', 'Kapasitas Efisien'],
    description: 'Isuzu Elf Short / Coaster 17 seat lincah melintasi rute perbukitan & jalanan Jawa Barat untuk rombongan sedang.',
    rating: 4.8,
    reviewsCount: 92,
    specifications: [
      { label: 'Kapasitas', value: '17 Kursi Penumpang' },
      { label: 'Fasilitas', value: 'AC Plafon, Karaoke Audio System' },
      { label: 'Peruntukan', value: 'Ziarah, Wisata Sekolah & Rombongan' }
    ]
  },
  {
    id: 'elf-long',
    name: 'Isuzu Elf Long',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Harga Terbaik',
    image: '/elf_long.avif',
    seats: 19,
    transmission: 'Manual',
    fuel: 'Diesel High Power',
    includeList: ['19 Kursi Reclining', 'AC Ducting Cold Air', 'Audio Sound & TV', 'Bagasi Barang Luas', 'Pengemudi Berpengalaman'],
    description: 'Microbus Isuzu Elf Long 19 seat dengan ruang legroom lega dan bagasi ekstra untuk wisata rombongan besar.',
    rating: 4.9,
    reviewsCount: 140,
    specifications: [
      { label: 'Kapasitas', value: '19 Kursi Penumpang' },
      { label: 'Fasilitas', value: 'AC Cold Air, TV Audio, Charger Port' },
      { label: 'Peruntukan', value: 'Wisata Jawa, Bali & Event Rombongan' }
    ]
  },

  // 2. SATU BINGKAI TUNGGAL UNTUK SEWA BUS PARIWISATA
  {
    id: 'sewa-bus-pariwisata',
    name: 'Sewa Bus Pariwisata',
    category: 'Sewa Bus Pariwisata',
    pricePerDay: 0,
    priceDisplay: 'Hubungi untuk Penawaran Harga',
    image: '/restu_bus.png',
    seats: 59,
    transmission: 'Manual',
    fuel: 'Diesel Heavy Duty',
    includeList: [
      'Medium Bus Legrest (18 Seat)',
      'Medium Bus (31, 35 & 39 Seat)',
      'Big Bus Legrest (32 Seat)',
      'Big Bus (47, 50 & 59 Seat)'
    ],
    description: 'Layanan bus pariwisata lengkap untuk kebutuhan study tour, gathering perusahaan, ziarah, & rombongan. Klik untuk lihat detail 4 tipe bus & pesan via WA.',
    rating: 5.0,
    reviewsCount: 250,
    specifications: [
      { label: 'Pilihan Tipe Bus', value: 'Medium Bus & Big Bus' },
      { label: 'Fasilitas', value: 'Full AC, Toilet, TV Karaoke, Legrest, Charger' },
      { label: 'Layanan', value: 'Sopir & Co-Driver Lisensi Utama Bus' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Bpk. Hendra Wijaya',
    role: 'Panitia Corporate Gathering - Jakarta',
    text: 'Sewa Big Bus Pariwisata Legrest di Restu Tour & Transport untuk acara Gathering Perusahaan ke Bandung & Lembang. Bus sangat bersih, AC dingin, sopir tepat waktu dan sangat paham rute. Sukses terus!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    carModel: 'Big Bus Pariwisata',
    date: 'Januari 2026'
  },
  {
    id: '2',
    name: 'Ibu Ratna Dewi',
    role: 'Rombongan Keluarga - Bandung',
    text: 'Sewa Toyota Hiace Premio Luxury untuk acara liburan keluarga besar ke Pangandaran. Mobilnya nyaman banget, captain seat nya empuk, sopir mas Agus ramah dan sangat membantu selama perjalanan.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    carModel: 'Hiace Premio Luxury',
    date: 'Februari 2026'
  },
  {
    id: '3',
    name: 'Drs. Ahmad Fauzi',
    role: 'Kepala Sekolah / Panitia Study Tour',
    text: 'Pelayanan Restu Tour & Transport sangat profesional! Pembayaran transparan, unit bus terawat, dan pengemudi mengutamakan keselamatan para siswa selama study tour ke Jogja & Jawa Tengah.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    carModel: 'Medium Bus Leg Rest',
    date: 'Maret 2026'
  }
];
