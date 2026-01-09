"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CategoryTypeSection from "@/app/components/styles/client_styles/postajob/CategoryTypeSection";
import PayAndBudgetSection from "@/app/components/styles/client_styles/postajob/PayAndBudgetSection";
import DeliveryAndDescriptionSection from "@/app/components/styles/client_styles/postajob/DeliveryAndDescriptionSection";
import MoreOptionsAccordion from "@/app/components/styles/client_styles/postajob/MoreOptionsAccordion";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

type SelectMode = "fixed" | "hourly";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function PostJobPage() {
  const router = useRouter();

  const categories = useMemo(
    () => [
      "Design & Branding",
      "Web Development",
      "Mobile Apps",
      "UI/UX & Product",
      "Video & Animation",
      "Content & Copywriting",
      "Digital Marketing",
      "Data & Analytics",
      "AI & Machine Learning",
      "Audio & Voice",
      "Translation & Localization",
    ],
    []
  );

  const types = useMemo(
    () => ["Logo Design", "Brand Identity", "Illustration", "Print Design", "Packaging", "3D Design"],
    []
  );

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedType, setSelectedType] = useState(types[0]);

  const [outcome, setOutcome] = useState("");
  const outcomeMax = 80;

  const [payMode, setPayMode] = useState<SelectMode>("fixed");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");

  const [deliveryKey, setDeliveryKey] = useState("24h");
  const [customDays, setCustomDays] = useState("");

  const [description, setDescription] = useState("");

  const [moreOpen, setMoreOpen] = useState(false);

  const [skills, setSkills] = useState<string[]>([
    "Adobe Illustrator",
    "Brand Identity",
    "Typography",
    "Color Theory",
    "Vector Graphics",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [deliverableInput, setDeliverableInput] = useState("");

  const [ndaRequired, setNdaRequired] = useState(true);

  return (
    <>
    <ClientNavHeader/>
    <main className="bg-gray-50 min-h-screen px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* Cancel */}
        <div className="mb-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              console.log("Cancel clicked (placeholder)");
              void router;
            }}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () => {
                console.log("Cancel clicked (placeholder)");
                void router;
              })
            }
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
          >
            <span className="text-base">←</span>
            Cancel
          </div>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-gray-900">Post a job</h1>
          <p className="text-sm text-gray-500 mt-1">Most jobs go live in ~60 seconds</p>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <CategoryTypeSection
            categories={categories}
            types={types}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onSelectCategory={setSelectedCategory}
            onSelectType={setSelectedType}
          />

          {/* Outcome */}
          <div className="mb-5">
            <div className="text-sm font-medium text-gray-900 mb-2">
              Describe the outcome:{" "}
              <span className="text-gray-500">
                ‘Logo set for coffee brand’
              </span>
            </div>
            <input
              aria-label="Outcome"
              value={outcome}
              onChange={(e) => {
                const v = e.target.value;
                if (v.length <= outcomeMax) setOutcome(v);
              }}
              placeholder="logo set..."
              className={[
                "w-full h-10 rounded-md border bg-gray-50 px-3 text-sm",
                "hover:border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
              ].join(" ")}
            />
            <div className="text-xs text-gray-400 mt-1">
              {outcome.length}/{outcomeMax} characters
            </div>
          </div>

          <PayAndBudgetSection
            payMode={payMode}
            setPayMode={setPayMode}
            budgetMin={budgetMin}
            setBudgetMin={setBudgetMin}
            budgetMax={budgetMax}
            setBudgetMax={setBudgetMax}
          />

          <DeliveryAndDescriptionSection
            deliveryKey={deliveryKey}
            setDeliveryKey={setDeliveryKey}
            customDays={customDays}
            setCustomDays={setCustomDays}
            description={description}
            setDescription={setDescription}
          />

          <MoreOptionsAccordion
            open={moreOpen}
            setOpen={setMoreOpen}
            skills={skills}
            setSkills={setSkills}
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            deliverables={deliverables}
            setDeliverables={setDeliverables}
            deliverableInput={deliverableInput}
            setDeliverableInput={setDeliverableInput}
            ndaRequired={ndaRequired}
            setNdaRequired={setNdaRequired}
          />

          {/* Post job */}
          <div className="mt-6 flex justify-end">
            <div
              role="button"
              tabIndex={0}
              onClick={() => console.log("Post job clicked (static)")}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => console.log("Post job clicked (static)"))
              }
              className="h-10 px-5 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm inline-flex items-center justify-center cursor-pointer select-none"
            >
              Post job
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </main>
    <ClientFooter/>
    </>
  );
}
