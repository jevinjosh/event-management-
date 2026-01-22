import { Event, Category, User } from '../types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Weddings',
    description: 'Make your special day unforgettable',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
    color: 'bg-pink-500'
  },
  {
    id: '2',
    name: 'Birthday Parties',
    description: 'Celebrate your birthday in style',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500',
    color: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'DJ Events',
    description: 'Dance the night away with top DJs',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
    color: 'bg-blue-500'
  },
  {
    id: '4',
    name: 'Cultural Events',
    description: 'Experience rich cultural traditions',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    name: 'Corporate Events',
    description: 'Professional events for your business',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500',
    color: 'bg-gray-600'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Luxury Garden Wedding',
    description: 'An elegant outdoor wedding ceremony in a beautiful garden setting with premium catering and decoration.',
    category: 'Weddings',
    price: 15000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
      'https://images.unsplash.com/photo-1519223328517-3a0a9e0c0b7d?w=500'
    ],
    date: '2024-06-15',
    time: '18:00',
    location: 'Sunset Gardens, Mumbai',
    capacity: 200,
    availableSlots: 45,
    services: ['Catering', 'Decoration', 'Photography', 'Music'],
    organizer: 'Elite Events Co.',
    featured: true
  },
  {
    id: '2',
    title: 'Sweet 16 Birthday Bash',
    description: 'A fun-filled birthday party with DJ, photo booth, and amazing entertainment for teenagers.',
    category: 'Birthday Parties',
    price: 2500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500',
    date: '2024-05-20',
    time: '16:00',
    location: 'Fun Zone, Delhi',
    capacity: 50,
    availableSlots: 12,
    services: ['DJ', 'Photo Booth', 'Games', 'Cake'],
    organizer: 'Party Planners Inc.',
    featured: true
  },
  {
    id: '3',
    title: 'Summer DJ Festival',
    description: 'An electrifying night with top DJs playing the latest hits. Food and drinks included.',
    category: 'DJ Events',
    price: 800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
    date: '2024-07-01',
    time: '20:00',
    location: 'Beach Club, Goa',
    capacity: 500,
    availableSlots: 200,
    services: ['DJ Performance', 'Bar', 'Food Court', 'Security'],
    organizer: 'Beach Entertainment',
    featured: true
  },
  {
    id: '4',
    title: 'Traditional Diwali Celebration',
    description: 'Experience the festival of lights with traditional music, dance, and authentic Indian cuisine.',
    category: 'Cultural Events',
    price: 1200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500',
    date: '2024-10-31',
    time: '19:00',
    location: 'Cultural Center, Jaipur',
    capacity: 300,
    availableSlots: 80,
    services: ['Cultural Performances', 'Traditional Food', 'Fireworks', 'Decorations'],
    organizer: 'Heritage Events',
    featured: false
  },
  {
    id: '5',
    title: 'Annual Corporate Gala',
    description: 'A sophisticated corporate event with networking opportunities, awards ceremony, and fine dining.',
    category: 'Corporate Events',
    price: 5000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500',
    date: '2024-08-15',
    time: '18:30',
    location: 'Grand Hotel, Bangalore',
    capacity: 150,
    availableSlots: 30,
    services: ['Networking', 'Awards Ceremony', 'Fine Dining', 'Entertainment'],
    organizer: 'Corporate Solutions',
    featured: false
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  createdAt: '2024-01-15'
};
