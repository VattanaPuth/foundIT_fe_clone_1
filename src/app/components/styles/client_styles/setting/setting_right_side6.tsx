import React, { useState } from 'react';

const AccountIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  tag?: string;
  readOnly?: boolean;
  type?: string;
}> = ({ label, value, onChange, helperText, tag, readOnly = false, type = 'text' }) => (
  <div className="mb-6">
    <label htmlFor={label.replace(/\s/g, '')} className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex items-center">
      <input
        id={label.replace(/\s/g, '')}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-green-500 focus:border-green-500 transition-shadow duration-150 ${
          readOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
        }`}
      />
      {tag && (
        <span className="ml-3 px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg">
          {tag}
        </span>
      )}
    </div>
    {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
  </div>
);

const Account: React.FC = () => {
  const [displayName, setDisplayName] = useState('Sarah Chen');
  const [handle, setHandle] = useState('sarahchen');
  const [primaryEmail, setPrimaryEmail] = useState('sarah.chen@example.com');
  const [backupEmail, setBackupEmail] = useState('sarah.backup@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [country, setCountry] = useState('cambodia');
  const [timeZone, setTimeZone] = useState('Pacific Time (PT)');
  const [languages, setLanguages] = useState('English');

  const handleSave = () => {
    alert('Saving changes (Data logged to console)');
    console.log('Saved Account Data:', { displayName, primaryEmail, backupEmail, phoneNumber, country, timeZone, languages });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <AccountIcon />
          <h2 className="text-2xl font-bold leading-6 text-gray-900">Profile Information</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">Update your personal details and contact information</p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Display Name"
          value={displayName}
          onChange={setDisplayName}
        />

        <InputField
          label="Handle (Username)"
          value={handle}
          onChange={setHandle}
          tag="Immutable"
          readOnly={true}
          helperText="Your unique username cannot be changed"
        />

        <InputField
          label="Primary Email"
          value={primaryEmail}
          onChange={setPrimaryEmail}
          helperText="Used for login and receipts"
          type="email"
        />

        <InputField
          label="Backup Email (Recovery)"
          value={backupEmail}
          onChange={setBackupEmail}
          helperText="Used for account recovery"
          type="email"
        />

        <InputField
          label="Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          helperText="We only use your phone for security and critical payout updates."
          type="tel"
        />
      </div>

      <div className="mt-6 space-y-6">
        <div className="flex space-x-6">
          <div className="w-1/2">
            <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
              Country
            </label>
            <div className="relative">
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white pr-10 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              >
                <option value="cambodia">cambodia</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="timeZone" className="block text-sm font-semibold text-gray-700 mb-2">
              Time Zone
            </label>
            <div className="relative">
              <select
                id="timeZone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white pr-10 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              >
                <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                <option value="EST">Eastern Standard Time (EST)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="languages" className="block text-sm font-semibold text-gray-700 mb-2">
            Languages
          </label>
          <input
            id="languages"
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-green-500 focus:border-green-500 transition-shadow duration-150"
          />
          <p className="mt-1 text-xs text-gray-500">Interface and communication languages</p>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex justify-center rounded-lg border border-transparent bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Account;