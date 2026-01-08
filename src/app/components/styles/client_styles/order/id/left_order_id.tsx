// left_order_id.tsx
import React, { useState } from 'react';

interface Delivery {
  version: string;
  user: string;
  date: string;
  description: string;
  files: FileItem[];
  isApproved: boolean;
}

interface Milestone {
  phase: string;
  amount: number;
  due: string;
  status: 'Paid' | 'In progress' | 'Unfunded';
}

interface FileItem {
  name: string;
  size?: string;
  verified?: boolean;
}

interface Activity {
  description: string;
  date: string;
  user: string;
}

interface Invoice {
  number: string;
  date: string;
  description: string;
  amount: number;
}

interface MemberData {
  deliveries: Delivery[];
  milestones: Milestone[];
  overallProgress: number;
  released: number;
  total: number;
  files: FileItem[];
  invoices: Invoice[];
  activities: Activity[];
}

interface LeftOrderIdProps {
  selectedMemberId?: string;
}

export default function LeftOrderId({ selectedMemberId = 'user_002' }: LeftOrderIdProps) {
  const [currentTab, setCurrentTab] = useState<'timeline' | 'files' | 'invoices'>('timeline');
  const [visibleActivities, setVisibleActivities] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    brandName: '',
    targetAudience: '',
    colorPreferences: '',
    attachments: null as File[] | null,
  });
  const [formStep, setFormStep] = useState<'confirm' | 'form' | 'success'>('confirm');
  const [dragActive, setDragActive] = useState(false);

  // Per-member data (in real app, fetch from backend using selectedMemberId)
  const [memberData, setMemberData] = useState<Record<string, MemberData>>({
    'user_002': { // James Foster
      deliveries: [
        {
          version: 'v3.2',
          user: 'James Foster',
          date: 'Nov 11, 2024',
          description: 'Backend API endpoints for course management, user authentication, and payment processing. Includes comprehensive API documentation.',
          files: [
            { name: 'api-documentation.pdf', size: '4.2 MB' },
            { name: 'backend-source-code.zip', size: '28.3 MB' },
            { name: 'database-schema.sql', size: '156 KB' },
          ],
          isApproved: false,
        },
        {
          version: 'v1.5',
          user: 'James Foster',
          date: 'Oct 28, 2024',
          description: 'Initial database architecture and authentication system implementation.',
          files: [
            { name: 'database-design-v1.pdf', size: '2.8 MB' },
            { name: 'auth-system.zip', size: '6.4 MB' },
          ],
          isApproved: false,
        },
      ],
      milestones: [
        { phase: 'Phase 1: Initial Development & Architecture', amount: 6000, due: 'Oct 30, 2024', status: 'Paid' },
        { phase: 'Phase 2: Core Features & UI Development', amount: 8000, due: 'Nov 15, 2024', status: 'In progress' },
        { phase: 'Phase 3: Integration & Testing', amount: 6000, due: 'Dec 1, 2024', status: 'Unfunded' },
      ],
      overallProgress: 72,
      released: 6000,
      total: 20000,
      files: [
        { name: 'api-documentation.pdf', size: '4.2 MB', verified: true },
        { name: 'backend-source-code.zip', size: '28.3 MB', verified: true },
        { name: 'database-schema.sql', size: '156 KB', verified: true },
        { name: 'student-dashboard-v2.fig', size: '22.4 MB', verified: true },
        { name: 'frontend-components.zip', size: '17.7 MB', verified: true },
        { name: 'dashboard-preview.png', size: '3.5 MB', verified: true },
        { name: 'admin-panel-v3.zip', size: '34.6 MB', verified: true },
        { name: 'analytics-components.tsx', size: '4.1 KB', verified: true },
        { name: 'admin-screenshots.png', size: '4.1 MB', verified: true },
        { name: 'NDA-Agreement-2.5.pdf', verified: true },
        { name: 'Service-Agreement-2.5.pdf', verified: true },
        { name: 'Project-Brief.pdf', verified: true },
      ],
      invoices: [
        { number: 'Invoice #2.5-m1', date: 'Oct 30, 2024', description: 'Phase 1: Initial Development & Architecture', amount: 6000 },
        { number: 'Platform fee statement', date: 'Oct 20, 2024', description: 'Service charges', amount: 1000 },
      ],
      activities: [
      { description: 'Delivered backend API v3.2 with payment integration', date: 'Nov 11, 2024 at 4:15 PM', user: 'James Foster' },
      { description: 'Backend API development progressing well - payment gateway integrated', date: 'Nov 10, 2024 at 3:45 PM', user: 'James Foster' },
      { description: 'Approved admin panel delivery from David', date: 'Nov 9, 2024 at 10:00 AM', user: 'You' },
      { description: 'Approved course catalog design from Rachel', date: 'Nov 6, 2024 at 9:15 AM', user: 'You' },
      { description: 'Database optimization completed, starting payment integration', date: 'Nov 3, 2024 at 11:20 AM', user: 'James Foster' },
      { description: 'Approved initial database architecture', date: 'Oct 30, 2024 at 2:00 PM', user: 'You' },
      { description: 'Delivered database design and auth system v1.5', date: 'Oct 28, 2024 at 5:50 PM', user: 'James Foster' },
      { description: 'Funded Phase 1: Initial Development', date: 'Oct 21, 2024 at 10:00 AM', user: 'You' },
      { description: 'Delivered backend API v3.2 with payment integration', date: 'Nov 11, 2024 at 4:15 PM', user: 'James Foster' },
        { description: 'Backend API development progressing well - payment gateway integrated', date: 'Nov 10, 2024 at 3:45 PM', user: 'James Foster' },
        { description: 'Approved admin panel delivery from David', date: 'Nov 9, 2024 at 10:00 AM', user: 'You' },
        { description: 'Approved course catalog design from Rachel', date: 'Nov 6, 2024 at 9:15 AM', user: 'You' },
        { description: 'Database optimization completed, starting payment integration', date: 'Nov 3, 2024 at 11:20 AM', user: 'James Foster' },
        { description: 'Approved initial database architecture', date: 'Oct 30, 2024 at 2:00 PM', user: 'You' },
        { description: 'Delivered database design and auth system v1.5', date: 'Oct 28, 2024 at 5:50 PM', user: 'James Foster' },
        { description: 'Funded Phase 1: Initial Development', date: 'Oct 21, 2024 at 10:00 AM', user: 'You' },
    ]
    },
    'user_003': { // Rachel Kim
      deliveries: [
        {
          version: 'v2.4',
          user: 'Rachel Kim',
          date: 'Nov 5, 2024',
          description: 'UI designs for course catalog and user dashboard. Includes wireframes and prototypes.',
          files: [
            { name: 'ui-designs.pdf', size: '5.1 MB' },
            { name: 'wireframes.zip', size: '15.2 MB' },
          ],
          isApproved: false,
        },
        {
          version: 'v1.2',
          user: 'Rachel Kim',
          date: 'Oct 25, 2024',
          description: 'Initial frontend architecture setup.',
          files: [
            { name: 'frontend-setup.zip', size: '8.7 MB' },
          ],
          isApproved: false,
        },
      ],
      milestones: [
        { phase: 'Phase 1: UI Planning', amount: 4000, due: 'Oct 28, 2024', status: 'Paid' },
        { phase: 'Phase 2: Design Implementation', amount: 5000, due: 'Nov 10, 2024', status: 'In progress' },
        { phase: 'Phase 3: Final Touches', amount: 3000, due: 'Nov 30, 2024', status: 'Unfunded' },
      ],
      overallProgress: 65,
      released: 4000,
      total: 12000,
      files: [
        { name: 'ui-designs.pdf', size: '5.1 MB', verified: true },
        { name: 'wireframes.zip', size: '15.2 MB', verified: true },
        { name: 'frontend-setup.zip', size: '8.7 MB', verified: true },
        { name: 'color-scheme.png', size: '2.3 MB', verified: true },
        { name: 'NDA-Agreement-2.5.pdf', verified: true },
        { name: 'Service-Agreement-2.5.pdf', verified: true },
      ],
      invoices: [
        { number: 'Invoice #2.5-r1', date: 'Oct 28, 2024', description: 'Phase 1: UI Planning', amount: 4000 },
        { number: 'Platform fee statement', date: 'Oct 20, 2024', description: 'Service charges', amount: 800 },
      ],
      activities: [],
    },
    'user_004': { // David Chen
      deliveries: [
        {
          version: 'v4.1',
          user: 'David Chen',
          date: 'Nov 8, 2024',
          description: 'Integration of payment gateway and testing scripts.',
          files: [
            { name: 'payment-integration.zip', size: '12.4 MB' },
            { name: 'test-scripts.pdf', size: '3.6 MB' },
          ],
          isApproved: false,
        },
        {
          version: 'v1.8',
          user: 'David Chen',
          date: 'Oct 30, 2024',
          description: 'Database optimization and initial testing.',
          files: [
            { name: 'db-optimization.sql', size: '210 KB' },
          ],
          isApproved: false,
        },
      ],
      milestones: [
        { phase: 'Phase 1: Setup & Optimization', amount: 5000, due: 'Oct 31, 2024', status: 'Paid' },
        { phase: 'Phase 2: Integration', amount: 6000, due: 'Nov 12, 2024', status: 'In progress' },
        { phase: 'Phase 3: Testing & Deployment', amount: 5000, due: 'Dec 5, 2024', status: 'Unfunded' },
      ],
      overallProgress: 80,
      released: 5000,
      total: 16000,
      files: [
        { name: 'payment-integration.zip', size: '12.4 MB', verified: true },
        { name: 'test-scripts.pdf', size: '3.6 MB', verified: true },
        { name: 'db-optimization.sql', size: '210 KB', verified: true },
        { name: 'deployment-guide.md', size: '1.2 MB', verified: true },
        { name: 'NDA-Agreement-2.5.pdf', verified: true },
        { name: 'Service-Agreement-2.5.pdf', verified: true },
      ],
      invoices: [
        { number: 'Invoice #2.5-d1', date: 'Oct 31, 2024', description: 'Phase 1: Setup & Optimization', amount: 5000 },
        { number: 'Platform fee statement', date: 'Oct 20, 2024', description: 'Service charges', amount: 900 },
      ],
      activities: [],
    },
  });

  const data = memberData[selectedMemberId] || memberData['user_002'];

  const tabs = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'files', label: 'Files' },
    { id: 'invoices', label: 'Invoices' },
  ] as const;

  const handleApproveClick = (index: number) => {
    setSelectedDeliveryIndex(index);
    setFormStep('confirm');
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDeliveryIndex(null);
    setFormStep('confirm');
    setFormData({
      brandName: '',
      targetAudience: '',
      colorPreferences: '',
      attachments: null,
    });
  };

  const handleAcceptConfirm = () => {
    setFormStep('form');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, attachments: Array.from(e.dataTransfer.files) });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachments: Array.from(e.target.files) });
    }
  };

  const handleSubmitRequirements = () => {
    if (selectedDeliveryIndex !== null) {
      const updatedDeliveries = [...data.deliveries];
      updatedDeliveries[selectedDeliveryIndex].isApproved = true;
      setMemberData((prev) => ({
        ...prev,
        [selectedMemberId]: {
          ...prev[selectedMemberId],
          deliveries: updatedDeliveries,
        },
      }));
    }
    setFormStep('success');
  };

  const handleSuccessClose = () => {
    setIsModalOpen(false);
    setSelectedDeliveryIndex(null);
    setFormStep('confirm');
    setFormData({
      brandName: '',
      targetAudience: '',
      colorPreferences: '',
      attachments: null,
    });
  };

  const loadMoreActivities = () => {
    setVisibleActivities((prev) => prev + 5);
  };

  const answeredCount = [formData.brandName, formData.targetAudience, formData.colorPreferences].filter(Boolean).length;

  return (
    <div className="w-full h-screen">
      {/* Tab Bar */}
      <div className="flex border border-gray-200">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex-1 px-6 py-4 text-center font-medium text-sm sm:text-base cursor-pointer transition-all relative ${
              currentTab === tab.id ? 'border-[#009966] border-b-2 border-t border-r border-l text-[#009966]' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            
          </div>
        ))}
      </div>

      <div className="bg-white h-screen overflow-y-auto">
        {currentTab === 'timeline' && (
          <div className="space-y-8">
            {/* Deliverables */}
            <div className='mt-3 rounded-2xl border border-gray-200 p-6'>
              <div className="text-xl text-gray-900 mb-6">Deliverables</div>
              <div className="space-y-6">
                {data.deliveries.map((delivery, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div className='flex items-center gap-x-3'>
                        <div className="flex items-center gap-x-2 text-gray-900">
                          <p className='px-3 py-1 border broder-gray-300 rounded-2xl text-sm text-gray-600'>{delivery.version}</p>
                        </div>
                        <div className='-space-y-3'>
                          <div>
                            <p className='text-lg'>{delivery.user}</p> 
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{delivery.date}</p>
                          </div>
                        </div>
                      </div>

                      {/* Pending Approval or Approved */}
                      <div
                        className={`text-xs px-4 rounded-full ${
                          delivery.isApproved
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        <div className="flex items-center h-10 gap-x-2">
                          <p className="text-lg mt-3">{delivery.isApproved ? 'Approved' : 'Pending Approval'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-gray-600 mb-5 text-lg leading-relaxed">{delivery.description}</div>
                    <div className="space-y-3">
                      {delivery.files.map((file, fIndex) => (
                        <div
                          key={fIndex}
                          className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <svg className="w-8 h-8 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <div className="font-medium text-gray-900">{file.name}</div>
                              {file.size && <div className="text-sm text-gray-500">{file.size}</div>}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {file.verified && (
                              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Verified
                              </div>
                            )}
                          </div>                         
                        </div>
                      ))}
                    </div>

                    <div className='w-fit active:opacity-30'>
                      {!delivery.isApproved && (
                        <div onClick={() => handleApproveClick(index)} className='flex items-center mt-3 gap-x-3 bg-emerald-600 h-10 px-3 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer active:opacity-70'>
                          <svg className='w-5 h-5' viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572M21 3L11 13.01L8 10.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className='pt-3'>Approve</p>
                        </div>
                      )}
                    </div>

                    {/* Modal for Approval */}
                    {isModalOpen && (
                      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 w-full h-full overflow-y-auto">
                        <div className="bg-white p-4 sm:p-6 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-4">
                          {formStep === 'confirm' && (
                            <div className="p-6">
                              <div className="text-xl mb-4">Accept delivery?</div>
                              <div className="mb-6 text-gray-600">Once you accept this delivery, the work will be marked as approved. You can still release payment later.</div>
                              <div className="flex text-center cursor-pointer gap-4 mt-16">
                                <p
                                  onClick={handleCancel}
                                  className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 active:opacity-70 transition-all"
                                >
                                  Cancel
                                </p>
                                <p
                                  onClick={handleAcceptConfirm}
                                  className="flex-1 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:opacity-70 transition-all"
                                >
                                  Accept delivery
                                </p>
                              </div>
                            </div>
                          )}

                          {formStep === 'form' && (
                            <div className="p-6 max-h-[90vh] overflow-y-auto">
                              <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              
                              <div className="text-center mb-2">
                                <h2 className="text-xl font-semibold">Payment Successful!</h2>
                              </div>
                              <div className="text-center text-gray-600 mb-6">
                                Help Alex Rivera get started on your project
                              </div>

                              <div className="border-t pt-6">
                                <div className="mb-4">
                                  <div className="text-sm text-gray-600 mb-1">Service</div>
                                  <div className="font-medium">Complete Brand Identity Design</div>
                                </div>

                                <div className="mb-6">
                                  <div className="flex justify-between items-center mb-4">
                                    <div className="text-sm font-medium">Setup Progress</div>
                                    <div className="text-sm text-gray-600">{answeredCount} of 3 answered</div>
                                  </div>

                                  <div className="space-y-4">
                                    {/* Question 1 */}
                                    <div>
                                      <div className="flex items-start gap-2 mb-2">
                                        <span className="text-gray-600 mt-1">1</span>
                                        <div className="flex-1">
                                          <label className="block text-gray-900 mb-2">
                                            What is your brand name and what does your company do?
                                            <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded">Required</span>
                                          </label>
                                          <textarea
                                            name="brandName"
                                            value={formData.brandName}
                                            onChange={handleFormChange}
                                            placeholder="Type your answer here..."
                                            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                                            rows={3}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Question 2 */}
                                    <div>
                                      <div className="flex items-start gap-2 mb-2">
                                        <span className="text-gray-600 mt-1">2</span>
                                        <div className="flex-1">
                                          <label className="block text-gray-900 mb-2">
                                            Who is your target audience?
                                            <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded">Required</span>
                                          </label>
                                          <textarea
                                            name="targetAudience"
                                            value={formData.targetAudience}
                                            onChange={handleFormChange}
                                            placeholder="Type your answer here..."
                                            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                                            rows={3}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Question 3 */}
                                    <div>
                                      <div className="flex items-start gap-2 mb-2">
                                        <span className="text-gray-600 mt-1">3</span>
                                        <div className="flex-1">
                                          <label className="block text-gray-900 mb-2">
                                            Do you have any color preferences or brand guidelines?
                                          </label>
                                          <textarea
                                            name="colorPreferences"
                                            value={formData.colorPreferences}
                                            onChange={handleFormChange}
                                            placeholder="Type your answer here..."
                                            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                                            rows={3}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Attachments */}
                                <div className="mb-6">
                                  <div className="text-sm text-gray-600 mb-2">
                                    Attachments (Optional) <span className="text-gray-400">Brand assets, references, etc.</span>
                                  </div>
                                  
                                  <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                      dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-gray-50'
                                    }`}
                                  >
                                    <input
                                      type="file"
                                      multiple
                                      onChange={handleFileSelect}
                                      className="hidden"
                                      id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                      </svg>
                                      <div className="text-emerald-600 font-medium mb-1">Click to upload</div>
                                      <div className="text-sm text-gray-500">or drag and drop</div>
                                      <div className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB - Max 5 files</div>
                                    </label>
                                    {formData.attachments && (
                                      <div className="mt-4 text-sm text-gray-600">
                                        {formData.attachments.length} file(s) selected
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Submit Button */}
                                <div className='flex w-full bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:opacity-70 transition-all cursor-pointer'>
                                  <p
                                    onClick={handleSubmitRequirements}
                                    className="text-center w-full pt-3"
                                  >
                                    Submit Requirements
                                  </p>
                                </div>

                                <div className="text-center text-xs text-gray-500 mt-4">
                                  Your order countdown begins after submission. You can always add more details in the Order Room.
                                </div>
                              </div>
                            </div>
                          )}

                          {formStep === 'success' && (
                            <div className="p-6 text-center">
                              <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              <h2 className="text-xl font-semibold mb-2">Requirements Submitted!</h2>
                              <p className="text-gray-600 mb-6">Your delivery has been approved and requirements have been sent to the team member.</p>
                              <p
                                onClick={handleSuccessClose}
                                className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:opacity-70 transition-all"
                              >
                                Done
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}   
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-3 p-6">
              <div className="text-2xl text-gray-900">Milestones</div>
              <div className="text-sm text-gray-600">
                ${data.released.toLocaleString()} of ${data.total.toLocaleString()} released
              </div>
              <div className="grid gap-y-4 pb-3">
                {data.milestones.map((milestone, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="text-lg text-gray-900">{milestone.phase}</div>
                        <div className="text-sm text-gray-500 mt-1">Due {milestone.due}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-bold text-emerald-600">${milestone.amount.toLocaleString()}</div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            milestone.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                            milestone.status === 'In progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {milestone.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='w-full h-[1px] bg-gray-200 mb-2'></div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-gray-900">Overall progress</div>
                  <div className="text-lg font-bold text-gray-900">{data.overallProgress}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-700"
                    style={{ width: `${data.overallProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="space-y-6 mt-6 rounded-2xl border border-gray-200 p-6">
              <div className="text-xl text-gray-900 mb-6">Activity Timeline</div>
              <div className="space-y-4">
                {data.activities.slice(0, visibleActivities).map((activity, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="text-lg text-gray-900">{activity.description}</div>
                      <div className="text-sm text-gray-500">{activity.date}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{activity.user}</div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleActivities < data.activities.length && (
                <div className="text-center">
                  <p
                    onClick={loadMoreActivities}
                    className="text-emerald-600 font-medium text-lg py-2 px-6 border border-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Load More
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentTab === 'files' && (
          <div className="space-y-6 mt-3 rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between ">
              <div className="text-2xl text-gray-900">All Files</div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium cursor-pointer hover:text-emerald-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-sm sm:text-base">Download all</span>
              </div>
            </div>
            <div className="grid gap-y-3">
              {data.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4">
                    <svg className="w-9 h-9 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">{file.name}</div>
                      {file.size && <div className="text-sm text-gray-500">{file.size}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    {file.verified !== false && (
                      <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    )}
                    <svg className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <div className="text-gray-500">
                <div className="text-lg font-medium mb-2">Drop files here or click to browse</div>
                <div className="text-sm">Share references, feedback, or additional materials</div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'invoices' && (
          <div className="space-y-6 mt-3 rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-2xl text-gray-900">Invoices</div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium cursor-pointer hover:text-emerald-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-sm sm:text-base">Export CSV</span>
              </div>
            </div>
            <div className="space-y-4">
              {data.invoices.map((invoice, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg text-gray-900">{invoice.number}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {invoice.date} • {invoice.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="text-lg font-bold text-gray-900">${invoice.amount.toLocaleString()}</div>
                      <svg className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}