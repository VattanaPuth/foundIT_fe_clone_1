'use client';

import React, { useState } from "react";

interface ActiveSession {
  device: string;
  deviceType: 'phone' | 'computer';
  location: string;
  ipAddress: string;
  lastSeen: string;
  isCurrent: boolean;
}

const SettingRightSide6Com2: React.FC = () => {
  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      device: "Chrome on macOS",
      deviceType: "computer",
      location: "San Francisco, CA",
      ipAddress: "192.168.1.1",
      lastSeen: "2 minutes ago",
      isCurrent: true,
    },
    {
      device: "Safari on iPhone",
      deviceType: "phone",
      location: "San Francisco, CA",
      ipAddress: "192.168.1.50",
      lastSeen: "1 hour ago",
      isCurrent: false,
    },
    {
      device: "Firefox on Windows",
      deviceType: "computer",
      location: "New York, NY",
      ipAddress: "203.0.113.1",
      lastSeen: "2 days ago",
      isCurrent: false,
    },
  ]);

  const handleSignOut = (index: number) => {
    const updatedSessions = sessions.filter((_, i) => i !== index);
    setSessions(updatedSessions);
  };

  const PhoneIcon = () => (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16.5H8.01M4.2 21H11.8C12.9201 21 13.4802 21 13.908 20.782C14.2843 20.5903 14.5903 20.2843 14.782 19.908C15 19.4802 15 18.9201 15 17.8V4.2C15 3.07989 15 2.51984 14.782 2.09202C14.5903 1.71569 14.2843 1.40973 13.908 1.21799C13.4802 1 12.9201 1 11.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.07989 21 4.2 21ZM8.5 16.5C8.5 16.7761 8.27614 17 8 17C7.72386 17 7.5 16.7761 7.5 16.5C7.5 16.2239 7.72386 16 8 16C8.27614 16 8.5 16.2239 8.5 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ComputerIcon = () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 19H15M11 15V19M5.8 15H16.2C17.8802 15 18.7202 15 19.362 14.673C19.9265 14.3854 20.3854 13.9265 20.673 13.362C21 12.7202 21 11.8802 21 10.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V10.2C1 11.8802 1 12.7202 1.32698 13.362C1.6146 13.9265 2.07354 14.3854 2.63803 14.673C3.27976 15 4.11984 15 5.8 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="w-full px-6 py-8 space-y-6 rounded-2xl shadow-md bg-white mt-3 border border-gray-200">
      <div className="-space-y-3">
        <div>
          <p className="text-2xl">Active Sessions</p>
        </div>
        <div>
          <p className="text-lg text-gray-500">Manage devices where you are currently logged in</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-xl border-gray-300">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  session.isCurrent 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {session.deviceType === 'phone' ? <PhoneIcon /> : <ComputerIcon />}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-base font-semibold">{session.device}</div>
                <div className="text-sm text-gray-500">{session.location} · {session.ipAddress}</div>
                <div className="text-xs text-gray-400">{session.lastSeen}</div>
              </div>
            </div>
            {!session.isCurrent && (
              <div 
                onClick={() => handleSignOut(index)} 
                className="cursor-pointer text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
              >
                Sign Out
              </div>
            )}
            {session.isCurrent && (
              <div className="text-sm text-blue-600 font-medium">Current</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingRightSide6Com2;