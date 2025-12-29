import React, { useState } from 'react';

const NotificationIcon: React.FC = () => (
  <svg className='w-7 h-7 -mt-4' viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.09321 20C7.79834 20.6224 8.72459 21 9.73903 21C10.7535 21 11.6797 20.6224 12.3849 20M15.739 7C15.739 5.4087 15.1069 3.88258 13.9817 2.75736C12.8565 1.63214 11.3303 1 9.73903 1C8.14773 1 6.62161 1.63214 5.49639 2.75736C4.37117 3.88258 3.73903 5.4087 3.73903 7C3.73903 10.0902 2.9595 12.206 2.0887 13.6054C1.35416 14.7859 0.986891 15.3761 1.00036 15.5408C1.01527 15.7231 1.05389 15.7926 1.20081 15.9016C1.33349 16 1.93162 16 3.12789 16H16.3502C17.5464 16 18.1446 16 18.2773 15.9016C18.4242 15.7926 18.4628 15.7231 18.4777 15.5408C18.4912 15.3761 18.1239 14.7859 17.3894 13.6054C16.5186 12.206 15.739 10.0902 15.739 7Z" stroke="#009966" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NotificationToggle: React.FC<{
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  description?: string;
  bgColor?: string;
}> = ({ label, enabled, setEnabled, description, bgColor = 'bg-white' }) => (
  <div className={`rounded-lg ${bgColor} transition-colors duration-200`}>
    <div className="flex pt-3 px-3 rounded-2xl border-1 border-gray-300 items-center justify-between bg-[#F9FAFB]">
      <div>
        <p className="text-gray-900 text-lg">{label}</p>
        {description && <p className="text-gray-500 text-sm">{description}</p>}
      </div>

      <p
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
      </p>
    </div>
  </div>
);

const Notifications: React.FC = () => {
  // Notification Channels State
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isInAppEnabled, setIsInAppEnabled] = useState(false);

  // Event Preferences State
  const [newProposals, setNewProposals] = useState(false);
  const [offersSent, setOffersSent] = useState(false);
  const [fundingMilestones, setFundingMilestones] = useState(false);
  const [approvalRequests, setApprovalRequests] = useState(false);

  // Digest and Alerts State
  const [isDigestEnabled, setIsDigestEnabled] = useState(false);
  const [spendAlerts, setSpendAlerts] = useState('At 80% and 100% of budget');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl w-full ml-4 mr-4 px-8 py-4 h-screen overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-1 mb-6">
        <div className="flex items-center space-x-3">
          <NotificationIcon />
          <p className="text-2xl text-gray-900">Notifications</p>
        </div>
        <p className="text-lg text-gray-500">Manage notifications for hiring activities</p>
      </div>

      {/* Notification Channels */}
      <div className="mb-6">
        <p className="text-gray-700 text-xl mb-4">Notification Channels</p>
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
      <div className="mb-6">
        <p className="text-gray-700 text-xl mb-4">Event Preferences</p>
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
      <div className="mb-6">
        <NotificationToggle
          label="Proposal Digest"
          description="Receive daily summary of proposals"
          enabled={isDigestEnabled}
          setEnabled={setIsDigestEnabled}
        />
      </div>

      {/* Spend Alerts */}
      <div className="mb-6">
        <p className="text-gray-700 text-xl mb-4">Spend Alerts</p>
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

