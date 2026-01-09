export default function ReviewsSection() {
  return (
    <>
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="border rounded-xl p-6 grid grid-cols-12 gap-6">
          <div className="col-span-4 text-center">
            <p className="text-4xl font-semibold">4.8</p>
            <div className="my-2">★★★★★</div>
            <p className="text-sm text-gray-500">89 reviews</p>
          </div>
          <div className="col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-10">{star} ★</span>
                <div className="flex-1 h-2 bg-green-100 rounded">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: [80, 20, 5, 2, 0][i] + '%' }}
                  />
                </div>
                <span className="w-6 text-gray-500">{[72, 12, 4, 1, 0][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="px-4 py-2 border rounded-lg text-sm">All review</button>

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
            and fast payment. Jessica provided detailed feedback throughout the project.
          </p>

          <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm">
            <p className="font-semibold">Cardi B</p>
            <p className="text-gray-600">
              Thank you Sarah! Your work was exceptional and we look forward to working together again soon.
            </p>
          </div>
        </div>
      </div>

      <aside className="col-span-12 lg:col-span-4">
        <div className="border rounded-xl p-5 space-y-4">
          <h4 className="font-semibold mb-3">Policies</h4>

          <div className="text-sm ">
            <p className="text-gray-500 mb-1">Communication</p>
            <p className="font-medium ">2-3x weekly</p>
          </div>
<hr />
          <div className=" pt-1 text-sm">
            <p className="text-gray-500 mb-1">Payment</p>
            <p className="font-medium">Escrow by milestone</p>
          </div>
        </div>
      </aside>
    </>
  );
}
