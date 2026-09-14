export type PageId = 'home' | 'menu' | 'deals' | 'builder' | 'reservation' | 'branches' | 'track-order';

export type CategoryId = 'all' | 'deals' | 'pizzas' | 'burgers' | 'pastas' | 'appetizers' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: 'pizzas' | 'burgers' | 'pastas' | 'appetizers' | 'deals' | 'drinks';
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  tags?: ('Bestseller' | 'Spicy' | 'Chef Special' | 'Popular' | 'New' | 'Cheesy' | 'Vegetarian')[];
  rating: number;
  reviewsCount: number;
  
  // Customization options
  sizes?: {
    name: string;
    label: string;
    priceModifier: number; // added to base price
    slicesOrServing?: string;
  }[];
  
  crusts?: {
    name: string;
    priceModifier: number;
  }[];
  
  spiceLevels?: ('Mild' | 'Medium' | 'Hot' | 'Extreme Spicy')[];
  
  addons?: {
    id: string;
    name: string;
    price: number;
  }[];
  
  dealIncludes?: string[];
}

export interface CustomPizzaConfig {
  size: 'small' | 'medium' | 'large' | 'jumbo';
  crust: 'pan' | 'handTossed' | 'crown' | 'stuffed' | 'thin';
  sauce: 'marinara' | 'garlicMayo' | 'bbq' | 'periPeriRanch' | 'chipotle';
  cheeseLevel: 'regular' | 'extra' | 'tripleBlast';
  meats: string[];
  veggies: string[];
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem?: MenuItem;
  isCustomPizza?: boolean;
  customPizzaConfig?: CustomPizzaConfig;
  name: string;
  selectedSize?: string;
  selectedCrust?: string;
  selectedSpice?: string;
  selectedAddons?: { id: string; name: string; price: number }[];
  specialInstructions?: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  customerPhone: string;
  orderType: 'delivery' | 'takeaway' | 'dinein';
  deliveryAddress?: string;
  areaZone?: string;
  tableNumber?: string;
  specialNotes?: string;
  paymentMethod: 'cash' | 'card' | 'onlineTransfer';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  status: 'received' | 'baking' | 'packing' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  estimatedMinutes: number;
}

export interface TableReservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending';
}
