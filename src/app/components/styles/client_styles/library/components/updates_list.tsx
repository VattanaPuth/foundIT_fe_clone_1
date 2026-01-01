"use client";

import React from "react";
import type { UpdateItem } from "@/app/components/styles/client_styles/library/ts/mock_data";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/library/ts/ultis";
import { ProductThumb } from "@/app/components/styles/client_styles/library/components/icons";
import { useRouter } from "next/navigation";

export default function UpdatesList({
  updates,
  updatingMap,
  onApplyUpdate,
}: {
  updates: UpdateItem[];
  updatingMap: Record<string, boolean>;
  onApplyUpdate: (productId: string) => void;
}) {
  const router = useRouter();

  return (
    <div className="mt-5">
      <div className="text-xs font-semibold text-gray-500">Feature Releases</div>

      <div className="mt-3 space-y-3">
        {updates.length === 0 ? (
          <div className="bg-white border rounded-xl shadow-sm p-4 text-sm text-gray-600">
            You&apos;re all up to date.
          </div>
        ) : (
          updates.map((u) => {
            const isUpdating = !!updatingMap[u.productId];

            return (
              <div key={u.id} className="bg-white border rounded-xl shadow-sm p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <ProductThumb tone={u.imageTone} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">
                        {u.title}
                      </div>
                      <div className="text-xs text-gray-500">by {u.author}</div>

                      <div className="mt-2 text-xs text-gray-600">
                        <span className="font-medium">{u.fromVersion}</span>{" "}
                        <span className="text-gray-400">→</span>{" "}
                        <span className="font-medium">{u.toVersion}</span>
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] text-orange-700">
                    Paid upgrade
                  </span>
                </div>

                <div className="mt-3 text-xs text-gray-500">What&apos;s new:</div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {u.whatsNew.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onApplyUpdate(u.productId)}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => onApplyUpdate(u.productId))
                    }
                    className={`rounded-md border px-3 py-2 text-xs cursor-pointer select-none transition active:scale-[0.99]
                      ${
                        isUpdating
                          ? "bg-gray-50 text-gray-400 border-gray-200"
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    aria-label="Update"
                  >
                    <div className="flex items-center gap-2">
                      {isUpdating ? (
                        <div className="h-3.5 w-3.5 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin" />
                      ) : null}
                      <span>Update</span>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push("")}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => router.push(""))
                    }
                    className="rounded-md border bg-white px-3 py-2 text-xs text-gray-700 cursor-pointer select-none
                               hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
                    aria-label="View Changelog"
                  >
                    View Changelog
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
