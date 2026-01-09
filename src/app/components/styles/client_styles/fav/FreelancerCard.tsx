"use client";

export type FreelancerItem = {
  id: string;
  name: string;
  role: string;
  rate: string;
  tags: string[];
};

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function HeartFilledRed() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className="text-red-500"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Avatar({ name }: { name: string }) {
  const initial = name.trim().slice(0, 1).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 text-gray-700 flex items-center justify-center">
      <span className="text-sm font-medium">{initial}</span>
    </div>
  );
}

export default function FreelancerCard({
  item,
  onViewProfile,
}: {
  item: FreelancerItem;
  onViewProfile: (id: string) => void;
}) {
  return (
    <div className="bg-white border rounded-lg px-3.5 py-4 shadow-sm hover:shadow-md transition flex flex-col ">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-x-4">
          {/* ✅ always round on all screen sizes */}
          <Avatar name={item.name} />

          <div>
            <div className="text-sm font-semibold text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-500 mt-0.5 ">{item.role}</div>
          </div>
        </div>

        {/* Static filled heart */}
        <div className="select-none">
          <HeartFilledRed />
        </div>
      </div>

      <div className="mt-3 text-sm font-medium text-gray-900">
        {item.rate}
        <span className="text-gray-500 font-normal">/hr</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
          >
            {t}
          </span>
        ))}
      </div>

      {/* ✅ pinned bottom */}
      <div className="mt-auto pt-4">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onViewProfile(item.id)}
          onKeyDown={(e) =>
            handleKeyboardActivate(e, () => onViewProfile(item.id))
          }
          className="h-9 w-full rounded-md border bg-white hover:bg-gray-50 text-sm text-gray-800 inline-flex items-center justify-center cursor-pointer select-none"
        >
          View Profile
        </div>
      </div>
    </div>
  );
}
