import React, { useState } from 'react';

interface TwoFactorOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  badge?: string;
}

interface LoginAlertConfig {
  enabled: boolean;
  description: string;
}

interface SettingsData {
  twoFactorOptions: TwoFactorOption[];
  loginAlerts: LoginAlertConfig;
}

export default function SettingRightSide7Com2() {
  const [settings, setSettings] = useState<SettingsData>({
    twoFactorOptions: [
      {
        id: 'authenticator',
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <path d="M12 18h.01"/>
          </svg>
        ),
        title: 'Authenticator App',
        description: 'Use an app like Google Authenticator or Authy',
        active: false,
        badge: 'Active'
      },
      {
        id: 'sms',
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        ),
        title: 'SMS Backup',
        description: 'Receive codes via text message as a backup',
        active: false
      },
      {
        id: 'passkeys',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 7H13.01M13 13C16.3137 13 19 10.3137 19 7C19 3.68629 16.3137 1 13 1C9.68629 1 7 3.68629 7 7C7 7.27368 7.01832 7.54308 7.05381 7.80704C7.11218 8.24118 7.14136 8.45825 7.12172 8.59559C7.10125 8.73865 7.0752 8.81575 7.00469 8.9419C6.937 9.063 6.81771 9.18229 6.57913 9.42087L1.46863 14.5314C1.29568 14.7043 1.2092 14.7908 1.14736 14.8917C1.09253 14.9812 1.05213 15.0787 1.02763 15.1808C1 15.2959 1 15.4182 1 15.6627V17.4C1 17.9601 1 18.2401 1.10899 18.454C1.20487 18.6422 1.35785 18.7951 1.54601 18.891C1.75992 19 2.03995 19 2.6 19H4.33726C4.58185 19 4.70414 19 4.81923 18.9724C4.92127 18.9479 5.01881 18.9075 5.10828 18.8526C5.2092 18.7908 5.29568 18.7043 5.46863 18.5314L10.5791 13.4209C10.8177 13.1823 10.937 13.063 11.0581 12.9953C11.1843 12.9248 11.2613 12.8987 11.4044 12.8783C11.5417 12.8586 11.7588 12.8878 12.193 12.9462C12.4569 12.9817 12.7263 13 13 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        ),
        title: 'Passkeys',
        description: 'Use biometric authentication with your device',
        active: false
      }
    ],
    loginAlerts: {
      enabled: false,
      description: 'Get notified of new login attempts'
    }
  });

  const handleToggle = (optionId: string) => {
    setSettings(prev => ({
      ...prev,
      twoFactorOptions: prev.twoFactorOptions.map(option =>
        option.id === optionId ? { ...option, active: !option.active } : option
      )
    }));
  };

  const handleLoginAlertsToggle = () => {
    setSettings(prev => ({
      ...prev,
      loginAlerts: {
        ...prev.loginAlerts,
        enabled: !prev.loginAlerts.enabled
      }
    }));
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6">
        <div >
          <p className="text-2xl sm:text-2xl text-gray-900 mb-2">Two-Factor Authentication (2FA)</p>
        </div>
        <div>
          <p className="text-lg sm:text-base text-gray-600">Add an extra layer of security to your account</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg mb-6">
        <div className="flex items-start gap-x-3 pt-3 pl-6">
          <div className="flex-shrink-0 mt-0.5">
            <svg className='w-6 h-6' viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.30201 20.5469C8.5234 20.676 8.6341 20.7406 8.79032 20.7741C8.91156 20.8001 9.08844 20.8001 9.20968 20.7741C9.3659 20.7406 9.4766 20.676 9.69799 20.5469C11.646 19.4104 17 15.8404 17 10.932V6.1496C17 5.35009 17 4.95033 16.8692 4.6067C16.7537 4.30314 16.566 4.03228 16.3223 3.81753C16.0465 3.57444 15.6722 3.43408 14.9236 3.15335L9.5618 1.14267C9.3539 1.06471 9.24995 1.02573 9.14302 1.01028C9.04816 0.996573 8.95184 0.996573 8.85698 1.01028C8.75005 1.02573 8.6461 1.06471 8.4382 1.14267L3.0764 3.15335C2.3278 3.43408 1.9535 3.57444 1.67766 3.81753C1.43398 4.03228 1.24627 4.30314 1.13076 4.6067C1 4.95033 1 5.35009 1 6.1496V10.932C1 15.8404 6.35396 19.4104 8.30201 20.5469Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-lg text-gray-700">2FA is required for payouts and team admin actions</p>
          </div>
        </div>
      </div>

      {/* Two-Factor Options */}
      <div className="space-y-4 mb-8">
        {settings.twoFactorOptions.map((option) => (
          <div
            key={option.id}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 text-gray-700 mt-1">
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-base sm:text-lg font-medium text-gray-900">
                      {option.title}
                    </span>
                    {option.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 break-words">
                    {option.description}
                  </div>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <div className="flex-shrink-0">
                <div
                  onClick={() => handleToggle(option.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                    option.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      option.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Login Alerts Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-base sm:text-lg font-medium text-gray-900 mb-1">
              Login Alerts
            </div>
            <div className="text-sm text-gray-600 break-words">
              {settings.loginAlerts.description}
            </div>
          </div>
          
          {/* Toggle Switch */}
          <div className="flex-shrink-0">
            <div
              onClick={handleLoginAlertsToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                settings.loginAlerts.enabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.loginAlerts.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}