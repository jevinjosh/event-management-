import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  UserCircleIcon,
  CalendarIcon,
  TicketIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');

  const mockBookings = [
    {
      id: '1',
      eventTitle: 'Luxury Garden Wedding',
      date: '2024-06-15',
      time: '18:00',
      guestCount: 50,
      totalPrice: 750000,
      status: 'confirmed' as const,
      location: 'Sunset Gardens, Mumbai',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500'
    },
    {
      id: '2',
      eventTitle: 'Summer DJ Festival',
      date: '2024-07-01',
      time: '20:00',
      guestCount: 5,
      totalPrice: 4000,
      status: 'pending' as const,
      location: 'Beach Club, Goa',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500'
    },
    {
      id: '3',
      eventTitle: 'Corporate Gala',
      date: '2024-05-10',
      time: '18:30',
      guestCount: 20,
      totalPrice: 100000,
      status: 'cancelled' as const,
      location: 'Grand Hotel, Bangalore',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your profile</h2>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              {user.phone && <p className="text-gray-600">{user.phone}</p>}
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {user.role === 'admin' ? 'Administrator' : 'Member'}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <TicketIcon className="h-5 w-5" />
                  <span>My Bookings</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Profile Settings</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'bookings' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
              <button
                onClick={() => navigate('/events')}
                className="btn-primary"
              >
                Book New Event
              </button>
            </div>

            {mockBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="card">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={booking.image}
                        alt={booking.eventTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.eventTitle}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarIcon className="h-4 w-4 mr-2 text-primary-600" />
                          {new Date(booking.date).toLocaleDateString()} at {booking.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <UserCircleIcon className="h-4 w-4 mr-2 text-primary-600" />
                          {booking.guestCount} guests
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <TicketIcon className="h-4 w-4 mr-2 text-primary-600" />
                          {booking.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary-600">
                          ₹{booking.totalPrice.toLocaleString()}
                        </span>
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <TicketIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-4">Start exploring and book your first event!</p>
                <button
                  onClick={() => navigate('/events')}
                  className="btn-primary"
                >
                  Browse Events
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    defaultValue={user.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    defaultValue={user.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    defaultValue={user.phone || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <input
                    type="text"
                    className="input-field bg-gray-50"
                    value={user.role === 'admin' ? 'Administrator' : 'Member'}
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button type="button" className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
