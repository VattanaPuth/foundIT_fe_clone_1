import React from "react";

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <img src="/pfp.png" alt="Bai Lu" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Bai Lu</h1>
        <p className="text-gray-600">Full-Stack Developer & UI Designer</p>
        <div className="flex items-center gap-2 text-sm mt-1">
          4.9 (127) · $55/hr · San Francisco, CA ·{" "}
          <span className="text-gray-500">Last active 2h ago</span>
        </div>
      </div>
    </div>
  );
}