// File: components/setting_right_side7_com4.tsx
import React, { useState } from "react";

// Interface for Security Event
interface SecurityEvent {
  id: string;
  event: string;
  date: string;
  ipAddress: string;
}

const SettingRightSide7Com4: React.FC = () => {
  // Example data for security events, could be fetched from an API
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      event: "Password changed",
      date: "Mar 1, 2025 at 2:30 PM",
      ipAddress: "192.168.1.1",
    },
    {
      id: "2",
      event: "Login from new device",
      date: "Feb 28, 2025 at 9:15 AM",
      ipAddress: "203.0.113.1",
    },
    {
      id: "3",
      event: "2FA enabled",
      date: "Jan 15, 2025 at 4:20 PM",
      ipAddress: "192.168.1.1",
    },
  ]);

  return (
    <div className="w-full px-6 py-8 space-y-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="space-y-4">
        <div className="text-lg font-semibold">Security Events</div>
        <div className="text-sm text-gray-500">Recent security-related activity on your account</div>
      </div>

      <div className="space-y-4">
        {securityEvents.map((event) => (
          <div
            key={event.id}
            className="flex justify-between items-center p-4 border rounded-md border-gray-300"
          >
            <div className="flex items-center space-x-4">
              {/* Default icon (can be replaced with an image or SVG) */}
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600">{event.event[0]}</span> {/* First letter of event */}
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium">{event.event}</div>
                <div className="text-sm text-gray-500">{event.date} · {event.ipAddress}</div>
              </div>
            </div>
            <div className="text-sm text-green-600">✓</div> {/* Check mark icon */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingRightSide7Com4;
