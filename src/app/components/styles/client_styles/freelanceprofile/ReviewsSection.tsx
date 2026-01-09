// src/components/clientprofile/ReviewsSection.tsx
import React from "react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Bai Jingting",
      avatar: "",
      rating: 5,
      timeAgo: "2 weeks ago",
      comment:
        "Outstanding work quality and communication. Sarah delivered exactly what we needed and more! She went above and beyond to ensure our platform was scalable and maintainable.",
      project: "E-commerce Platform Development",
      type: "Fixed",
    },
    {
      name: "Emma L.",
      avatar: "",
      rating: 5,
      timeAgo: "1 month ago",
      comment:
        "Professional, fast, and creative. The design exceeded our expectations. Sarah has a great eye for detail and understood our brand perfectly.",
      project: "Mobile App UI/UX Design",
      type: "Hourly",
      wouldHireAgain: true,
    },
    {
      name: "Ariana Grade",
      avatar: "",
      rating: 4,
      timeAgo: "2 months ago",
      comment:
        "Great technical skills and problem-solving abilities. Communication could have been more frequent, but the end result was solid.",
      project: "Backend API Development",
      type: "Fixed",
      wouldHireAgain: true,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Rating Summary */}
      <div className="flex items-start gap-10">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">4.9</div>
          <div className="flex text-yellow-500 text-2xl mt-1">★★★★★</div>
          <p className="text-sm text-gray-600 mt-1">127 reviews</p>
        </div>

        <div className="flex-1 space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-4 text-sm">
              <span className="w-8 text-right">{stars}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{
                    width:
                      stars === 5
                        ? "88%"
                        : stars === 4
                        ? "10%"
                        : stars === 3
                        ? "1.5%"
                        : stars === 2
                        ? "0.5%"
                        : "0%",
                  }}
                />
              </div>
              <span className="w-12 text-gray-500 text-right">
                {stars === 5 ? "110" : stars === 4 ? "13" : "4"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-8">
        {reviews.map((review, i) => (
          <div key={i} className="border-b border-gray-200 pb-8 last:border-0 last:pb-0">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-gray-600">
                {review.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex text-yellow-500">★★★★★</div>
                  <span className="text-sm text-gray-500">{review.timeAgo}</span>
                </div>

                <p className="mt-3 text-gray-700 leading-relaxed">{review.comment}</p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="px-4 py-1.5 bg-gray-100 rounded-full">
                    {review.project}
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 rounded-full text-gray-600">
                    {review.type}
                  </span>
                  {review.wouldHireAgain && (
                    <span className="flex items-center gap-1.5 text-green-600 font-medium">
                      Would hire again
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}