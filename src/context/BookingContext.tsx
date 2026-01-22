import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Booking } from '../types';
import { bookingsAPI } from '../services/api';
import { useAuth } from './AuthContext';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<void>;
  updateEventSlots: (eventId: string, bookedSlots: number) => void;
  releaseEventSlots: (eventId: string, slotsToRelease: number) => void;
  getEventBookedSlots: (eventId: string) => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

type BookingAction =
  | { type: 'SET_BOOKINGS'; payload: Booking[] }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'CANCEL_BOOKING'; payload: string };

const bookingReducer = (state: { bookings: Booking[] }, action: BookingAction) => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'CANCEL_BOOKING':
      return { ...state, bookings: state.bookings.filter(b => b.id !== action.payload) };
    default:
      return state;
  }
};

const initialState = {
  bookings: []
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const { user, isAuthenticated, token } = useAuth();

  useEffect(() => {
    const loadUserBookings = async () => {
      if (!isAuthenticated || !user || !token) return;

      try {
        const userBookings = await bookingsAPI.getByUserId(user.id, token);
        // Map MongoDB _id to id for consistency
        const formattedBookings = userBookings.map((booking: any) => ({
          ...booking,
          id: booking._id || booking.id,
        }));
        dispatch({ type: 'SET_BOOKINGS', payload: formattedBookings });
      } catch (error) {
        console.error('Failed to load bookings:', error);
      }
    };

    loadUserBookings();
  }, [isAuthenticated, user, token]);

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await bookingsAPI.create(bookingData, token);
      
      // Format the response to ensure it has the correct id field
      const formattedBooking: Booking = {
        ...response,
        id: response._id || response.id,
      };
      
      dispatch({ type: 'ADD_BOOKING', payload: formattedBooking });
      return formattedBooking;
    } catch (error) {
      console.error('Failed to add booking:', error);
      throw error;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!token) return;

    try {
      await bookingsAPI.cancel(bookingId, token);
      dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      throw error;
    }
  };

  const updateEventSlots = (eventId: string, bookedSlots: number) => {
    const bookedSlotsMap = JSON.parse(localStorage.getItem('eventBookedSlots') || '{}');
    bookedSlotsMap[eventId] = (bookedSlotsMap[eventId] || 0) + bookedSlots;
    localStorage.setItem('eventBookedSlots', JSON.stringify(bookedSlotsMap));
  };

  const releaseEventSlots = (eventId: string, slotsToRelease: number) => {
    const bookedSlotsMap = JSON.parse(localStorage.getItem('eventBookedSlots') || '{}');
    const currentBookedSlots = bookedSlotsMap[eventId] || 0;
    bookedSlotsMap[eventId] = Math.max(0, currentBookedSlots - slotsToRelease);
    localStorage.setItem('eventBookedSlots', JSON.stringify(bookedSlotsMap));
  };

  const getEventBookedSlots = (eventId: string) => {
    const bookedSlotsMap = JSON.parse(localStorage.getItem('eventBookedSlots') || '{}');
    return bookedSlotsMap[eventId] || 0;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        addBooking,
        cancelBooking,
        updateEventSlots,
        releaseEventSlots,
        getEventBookedSlots
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};