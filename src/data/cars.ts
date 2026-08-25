import { Car } from '../types';

export interface TestimonialItem {
  id: string;
  name: string;
  roleEN: string;
  roleID: string;
  textEN: string;
  textID: string;
  rating: number;
  image: string;
  carModelEN: string;
  carModelID: string;
  dateEN: string;
  dateID: string;
}

export const CARS: Car[] = [
  // 1. TOYOTA AVANZA
  {
    id: 'toyota-avanza',
    name: 'Toyota Avanza',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi Admin untuk Harga Terbaik',
    image: '/avanza.avif',
    seats: 7,
    transmission: 'Manual / Matic',
    fuel: 'Bensin',
    includeList: [
      'AC Dingin Double Blower',
      'Audio & Bluetooth System',
      'Kabin Bersih, Harum & Terawat',
      'Kapasitas 6 - 7 Penumpang',
      'Pengemudi Berpengalaman'
    ],
    description: 'Cocok untuk perjalanan keluarga dan perjalanan pribadi. Nyaman dan lincah untuk rute Pangandaran, Bandung, Jabodetabek dan sekitarnya.',
    rating: 4.9,
    reviewsCount: 156,
    specifications: [
      { label: 'Kapasitas', value: '6 - 7 Penumpang' },
      { label: 'Layanan', value: 'Door-to-Door / Private Trip' },
      { label: 'Karakteristik', value: 'Keluarga & Pribadi' }
    ]
  },

  // 2. NEW CALYA
  {
    id: 'new-calya',
    name: 'New Calya',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi Admin untuk Harga Terbaik',
    image: '/calya.avif',
    seats: 7,
    transmission: 'Manual / Matic',
    fuel: 'Bensin Hemat',
    includeList: [
      'AC Dingin & Nyaman',
      'Kabin Ergonomis',
      'Sangat Hemat Bahan Bakar',
      'Kapasitas 5 - 7 Penumpang',
      'Driver Ramah & Tepat Waktu'
    ],
    description: 'Pilihan praktis dan ekonomis untuk perjalanan. Solusi hemat untuk perjalanan antar kota dengan kenyamanan door-to-door.',
    rating: 4.8,
    reviewsCount: 132,
    specifications: [
      { label: 'Kapasitas', value: '5 - 7 Penumpang' },
      { label: 'Layanan', value: 'Travel Antar Kota / Private' },
      { label: 'Karakteristik', value: 'Praktis & Ekonomis' }
    ]
  },

  // 3. TOYOTA RUSH
  {
    id: 'toyota-rush',
    name: 'Toyota Rush',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi Admin untuk Harga Terbaik',
    image: '/rush.jpg',
    seats: 7,
    transmission: 'Manual / Matic',
    fuel: 'Bensin',
    includeList: [
      'Suspensi Tangguh & Nyaman',
      'Ground Clearance Tinggi',
      'Interior Modern & Lega',
      'Kapasitas 7 Penumpang',
      'Pengemudi Handal Antar Kota'
    ],
    description: 'Nyaman untuk perjalanan keluarga dan perjalanan jarak jauh. Tangguh melibas berbagai kondisi rute dengan kenyamanan maksimal.',
    rating: 5.0,
    reviewsCount: 148,
    specifications: [
      { label: 'Kapasitas', value: '7 Penumpang' },
      { label: 'Layanan', value: 'Keluarga, Bisnis & Jarak Jauh' },
      { label: 'Karakteristik', value: 'Tangguh & Nyaman' }
    ]
  },

  // 4. TOYOTA HIACE
  {
    id: 'toyota-hiace',
    name: 'Toyota Hiace',
    category: 'Sewa Mobil',
    pricePerDay: 0,
    priceDisplay: 'Hubungi Admin untuk Harga Terbaik',
    image: '/hiace.avif',
    seats: 14,
    transmission: 'Manual',
    fuel: 'Diesel Bertenaga',
    includeList: [
      'Kapasitas 10 - 14 Kursi Reclining',
      'Ducting AC Dingin Merata',
      'Bagasi Luas & Lega',
      'Audio & Charging Port',
      'Pengemudi Rombongan Berpengalaman'
    ],
    description: 'Cocok untuk perjalanan bersama dan rombongan. Pilihan utama untuk family gathering, rombongan kantor, dan perjalanan wisata.',
    rating: 5.0,
    reviewsCount: 175,
    specifications: [
      { label: 'Kapasitas', value: '10 - 14 Penumpang' },
      { label: 'Layanan', value: 'Transportasi Rombongan / Wisata' },
      { label: 'Karakteristik', value: 'Luas, Nyaman & Rombongan' }
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    roleEN: 'Customer - Jakarta to Pangandaran',
    roleID: 'Pelanggan Rute Jakarta – Pangandaran',
    textEN: 'Super convenient door-to-door service! Picked up right from my house in Jakarta and arrived safely in Pangandaran without switching vehicles. Clean car and experienced driver.',
    textID: 'Layanan door-to-door dari Putri Munggaran Tour & Travel sangat praktis! Dijemput langsung di depan rumah di Jakarta dan diantar sampai tujuan di Pangandaran dengan aman dan nyaman tanpa repot ganti kendaraan.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    carModelEN: 'Toyota Rush',
    carModelID: 'Toyota Rush',
    dateEN: 'January 2026',
    dateID: 'Januari 2026'
  },
  {
    id: '2',
    name: 'Ibu Ratna Dewi',
    roleEN: 'Family Trip - Pangandaran to Bandung',
    roleID: 'Perjalanan Keluarga Pangandaran – Bandung',
    textEN: 'Used Toyota Avanza for family trip to Bandung. The driver was polite, punctual, and drove very smoothly. Truly living up to their tagline: Safe, Comfortable, Reach the Destination!',
    textID: 'Perjalanan keluarga dari Pangandaran ke Bandung menggunakan Toyota Avanza sangat nyaman. Driver ramah, tepat waktu, dan mengemudi dengan sangat hati-hati. Benar-benar Aman, Nyaman, Sampai Tujuan!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    carModelEN: 'Toyota Avanza',
    carModelID: 'Toyota Avanza',
    dateEN: 'February 2026',
    dateID: 'Februari 2026'
  },
  {
    id: '3',
    name: 'Ahmad Faisal',
    roleEN: 'Group Outing - Jabodetabek',
    roleID: 'Rombongan Kantor – Jabodetabek',
    textEN: 'Booked Toyota Hiace for our office group trip to Pangandaran. Spacious, cool AC, clean interior, and effortless WhatsApp booking. Highly recommended travel service!',
    textID: 'Sewa Toyota Hiace untuk rombongan ke Pangandaran. Kabin luas, AC dingin, dan pemesanan via WhatsApp sangat mudah & responsif. Putri Munggaran Tour & Travel sangat kami rekomendasikan!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    carModelEN: 'Toyota Hiace',
    carModelID: 'Toyota Hiace',
    dateEN: 'March 2026',
    dateID: 'Maret 2026'
  }
];
