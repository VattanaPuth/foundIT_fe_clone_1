import { CheckCircle } from "lucide-react";

export default function OverviewSection({ gigData }) {
  return (
    <>
      {/* LEFT */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* About me */}
        <section>
          <h4 className="text-lg font-semibold mb-2">About me</h4>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            {gigData?.description ||
              gigData?.shortBio ||
              "No description available."}
          </p>
        </section>

        {/* Values */}
        <section>
          <h4 className="font-semibold mb-3">What I value when hiring</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              Clear async updates
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              Pixel-accurate UI work
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              Reliable time estimates
            </li>
          </ul>
        </section>

        {/* Skills */}
        <section>
          <h4 className="font-semibold mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {gigData?.skillName ? (
              <span className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700">
                {gigData.skillName}
              </span>
            ) : (
              <span className="text-gray-400">No skills listed</span>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
