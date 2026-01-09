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
}: {
  categories: string[];
  types: string[];
  selectedCategory: string;
  selectedType: string;
  onSelectCategory: (val: string) => void;
  onSelectType: (val: string) => void;
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
        </div>
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
                onKeyDown={(e) => handleKeyboardActivate(e, () => onSelectType(t))}
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
        </div>
      </div>
    </>
  );
}
