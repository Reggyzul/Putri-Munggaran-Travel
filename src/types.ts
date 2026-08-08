export interface Car {
  id: string;
  name: string;
  nameAr?: string;
  category: string;
  pricePerDay: number; // in IDR
  priceDisplay?: string; // custom price text
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual' | 'Matic' | 'Manual/Matic';
  fuel: string;
  fuelAr?: string;
  includeList: string[];
  includeListAr?: string[];
  description: string;
  descriptionAr?: string;
  rating: number;
  reviewsCount: number;
  specifications: {
    label: string;
    labelAr?: string;
    value: string;
    valueAr?: string;
  }[];
}


export interface BookingDetails {
  carId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  days: number;
  rentalType: 'with_driver' | 'without_driver';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  includeBBM: boolean;
  includeTolParkir: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  carModel: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  snippet: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
}
