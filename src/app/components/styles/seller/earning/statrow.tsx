"use client";

import React from "react";

type StatItem = {
  id: string;
  title: string;
  value: string;
  sub: string;
  accent: "blue" | "orange" | "amber" | "green";
  note?: string;
  right?: React.ReactNode;
};

function AccentIcon({ accent }: { accent: StatItem["accent"] }) {
  const cls =
    accent === "blue"
      ? "bg-blue-50 text-blue-600 border-blue-100"
      : accent === "orange"
      ? "bg-orange-50 text-orange-600 border-orange-100"
      : accent === "amber"
      ? "bg-amber-50 text-amber-600 border-amber-100"
      : "bg-green-50 text-green-600 border-green-100";

  // simple distinct icon per accent
  const icon =
    accent === "blue" ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33203 12.2148V13.5698C8.32888 13.8554 8.25243 14.1353 8.11002 14.3828C7.9676 14.6303 7.76398 14.837 7.5187 14.9832C6.99798 15.3689 6.5744 15.8707 6.2816 16.4487C5.98881 17.0268 5.83487 17.6652 5.83203 18.3132" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.668 12.2148V13.5698C11.6711 13.8554 11.7476 14.1353 11.89 14.3828C12.0324 14.6303 12.236 14.837 12.4813 14.9832C13.002 15.3689 13.4256 15.8707 13.7184 16.4487C14.0112 17.0268 14.1651 17.6652 14.168 18.3132" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 7.4987H16.25C16.8025 7.4987 17.3324 7.2792 17.7231 6.8885C18.1138 6.4978 18.3333 5.9679 18.3333 5.41536C18.3333 4.86283 18.1138 4.33293 17.7231 3.94223C17.3324 3.55152 16.8025 3.33203 16.25 3.33203H15" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33203 18.332H16.6654" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 7.5013C5 8.82738 5.52678 10.0992 6.46447 11.0368C7.40215 11.9745 8.67392 12.5013 10 12.5013C11.3261 12.5013 12.5979 11.9745 13.5355 11.0368C14.4732 10.0992 15 8.82738 15 7.5013V2.5013C15 2.28029 14.9122 2.06833 14.7559 1.91205C14.5996 1.75577 14.3877 1.66797 14.1667 1.66797H5.83333C5.61232 1.66797 5.40036 1.75577 5.24408 1.91205C5.0878 2.06833 5 2.28029 5 2.5013V7.5013Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.0013 7.4987H3.7513C3.19877 7.4987 2.66886 7.2792 2.27816 6.8885C1.88746 6.4978 1.66797 5.9679 1.66797 5.41536C1.66797 4.86283 1.88746 4.33293 2.27816 3.94223C2.66886 3.55152 3.19877 3.33203 3.7513 3.33203H5.0013" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ) : accent === "orange" ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.332 5.83203H18.332V10.832" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3346 5.83203L11.2513 12.9154L7.08464 8.7487L1.66797 14.1654" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ) : accent === "amber" ? (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 5V10L13.3333 11.6667" stroke="#D08700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.0013 18.3346C14.6037 18.3346 18.3346 14.6037 18.3346 10.0013C18.3346 5.39893 14.6037 1.66797 10.0013 1.66797C5.39893 1.66797 1.66797 5.39893 1.66797 10.0013C1.66797 14.6037 5.39893 18.3346 10.0013 18.3346Z" stroke="#D08700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ) : (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0013 18.3346C14.6037 18.3346 18.3346 14.6037 18.3346 10.0013C18.3346 5.39893 14.6037 1.66797 10.0013 1.66797C5.39893 1.66797 1.66797 5.39893 1.66797 10.0013C1.66797 14.6037 5.39893 18.3346 10.0013 18.3346Z" stroke="#009966" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#009966" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.9987 11.6654C10.9192 11.6654 11.6654 10.9192 11.6654 9.9987C11.6654 9.07822 10.9192 8.33203 9.9987 8.33203C9.07822 8.33203 8.33203 9.07822 8.33203 9.9987C8.33203 10.9192 9.07822 11.6654 9.9987 11.6654Z" stroke="#009966" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    );

  return (
    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${cls}`}>
      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
    </div>
  );
}

export default function StatRow({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <div
          key={it.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-start justify-between gap-3"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <AccentIcon accent={it.accent} />
              <div className="text-sm text-gray-500">{it.title}</div>
            </div>

            <div className="mt-3 text-xl font-semibold text-gray-900">
              {it.value}
            </div>
            <div className="mt-1 text-xs text-gray-500">{it.sub}</div>
            {it.note ? (
              <div className="mt-2 text-xs text-orange-600">{it.note}</div>
            ) : null}
          </div>

          {it.right ? <div className="flex-shrink-0">{it.right}</div> : null}
        </div>
      ))}
    </div>
  );
}
