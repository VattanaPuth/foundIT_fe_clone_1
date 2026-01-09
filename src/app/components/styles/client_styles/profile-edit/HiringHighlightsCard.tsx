"use client";

import React from "react";
import {
  Dropdown,
  DropdownOption,
  FieldLabel,
  Pill,
  TextInput,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/profile-edit/FormControls";

function addToList(list: string[], value: string, max: number) {
  const trimmed = value.trim();
  if (!trimmed) return list;
  if (list.includes(trimmed)) return list;
  if (list.length >= max) return list;
  return [...list, trimmed];
}

export default function HiringHighlightsCard({
  sectionRef,
  hireCategories,
  setHireCategories,
  newCategoryText,
  setNewCategoryText,

  openDropdownId,
  setOpenDropdownId,

  fixedProjectMedian,
  setFixedProjectMedian,
  fixedProjectOptions,
  fixedProjectCustom,
  setFixedProjectCustom,

  hourlyMedian,
  setHourlyMedian,
  hourlyOptions,
  hourlyCustom,
  setHourlyCustom,

  contractLength,
  setContractLength,
  contractLengthOptions,
  contractCustom,
  setContractCustom,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;

  hireCategories: string[];
  setHireCategories: (arr: string[]) => void;
  newCategoryText: string;
  setNewCategoryText: (v: string) => void;

  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;

  fixedProjectMedian: DropdownOption;
  setFixedProjectMedian: (v: DropdownOption) => void;
  fixedProjectOptions: DropdownOption[];
  fixedProjectCustom: string;
  setFixedProjectCustom: (v: string) => void;

  hourlyMedian: DropdownOption;
  setHourlyMedian: (v: DropdownOption) => void;
  hourlyOptions: DropdownOption[];
  hourlyCustom: string;
  setHourlyCustom: (v: string) => void;

  contractLength: DropdownOption;
  setContractLength: (v: DropdownOption) => void;
  contractLengthOptions: DropdownOption[];
  contractCustom: string;
  setContractCustom: (v: string) => void;
}) {
  function toggleDropdown(id: string) {
    setOpenDropdownId(openDropdownId === id ? null : id);
  }

  return (
    <section ref={sectionRef} className="scroll-mt-24">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="font-semibold text-gray-900">Hiring highlights</div>

        <div className="mt-4 space-y-5">
          {/* Categories */}
          <div className="space-y-2">
            <FieldLabel text="Categories you hire most (max 5)" />
            <div className="flex flex-wrap gap-2">
              {hireCategories.map((c) => (
                <Pill
                  key={c}
                  text={c}
                  onRemove={() => setHireCategories(hireCategories.filter((x) => x !== c))}
                />
              ))}
            </div>

            {hireCategories.length < 5 ? (
              <div className="flex items-center gap-2 pt-2">
                <input
                  value={newCategoryText}
                  onChange={(e) => setNewCategoryText(e.target.value)}
                  aria-label="Add category"
                  placeholder="Add category..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400"
                />
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Add category button"
                  onClick={() => {
                    setHireCategories(addToList(hireCategories, newCategoryText, 5));
                    setNewCategoryText("");
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => {
                      setHireCategories(addToList(hireCategories, newCategoryText, 5));
                      setNewCategoryText("");
                    })
                  }
                  className="h-9 px-3 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-sm cursor-pointer select-none flex items-center gap-2"
                >
                  + <span>Add</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Fixed project median */}
          <div className="space-y-3">
            <Dropdown
              id="fixedProjectMedian"
              label="Fixed project median (bucketed)"
              value={fixedProjectMedian}
              options={fixedProjectOptions}
              isOpen={openDropdownId === "fixedProjectMedian"}
              onToggle={toggleDropdown}
              onSelect={(opt) => {
                setFixedProjectMedian(opt);
                setOpenDropdownId(null);
              }}
            />
            {fixedProjectMedian.value === "custom" ? (
              <TextInput
                value={fixedProjectCustom}
                onChange={setFixedProjectCustom}
                ariaLabel="Fixed project custom"
                placeholder="Type custom range (e.g. $1k–$3k)"
              />
            ) : null}
          </div>

          {/* Hourly median */}
          <div className="space-y-3">
            <Dropdown
              id="hourlyMedian"
              label="Hourly median (bucketed)"
              value={hourlyMedian}
              options={hourlyOptions}
              isOpen={openDropdownId === "hourlyMedian"}
              onToggle={toggleDropdown}
              onSelect={(opt) => {
                setHourlyMedian(opt);
                setOpenDropdownId(null);
              }}
            />
            {hourlyMedian.value === "custom" ? (
              <TextInput
                value={hourlyCustom}
                onChange={setHourlyCustom}
                ariaLabel="Hourly custom"
                placeholder="Type custom rate (e.g. $75/hr)"
              />
            ) : null}
          </div>

          {/* Contract length */}
          <div className="space-y-3">
            <Dropdown
              id="contractLength"
              label="Average contract length"
              value={contractLength}
              options={contractLengthOptions}
              isOpen={openDropdownId === "contractLength"}
              onToggle={toggleDropdown}
              onSelect={(opt) => {
                setContractLength(opt);
                setOpenDropdownId(null);
              }}
            />
            {contractLength.value === "custom" ? (
              <TextInput
                value={contractCustom}
                onChange={setContractCustom}
                ariaLabel="Contract custom"
                placeholder="Type custom length (e.g. 2 weeks)"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
