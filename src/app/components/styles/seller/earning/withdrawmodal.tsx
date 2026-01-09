"use client";

import React, { useMemo, useState } from "react";
import Modal from "@/app/components/styles/seller/earning/modal";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";

type Method = {
  id: string;
  name: string;
  sub: string;
  eta: string;
  kind: "paypal" | "bank";
};

function money(n: number) {
  return n.toFixed(2);
}

export default function WithdrawModal({
  open,
  balance,
  onClose,
  onAddMethod,
}: {
  open: boolean;
  balance: number;
  onClose: () => void;
  onAddMethod: () => void;
}) {
  const [amount, setAmount] = useState<string>("0.00");
  const [methodId, setMethodId] = useState<string>("paypal");

  const methods = useMemo<Method[]>(
    () => [
      { id: "paypal", name: "PayPal", sub: "user@email.com", eta: "1-2 days", kind: "paypal" },
      { id: "bank", name: "Bank Transfer", sub: "Chase ••••4892", eta: "3-5 days", kind: "bank" },
    ],
    []
  );

  function setQuick(v: number) {
    setAmount(money(v));
  }

  const amountNum = Number(amount || "0");
  const withdrawLabel = `Withdraw $${money(isFinite(amountNum) ? amountNum : 0)}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Withdraw Funds"
      subtitle="Transfer your available earnings to your payment method"
      footer={
        <div className="flex items-center justify-end gap-3">
          <div
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
            className="h-10 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer select-none flex items-center"
          >
            Cancel
          </div>

          <div
            role="button"
            tabIndex={0}
            aria-label={withdrawLabel}
            className="h-10 px-4 rounded-lg bg-orange-600 hover:bg-orange-700 active:bg-orange-700 text-white text-sm font-medium cursor-pointer select-none flex items-center"
          >
            {withdrawLabel}
          </div>
        </div>
      }
    >
      {/* Available balance */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
        <div className="text-xs text-gray-500">Available Balance</div>
        <div className="mt-1 text-lg font-semibold text-gray-900">
          ${money(balance)}
        </div>
      </div>

      {/* Withdrawal amount */}
      <div className="mt-5">
        <div className="text-xs font-medium text-gray-700">Withdrawal Amount</div>

        <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 h-10 px-3 flex items-center gap-2">
          <div className="text-sm text-gray-500">$</div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-900
                       focus:ring-0"
            inputMode="decimal"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { id: "q50", label: "$50", v: 50 },
            { id: "q100", label: "$100", v: 100 },
            { id: "q500", label: "$500", v: 500 },
          ].map((q) => (
            <div
              key={q.id}
              role="button"
              tabIndex={0}
              onClick={() => setQuick(q.v)}
              onKeyDown={(e) => handleKeyboardActivate(e, () => setQuick(q.v))}
              className="h-8 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 cursor-pointer select-none flex items-center"
            >
              {q.label}
            </div>
          ))}

          <div
            role="button"
            tabIndex={0}
            onClick={() => setQuick(balance)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => setQuick(balance))}
            className="h-8 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 cursor-pointer select-none flex items-center"
          >
            All
          </div>
        </div>
      </div>

      {/* Payment method header */}
      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs font-medium text-gray-700">Payment Method</div>

        <div
          role="button"
          tabIndex={0}
          onClick={onAddMethod}
          onKeyDown={(e) => handleKeyboardActivate(e, onAddMethod)}
          className="text-xs text-orange-600 hover:text-orange-700 cursor-pointer select-none flex items-center gap-2"
        >
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
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
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </div>
          Add Card
        </div>
      </div>

      {/* Payment methods list */}
      <div className="mt-3 space-y-3">
        {methods.map((m) => {
          const active = methodId === m.id;

          const icon =
            m.kind === "paypal" ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.668 4.16797H3.33464C2.41416 4.16797 1.66797 4.91416 1.66797 5.83464V14.168C1.66797 15.0884 2.41416 15.8346 3.33464 15.8346H16.668C17.5884 15.8346 18.3346 15.0884 18.3346 14.168V5.83464C18.3346 4.91416 17.5884 4.16797 16.668 4.16797Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66797 8.33203H18.3346" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 18.3346V3.33464C5 2.89261 5.17559 2.46868 5.48816 2.15612C5.80072 1.84356 6.22464 1.66797 6.66667 1.66797H13.3333C13.7754 1.66797 14.1993 1.84356 14.5118 2.15612C14.8244 2.46868 15 2.89261 15 3.33464V18.3346H5Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.0013 10H3.33464C2.89261 10 2.46868 10.1756 2.15612 10.4882C1.84356 10.8007 1.66797 11.2246 1.66797 11.6667V16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333H5.0013" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 7.5H16.6667C17.1087 7.5 17.5326 7.6756 17.8452 7.98816C18.1577 8.30072 18.3333 8.72464 18.3333 9.16667V16.6667C18.3333 17.1087 18.1577 17.5326 17.8452 17.8452C17.5326 18.1577 17.1087 18.3333 16.6667 18.3333H15" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33203 5H11.6654" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33203 8.33203H11.6654" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33203 11.668H11.6654" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33203 15H11.6654" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            );

          return (
            <div
              key={m.id}
              role="button"
              tabIndex={0}
              onClick={() => setMethodId(m.id)}
              onKeyDown={(e) => handleKeyboardActivate(e, () => setMethodId(m.id))}
              className={`rounded-xl border p-3 flex items-center justify-between gap-4 cursor-pointer select-none
                ${active ? "border-orange-200 bg-orange-50/40" : "border-gray-200 bg-white hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-3 h-3 rounded-full border flex-shrink-0 ${
                    active ? "border-orange-600" : "border-gray-300"
                  }`}
                >
                  {active ? (
                    <div className="w-full h-full rounded-full bg-orange-600 scale-[0.6]" />
                  ) : null}
                </div>

                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900">{m.name}</div>
                  <div className="text-xs text-gray-500 truncate">{m.sub}</div>
                </div>
              </div>

              <div className="text-[11px] px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 flex-shrink-0">
                {m.eta}
              </div>
            </div>
          );
        })}
      </div>

      {/* info */}
      <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-3 flex items-start gap-2 text-xs text-gray-600">
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500 mt-0.5">
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
            <path d="M12 8h.01" />
            <path d="M11 12h1v4h1" />
            <path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" />
          </svg>
        </div>
        Withdrawals are processed within 24 hours. Funds typically arrive in 3–5 business days.
      </div>
    </Modal>
  );
}
