import { Car, Testimonial } from '../types';

export const CARS: Car[] = [
  // 1. CAR RENTAL (MPV, VIP & HIACE/ELF)
  {
    id: 'avanza',
    name: 'Toyota Avanza',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Best Rates',
    image: '/avanza.avif',
    seats: 7,
    transmission: 'Manual / Automatic',
    fuel: 'Petrol (Included / Optional)',
    includeList: [
      'Multi-Blower Cold AC',
      'Bluetooth / USB Audio System',
      'Ergonomic Reclining Seats',
      'Clean & Fragrant Interior',
      'Licensed Professional Driver & Fuel'
    ],
    description: 'The most popular MPV for family trips, business travel, airport transfers, and exploring Bandung & inter-city destinations.',
    rating: 4.9,
    reviewsCount: 145,
    specifications: [
      { label: 'Capacity', value: '6 - 7 Passengers' },
      { label: 'Service', value: 'Daily Rental + Driver / All-In' },
      { label: 'Use Case', value: 'Family, Business & Airport Transfer' }
    ]
  },
  {
    id: 'innova-reborn',
    name: 'Toyota Innova Reborn',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Best Rates',
    image: '/innova3.avif',
    seats: 7,
    transmission: 'Manual / Automatic',
    fuel: 'Petrol / Euro 4 Diesel',
    includeList: [
      'Triple Zone Climate AC',
      'Ultra Quiet & Spacious Cabin',
      'Touchscreen Infotainment',
      'Captain / Standard Seats',
      'Licensed Pro Driver'
    ],
    description: 'Premium MPV featuring superior suspension comfort and silent cabin, ideal for executive business trips & family road trips.',
    rating: 5.0,
    reviewsCount: 182,
    specifications: [
      { label: 'Capacity', value: '7 Passengers' },
      { label: 'Features', value: 'Smooth Suspension, Per-Row AC, Quiet Cabin' },
      { label: 'Service', value: 'Java & Bali Experienced Driver' }
    ]
  },
  {
    id: 'alphard',
    name: 'Toyota Alphard / Vellfire',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for VIP Pricing',
    image: '/alphard.avif',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Premium Petrol',
    includeList: [
      'First Class Captain Seats',
      'Power Sliding Doors',
      'Sunroof / Moonroof',
      'Automatic Climate Control',
      'Formally Dressed VIP Driver'
    ],
    description: 'Top-tier luxury MPV for VIP guests, corporate executives, wedding events, and high-profile delegations.',
    rating: 5.0,
    reviewsCount: 94,
    specifications: [
      { label: 'Capacity', value: '6 - 7 VIP Seats' },
      { label: 'Interior', value: 'Leather Captain Seat + Ottoman' },
      { label: 'Service', value: 'Formal VIP Driver & Punctual Service' }
    ]
  },
  {
    id: 'hiace-premio-luxury',
    name: 'Toyota Hiace Premio Luxury',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Best Rates',
    image: '/hiace_premio.avif',
    seats: 10,
    transmission: 'Manual',
    fuel: 'High Power Diesel',
    includeList: [
      'Captain Leather Seats (8, 9 & 10 Seats)',
      'Smart TV & Sound System',
      'USB Charging Ports per Row',
      'Ducting Cold Air Conditioning',
      'Licensed Pro Driver'
    ],
    description: 'Luxury Premio Luxury microbus configured with 8, 9 & 10 Captain Seats for exclusive group tours.',
    rating: 5.0,
    reviewsCount: 110,
    specifications: [
      { label: 'Seat Options', value: '8, 9 & 10 Seats (Captain Seats)' },
      { label: 'Amenities', value: 'Smart TV, Karaoke Sound, USB Ports, AC' },
      { label: 'Service', value: 'Corporate Gathering & VIP Tour' }
    ]
  },
  {
    id: 'hiace-commuter',
    name: 'Toyota Hiace Commuter',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Best Rates',
    image: '/hiace.avif',
    seats: 14,
    transmission: 'Manual',
    fuel: 'Diesel',
    includeList: [
      '14 Reclining Passenger Seats',
      'Ceiling Cold AC Ducting',
      'Full Audio Player',
      'Spacious & Comfortable Cabin',
      'Friendly Licensed Driver'
    ],
    description: 'The preferred 14-seater van for family trips, school excursions, corporate outings, and inter-city travel.',
    rating: 4.9,
    reviewsCount: 168,
    specifications: [
      { label: 'Capacity', value: '14 Passengers' },
      { label: 'Amenities', value: 'Ceiling AC, Reclining Seats, Luggage Space' },
      { label: 'Coverage', value: 'Bandung City Tour & Java-Bali Trips' }
    ]
  },
  {
    id: 'hiace-premio-standard',
    name: 'Toyota Hiace Premio (14 Seats)',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Best Rates',
    image: '/hiace_premio.avif',
    seats: 14,
    transmission: 'Manual',
    fuel: 'Euro 4 Diesel',
    includeList: [
      '14 Ergonomic Seats',
      'Monocoque Quiet Cabin Design',
      'Individual Air Ducting',
      'ABS & VSC Safety Systems',
      'Professional Driver'
    ],
    description: 'Latest generation 14-seater Hiace Premio featuring modern exterior, quiet ride, and enhanced safety features.',
    rating: 4.9,
    reviewsCount: 125,
    specifications: [
      { label: 'Capacity', value: '14 Passengers' },
      { label: 'Suspension', value: 'Smoother & Stable Ride' },
      { label: 'Service', value: 'Inter-City Travel & Family Trips' }
    ]
  },
  {
    id: 'elf-short-coaster',
    name: 'Isuzu Elf Short / Coaster',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Best Rates',
    image: '/elf_long.avif',
    seats: 17,
    transmission: 'Manual',
    fuel: 'Diesel',
    includeList: [
      '17 Passenger Seats',
      'Multi-Blower Air Conditioning',
      'Karaoke Audio System',
      'Mountain Terrain Expert Driver',
      'Efficient Group Size'
    ],
    description: 'Agile 17-seater Isuzu Elf Short ideal for navigating hilly routes and West Java destinations for medium-sized groups.',
    rating: 4.8,
    reviewsCount: 92,
    specifications: [
      { label: 'Capacity', value: '17 Passengers' },
      { label: 'Amenities', value: 'Ceiling AC, Karaoke Sound System' },
      { label: 'Use Case', value: 'School Trips, Group Outings & Pilgrimages' }
    ]
  },
  {
    id: 'elf-long',
    name: 'Isuzu Elf Long',
    category: 'Car Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Best Rates',
    image: '/elf_long.avif',
    seats: 19,
    transmission: 'Manual',
    fuel: 'High Power Diesel',
    includeList: [
      '19 Reclining Seats',
      'Cold Air Ducting AC',
      'TV & Sound Karaoke System',
      'Extra Large Luggage Space',
      'Experienced Route Driver'
    ],
    description: 'Spacious 19-seater microbus featuring generous legroom and rear cargo capacity for large group tours.',
    rating: 4.9,
    reviewsCount: 140,
    specifications: [
      { label: 'Capacity', value: '19 Passengers' },
      { label: 'Amenities', value: 'Cold AC, TV Audio, Charging Ports' },
      { label: 'Coverage', value: 'Java, Bali & Nationwide Group Events' }
    ]
  },

  // 2. SINGLE CARD FOR TOURISM BUS RENTAL
  {
    id: 'sewa-bus-pariwisata',
    name: 'Tourism Bus Rental',
    category: 'Tourism Bus Rental',
    pricePerDay: 0,
    priceDisplay: 'Contact for Custom Quotes',
    image: '/restu_bus.png',
    seats: 59,
    transmission: 'Manual',
    fuel: 'Heavy Duty Diesel',
    includeList: [
      'Medium Bus Legrest (18 Seats)',
      'Medium Bus (31, 35 & 39 Seats)',
      'Big Bus Legrest (32 Seats)',
      'Big Bus (47, 50 & 59 Seats)'
    ],
    description: 'Comprehensive Tourism Bus Rental services for study tours, corporate gatherings, and group travel. Click to view all 4 bus categories.',
    rating: 5.0,
    reviewsCount: 250,
    specifications: [
      { label: 'Bus Options', value: 'Medium Bus & Big Bus' },
      { label: 'Amenities', value: 'Full AC, Toilet, Karaoke TV, Legrest, Charger' },
      { label: 'Service', value: 'Primary Licensed Bus Driver & Co-Driver' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mr. Hendra Wijaya',
    role: 'Corporate Gathering Committee - Jakarta',
    text: 'Rented Big Bus Legrest from Restu Tour & Transport for our Corporate Gathering to Bandung & Lembang. Very clean bus, cold AC, punctual driver and knew the routes well. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    carModel: 'Big Tourism Bus',
    date: 'January 2026'
  },
  {
    id: '2',
    name: 'Mrs. Ratna Dewi',
    role: 'Family Trip - Bandung',
    text: 'Rented Toyota Hiace Premio Luxury for a big family vacation to Pangandaran. Extremely comfortable captain seats, clean cabin, and driver Mr. Agus was polite and helpful throughout the trip.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    carModel: 'Hiace Premio Luxury',
    date: 'February 2026'
  },
  {
    id: '3',
    name: 'Dr. Ahmad Fauzi',
    role: 'School Study Tour Organizer',
    text: 'Restu Tour & Transport provided outstanding service! Transparent pricing, top-tier maintained bus unit, and safety-focused drivers for our school study tour to Jogja & Central Java.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    carModel: 'Medium Bus Leg Rest',
    date: 'March 2026'
  }
];
