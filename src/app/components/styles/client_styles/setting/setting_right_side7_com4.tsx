import React, { useState } from 'react';

interface SecurityEvent {
  id: string;
  title: string;
  timestamp: string;
  ipAddress: string;
}

interface SecurityEventsData {
  events: SecurityEvent[];
}

const CheckCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 11L9.5 14L15.5 8M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SettingRightSide7Com4() {
  const [securityData] = useState<SecurityEventsData>({
    events: [
      {
        id: '1',
        title: 'Password changed',
        timestamp: 'Mar 1, 2025 at 2:30 PM',
        ipAddress: '192.168.1.1'
      },
      {
        id: '2',
        title: 'Login from new device',
        timestamp: 'Feb 28, 2025 at 9:15 AM',
        ipAddress: '203.0.113.1'
      },
      {
        id: '3',
        title: '2FA enabled',
        timestamp: 'Jan 15, 2025 at 4:20 PM',
        ipAddress: '192.168.1.1'
      }
    ]
  });

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Security Events
        </div>
        <div className="text-sm sm:text-base text-gray-600">
          Recent security-related activity on your account
        </div>
      </div>

      {/* Security Events List */}
      <div className="space-y-3 sm:space-y-4">
        {securityData.events.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Check Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircleIcon />
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                  {event.title}
                </div>
                <div className="text-sm text-gray-600 break-words">
                  {event.timestamp} • {event.ipAddress}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (shown when no events) */}
      {securityData.events.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-500 text-sm sm:text-base">
            No security events to display
          </div>
        </div>
      )}
    </div>
  );
}
