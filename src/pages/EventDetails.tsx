import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useEvent } from '../context/EventContext';
import BookingConfirmation from '../components/BookingConfirmation';
import Calendar from '../components/Calendar';
import { loadStripe } from '@stripe/stripe-js';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  SparklesIcon,
  CameraIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Service icons mapping
const serviceIcons: Record<string, React.ReactElement> = {
  'Photography': <CameraIcon className="h-6 w-6 text-primary-600" />,
  'Catering': <SparklesIcon className="h-6 w-6 text-primary-600" />,
  'Music': <MusicalNoteIcon className="h-6 w-6 text-primary-600" />,
  'Decoration': <PaintBrushIcon className="h-6 w-6 text-primary-600" />,
  'Venue': <MapPinIcon className="h-6 w-6 text-primary-600" />,
};

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addBooking } = useBooking();
  const { getEventWithAvailability, updateEventSlots, validateSlotAvailability } = useEvent();

  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [customRequirements, setCustomRequirements] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'stripe' | 'card'>('cash');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookingError, setBookingError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCalendar) {
        const target = event.target as Element;
        if (!target.closest('.calendar-container')) {
          setShowCalendar(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe('pk_test_your_stripe_publishable_key_here');
      setStripe(stripeInstance);
    };

    initializeStripe();
  }, []);

  const event = id ? getEventWithAvailability(id) : undefined;
  const availableSlots = event ? event.availableSlots : 0;

  // Generate available dates (next 30 days as an example)
  const availableDates = React.useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <button onClick={() => navigate('/events')} className="btn-primary">
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    return event.price * guestCount;
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');

    if (!validateSlotAvailability(event.id, guestCount)) {
      setBookingError(`Only ${availableSlots} slots available.`);
      return;
    }

    if (!user) {
      setBookingError('Please login to make a booking.');
      navigate('/login');
      return;
    }

    // Debug: Log the event object to see what we're working with
    console.log('Event object:', event);
    console.log('Event ID:', event.id);
    console.log('User object:', user);
    console.log('User ID:', (user as any)._id || user.id);

    // Create booking object with required fields
    // Remove the 'id' and 'createdAt' fields - MongoDB will generate these
    const bookingPayload = {
      eventId: event.id, // Use event.id which should be the MongoDB _id
      eventTitle: event.title,
      date: selectedDate,
      time: event.time,
      guestCount,
      totalPrice: calculateTotalPrice(),
      customRequirements,
      paymentMethod,
      userId: (user as any)._id || user.id,
      status: 'confirmed' as const,
      location: event.location,
      image: event.image,
    };

    console.log('Booking payload:', bookingPayload);

    // Create local booking object with generated fields for state management
    const booking = {
      ...bookingPayload,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    try {
      if (paymentMethod === 'stripe' && stripe) {
        const stripeResponse = await simulateStripePayment(bookingPayload.totalPrice);
        if (!stripeResponse.success) {
          setBookingError('Payment failed. Please try again.');
          return;
        }
      }

      // Send bookingPayload (without id and createdAt) to backend
      const response = await addBooking(bookingPayload as any);
      updateEventSlots(event.id, guestCount);

      // Use the response from backend or the local booking object for display
      setBookingData(response || booking);
      setShowConfirmation(true);
      setShowBookingForm(false);

      setSelectedDate('');
      setGuestCount(1);
      setCustomRequirements('');
      setPaymentMethod('cash');
    } catch (error) {
      setBookingError('Failed to complete booking. Please try again.');
      console.error('Booking error:', error);
    }
  };

  const simulateStripePayment = async (amount: number): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
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
                  {bookingError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {bookingError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="w-full input-field text-left flex items-center justify-between"
                      >
                        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
                          {selectedDate 
                            ? new Date(selectedDate).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })
                            : 'Choose a date'
                          }
                        </span>
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </button>
                      
                      {showCalendar && (
                        <div className="absolute z-10 mt-2 w-full calendar-container">
                          <Calendar
                            selectedDate={selectedDate}
                            onDateSelect={(date) => {
                              setSelectedDate(date);
                              setShowCalendar(false);
                            }}
                            availableDates={availableDates}
                            minDate={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {availableSlots > 0 ? `${availableSlots} slots available` : 'No slots available'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={Math.min(availableSlots, 15)}
                      className="input-field"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum {Math.min(availableSlots, 15)} guests
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'stripe' | 'card')}
                          className="mr-3"
                        />
                        <BanknotesIcon className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <span className="font-medium text-gray-900">Cash</span>
                          <p className="text-xs text-gray-500">Pay at the venue</p>
                        </div>
                      </label>

                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="stripe"
                          checked={paymentMethod === 'stripe'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'stripe' | 'card')}
                          className="mr-3"
                        />
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Stripe</span>
                          <p className="text-xs text-gray-500">Secure card payment</p>
                        </div>
                      </label>

                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'stripe' | 'card')}
                          className="mr-3"
                        />
                        <CreditCardIcon className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <span className="font-medium text-gray-900">Credit/Debit Card</span>
                          <p className="text-xs text-gray-500">Direct card payment</p>
                        </div>
                      </label>
                    </div>
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

      {/* Booking Confirmation Popup */}
      <BookingConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        bookingData={bookingData}
      />
    </div>
  );
};

export default EventDetails;