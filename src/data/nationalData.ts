export interface NationalCity {
  id: string;
  name: string;
  urduName: string;
  outletsCount: number;
  isPopular?: boolean;
}

export interface NationalOutlet {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  address: string;
  landmark: string;
  phone: string;
  hotline: string;
  timing: string;
  status: 'open' | 'busy' | 'closing_soon';
  dineInCapacity: string;
  services: ('dine_in' | 'takeaway' | 'delivery' | 'car_dine' | 'party_hall' | 'kids_area' | 'wifi')[];
  rating: number;
  reviewsCount: number;
  googleMapsUrl: string;
  isFlagship?: boolean;
}

export const NATIONAL_CITIES: NationalCity[] = [
  { id: 'karachi', name: 'Karachi', urduName: 'کراچی', outletsCount: 6, isPopular: true },
  { id: 'lahore', name: 'Lahore', urduName: 'لاہور', outletsCount: 5, isPopular: true },
  { id: 'islamabad', name: 'Islamabad', urduName: 'اسلام آباد', outletsCount: 3, isPopular: true },
  { id: 'rawalpindi', name: 'Rawalpindi', urduName: 'راولپنڈی', outletsCount: 2, isPopular: true },
  { id: 'faisalabad', name: 'Faisalabad', urduName: 'فیصل آباد', outletsCount: 2, isPopular: true },
  { id: 'multan', name: 'Multan', urduName: 'ملتان', outletsCount: 2, isPopular: true },
  { id: 'peshawar', name: 'Peshawar', urduName: 'پشاور', outletsCount: 1, isPopular: false },
  { id: 'sialkot', name: 'Sialkot', urduName: 'سیالکوٹ', outletsCount: 1, isPopular: false },
  { id: 'gujranwala', name: 'Gujranwala', urduName: 'گوجرانوالہ', outletsCount: 1, isPopular: false },
];

