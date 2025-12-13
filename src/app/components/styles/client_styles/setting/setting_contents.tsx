import React, { useState } from 'react';
import LeftSidebar from './setting_left_side';
import ClientAndBilling from './setting_right_side1';
import HiringPreferences from './setting_right_side2';
import ContractsAndCompliance from './setting_right_side3';
import InvoicesAndReceipts from './setting_right_side4';
import Notifications from './setting_right_side5';
import Account from './setting_right_side6';

const ClientContent: React.FC = () => {
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <LeftSidebar />
      {/* Right Content Area */}
      {/* 1 */}
      {/* <ClientAndBilling/> */}
      {/* 2 */}
      {/* <HiringPreferences /> */}
      {/* 3 */}
      {/* <ContractsAndCompliance /> */}
      {/* 4 */}
      {/* <InvoicesAndReceipts /> */}
      {/* 5 */}
      {/* <Notifications /> */}
      {/* 6 */}
      <Account />
    </div>
  );
};

export default ClientContent;
