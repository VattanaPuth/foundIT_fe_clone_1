"use client";

import React from "react";

type Tx = {
  id: string;
  title: string;
  meta: string;
  status: "Completed" | "Pending Clearance" | "Ready to Withdraw" | "Withdrawn";
  date: string;
  extra: string;
  amount: number;
  accent: "blue" | "amber" | "green" | "gray";
};

function StatusPill({ s }: { s: Tx["status"] }) {
  const cls =
    s === "Completed"
      ? "bg-blue-50 text-blue-700 border-blue-100"
      : s === "Pending Clearance"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : s === "Ready to Withdraw"
      ? "bg-green-50 text-green-700 border-green-100"
      : "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] ${cls}`}>
      {s}
    </div>
  );
}

function AccentIcon({ accent }: { accent: Tx["accent"] }) {
  const box =
    accent === "blue"
      ? "bg-blue-50 text-blue-600 border-blue-100"
      : accent === "amber"
      ? "bg-amber-50 text-amber-600 border-amber-100"
      : accent === "green"
      ? "bg-green-50 text-green-600 border-green-100"
      : "bg-gray-100 text-gray-600 border-gray-200";

  const icon =
    accent === "blue" ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1669 8.33357C18.5474 10.2013 18.2762 12.1431 17.3984 13.8351C16.5206 15.527 15.0893 16.8669 13.3431 17.6313C11.597 18.3957 9.64154 18.5384 7.80293 18.0355C5.96433 17.5327 4.35368 16.4147 3.23958 14.8681C2.12548 13.3214 1.57529 11.4396 1.68074 9.53639C1.78619 7.63318 2.54092 5.82364 3.81906 4.40954C5.0972 2.99545 6.8215 2.06226 8.7044 1.76561C10.5873 1.46897 12.515 1.82679 14.166 2.7794" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 9.16536L10 11.6654L18.3333 3.33203" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ) : accent === "amber" ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_15870)">
<path d="M10 5V10L13.3333 11.6667" stroke="#D08700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.0013 18.3346C14.6037 18.3346 18.3346 14.6037 18.3346 10.0013C18.3346 5.39893 14.6037 1.66797 10.0013 1.66797C5.39893 1.66797 1.66797 5.39893 1.66797 10.0013C1.66797 14.6037 5.39893 18.3346 10.0013 18.3346Z" stroke="#D08700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_15870">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

    ) : accent === "green" ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8333 5.83333V3.33333C15.8333 3.11232 15.7455 2.90036 15.5893 2.74408C15.433 2.5878 15.221 2.5 15 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667C2.5 4.60869 2.67559 5.03262 2.98816 5.34518C3.30072 5.65774 3.72464 5.83333 4.16667 5.83333H16.6667C16.8877 5.83333 17.0996 5.92113 17.2559 6.07741C17.4122 6.23369 17.5 6.44565 17.5 6.66667V10M17.5 10H15C14.558 10 14.134 10.1756 13.8215 10.4882C13.5089 10.8007 13.3333 11.2246 13.3333 11.6667C13.3333 12.1087 13.5089 12.5326 13.8215 12.8452C14.134 13.1577 14.558 13.3333 15 13.3333H17.5C17.721 13.3333 17.933 13.2455 18.0893 13.0893C18.2455 12.933 18.3333 12.721 18.3333 12.5V10.8333C18.3333 10.6123 18.2455 10.4004 18.0893 10.2441C17.933 10.0878 17.721 10 17.5 10Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 4.16797V15.8346C2.5 16.2767 2.67559 16.7006 2.98816 17.0131C3.30072 17.3257 3.72464 17.5013 4.16667 17.5013H16.6667C16.8877 17.5013 17.0996 17.4135 17.2559 17.2572C17.4122 17.1009 17.5 16.889 17.5 16.668V13.3346" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ) : (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1669 8.33357C18.5474 10.2013 18.2762 12.1431 17.3984 13.8351C16.5206 15.527 15.0893 16.8669 13.3431 17.6313C11.597 18.3957 9.64154 18.5384 7.80293 18.0355C5.96433 17.5327 4.35368 16.4147 3.23958 14.8681C2.12548 13.3214 1.57529 11.4396 1.68074 9.53639C1.78619 7.63318 2.54092 5.82364 3.81906 4.40954C5.0972 2.99545 6.8215 2.06226 8.7044 1.76561C10.5873 1.46897 12.515 1.82679 14.166 2.7794" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 9.16536L10 11.6654L18.3333 3.33203" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    );

  return (
    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${box}`}>
      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
    </div>
  );
}

export default function RecentTx({ items }: { items: Tx[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M3 12h18" />
              <path d="M7 12V7" />
              <path d="M12 12V5" />
              <path d="M17 12V9" />
              <path d="M3 19h18" />
            </svg>
          </div>
          Recent Transactions
        </div>

        <div className="h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 flex items-center gap-2">
          All Transactions
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-gray-200 bg-white p-4 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3 min-w-0">
              <AccentIcon accent={t.accent} />

              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {t.title}
                </div>
                <div className="mt-1 text-xs text-gray-500">{t.meta}</div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusPill s={t.status} />
                  <div className="text-xs text-gray-500">• {t.date}</div>
                </div>

                <div className="mt-2 text-xs text-gray-500">{t.extra}</div>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-sm font-semibold text-gray-900">
                ${t.amount.toLocaleString()}
              </div>

              {t.status === "Ready to Withdraw" ? (
                <div className="mt-2">
                  <div className="inline-flex h-8 px-3 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer select-none items-center justify-center">
                    Withdraw
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
