"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { cn, handleKeyboardActivate } from "@/app/components/styles/seller/setting/utils";
import SellerNavHeader from "@/app/components/styles/global_styles/seller/header";
import SellerFooter from "@/app/components/styles/global_styles/seller/footer";

function IconArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5L10 10.5L16.5 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 5.2H15.8C16.6 5.2 17.2 5.8 17.2 6.6V13.4C17.2 14.2 16.6 14.8 15.8 14.8H4.2C3.4 14.8 2.8 14.2 2.8 13.4V6.6C2.8 5.8 3.4 5.2 4.2 5.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDownload({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3V11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 8.5L10 12L13.5 8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14.5C4.9 15.3 6.3 16 10 16C13.7 16 15.1 15.3 16 14.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPrint({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6.2 7V4.5h7.6V7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 15.5H4.9c-.9 0-1.7-.8-1.7-1.7V9.4c0-.9.8-1.7 1.7-1.7h10.2c.9 0 1.7.8 1.7 1.7v4.4c0 .9-.8 1.7-1.7 1.7h-1.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 12.2h7.6v3.3H6.2v-3.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 10.3h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Pill({ label, tone = "green" }: { label: string; tone?: "green" | "gray" }) {
  const cls =
    tone === "green"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-gray-50 text-gray-700 border-gray-200";
  return <div className={cn("px-2.5 py-1 rounded-full border text-[11px] font-medium", cls)}>{label}</div>;
}

function ToolBtn({
  label,
  icon,
  tone = "neutral",
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  tone?: "neutral" | "primary";
  onClick?: () => void;
}) {
  const cls =
    tone === "primary"
      ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, () => onClick?.())}
      className={cn(
        "h-9 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 cursor-pointer select-none",
        cls
      )}
      aria-label={label}
    >
      <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
      {label}
    </div>
  );
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold tracking-wide text-gray-500 uppercase">{children}</div>;
}

function Tiny({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-gray-500">{children}</div>;
}

export default function InvoicePage() {
  const router = useRouter();

  return (
    <div className="h-screen bg-gray-50">
      <SellerNavHeader/>
      {/* Header actions (no topnav) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => router.back()}
            onKeyDown={(e) => handleKeyboardActivate(e, () => router.back())}
            className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer select-none hover:text-gray-900"
            aria-label="Back to order"
          >
            <div className="w-5 h-5 flex items-center justify-center text-gray-700">
              <IconArrowLeft />
            </div>
            Back to Order
          </div>

          <div className="flex items-center gap-2">
            <ToolBtn label="Email" icon={<IconMail />} onClick={() => {}} />
            <ToolBtn label="Download PDF" icon={<IconDownload />} onClick={() => {}} />
            <ToolBtn label="Print" icon={<IconPrint />} tone="primary" onClick={() => window.print()} />
          </div>
        </div>
      </div>

      {/* Page */}
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          {/* Invoice header */}
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-2xl font-semibold text-gray-900 tracking-tight">INVOICE</div>
                <div className="text-xs text-gray-500 mt-1">Found It Marketplace</div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Pill label="Paid" />
                </div>
                <div className="mt-2 text-[11px] text-gray-500">
                  <div className="font-semibold text-gray-900">INV-2024-001247</div>
                  <div className="mt-1">Order: 1</div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100" />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <BlockTitle>Issue Date</BlockTitle>
                <div className="text-sm font-medium text-gray-900 mt-1">November 28, 2024</div>
              </div>
              <div>
                <BlockTitle>Payment Date</BlockTitle>
                <div className="text-sm font-medium text-gray-900 mt-1">November 28, 2024, 3:45 PM</div>
              </div>
            </div>
          </div>

          {/* From / To */}
          <div className="px-8 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <BlockTitle>From (Seller)</BlockTitle>
                <div className="mt-2 text-sm font-semibold text-gray-900">Creative Design Studio</div>
                <div className="mt-2 space-y-1">
                  <Tiny>John Doe</Tiny>
                  <Tiny>john.doe@example.com</Tiny>
                  <Tiny>123 Creative Lane</Tiny>
                  <Tiny>San Francisco, CA 94102</Tiny>
                  <Tiny>United States</Tiny>
                  <Tiny>Tax ID: US-123456789</Tiny>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <BlockTitle>To (Buyer)</BlockTitle>
                <div className="mt-2 text-sm font-semibold text-gray-900">Sarah Johnson</div>
                <div className="mt-2 space-y-1">
                  <Tiny>sarah.johnson@example.com</Tiny>
                  <Tiny>456 Business Ave</Tiny>
                  <Tiny>San Francisco, CA 94105</Tiny>
                  <Tiny>United States</Tiny>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="px-8 pb-8">
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 grid grid-cols-[1fr_80px_120px_120px] gap-3">
                <div className="text-xs font-semibold text-gray-600">Description</div>
                <div className="text-xs font-semibold text-gray-600 text-right">Qty</div>
                <div className="text-xs font-semibold text-gray-600 text-right">Unit Price</div>
                <div className="text-xs font-semibold text-gray-600 text-right">Amount</div>
              </div>

              <div className="px-5 py-4 grid grid-cols-[1fr_80px_120px_120px] gap-3 border-t border-gray-100">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">Modern Dashboard UI Kit • Figma</div>
                  <div className="text-xs text-gray-500 mt-1">Commercial License</div>
                </div>
                <div className="text-sm text-gray-700 text-right">1</div>
                <div className="text-sm text-gray-700 text-right">$99.00</div>
                <div className="text-sm font-medium text-gray-900 text-right">$99.00</div>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100">
                <div className="px-5 py-4 flex justify-end">
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600">Subtotal</div>
                      <div className="text-gray-900 font-medium">$99.00</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600">Platform Fee (15%)</div>
                      <div className="text-red-600 font-medium">-$14.85</div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm">
                      <div className="text-gray-900 font-semibold">Total Paid by Customer</div>
                      <div className="text-gray-900 font-semibold">$99.00</div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-900 font-semibold">Your Net Earnings</div>
                      <div className="text-green-700 font-semibold">$84.15</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment information */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/60 p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Payment Information</div>
                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="text-[11px] text-gray-500">Payment Method</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">Visa ending in 4242</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500">Payment Status</div>
                      <div className="text-sm font-medium text-green-700 mt-1">Paid</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500">Transaction ID</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">txn_0x9a...kZb...</div>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500">Payment Date</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">November 28, 2024, 3:45 PM</div>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <div className="text-xs text-gray-500">Thank you for your business!</div>
              <div className="text-[11px] text-gray-400 mt-2">
                This is an automatically generated invoice from Found It Marketplace.
                <br />
                For support or questions, please contact: support@foundit.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <SellerFooter/>
    </div>
  );
}
