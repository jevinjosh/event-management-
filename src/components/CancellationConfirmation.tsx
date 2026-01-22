import React from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface CancellationConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  bookingTitle: string;
  bookingDate: string;
  guestCount: number;
}

const CancellationConfirmation: React.FC<CancellationConfirmationProps> = ({
  isOpen,
  onClose,
  bookingTitle,
  bookingDate,
  guestCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Booking Cancelled</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <CheckCircleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-700 mb-4">
            Your booking has been successfully cancelled.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Cancelled Booking Details:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Event:</span> {bookingTitle}</p>
              <p><span className="font-medium">Date:</span> {new Date(bookingDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Guests:</span> {guestCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Refund Information:</span> If you paid for this booking, the refund will be processed according to our refund policy.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 btn-primary"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancellationConfirmation;
