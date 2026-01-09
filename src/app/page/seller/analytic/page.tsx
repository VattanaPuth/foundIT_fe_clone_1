"use client";

import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Business Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your performance and grow your business
            </p>
          </div>

          <div
            role="button"
            tabIndex={0}
            className="h-10 px-4 rounded-lg bg-white border border-gray-200 shadow-sm
                       text-sm text-gray-800 inline-flex items-center justify-center
                       cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
            aria-label="Export Data"
          >
            Export Data
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    {
      title: "Total Revenue",
      value: "$15,760",
      sub: "+20.1% from last month",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1v22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Total Orders",
      value: "156",
      sub: "+15.2% from last month",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 6h15l-1.5 9h-13z" />
          <path d="M6 6l-2-3H2" />
          <circle cx="9" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </svg>
      ),
    },
    {
      title: "Profile Views",
      value: "8,340",
      sub: "+8.5% from last month",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: "Average Rating",
      value: "4.8",
      sub: "Excellent performance",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 17.3l-6.2 3.3 1.2-7-5-4.8 7-1 3-6.3 3 6.3 7 1-5 4.8 1.2 7z" />
        </svg>
      ),
    },
  ].map((kpi) => (
    <div
      key={kpi.title}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
    >
      {/* title + icon */}
      <div className="flex items-start justify-between">
        <div className="text-sm text-gray-500">{kpi.title}</div>
        <div className="text-orange-500">{kpi.icon}</div>
      </div>

      {/* value */}
      <div className="mt-2 text-xl font-semibold">{kpi.value}</div>

      {/* sub text */}
      <div className="mt-1 text-xs text-orange-600">{kpi.sub}</div>
    </div>
  ))}
</div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue Trend */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="text-sm font-semibold">Revenue Trend</div>

            <div className="mt-4 grid grid-cols-[44px_1fr] gap-2 items-stretch">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between text-[11px] text-gray-400 pb-2">
                <div>6000</div>
                <div>4500</div>
                <div>3000</div>
                <div>1500</div>
                <div>0</div>
              </div>
              <div className="mt-4 w-full overflow-hidden">
                {/* Simple static SVG line chart */}
                <svg viewBox="0 0 600 220" className="w-full h-52">
                  <polyline
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    points="0,160 100,120 200,140 300,90 400,110 500,70"
                  />
                  {[0, 100, 200, 300, 400, 500].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="220"
                      stroke="#e5e7eb"
                      strokeDasharray="4 4"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="text-sm font-semibold">Revenue by Category</div>

            <div className="mt-6 flex items-center justify-center">
              {/* Static pie chart */}
              <svg viewBox="0 0 200 200" className="h-48 w-48">
                <circle r="80" cx="100" cy="100" fill="#e5e7eb" />
                <path
                  d="M100,100 L100,20 A80,80 0 0,1 170,140 Z"
                  fill="#818cf8"
                />
                <path
                  d="M100,100 L170,140 A80,80 0 0,1 60,170 Z"
                  fill="#86efac"
                />
                <path
                  d="M100,100 L60,170 A80,80 0 0,1 100,20 Z"
                  fill="#fbbf24"
                />
              </svg>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-indigo-600">Design</span>
                <span>45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-500">Development</span>
                <span>35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-500">Video</span>
                <span>20%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="text-sm font-semibold">Service Performance</div>

          <div className="mt-4 space-y-3">
            {[
              {
                name: "Logo Design",
                views: 2340,
                orders: 45,
                revenue: "$1250",
                conv: "1.9%",
              },
              {
                name: "Web Development",
                views: 1890,
                orders: 23,
                revenue: "$2875",
                conv: "1.2%",
              },
              {
                name: "Video Editing",
                views: 567,
                orders: 8,
                revenue: "$640",
                conv: "1.4%",
              },
            ].map((s) => (
              <div
                key={s.name}
                className="border border-gray-100 rounded-lg p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="font-medium">{s.name}</div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Views</div>
                      <div>{s.views}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Orders</div>
                      <div>{s.orders}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Revenue</div>
                      <div>{s.revenue}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Conversion</div>
                      <div>{s.conv}</div>
                    </div>
                  </div>

                  <div className="h-2 w-24 bg-orange-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-orange-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
