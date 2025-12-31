import React, { useState } from 'react';
import LeftSidebar from './setting_left_side';
import SettingSubHeader from './setting_sub_header';
import ClientAndBilling from './setting_right_side1';
import HiringPreferences from './setting_right_side2';
import ContractsAndCompliance from './setting_right_side3';
import InvoicesAndReceipts from './setting_right_side4';
import Notifications from './setting_right_side5';
import Account from './setting_right_side6';
import { Security } from './setting_right_side7';
import Privacy from './setting_right_side8';
import ConnectedApp from './setting_right_side9';

const ClientContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('client-billing');

  const renderContent = () => {
    switch (activeSection) {
      case 'client-billing':
        return <ClientAndBilling />;
      case 'hiring-preferences':
        return <HiringPreferences />;
      case 'contracts-compliance':
        return <ContractsAndCompliance />;
      case 'invoices-receipts':
        return <InvoicesAndReceipts />;
      case 'notifications':
        return <Notifications />;
      case 'account':
        return <Account />;
      case 'security':
        return <Security />;
      case 'privacy':
        return <Privacy />;
      case 'connected-apps':
        return <ConnectedApp />;
      default:
        return <ClientAndBilling />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div>
        <SettingSubHeader activeSection={activeSection} />
      </div>
      <div className='w-full flex'>
        {/* Left Sidebar */}
        <LeftSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        {/* Right Content Area */}
        <div className="w-full mr-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ClientContent;