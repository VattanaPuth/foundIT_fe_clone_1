'use client';

import React, { useEffect, useRef, useState } from 'react';

type Tab = {
  label: string;
  count: number;
  active?: boolean;
  variant?: "default" | "danger";
};

type SortOption = {
  label: string;
  value: string;
};

type SubHeaderProps = {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeTab?: string;
  onTabChange?: (label: string) => void;
  tabs?: Tab[];
  title?: string;
  searchPlaceholder?: string;
  sortBy?: string;
  onSortChange?: (value: string) => void;
  sortOptions?: SortOption[];
};

export default function SubHeader({
  searchQuery = "",
  onSearchChange = () => {},
  activeTab = "All",
  onTabChange = () => {},
  tabs = [
    { label: "All", count: 13 },
    { label: "Active", count: 6 },
    { label: "Revisions", count: 1 },
    { label: "Awaiting approval", count: 2 },
    { label: "Completed", count: 3 },
    { label: "Issues", count: 1, variant: "danger" },
  ],
  title = "My Orders",
  searchPlaceholder = "Search jobs, talent...",
  sortBy = "recently_updated",
  onSortChange = () => {},
  sortOptions = [
    { label: "Recently updated", value: "recently_updated" },
    { label: "Due soon", value: "due_soon" },
    { label: "Highest amount", value: "highest_amount" },
  ]
}: SubHeaderProps){

    const [isSortOpen, setIsSortOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Find the current selected option's label
    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "Recently updated";

    const handleSortSelect = (value: string) => {
      onSortChange(value); // Call parent's sort change handler
      setIsSortOpen(false); // Close dropdown
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsSortOpen(false);
        }
      };

      if (isSortOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isSortOpen]);

    return(
        <div className="w-full border-t-1 border-t-gray-300">
            <div className="pt-10 pb-4 px-3">
                <p className="text-2xl">{title}</p>
            </div>

            <div className="flex w-full items-center justify-between px-3 gap-4">
                <div className='flex flex-1 max-w-2xl items-center gap-x-2 h-12 border border-[#F3F3F5] bg-gray-100 px-3 rounded-xl'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <path d="M19 19L15.5001 15.5M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input 
                        type='text' 
                        className='w-full bg-transparent outline-none border-none focus:ring-0 text-sm py-2'  
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                
                {/* Sort Dropdown - DYNAMIC */}
                <div className="relative" ref={dropdownRef}>
                    {/* Dropdown Button - Shows currently selected option */}
                    <div 
                        className="flex items-center justify-between w-52 h-12 px-4 bg-gray-100 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-200 transition"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        <span className="text-sm text-gray-700">
                            {currentSortLabel}
                        </span>
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 20 20" 
                            fill="none"
                            className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
                        >
                            <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="#717182"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Dropdown Menu Options */}
                    {isSortOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                            {sortOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSortSelect(option.value)}
                                    className={`px-4 py-3 text-sm cursor-pointer transition select-none ${
                                        sortBy === option.value
                                            ? 'bg-gray-100 text-gray-900 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="px-3 mt-4 border-b border-gray-300">
                <div className="flex items-center gap-x-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <div
                            key={tab.label}
                            onClick={() => onTabChange(tab.label)}
                            className={`px-8 py-3 justify-between text-lg flex items-center text-center gap-x-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
                                activeTab === tab.label
                                ? `border-[#009966] border-t border-b border-r border-l text-[#009966] ${tab.variant === "danger" ? "text-red-600 border-[#E7000B]" : ""}`
                                : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            {tab.label}
                                                    
                            <span
                                className={`pt-1 w-6 h-6 rounded-full text-xs ${
                                tab.variant === "danger"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {tab.count}
                            </span>
                            
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}