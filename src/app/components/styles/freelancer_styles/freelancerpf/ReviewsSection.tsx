interface ReviewsSectionProps {
  gigData: {
    rating?: number;
    reviewCount?: number;
  };
}

export default function ReviewsSection({ gigData }: ReviewsSectionProps) {
  return (
    <>
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="border rounded-xl p-6 grid grid-cols-12 gap-6">
          <div className="col-span-4 text-center">
            <p className="text-4xl font-semibold">
              {gigData?.rating?.toFixed(1) || "N/A"}
            </p>
            <div className="my-2">★★★★★</div>
            <p className="text-sm text-gray-500">
              {gigData?.reviewCount || 0} reviews
            </p>
          </div>
          <div className="col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-10">{star} ★</span>
                <div className="flex-1 h-2 bg-purple-100 rounded">
                  <div
                    className="h-2 bg-purple-500 rounded"
                    style={{ width: [80, 20, 5, 2, 0][i] + "%" }}
                  />
                </div>
                <span className="w-6 text-gray-500">
                  {[72, 12, 4, 1, 0][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="px-4 py-2 border rounded-lg text-sm">
          All review
        </button>

        <div className="border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <img src="/avatar.png" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">G Devith · Design Lead</p>
              <p className="text-sm text-gray-500">★★★★★ · 2 weeks ago</p>
            </div>
          </div>

          <p className="text-gray-700">
            Excellent client! Very clear requirements, responsive communication,
            and fast payment. Jessica provided detailed feedback throughout the
            project.
          </p>

          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-sm">
            <p className="font-semibold">Cardi B</p>
            <p className="text-gray-600">
              Thank you Sarah! Your work was exceptional and we look forward to
              working together again soon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
