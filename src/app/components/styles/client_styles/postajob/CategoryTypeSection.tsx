"use client";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function CategoryTypeSection({
  categories,
  types,
  selectedCategory,
  selectedType,
  onSelectCategory,
  onSelectType,
  showCategoryInput,
  setShowCategoryInput,
  newCategoryInput,
  setNewCategoryInput,
  onAddCategory,
  showTypeInput,
  setShowTypeInput,
  newTypeInput,
  setNewTypeInput,
  onAddType,
}: {
  categories: string[];
  types: string[];
  selectedCategory: string;
  selectedType: string;
  onSelectCategory: (val: string) => void;
  onSelectType: (val: string) => void;
  showCategoryInput?: boolean;
  setShowCategoryInput?: (val: boolean) => void;
  newCategoryInput?: string;
  setNewCategoryInput?: (val: string) => void;
  onAddCategory?: () => void;
  showTypeInput?: boolean;
  setShowTypeInput?: (val: boolean) => void;
  newTypeInput?: string;
  setNewTypeInput?: (val: string) => void;
  onAddType?: () => void;
}) {
  return (
    <>
      {/* Pick what this is about */}
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-900 mb-2">
          Pick what this is about
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categories.map((c) => {
            const active = c === selectedCategory;
            return (
              <div
                key={c}
                role="button"
                tabIndex={0}
                onClick={() => onSelectCategory(c)}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => onSelectCategory(c))
                }
                className={[
                  "h-10 rounded-md border px-3 text-sm flex items-center",
                  "cursor-pointer select-none",
                  active
                    ? "border-green-400 bg-green-50 text-gray-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
                ].join(" ")}
              >
                {c}
              </div>
            );
          })}

          {/* Add custom category button */}
          {setShowCategoryInput && !showCategoryInput && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowCategoryInput(true)}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => setShowCategoryInput(true))
              }
              className="h-10 rounded-md border-2 border-dashed border-gray-300 px-3 text-sm flex items-center justify-center cursor-pointer select-none text-gray-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50"
            >
              + Add Custom Category
            </div>
          )}
        </div>

        {/* Custom category input */}
        {showCategoryInput && setNewCategoryInput && onAddCategory && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddCategory();
                } else if (e.key === "Escape") {
                  setShowCategoryInput?.(false);
                  setNewCategoryInput?.("");
                }
              }}
              placeholder="Enter custom category..."
              className="flex-1 h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
              autoFocus
            />
            <button
              onClick={onAddCategory}
              className="h-10 px-4 rounded-md bg-green-500 text-white text-sm hover:bg-green-600"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowCategoryInput?.(false);
                setNewCategoryInput?.("");
              }}
              className="h-10 px-4 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Select specific type */}
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-900 mb-2">
          Select specific type:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {types.map((t) => {
            const active = t === selectedType;
            return (
              <div
                key={t}
                role="button"
                tabIndex={0}
                onClick={() => onSelectType(t)}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => onSelectType(t))
                }
                className={[
                  "h-10 rounded-md border px-3 text-sm flex items-center justify-center",
                  "cursor-pointer select-none",
                  active
                    ? "border-green-400 bg-green-50 text-gray-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
                ].join(" ")}
              >
                {t}
              </div>
            );
          })}

          {/* Add custom type button */}
          {setShowTypeInput && !showTypeInput && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowTypeInput(true)}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => setShowTypeInput(true))
              }
              className="h-10 rounded-md border-2 border-dashed border-gray-300 px-3 text-sm flex items-center justify-center cursor-pointer select-none text-gray-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50"
            >
              + Add Custom Type
            </div>
          )}
        </div>

        {/* Custom type input */}
        {showTypeInput && setNewTypeInput && onAddType && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newTypeInput}
              onChange={(e) => setNewTypeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddType();
                } else if (e.key === "Escape") {
                  setShowTypeInput?.(false);
                  setNewTypeInput?.("");
                }
              }}
              placeholder="Enter custom type..."
              className="flex-1 h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
              autoFocus
            />
            <button
              onClick={onAddType}
              className="h-10 px-4 rounded-md bg-green-500 text-white text-sm hover:bg-green-600"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowTypeInput?.(false);
                setNewTypeInput?.("");
              }}
              className="h-10 px-4 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
