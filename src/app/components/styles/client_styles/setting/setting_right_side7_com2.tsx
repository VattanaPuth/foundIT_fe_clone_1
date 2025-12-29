// File: components/setting_right_side7_com2.tsx
import React, { useState } from "react";

// Define a type for each setting option
interface SettingOption {
  id: string;
  label: string;
  description: string;
  isActive: boolean;
}

const SettingRightSide7Com2: React.FC = () => {
  // Set the initial state for each 2FA option
  const [settings, setSettings] = useState<SettingOption[]>([
    {
      id: "2fa-required",
      label: "2FA is required for payouts and team admin actions",
      description: "",
      isActive: true,
    },
    {
      id: "authenticator-app",
      label: "Authenticator App",
      description: "Use an app like Google Authenticator or Authy",
      isActive: true,
    },
    {
      id: "sms-backup",
      label: "SMS Backup",
      description: "Receive codes via text message as a backup",
      isActive: false,
    },
    {
      id: "passkeys",
      label: "Passkeys",
      description: "Use biometric authentication with your device",
      isActive: false,
    },
    {
      id: "login-alerts",
      label: "Login Alerts",
      description: "Get notified of new login attempts",
      isActive: true,
    },
  ]);

  // Function to handle the toggling of each setting
  const handleToggle = (id: string) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isActive: !setting.isActive }
          : setting
      )
    );
  };

  return (
    <div className="w-full px-6 py-8 space-y-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="space-y-4">
        <div className="text-lg font-semibold">Two-Factor Authentication (2FA)</div>
        <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex justify-between items-center p-4 border rounded-md border-gray-300">
            <div className="space-y-1">
              <div className="text-base font-medium">{setting.label}</div>
              {setting.description && (
                <div className="text-sm text-gray-500">{setting.description}</div>
              )}
            </div>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
                  setting.isActive ? "bg-green-600" : "bg-gray-200"
                }`}
                onClick={() => handleToggle(setting.id)}
              >
                <span className={`w-4 h-4 ${setting.isActive ? "bg-white" : "bg-gray-400"}`} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingRightSide7Com2;
