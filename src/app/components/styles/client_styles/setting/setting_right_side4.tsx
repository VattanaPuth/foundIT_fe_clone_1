import React, { useState } from 'react';

const ReceiptIcon: React.FC = () => (
  <svg className="w-6 h-6 -mt-4" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H12.2C13.8802 1 14.7202 1 15.362 1.32698C15.9265 1.6146 16.3854 2.07354 16.673 2.63803C17 3.27976 17 4.11984 17 5.8V19L14.25 17L11.75 19L9 17L6.25 19L3.75 17L1 19V5.8Z" stroke="#009966" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

);

const AutoInvoiceToggle: React.FC<{
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}> = ({ enabled, setEnabled }) => {
  const toggleBgColor = enabled ? 'bg-[#A4F4CF]' : 'bg-white';

  return (
    <div className={`pl-3 pr-3 rounded-lg ${toggleBgColor} border border-green-200 transition-colors duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <div className='mt-3'>
            <p className="text-xl">Auto-Invoice Profile</p>
          </div>
          <div className='-mt-3'>
            <p className="text-gray-500 text-lg">Automatically generate invoices for completed work</p>
          </div>
        </div>
        <p
          onClick={() => setEnabled(!enabled)}
          className={`${
            enabled ? 'bg-green-600' : 'bg-gray-200'
          } relative inline-flex h-6 mt-3 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
          role="switch"
          aria-checked={enabled}
        >
          <span className="sr-only">Toggle Auto-Invoice Profile</span>
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
};

const InvoicesAndReceipts: React.FC = () => {
  const [isAutoInvoiceEnabled, setIsAutoInvoiceEnabled] = useState(false);
  const [invoiceEmails, setInvoiceEmails] = useState('');

  const handleExportCSV = () => {
    alert('Exporting invoice history and receipts as CSV...');
  };

  const handleExportPDF = () => {
    alert('Exporting invoice history and receipts as PDF...');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl w-full ml-4 mr-4 px-8 py-4 h-screen overflow-y-auto">
      <div className="pb-4">
        <div className="flex items-center space-x-2">
          <ReceiptIcon />
          <p className="text-2xl">Invoices & Receipts</p>
        </div>
        <div className='-mt-2'>
          <p className="text-lg text-gray-500">Auto-invoicing and export preferences</p>
        </div>
      </div>

      <div className="mb-6">
        <AutoInvoiceToggle
          enabled={isAutoInvoiceEnabled}
          setEnabled={setIsAutoInvoiceEnabled}
        />
      </div>

      <div className="mb-6">
        <div className="text-gray-700 text-2xl mb-2">Invoice Email Recipients</div>
        <input
          type="text"
          value={invoiceEmails}
          onChange={(e) => setInvoiceEmails(e.target.value)}
          placeholder="email1@example.com, email2@example.com"
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-green-500 focus:border-green-500 transition-shadow duration-150"
        />
        <p className="mt-2 text-lg text-gray-500">Separate multiple emails with commas</p>
      </div>

      <div className="pt-4 border-t border-gray-300">
        <div className="text-gray-700 text-2xl mb-2">Download Center</div>
        <p className="text-gray-500 text-lg mb-4">Export invoice history and receipts</p>
        
        <div className="flex space-x-4">
          <p
            onClick={handleExportCSV}
            className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Export CSV
          </p>
          <p
            onClick={handleExportPDF}
            className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Export PDF
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicesAndReceipts;
