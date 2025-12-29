// File: components/setting_right_side7_com3.tsx
import React, { useState } from "react";

// Interface for Trusted Device
interface TrustedDevice {
  id: string;
  deviceName: string;
  addedDate: string;
  location: string;
}

const SettingRightSide7Com3: React.FC = () => {
  // Example data for trusted devices, could be fetched from an API
  const [trustedDevices, setTrustedDevices] = useState<TrustedDevice[]>([
    {
      id: "1",
      deviceName: "MacBook Pro",
      addedDate: "Jan 15, 2025",
      location: "San Francisco, CA",
    },
    {
      id: "2",
      deviceName: "iPhone 15",
      addedDate: "Dec 20, 2024",
      location: "San Francisco, CA",
    },
  ]);

  const handleRevoke = (id: string) => {
    setTrustedDevices((prevDevices) =>
      prevDevices.filter((device) => device.id !== id)
    );

    // Example API integration (e.g., backend call to revoke trusted device)
    // fetch('/api/revoke-device', {
    //   method: 'POST',
    //   body: JSON.stringify({ deviceId: id }),
    // });
  };

  return (
    <div className="w-full px-6 py-8 space-y-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="space-y-4">
        <div className="text-lg font-semibold">Trusted Devices</div>
        <div className="text-sm text-gray-500">Devices that can bypass 2FA verification</div>
      </div>

      <div className="space-y-4">
        {trustedDevices.map((device) => (
          <div
            key={device.id}
            className="flex justify-between items-center p-4 border rounded-md border-gray-300"
          >
            <div className="flex items-center space-x-4">
              {/* Device icon or placeholder */}
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600">{device.deviceName[0]}</span>
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium">{device.deviceName}</div>
                <div className="text-sm text-gray-500">
                  Added {device.addedDate} · {device.location}
                </div>
              </div>
            </div>
            <div
              onClick={() => handleRevoke(device.id)}
              className="text-sm text-gray-600 cursor-pointer hover:text-red-600"
            >
              Revoke
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingRightSide7Com3;
