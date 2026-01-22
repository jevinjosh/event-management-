import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Event } from '../types';
import { eventsAPI } from '../services/api';
import { mockEvents } from '../data/mockData';

interface EventState {
  events: Event[];
  eventSlots: { [eventId: string]: number };
  loading: boolean;
  error: string | null;
}

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  setEvents: (events: Event[]) => void;
  getEventById: (id: string) => Event | undefined;
  getAvailableSlots: (eventId: string) => number;
  updateEventSlots: (eventId: string, bookedSlots: number) => void;
  validateSlotAvailability: (eventId: string, requestedSlots: number) => boolean;
  getEventWithAvailability: (eventId: string) => (Event & { availableSlots: number }) | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

type EventAction =
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_SLOTS'; payload: { eventId: string; bookedSlots: number } };

const eventReducer = (state: EventState, action: EventAction): EventState => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'UPDATE_SLOTS':
      return {
        ...state,
        eventSlots: {
          ...state.eventSlots,
          [action.payload.eventId]:
            (state.eventSlots[action.payload.eventId] || 0) + action.payload.bookedSlots,
        },
      };
    default:
      return state;
  }
};

const initialState: EventState = {
  events: [],
  eventSlots: JSON.parse(localStorage.getItem('eventSlots') || '{}'),
  loading: true,
  error: null,
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  useEffect(() => {
    const loadEvents = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        console.log('Fetching events from API...');
        const events = await eventsAPI.getAll();
        
        console.log('Raw events from API:', events);

        if (!events || events.length === 0) {
          console.warn('No events found in database, using mock data');
          dispatch({ type: 'SET_EVENTS', payload: mockEvents });
          return;
        }

        // Format events to ensure they have the correct id field
        const formattedEvents = events.map((event: any) => {
          // MongoDB returns _id, we need to make sure id is set to the MongoDB _id
          const eventId = event._id || event.id;
          
          console.log(`Event: ${event.title}, _id: ${event._id}, id: ${event.id}, using: ${eventId}`);
          
          return {
            ...event,
            id: eventId, // Use MongoDB _id as the id
            _id: undefined, // Remove _id to avoid confusion
          };
        });

        console.log('Formatted events:', formattedEvents);
        dispatch({ type: 'SET_EVENTS', payload: formattedEvents });
        
      } catch (error) {
        console.error('Failed to load events from MongoDB:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load events' });
        
        // Fallback to mock data
        console.warn('Using mock data as fallback');
        dispatch({ type: 'SET_EVENTS', payload: mockEvents });
      }
    };

    loadEvents();
  }, []);

  const setEvents = (events: Event[]) => {
    dispatch({ type: 'SET_EVENTS', payload: events });
  };

  const getEventById = (id: string): Event | undefined => {
    const event = state.events.find((event) => event.id === id);
    console.log(`getEventById(${id}):`, event);
    return event;
  };

  const getAvailableSlots = (eventId: string): number => {
    const event = getEventById(eventId);
    if (!event) return 0;

    const bookedSlots = state.eventSlots[eventId] || 0;
    return Math.max(0, event.availableSlots - bookedSlots);
  };

  const updateEventSlots = (eventId: string, bookedSlots: number) => {
    dispatch({ type: 'UPDATE_SLOTS', payload: { eventId, bookedSlots } });

    const updatedSlots = {
      ...state.eventSlots,
      [eventId]: (state.eventSlots[eventId] || 0) + bookedSlots,
    };

    localStorage.setItem('eventSlots', JSON.stringify(updatedSlots));
  };

  const validateSlotAvailability = (eventId: string, requestedSlots: number): boolean => {
    const availableSlots = getAvailableSlots(eventId);
    return availableSlots >= requestedSlots;
  };

  const getEventWithAvailability = (eventId: string) => {
    const event = getEventById(eventId);
    if (!event) {
      console.warn(`Event not found: ${eventId}`);
      return undefined;
    }

    const eventWithAvailability = {
      ...event,
      availableSlots: getAvailableSlots(eventId),
    };

    console.log('getEventWithAvailability:', eventWithAvailability);
    return eventWithAvailability;
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        loading: state.loading,
        error: state.error,
        setEvents,
        getEventById,
        getAvailableSlots,
        updateEventSlots,
        validateSlotAvailability,
        getEventWithAvailability,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};