export const NATIONAL_OUTLETS: NationalOutlet[] = [
  // KARACHI
  {
    id: 'khi-clifton',
    name: 'Paradise Flagship Clifton',
    cityId: 'karachi',
    cityName: 'Karachi',
    address: 'Plot 4, Block 4, Clifton Marine Drive (Opposite Fitness Hub & Ocean Mall)',
    landmark: 'Ground Floor, Commercial Plaza, Clifton',
    phone: '021-35876001',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '120+ Seats (Family Hall & Executive Lounge)',
    services: ['dine_in', 'takeaway', 'delivery', 'car_dine', 'party_hall', 'wifi'],
    rating: 4.9,
    reviewsCount: 1820,
    googleMapsUrl: 'https://maps.google.com/?q=Clifton+Karachi',
    isFlagship: true,
  },
  {
    id: 'khi-gulshan',
    name: 'Paradise Gulshan Avenue',
    cityId: 'karachi',
    cityName: 'Karachi',
    address: 'Block 13-C, Main University Road (Near Disco Bakery)',
    landmark: 'Main Commercial Hub, Gulshan-e-Iqbal',
    phone: '021-34988220',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '80+ Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'party_hall', 'wifi'],
    rating: 4.8,
    reviewsCount: 1240,
    googleMapsUrl: 'https://maps.google.com/?q=Gulshan+Karachi',
  },
  {
    id: 'khi-dha',
    name: 'Paradise DHA Phase 6',
    cityId: 'karachi',
    cityName: 'Karachi',
    address: 'Main Shahbaz Commercial, Lane 4, DHA Phase 6',
    landmark: 'Near 26th Street Intersection',
    phone: '021-35341199',
    hotline: '03-111-786-676',
    timing: '1:00 PM – 4:00 AM (Late Night Special)',
    status: 'open',
    dineInCapacity: '95 Seats (Outdoor Patio & Indoor Hall)',
    services: ['dine_in', 'takeaway', 'delivery', 'car_dine', 'wifi'],
    rating: 4.9,
    reviewsCount: 980,
    googleMapsUrl: 'https://maps.google.com/?q=DHA+Phase+6+Karachi',
  },

  // LAHORE
  {
    id: 'lhr-dha5',
    name: 'Paradise Flagship DHA Lahore',
    cityId: 'lahore',
    cityName: 'Lahore',
    address: 'CCA Sector C, DHA Phase 5 Commercial Boulevard',
    landmark: 'Opposite Jalal Sons, DHA Phase 5',
    phone: '042-37189001',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '150+ Seats (2 Floors + Rooftop Dining)',
    services: ['dine_in', 'takeaway', 'delivery', 'car_dine', 'party_hall', 'kids_area', 'wifi'],
    rating: 4.9,
    reviewsCount: 2150,
    googleMapsUrl: 'https://maps.google.com/?q=DHA+Phase+5+Lahore',
    isFlagship: true,
  },
  {
    id: 'lhr-gulberg',
    name: 'Paradise MM Alam Gourmet Store',
    cityId: 'lahore',
    cityName: 'Lahore',
    address: 'Plot 18-B, MM Alam Road, Gulberg III',
    landmark: 'Beside Gourmet Food Court',
    phone: '042-35759902',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '110 Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'party_hall', 'wifi'],
    rating: 4.8,
    reviewsCount: 1420,
    googleMapsUrl: 'https://maps.google.com/?q=MM+Alam+Road+Lahore',
  },
  {
    id: 'lhr-johar',
    name: 'Paradise Johar Town Express',
    cityId: 'lahore',
    cityName: 'Lahore',
    address: 'Main Boulevard, G-1 Market, Johar Town',
    landmark: 'Near Doctors Hospital Roundabout',
    phone: '042-35314488',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '70 Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'car_dine', 'wifi'],
    rating: 4.8,
    reviewsCount: 890,
    googleMapsUrl: 'https://maps.google.com/?q=Johar+Town+Lahore',
  },

  // ISLAMABAD
  {
    id: 'isb-f7',
    name: 'Paradise Capital Flagship F-7',
    cityId: 'islamabad',
    cityName: 'Islamabad',
    address: 'School Road, Jinnah Super Market, F-7 Markaz',
    landmark: 'Opposite Safa Gold Mall Entry B',
    phone: '051-2654321',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '130+ Seats (Panoramic View Hall)',
    services: ['dine_in', 'takeaway', 'delivery', 'car_dine', 'party_hall', 'wifi'],
    rating: 4.9,
    reviewsCount: 1680,
    googleMapsUrl: 'https://maps.google.com/?q=F-7+Markaz+Islamabad',
    isFlagship: true,
  },
  {
    id: 'isb-bluearea',
    name: 'Paradise Blue Area Central',
    cityId: 'islamabad',
    cityName: 'Islamabad',
    address: 'Fazl-ul-Haq Road, Blue Area Commercial District',
    landmark: 'Near Stock Exchange Metro Station',
    phone: '051-2801990',
    hotline: '03-111-786-676',
    timing: '11:30 AM – 3:30 AM (Corporate Delivery Hub)',
    status: 'open',
    dineInCapacity: '85 Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'wifi'],
    rating: 4.8,
    reviewsCount: 1110,
    googleMapsUrl: 'https://maps.google.com/?q=Blue+Area+Islamabad',
  },

  // RAWALPINDI
  {
    id: 'rwp-saddar',
    name: 'Paradise Saddar Cantt',
    cityId: 'rawalpindi',
    cityName: 'Rawalpindi',
    address: 'The Mall Road, Saddar Cantt (Opposite AFIC)',
    landmark: 'Near GPO & Saddar Metro Station',
    phone: '051-5567890',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '95 Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'car_dine', 'wifi'],
    rating: 4.8,
    reviewsCount: 940,
    googleMapsUrl: 'https://maps.google.com/?q=Saddar+Rawalpindi',
  },

  // FAISALABAD
  {
    id: 'fsd-kohinoor',
    name: 'Paradise Kohinoor Flagship',
    cityId: 'faisalabad',
    cityName: 'Faisalabad',
    address: 'Jaranwala Road, Kohinoor City Phase 1',
    landmark: 'Near Kohinoor One Plaza',
    phone: '041-8541200',
    hotline: '03-111-786-676',
    timing: '12:30 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '110 Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'party_hall', 'kids_area', 'wifi'],
    rating: 4.9,
    reviewsCount: 1320,
    googleMapsUrl: 'https://maps.google.com/?q=Kohinoor+City+Faisalabad',
    isFlagship: true,
  },

  // MULTAN
  {
    id: 'mul-gulgasht',
    name: 'Paradise Gulgasht Avenue',
    cityId: 'multan',
    cityName: 'Multan',
    address: 'Gol Bagh Road, Gulgasht Colony Commercial Zone',
    landmark: 'Beside Jalal Plaza',
    phone: '061-6523311',
    hotline: '03-111-786-676',
    timing: '1:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '90 Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'car_dine', 'wifi'],
    rating: 4.8,
    reviewsCount: 870,
    googleMapsUrl: 'https://maps.google.com/?q=Gulgasht+Multan',
  },

  // PESHAWAR
  {
    id: 'psh-university',
    name: 'Paradise University Road Hub',
    cityId: 'peshawar',
    cityName: 'Peshawar',
    address: 'Main University Road, Tahkal Payan (Near BRT Station 14)',
    landmark: 'Opposite Islamia College Gate',
    phone: '091-5842200',
    hotline: '03-111-786-676',
    timing: '12:00 PM – 3:30 AM (Daily)',
    status: 'open',
    dineInCapacity: '105 Seats',
    services: ['dine_in', 'takeaway', 'delivery', 'party_hall', 'wifi'],
    rating: 4.9,
    reviewsCount: 760,
    googleMapsUrl: 'https://maps.google.com/?q=University+Road+Peshawar',
  },
];

