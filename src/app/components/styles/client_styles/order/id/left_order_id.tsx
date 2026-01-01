'use client';

import React, { useState } from 'react';

// Types
interface FileItem {
  id: string;
  name: string;
  size: string;
  verified: boolean;
  type: 'document' | 'image' | 'archive' | 'code';
  uploadDate?: string;
  previewable?: boolean;
}

interface FileCategory {
  id: string;
  name: string;
  icon: 'deliverables' | 'legal' | 'project' | 'upload';
  files: FileItem[];
  expanded?: boolean;
}

interface FilesData {
  categories: FileCategory[];
  filterOptions: string[];
}

// Default SVG Icons
const FileIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const DeliverablesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const LegalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ProjectIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const CategoryIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'deliverables':
      return <DeliverablesIcon />;
    case 'legal':
      return <LegalIcon />;
    case 'project':
      return <ProjectIcon />;
    case 'upload':
      return <UploadIcon />;
    default:
      return <FileIcon />;
  }
};

const getFileIcon = (type: string) => {
  if (type === 'image') return <ImageIcon />;
  return <FileIcon />;
};

export default function LeftOrderId({ data }: { data: FilesData }) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'files' | 'invoices'>('files');
  const [selectedFilter, setSelectedFilter] = useState<string>('All files');
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    deliverables: true,
    legal: true,
    project: true,
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleDownloadAll = () => {
    console.log('Download all files');
  };

  const handleFileDownload = (fileId: string) => {
    console.log('Download file:', fileId);
  };

  const handleFilePreview = (fileId: string) => {
    console.log('Preview file:', fileId);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Upload files:', Array.from(files));
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <div
          className={`flex-1 px-6 py-4 text-center cursor-pointer transition-colors ${
            activeTab === 'timeline'
              ? 'border-b-2 border-blue-500 text-gray-900 font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('timeline')}
        >
          Timeline
        </div>
        <div
          className={`flex-1 px-6 py-4 text-center cursor-pointer transition-colors ${
            activeTab === 'files'
              ? 'border-b-2 border-blue-500 text-gray-900 font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </div>
        <div
          className={`flex-1 px-6 py-4 text-center cursor-pointer transition-colors ${
            activeTab === 'invoices'
              ? 'border-b-2 border-blue-500 text-gray-900 font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices
        </div>
      </div>

      <div className="w-full p-4 md:p-6 lg:p-8">
        {/* Files View */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            {/* Header with Filter and Download All */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {data.filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon isOpen={false} />
                </div>
              </div>

              <div
                onClick={handleDownloadAll}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <DownloadIcon />
                <span>Download all</span>
              </div>
            </div>

            {/* File Categories */}
            <div className="space-y-6">
              {data.categories.map((category) => (
                <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Category Header */}
                  <div
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center gap-3 px-6 py-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <CategoryIcon type={category.icon} />
                    <span className="flex-1 font-medium text-gray-900">{category.name}</span>
                    <ChevronDownIcon isOpen={expandedCategories[category.id] ?? true} />
                  </div>

                  {/* Files List */}
                  {expandedCategories[category.id] !== false && (
                    <div className="divide-y divide-gray-100">
                      {category.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                          {/* File Icon and Info */}
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {getFileIcon(file.type)}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {file.uploadDate ? `${file.uploadDate} · ${file.size}` : file.size}
                              </div>
                            </div>
                          </div>

                          {/* Verified Badge */}
                          {file.verified && (
                            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                              <CheckIcon />
                              <span>Verified</span>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {file.previewable && (
                              <div
                                onClick={() => handleFilePreview(file.id)}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                                title="Preview"
                              >
                                <EyeIcon />
                              </div>
                            )}
                            <div
                              onClick={() => handleFileDownload(file.id)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                              title="Download"
                            >
                              <DownloadIcon />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Upload Additional Files */}
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div
                  className="flex flex-col items-center justify-center text-center cursor-pointer"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <div className="mb-4">
                    <UploadIcon />
                  </div>
                  <div className="text-sm text-gray-900 mb-1">
                    Drop files here or click to browse
                  </div>
                  <div className="text-xs text-gray-500">
                    Share references, feedback, or additional materials
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-12 text-gray-500">Timeline view - Coming soon</div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-12 text-gray-500">Invoices view - Coming soon</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sample data for testing
export const sampleFilesData: FilesData = {
  filterOptions: ['All files', 'Deliverables only', 'Documents only', 'Images only'],
  categories: [
    {
      id: 'deliverables',
      name: 'Deliverables',
      icon: 'deliverables',
      files: [
        { id: 'f1', name: 'api-documentation.pdf', size: '4.2 MB', verified: true, type: 'document' },
        { id: 'f2', name: 'backend-source-code.zip', size: '28.5 MB', verified: true, type: 'archive' },
        { id: 'f3', name: 'database-schema.sql', size: '156 KB', verified: true, type: 'code' },
        { id: 'f4', name: 'student-dashboard-v2.fig', size: '22.4 MB', verified: true, type: 'document' },
        { id: 'f5', name: 'frontend-components.zip', size: '18.7 MB', verified: true, type: 'archive' },
        { id: 'f6', name: 'dashboard-preview.png', size: '3.9 MB', verified: true, type: 'image', previewable: true },
        { id: 'f7', name: 'admin-panel-v3.zip', size: '31.2 MB', verified: true, type: 'archive' },
        { id: 'f8', name: 'analytics-components.tsx', size: '245 KB', verified: true, type: 'code' },
        { id: 'f9', name: 'admin-screenshots.png', size: '4.1 MB', verified: true, type: 'image', previewable: true },
      ],
    },
    {
      id: 'legal',
      name: 'Legal documents',
      icon: 'legal',
      files: [
        { id: 'l1', name: 'NDA-Agreement-2.5.pdf', size: '2 MB', verified: true, type: 'document', uploadDate: 'Signed Oct 20, 2024', previewable: true },
        { id: 'l2', name: 'Service-Agreement-2.5.pdf', size: '1.2 MB', verified: true, type: 'document', uploadDate: 'Signed Oct 20, 2024', previewable: true },
      ],
    },
    {
      id: 'project',
      name: 'Project documents',
      icon: 'project',
      files: [
        { id: 'p1', name: 'Project-Brief.pdf', size: '456 KB', verified: true, type: 'document', uploadDate: 'Uploaded Oct 20, 2024', previewable: true },
      ],
    },
  ],
};

