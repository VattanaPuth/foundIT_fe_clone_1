"use client";

import React from "react";
import {
  FieldLabel,
  Pill,
  TextArea,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/profile-edit/FormControls";

function toggleInList(list: string[], value: string) {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

function addToList(list: string[], value: string, max: number) {
  const trimmed = value.trim();
  if (!trimmed) return list;
  if (list.includes(trimmed)) return list;
  if (list.length >= max) return list;
  return [...list, trimmed];
}

export default function AboutCard({
  sectionRef,
  shortBio,
  setShortBio,
  valuesWhenHiring,
  setValuesWhenHiring,
  newValueText,
  setNewValueText,
  industries,
  setIndustries,
  newIndustryText,
  setNewIndustryText,
  allWorkStyles,
  preferredWorkStyles,
  setPreferredWorkStyles,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  shortBio: string;
  setShortBio: (v: string) => void;

  valuesWhenHiring: string[];
  setValuesWhenHiring: (arr: string[]) => void;
  newValueText: string;
  setNewValueText: (v: string) => void;

  industries: string[];
  setIndustries: (arr: string[]) => void;
  newIndustryText: string;
  setNewIndustryText: (v: string) => void;

  allWorkStyles: string[];
  preferredWorkStyles: string[];
  setPreferredWorkStyles: (arr: string[]) => void;
}) {
  return (
    <section ref={sectionRef} className="scroll-mt-24">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="font-semibold text-gray-900">About me</div>

        <div className="mt-4 space-y-5">
          <div className="space-y-2">
            <FieldLabel text="Short bio" />
            <TextArea
              value={shortBio}
              onChange={setShortBio}
              ariaLabel="Short bio"
              placeholder="Briefly explain what you hire for and what 'great' looks like on your team."
              rows={4}
            />
            <div className="text-xs text-gray-500">
              209 characters (recommended: 300–600) (static)
            </div>
          </div>

          {/* Values when hiring */}
          <div className="space-y-2">
            <FieldLabel text="What I value when hiring" />
            <div className="text-xs text-gray-500">
              Short, concrete statements (max 80 chars each)
            </div>

            <div className="space-y-2">
              {valuesWhenHiring.map((v) => (
                <div
                  key={v}
                  className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                >
                  <div className="text-sm text-gray-700">{v}</div>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${v}`}
                    onClick={() =>
                      setValuesWhenHiring(valuesWhenHiring.filter((x) => x !== v))
                    }
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () =>
                        setValuesWhenHiring(valuesWhenHiring.filter((x) => x !== v))
                      )
                    }
                    className="text-gray-400 hover:text-gray-700 cursor-pointer select-none"
                  >
                    ×
                  </div>
                </div>
              ))}
            </div>

            {valuesWhenHiring.length < 6 ? (
              <div className="flex items-center gap-2 pt-2">
                <input
                  value={newValueText}
                  onChange={(e) => setNewValueText(e.target.value)}
                  aria-label="Add value"
                  placeholder="Add a value..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400"
                />
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Add value button"
                  onClick={() => {
                    setValuesWhenHiring(addToList(valuesWhenHiring, newValueText, 6));
                    setNewValueText("");
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => {
                      setValuesWhenHiring(addToList(valuesWhenHiring, newValueText, 6));
                      setNewValueText("");
                    })
                  }
                  className="h-9 px-3 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-sm cursor-pointer select-none flex items-center gap-2"
                >
                  + <span>Add value</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Industries */}
          <div className="space-y-2">
            <FieldLabel text="Industries of interest (max 6)" />
            <div className="flex flex-wrap gap-2">
              {industries.map((x) => (
                <Pill
                  key={x}
                  text={x}
                  onRemove={() => setIndustries(industries.filter((i) => i !== x))}
                />
              ))}

              {industries.length < 6 ? (
                <div className="inline-flex items-center gap-2">
                  <input
                    value={newIndustryText}
                    onChange={(e) => setNewIndustryText(e.target.value)}
                    aria-label="Add industry"
                    placeholder="Add..."
                    className="w-28 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400"
                  />
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Add industry button"
                    onClick={() => {
                      setIndustries(addToList(industries, newIndustryText, 6));
                      setNewIndustryText("");
                    }}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => {
                        setIndustries(addToList(industries, newIndustryText, 6));
                        setNewIndustryText("");
                      })
                    }
                    className="h-7 px-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs cursor-pointer select-none flex items-center"
                  >
                    +
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Work styles */}
          <div className="space-y-2">
            <FieldLabel text="Preferred work styles" />
            <div className="flex flex-wrap gap-2">
              {allWorkStyles.map((w) => {
                const active = preferredWorkStyles.includes(w);
                return (
                  <div
                    key={w}
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle ${w}`}
                    onClick={() => setPreferredWorkStyles(toggleInList(preferredWorkStyles, w))}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () =>
                        setPreferredWorkStyles(toggleInList(preferredWorkStyles, w))
                      )
                    }
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs border cursor-pointer select-none",
                      active
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 ",
                    ].join(" ")}
                  >
                    {w}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