export const NATIONAL_STANDARDS = [
  {
    id: 'dough',
    title: '48-Hour Artisanal Cold Fermented Dough',
    subtitle: 'Crisp Blistering Crust • Never Frozen',
    desc: 'Each pizza crust is hand-stretched from slow-matured unbleached wheat dough, creating airy micro-bubbles and unmatched digestion comfort.',
    icon: '🥖',
    badge: 'Artisanal Craft',
  },
  {
    id: 'cheese',
    title: '100% Pure Dairy Mozzarella & Smoked Gouda',
    subtitle: 'Zero Analog • Zero Vegetable Fats',
    desc: 'We strictly ban cheap oil-based cheese analogs. Our custom blend of whole milk mozzarella delivers the iconic 18-inch velvety cheese pull.',
    icon: '🧀',
    badge: 'Real Dairy Verified',
  },
  {
    id: 'oven',
    title: '450°C Stone Hearth Flame Baking',
    subtitle: 'Locking In Char, Juices & Fragrance',
    desc: 'Baking directly on imported volcanic stone slabs caramelizes the secret marinara sauce and delivers that authentic pizzeria aroma.',
    icon: '🔥',
    badge: 'Stone Oven Baked',
  },
  {
    id: 'delivery',
    title: 'Thermal-Locked Heat Vault Delivery Fleet',
    subtitle: 'Guaranteed 65°C+ Piping Hot Arrival',
    desc: 'Equipped with temperature-controlled insulated heat chambers, ensuring your crust remains crisp and cheese stays molten till your doorstep in 30 minutes.',
    icon: '⚡',
    badge: '30-Min Guarantee',
  },
];

export const CORPORATE_SERVICES = [
  {
    title: 'Executive Corporate Luncheons',
    desc: 'Pre-ordered steaming hot pizza feasts and gourmet burger platters for board meetings, tech hubs, and office gatherings.',
    benefit: 'Dedicated Corporate Discount & Tax Invoices',
  },
  {
    title: 'Grand Birthday & Party Hall Bookings',
    desc: 'Private air-conditioned family halls with custom theme decor, party music systems, and unlimited combo packages.',
    benefit: 'Special Party Favors & Kids Activities',
  },
  {
    title: 'Bulk University & Late Night Cravings',
    desc: 'Campus ambassador discounts, study session midnight feast boxes, and hostel group deliveries till 3:30 AM.',
    benefit: 'Special Student Combo Pricing',
  },
];
