import { CheckCircle } from 'lucide-react';

export default function OverviewSection() {
  return (
    <>
      {/* LEFT */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* About me */}
        <section>
          <h4 className="text-lg font-semibold mb-2">About me</h4>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            I am passionate about building products that make a real difference.
            At TechFlow, I lead hiring for our design and engineering teams, and I
            believe great work starts with clear communication and mutual respect.
          </p>
        </section>

        {/* Values */}
        <section>
          <h4 className="font-semibold mb-3">What I value when hiring</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Clear async updates
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Pixel-accurate UI work
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Reliable time estimates
            </li>
          </ul>
        </section>

        {/* Skills */}
        <section>
          <h4 className="font-semibold mb-3">Frequently requested skills</h4>
          <div className="flex flex-wrap gap-2">
            {[
              'React',
              'TypeScript',
              'Figma',
              'Node.js',
              'UI/UX Design',
              'Mobile Development',
              'Video Editing',
              'AWS',
              'PostgreSQL',
              'Brand Design',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT */}
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
