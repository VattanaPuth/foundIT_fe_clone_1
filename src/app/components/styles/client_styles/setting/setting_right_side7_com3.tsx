import React, { useState } from 'react';

interface TrustedDevice {
  id: string;
  deviceType: 'computer' | 'mobile';
  name: string;
  addedDate: string;
  location: string;
}

interface TrustedDevicesData {
  devices: TrustedDevice[];
}

const ComputerIcon = () => (
  <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.6 14.2V16.6M7 17.8H14.2M3.4 14.2H17.8C19.1255 14.2 20.2 13.1255 20.2 11.8V3.4C20.2 2.07452 19.1255 1 17.8 1H3.4C2.07452 1 1 2.07452 1 3.4V11.8C1 13.1255 2.07452 14.2 3.4 14.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MobileIcon = () => (
  <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16.5H8.01M4.2 21H11.8C12.9201 21 13.4802 21 13.908 20.782C14.2843 20.5903 14.5903 20.2843 14.782 19.908C15 19.4802 15 18.9201 15 17.8V4.2C15 3.07989 15 2.51984 14.782 2.09202C14.5903 1.71569 14.2843 1.40973 13.908 1.21799C13.4802 1 12.9201 1 11.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.07989 21 4.2 21ZM8.5 16.5C8.5 16.7761 8.27614 17 8 17C7.72386 17 7.5 16.7761 7.5 16.5C7.5 16.2239 7.72386 16 8 16C8.27614 16 8.5 16.2239 8.5 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SettingRightSide7Com3() {
  const [devicesData, setDevicesData] = useState<TrustedDevicesData>({
    devices: [
      {
        id: '1',
        deviceType: 'computer',
        name: 'MacBook Pro',
        addedDate: 'Jan 15, 2025',
        location: 'San Francisco, CA'
      },
      {
        id: '2',
        deviceType: 'mobile',
        name: 'iPhone 15',
        addedDate: 'Dec 20, 2024',
        location: 'San Francisco, CA'
      }
    ]
  });

  const handleRevoke = (deviceId: string) => {
    // This function will be connected to your backend API
    console.log('Revoking device:', deviceId);
    
    // Example: Remove device from state (you'll replace this with API call)
    setDevicesData(prev => ({
      devices: prev.devices.filter(device => device.id !== deviceId)
    }));
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6">
        <div className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Trusted Devices
        </div>
        <div className="text-sm sm:text-base text-gray-600">
          Devices that can bypass 2FA verification
        </div>
      </div>

      {/* Devices List */}
      <div className="space-y-3">
        {devicesData.devices.map((device) => (
          <div
            key={device.id}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Device Info */}
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                {/* Device Icon */}
                <div className="flex-shrink-0 text-gray-700 mt-1">
                  {device.deviceType === 'computer' ? (
                    <ComputerIcon />
                  ) : (
                    <MobileIcon />
                  )}
                </div>

                {/* Device Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                    {device.name}
                  </div>
                  <div className="text-sm text-gray-600 break-words">
                    Added {device.addedDate} • {device.location}
                  </div>
                </div>
              </div>

              {/* Revoke Action */}
              <div className="flex-shrink-0">
                <div
                  onClick={() => handleRevoke(device.id)}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition-colors px-2 py-1"
                >
                  Revoke
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (shown when no devices) */}
      {devicesData.devices.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-500 text-sm sm:text-base">
            No trusted devices added yet
          </div>
        </div>
      )}
    </div>
  );
}