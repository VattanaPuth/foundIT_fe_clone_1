import React, { useState } from 'react';

const SettingToggle: React.FC<{
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

const DocumentTemplate: React.FC<{ name: string; icon: React.ReactNode }> = ({ name, icon }) => (
  <div className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-150 border border-gray-200 mt-2">
    {icon}
    <span className="text-gray-700 font-medium">{name}</span>
  </div>
);

const ContractsAndCompliance: React.FC = () => {
  const [isMilestonesRequired, setIsMilestonesRequired] = useState(true);
  const [isTimeTrackerRequired, setIsTimeTrackerRequired] = useState(false);
  const [isHourCapsEnabled, setIsHourCapsEnabled] = useState(false);

  const DocumentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <DocumentIcon />
          <h2 className="text-2xl font-bold leading-6 text-gray-900">Contracts & Compliance</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">Default policies and document templates</p>
      </div>

      <div className="space-y-6">
        <SettingToggle
          label="Default Milestones Policy"
          description="Require milestones for projects over $1,000"
          enabled={isMilestonesRequired}
          setEnabled={setIsMilestonesRequired}
          bgColor="bg-green-50 border border-green-200"
        />

        <SettingToggle
          label="Require Time Tracker"
          description="Mandate time tracking for hourly contracts"
          enabled={isTimeTrackerRequired}
          setEnabled={setIsTimeTrackerRequired}
        />

        <SettingToggle
          label="Timesheet Hour Caps"
          description="Set maximum billable hours per week"
          enabled={isHourCapsEnabled}
          setEnabled={setIsHourCapsEnabled}
        />
      </div>

      <div className="mt-10">
        <h3 className="text-gray-700 font-semibold mb-3">Document Templates</h3>
        <div className="space-y-3">
          <DocumentTemplate
            name="NDA Template"
            icon={<DocumentIcon />}
          />
          <DocumentTemplate
            name="Statement of Work Template"
            icon={<DocumentIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractsAndCompliance;