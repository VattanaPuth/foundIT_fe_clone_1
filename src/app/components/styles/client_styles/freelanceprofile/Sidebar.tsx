import React from "react";

export default function Sidebar() {
  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="border rounded-xl p-5 text-sm">
        <div className="flex justify-between py-1"><span>Hourly rate</span><strong>$55/hr</strong></div>
        <div className="flex justify-between py-1"><span>Hours per week</span><span>20–30</span></div>
        <div className="flex justify-between py-1"><span>Response time</span><span>&lt; 1 hour</span></div>
        <div className="flex justify-between py-1"><span>Member since</span><span>2022</span></div>
        <div className="flex justify-between py-1"><span>Last active</span><span>2 hours ago</span></div>
      </div>

      {/* Performance */}
      <div className="border rounded-xl p-5 text-sm">
        <h3 className="font-semibold mb-3">Performance</h3>
        <div className="space-y-1">
          <div className="flex justify-between"><span>Jobs completed</span><span>156</span></div>
          <div className="flex justify-between"><span>On-time delivery</span><span>98%</span></div>
          <div className="flex justify-between"><span>Repeat clients</span><span>74%</span></div>
        </div>
      </div>

      {/* Availability */}
      <div className="border rounded-xl p-5 text-sm">
        <h3 className="font-semibold mb-2">Availability</h3>
        <div className="flex items-center gap-2 text-green-600 font-medium">
          ● Open to work
        </div>
        <div className="mt-2 text-gray-600">4:14 PM</div>
      </div>

      {/* Similar Talent */}
      <div className="border rounded-xl p-5 text-sm">
        <h3 className="font-semibold mb-4">Similar Talent</h3>
        {[
          { name: "Alex Chen", rate: "$48/hr", rating: "4.8" },
          { name: "Mia Wong", rate: "$52/hr", rating: "4.9" },
          { name: "James Lee", rate: "$50/hr", rating: "4.7" },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-3 py-3 border-b last:border-0">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-600">{p.rate} · {p.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}