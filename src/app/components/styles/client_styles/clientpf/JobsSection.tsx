'use client';

import { useState } from 'react';

export default function JobsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('All budgets');

  return (
    <>
      {/* LEFT SECTION */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        {/* Budget Dropdown */}
        <div className="relative inline-block">
          <p
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm cursor-pointer select-none hover:bg-gray-50"
          >
            {selectedBudget}

            {isOpen ? (
              /* Chevron Up */
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 9.06l-3.71 3.71a.75.75 0 11-1.06-1.06l4.24-4.24a.75.75 0 011.06 0l4.24 4.24a.75.75 0 01.02 1.08z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              /* Chevron Down */
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </p>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-white border rounded-lg shadow-md text-sm z-20">
              {['All budgets','$0 – $1,000', '$1,000 – $5,000', '$5,000+'].map((budget) => (
                <p
                  key={budget}
                  onClick={() => {
                    setSelectedBudget(budget);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {budget}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* JOB CARDS */}
        {[
          {
            title: 'Senior React Developer for Dashboard Feature',
            price: '$6,500',
            type: 'Fixed price',
            meta: 'Web Development · Expert · 2 hours ago',
            skills: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
            proposals: '12 proposals',
          },
          {
            title: 'Mobile App UI/UX Designer',
            price: '$85/hr',
            type: '$5,000 cap',
            meta: 'Design · Intermediate · 1 day ago',
            skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research'],
            proposals: '24 proposals',
          },
        ].map((job) => (
          <div key={job.title} className="border rounded-xl p-6 space-y-4">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.meta}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{job.price}</p>
                <p className="text-sm text-gray-500">{job.type}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs bg-gray-100 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{job.proposals}</span>
              <button className="px-4 py-2 border rounded-lg text-green-600 hover:bg-green-50">
                View details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="col-span-12 lg:col-span-4">
        <div className="border rounded-xl p-5 space-y-4">
          <h4 className="font-semibold">Policies</h4>

          <div className="text-sm">
            <p className="text-gray-500 mb-1">Communication</p>
            <p className="font-medium">2–3x weekly</p>
          </div>

          <hr />

          <div className="text-sm pt-1">
            <p className="text-gray-500 mb-1">Payment</p>
            <p className="font-medium">Escrow by milestone</p>
          </div>
        </div>
      </aside>
    </>
  );
}
