import React, { useState } from 'react';

const ReceiptIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const AutoInvoiceToggle: React.FC<{
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}> = ({ enabled, setEnabled }) => (
  <div className="p-4 rounded-lg bg-green-50 border border-green-200 transition-colors duration-200">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-900 font-semibold text-base">Auto-Invoice Profile</h3>
        <p className="text-gray-500 text-sm mt-1">Automatically generate invoices for completed work</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`${
          enabled ? 'bg-green-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
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
      </button>
    </div>
  </div>
);

const InvoicesAndReceipts: React.FC = () => {
  const [isAutoInvoiceEnabled, setIsAutoInvoiceEnabled] = useState(true);
  const [invoiceEmails, setInvoiceEmails] = useState('accounting@company.com');

  const handleExportCSV = () => {
    alert('Exporting invoice history and receipts as CSV...');
  };

  const handleExportPDF = () => {
    alert('Exporting invoice history and receipts as PDF...');
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <ReceiptIcon />
          <h2 className="text-2xl font-bold leading-6 text-gray-900">Invoices & Receipts</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">Auto-invoicing and export preferences</p>
      </div>

      <div className="mb-8">
        <AutoInvoiceToggle
          enabled={isAutoInvoiceEnabled}
          setEnabled={setIsAutoInvoiceEnabled}
        />
      </div>

      <div className="mb-10">
        <h3 className="text-gray-700 font-semibold mb-3">Invoice Email Recipients</h3>
        <input
          type="text"
          value={invoiceEmails}
          onChange={(e) => setInvoiceEmails(e.target.value)}
          placeholder="email1@example.com, email2@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-green-500 focus:border-green-500 transition-shadow duration-150"
        />
        <p className="mt-1 text-xs text-gray-500">Separate multiple emails with commas</p>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-gray-700 font-semibold mb-3">Download Center</h3>
        <p className="text-gray-500 text-sm mb-4">Export invoice history and receipts</p>
        
        <div className="flex space-x-4">
          <button
            onClick={handleExportCSV}
            className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicesAndReceipts;