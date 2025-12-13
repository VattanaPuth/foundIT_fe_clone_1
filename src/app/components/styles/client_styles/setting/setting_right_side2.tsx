import React, { useState } from 'react';

const ToggleSwitch: React.FC<{
  label: string;
  description: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  bgColor?: string; 
}> = ({ label, description, enabled, setEnabled, bgColor = 'bg-white' }) => (
  <div className={`p-4 rounded-lg ${bgColor} transition-colors duration-200`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-900 font-semibold text-base">{label}</h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`${
          enabled ? 'bg-green-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        role="switch"
        aria-checked={enabled}
      >
        <span className="sr-only">Toggle {label}</span>
        <span
          aria-hidden="true"
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="border-b border-gray-200 pb-4 mb-6">
    <h2 className="text-2xl font-bold leading-6 text-gray-900">{title}</h2>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>
);

const HiringPreferences: React.FC = () => {
  const [isHourlyEnabled, setIsHourlyEnabled] = useState(true);
  const [isFixedPriceEnabled, setIsFixedPriceEnabled] = useState(false);
  const [isNdaRequired, setIsNdaRequired] = useState(true);
  const [isIpTransfer, setIsIpTransfer] = useState(true);
  const [screeningTemplate, setScreeningTemplate] = useState('');
  const [timezonePreference, setTimezonePreference] = useState('No preference');

  const ContractTypeToggle: React.FC<{
    label: string;
    enabled: boolean;
    onClick: () => void;
  }> = ({ label, enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-150 ease-in-out ${
        enabled
          ? 'bg-green-100 text-green-800 ring-2 ring-green-500'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <span className={`h-2 w-2 rounded-full mr-2 ${enabled ? 'bg-green-600' : 'bg-gray-400'}`}></span>
      {label}
    </button>
  );

  const handleSave = () => {
    console.log('Saving Preferences:', {
      isHourlyEnabled,
      isFixedPriceEnabled,
      isNdaRequired,
      isIpTransfer,
      screeningTemplate,
      timezonePreference,
    });
    alert('Preferences saved! (Check console for data)');
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-4xl mx-auto">
      <SectionHeader
        title="Hiring Preferences"
        description="Set defaults for job postings and contracts"
      />

      <div className="mb-8">
        <h3 className="text-gray-700 font-semibold mb-3">Allowed Contract Types</h3>
        <div className="flex space-x-4">
          <ContractTypeToggle
            label="Hourly Contracts"
            enabled={isHourlyEnabled}
            onClick={() => setIsHourlyEnabled(!isHourlyEnabled)}
          />
          <ContractTypeToggle
            label="Fixed-Price Contracts"
            enabled={isFixedPriceEnabled}
            onClick={() => setIsFixedPriceEnabled(!isFixedPriceEnabled)}
          />
        </div>
      </div>

      <div className="mb-8 p-0">
        <ToggleSwitch
          label="NDA Required by Default"
          description="Automatically require NDAs for new contracts"
          enabled={isNdaRequired}
          setEnabled={setIsNdaRequired}
          bgColor="bg-green-50 border border-green-200" 
        />
      </div>

      <div className="mb-8 p-0">
        <ToggleSwitch
          label="IP Rights Transfer by Default"
          description="Transfer intellectual property rights to client"
          enabled={isIpTransfer}
          setEnabled={setIsIpTransfer}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-gray-700 font-semibold mb-3">Screening Question Templates</h3>
        <input
          type="text"
          value={screeningTemplate}
          onChange={(e) => setScreeningTemplate(e.target.value)}
          placeholder="Enter default questions for proposals..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 transition-shadow duration-150"
        />
      </div>

      <div className="mb-10">
        <h3 className="text-gray-700 font-semibold mb-3">Country/Timezone Preferences</h3>
        <div className="relative">
          <select
            value={timezonePreference}
            onChange={(e) => setTimezonePreference(e.target.value)}
            className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white pr-10 focus:ring-green-500 focus:border-green-500 cursor-pointer"
          >
            <option value="No preference">No preference</option>
            <option value="EST">Eastern Standard Time (EST)</option>
            <option value="PST">Pacific Standard Time (PST)</option>
            <option value="GMT">Greenwich Mean Time (GMT)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={handleSave}
          className="inline-flex justify-center rounded-lg border border-transparent bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default HiringPreferences;