import React from 'react';
import { 
  CheckCircleIcon,
  XMarkIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    eventTitle: string;
    date: string;
    time: string;
    guestCount: number;
    totalPrice: number;
    paymentMethod: string;
    location: string;
  };
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  isOpen,
  onClose,
  bookingData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-bounce-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600">
            Your event booking has been successfully confirmed
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Booking Details</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Event:</span>
              <span className="font-medium text-gray-900">{bookingData.eventTitle}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Date & Time:
              </span>
              <span className="font-medium text-gray-900">
                {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                Location:
              </span>
              <span className="font-medium text-gray-900">{bookingData.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                Guests:
              </span>
              <span className="font-medium text-gray-900">{bookingData.guestCount}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center">
                <BanknotesIcon className="h-4 w-4 mr-1" />
                Payment:
              </span>
              <span className="font-medium text-gray-900 capitalize">{bookingData.paymentMethod}</span>
            </div>
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Total Amount:</span>
                <span className="font-bold text-primary-600 text-lg">
                  ₹{bookingData.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> A confirmation email has been sent to your registered email address. 
            Please arrive 15 minutes before the event time.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 btn-primary"
          >
            View My Bookings
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
