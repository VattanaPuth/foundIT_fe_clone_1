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

  const [categories, setCategories] = useState<string[]>([
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
  ]);

  const [types, setTypes] = useState<string[]>([
    "Logo Design",
    "Brand Identity",
    "Illustration",
    "Print Design",
    "Packaging",
    "3D Design",
  ]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedType, setSelectedType] = useState(types[0]);

  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [newTypeInput, setNewTypeInput] = useState("");

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reference files state (PDF/Images/ZIP, up to 10)
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const MAX_REFERENCE_FILES = 10;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

  // Handle adding custom category
  const handleAddCategory = () => {
    if (
      newCategoryInput.trim() &&
      !categories.includes(newCategoryInput.trim())
    ) {
      const newCategory = newCategoryInput.trim();
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategoryInput("");
      setShowCategoryInput(false);
    }
  };

  // Handle adding custom type
  const handleAddType = () => {
    if (newTypeInput.trim() && !types.includes(newTypeInput.trim())) {
      const newType = newTypeInput.trim();
      setTypes([...types, newType]);
      setSelectedType(newType);
      setNewTypeInput("");
      setShowTypeInput(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  // Handle reference files selection
  const handleReferenceFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    // Check total number of files
    if (referenceFiles.length + files.length > MAX_REFERENCE_FILES) {
      alert(`You can only upload up to ${MAX_REFERENCE_FILES} reference files`);
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    for (const file of files) {
      // Validate file type (PDF, Images, ZIP)
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "application/zip",
        "application/x-zip-compressed",
      ];

      if (!validTypes.includes(file.type)) {
        alert(`${file.name}: Please select PDF, Image, or ZIP files only`);
        continue;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name}: File size must be less than 10MB`);
        continue;
      }

      validFiles.push(file);
    }

    setReferenceFiles([...referenceFiles, ...validFiles]);
    // Clear input to allow selecting the same file again
    e.target.value = "";
  };

  // Remove a reference file
  const handleRemoveReferenceFile = (index: number) => {
    setReferenceFiles(referenceFiles.filter((_, i) => i !== index));
  };

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return "🖼️";
    if (fileType === "application/pdf") return "📄";
    if (fileType.includes("zip")) return "📦";
    return "📎";
  };

  const handlePostJob = async () => {
    // Validation
    if (!outcome.trim()) {
      alert("Please describe the outcome");
      return;
    }
    if (!budgetMin || !budgetMax) {
      alert("Please set budget range");
      return;
    }
    if (!description.trim()) {
      alert("Please add a description");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        router.push("/page/sign_in");
        return;
      }

      // Calculate delivery time
      let deliveryTime = deliveryKey;
      if (deliveryKey === "custom" && customDays) {
        deliveryTime = `${customDays} days`;
      }

      // Convert file to base64 if present
      let imageType = null;
      let imageData = null;

      if (selectedFile) {
        imageType = selectedFile.type;
        const reader = new FileReader();

        imageData = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            const base64 = reader.result as string;
            // Remove the data:image/...;base64, prefix
            const base64Data = base64.split(",")[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
      }

      // Convert reference files to base64
      let referenceFilesData = null;
      if (referenceFiles.length > 0) {
        const filesArray = await Promise.all(
          referenceFiles.map(async (file) => {
            const base64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const result = reader.result as string;
                const base64Data = result.split(",")[1];
                resolve(base64Data);
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });

            return {
              name: file.name,
              type: file.type,
              size: file.size,
              data: base64,
            };
          })
        );
        referenceFilesData = JSON.stringify(filesArray);
      }

      const gigDTO = {
        title: outcome,
        description: description,
        category: selectedCategory,
        type: selectedType,
        payMode: payMode,
        budgetMin: parseFloat(budgetMin),
        budgetMax: parseFloat(budgetMax),
        deliveryTime: deliveryTime,
        imageType: imageType,
        imageData: imageData,
        referenceFiles: referenceFilesData,
      };

      const response = await fetch("http://localhost:8085/gigs/client/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(gigDTO),
      });

      if (response.ok) {
        alert("Job posted successfully!");
        router.push("/page/client/editpf");
      } else {
        const error = await response.text();
        alert(`Failed to post job: ${error}`);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ClientNavHeader />
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
            <p className="text-sm text-gray-500 mt-1">
              Most jobs go live in ~60 seconds
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <CategoryTypeSection
              categories={categories}
              types={types}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              onSelectCategory={setSelectedCategory}
              onSelectType={setSelectedType}
              showCategoryInput={showCategoryInput}
              setShowCategoryInput={setShowCategoryInput}
              newCategoryInput={newCategoryInput}
              setNewCategoryInput={setNewCategoryInput}
              onAddCategory={handleAddCategory}
              showTypeInput={showTypeInput}
              setShowTypeInput={setShowTypeInput}
              newTypeInput={newTypeInput}
              setNewTypeInput={setNewTypeInput}
              onAddType={handleAddType}
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
              referenceFiles={referenceFiles}
              onReferenceFilesChange={handleReferenceFilesChange}
              onRemoveReferenceFile={handleRemoveReferenceFile}
              maxReferenceFiles={MAX_REFERENCE_FILES}
              getFileIcon={getFileIcon}
            />

            {/* File Upload Section */}
            <div className="mb-5">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Upload Image (Optional)
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Add an image to help illustrate your project (Max 5MB)
              </div>

              {!imagePreview ? (
                <label className="block w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 hover:text-green-600">
                    <svg
                      className="w-12 h-12 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm font-medium">Click to upload image</p>
                    <p className="text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg"
                    title="Remove image"
                  >
                    ✕
                  </button>
                  <div className="mt-2 text-xs text-gray-600">
                    {selectedFile?.name} (
                    {(selectedFile!.size / 1024).toFixed(1)} KB)
                  </div>
                </div>
              )}
            </div>

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
                onClick={handlePostJob}
                onKeyDown={(e) => handleKeyboardActivate(e, handlePostJob)}
                className={[
                  "h-10 px-5 rounded-md text-white text-sm inline-flex items-center justify-center cursor-pointer select-none",
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600",
                ].join(" ")}
              >
                {isSubmitting ? "Posting..." : "Post job"}
              </div>
            </div>
          </div>

          <div className="h-10" />
        </div>
      </main>
      <ClientFooter />
    </>
  );
}
