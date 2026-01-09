"use client";

import React from "react";
import {
  FieldLabel,
  TextInput,
  Toggle,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/profile-edit/FormControls";

export default function OverviewCard({
  sectionRef,
  avatarUrl,
  onUpload,
  onDeleteAvatar,
  fullName,
  setFullName,
  titleRole,
  setTitleRole,
  location,
  setLocation,
  allowMessages,
  setAllowMessages,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  avatarUrl: string | null;
  onUpload: () => void;
  onDeleteAvatar: () => void;
  fullName: string;
  setFullName: (v: string) => void;
  titleRole: string;
  setTitleRole: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  allowMessages: boolean;
  setAllowMessages: (v: boolean) => void;
}) {
  return (
    <section ref={sectionRef} className="scroll-mt-24">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="font-semibold text-gray-900">Overview</div>

        <div className="mt-4 space-y-4">
          {/* Avatar */}
          <div className="space-y-2">
            <FieldLabel text="Avatar" />
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-xs text-gray-400">No photo</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Upload avatar"
                  onClick={onUpload}
                  onKeyDown={(e) => handleKeyboardActivate(e, onUpload)}
                  className="h-9 px-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm cursor-pointer select-none flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2V10"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.3327 5.33333L7.99935 2L4.66602 5.33333"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span>Upload</span>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Delete avatar"
                  onClick={onDeleteAvatar}
                  onKeyDown={(e) => handleKeyboardActivate(e, onDeleteAvatar)}
                  className="h-9 w-9 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm cursor-pointer select-none flex items-center justify-center"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66602 7.33203V11.332"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.33398 7.33203V11.332"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.6673 4V13.3333C12.6673 13.687 12.5268 14.0261 12.2768 14.2761C12.0267 14.5262 11.6876 14.6667 11.334 14.6667H4.66732C4.3137 14.6667 3.97456 14.5262 3.72451 14.2761C3.47446 14.0261 3.33398 13.687 3.33398 13.3333V4"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 4H14"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.33398 3.9987V2.66536C5.33398 2.31174 5.47446 1.9726 5.72451 1.72256C5.97456 1.47251 6.3137 1.33203 6.66732 1.33203H9.33398C9.68761 1.33203 10.0267 1.47251 10.2768 1.72256C10.5268 1.9726 10.6673 2.31174 10.6673 2.66536V3.9987"
                      stroke="#1A1A1A"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel text="Full name" required />
            <TextInput
              value={fullName}
              onChange={setFullName}
              ariaLabel="Full name"
              placeholder="Cardi B"
            />
          </div>

          <div className="space-y-2">
            <FieldLabel text="Title / Role" required />
            <TextInput
              value={titleRole}
              onChange={setTitleRole}
              ariaLabel="Title or role"
              placeholder="Hiring Manager"
            />
            <div className="text-xs text-gray-500">
              14/60 characters (static)
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel text="Location" required />
            <TextInput
              value={location}
              onChange={setLocation}
              ariaLabel="Location"
              placeholder="San Francisco, CA"
            />
            <div className="text-xs text-gray-500">Timezone: PST (GMT-8)</div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-sm font-medium text-gray-700">
                Allow messages
              </div>
              <div className="text-xs text-gray-500">
                Talent can message you directly
              </div>
            </div>
            <Toggle
              checked={allowMessages}
              onChange={setAllowMessages}
              ariaLabel="Allow messages"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
