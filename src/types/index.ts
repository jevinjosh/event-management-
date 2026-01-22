export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  images?: string[];
  date: string;
  time: string;
  location: string;
  capacity: number;
  availableSlots: number;
  services: string[];
  organizer: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  eventTitle: string;
  date: string;
  time: string;
  guestCount: number;
  totalPrice: number;
  customRequirements?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  location: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface EventFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
  search?: string;
  sortBy?: 'price' | 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
}
