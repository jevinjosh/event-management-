import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { 
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  SparklesIcon,
  CameraIcon,
  MusicalNoteIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [customRequirements, setCustomRequirements] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <button
            onClick={() => navigate('/events')}
            className="btn-primary"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const serviceIcons: { [key: string]: React.ReactNode } = {
    'Catering': <CheckCircleIcon className="h-6 w-6" />,
    'Photography': <CameraIcon className="h-6 w-6" />,
    'Music': <MusicalNoteIcon className="h-6 w-6" />,
    'Decoration': <PaintBrushIcon className="h-6 w-6" />,
    'DJ Performance': <MusicalNoteIcon className="h-6 w-6" />,
    'Bar': <CheckCircleIcon className="h-6 w-6" />,
    'Food Court': <CheckCircleIcon className="h-6 w-6" />,
    'Security': <CheckCircleIcon className="h-6 w-6" />,
    'Networking': <SparklesIcon className="h-6 w-6" />,
    'Awards Ceremony': <StarIconSolid className="h-6 w-6 text-yellow-400" />,
    'Fine Dining': <CheckCircleIcon className="h-6 w-6" />,
    'Entertainment': <MusicalNoteIcon className="h-6 w-6" />,
    'Cultural Performances': <SparklesIcon className="h-6 w-6" />,
    'Traditional Food': <CheckCircleIcon className="h-6 w-6" />,
    'Fireworks': <SparklesIcon className="h-6 w-6" />,
    'Decorations': <PaintBrushIcon className="h-6 w-6" />,
    'Photo Booth': <CameraIcon className="h-6 w-6" />,
    'Games': <SparklesIcon className="h-6 w-6" />,
    'Cake': <CheckCircleIcon className="h-6 w-6" />
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    setShowBookingForm(true);
  };

  const calculateTotalPrice = () => {
    return event.price * guestCount;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      eventId: event.id,
      eventTitle: event.title,
      date: selectedDate,
      time: event.time,
      guestCount,
      totalPrice: calculateTotalPrice(),
      customRequirements,
      userId: user?.id,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    console.log('Booking submitted:', bookingData);
    
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-200">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center justify-center space-x-4">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                {event.category}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(event.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2">{event.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/events')}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <UserGroupIcon className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium">{event.capacity} guests</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Available Slots</p>
                    <p className="font-medium">{event.availableSlots} slots</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Included */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      {serviceIcons[service] || <CheckCircleIcon className="h-6 w-6 text-primary-600" />}
                    </div>
                    <span className="font-medium text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            {event.images && event.images.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${event.title} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{event.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">per person</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Organized by: <span className="font-medium">{event.organizer}</span></p>
                </div>
              </div>

              {!showBookingForm ? (
                <button
                  onClick={handleBooking}
                  className="w-full btn-primary text-lg py-4"
                  disabled={event.availableSlots === 0}
                >
                  {event.availableSlots === 0 ? 'Sold Out' : 'Book Now'}
                </button>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      required
                      className="input-field"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={event.date}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={Math.min(event.availableSlots, 10)}
                      className="input-field"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum {Math.min(event.availableSlots, 10)} guests
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Requirements (Optional)
                    </label>
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder="Any special requirements or preferences..."
                      value={customRequirements}
                      onChange={(e) => setCustomRequirements(e.target.value)}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Total Price:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{calculateTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 btn-primary"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Why Book With Us?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    Best price guarantee
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    Secure payment processing
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    24/7 customer support
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    Free cancellation up to 24 hours
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
