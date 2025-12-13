import React, { useState } from 'react';

const NotificationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const NotificationToggle: React.FC<{
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  description?: string;
  bgColor?: string;
}> = ({ label, enabled, setEnabled, description, bgColor = 'bg-white' }) => (
  <div className={`py-3 px-1 rounded-lg ${bgColor} transition-colors duration-200`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-900 font-medium text-base">{label}</h3>
        {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
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

const Notifications: React.FC = () => {
  // Notification Channels State
  const [isEmailEnabled, setIsEmailEnabled] = useState(true);
  const [isPushEnabled, setIsPushEnabled] = useState(true);
  const [isInAppEnabled, setIsInAppEnabled] = useState(true);

  // Event Preferences State
  const [newProposals, setNewProposals] = useState(true);
  const [offersSent, setOffersSent] = useState(true);
  const [fundingMilestones, setFundingMilestones] = useState(true);
  const [approvalRequests, setApprovalRequests] = useState(true);

  // Digest and Alerts State
  const [isDigestEnabled, setIsDigestEnabled] = useState(true);
  const [spendAlerts, setSpendAlerts] = useState('At 80% and 100% of budget');

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <NotificationIcon />
          <h2 className="text-2xl font-bold leading-6 text-gray-900">Notifications</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">Manage notifications for hiring activities</p>
      </div>

      {/* Notification Channels */}
      <div className="mb-8">
        <h3 className="text-gray-700 font-semibold mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <NotificationToggle 
            label="Email Notifications" 
            enabled={isEmailEnabled} 
            setEnabled={setIsEmailEnabled} 
          />
          <NotificationToggle 
            label="Push Notifications" 
            enabled={isPushEnabled} 
            setEnabled={setIsPushEnabled} 
          />
          <NotificationToggle 
            label="In-App Notifications" 
            enabled={isInAppEnabled} 
            setEnabled={setIsInAppEnabled} 
          />
        </div>
      </div>

      {/* Event Preferences */}
      <div className="mb-8">
        <h3 className="text-gray-700 font-semibold mb-4">Event Preferences</h3>
        <div className="space-y-4">
          <NotificationToggle 
            label="New proposals received" 
            enabled={newProposals} 
            setEnabled={setNewProposals} 
          />
          <NotificationToggle 
            label="Offers sent/accepted" 
            enabled={offersSent} 
            setEnabled={setOffersSent} 
          />
          <NotificationToggle 
            label="Funding milestones" 
            enabled={fundingMilestones} 
            setEnabled={setFundingMilestones} 
          />
          <NotificationToggle 
            label="Approval requests" 
            enabled={approvalRequests} 
            setEnabled={setApprovalRequests} 
          />
        </div>
      </div>
      
      {/* Proposal Digest (Highlighted) */}
      <div className="mb-8">
        <NotificationToggle
          label="Proposal Digest"
          description="Receive daily summary of proposals"
          enabled={isDigestEnabled}
          setEnabled={setIsDigestEnabled}
          bgColor="bg-green-50 border border-green-200" 
        />
      </div>

      {/* Spend Alerts */}
      <div className="mb-10">
        <h3 className="text-gray-700 font-semibold mb-3">Spend Alerts</h3>
        <div className="relative">
          <select
            value={spendAlerts}
            onChange={(e) => setSpendAlerts(e.target.value)}
            className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white pr-10 focus:ring-green-500 focus:border-green-500 cursor-pointer"
          >
            <option value="At 80% and 100% of budget">At 80% and 100% of budget</option>
            <option value="At 50% and 100% of budget">At 50% and 100% of budget</option>
            <option value="Disabled">Disabled</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;