import React from "react";

const featured = [
  { title: "E-commerce Platform Redesign", img: "/work1.png", tags: ["React", "UI/UX", "Figma"] },
  { title: "Mobile Banking App", img: "/work2.png", tags: ["React Native", "TypeScript"] },
];

const allWork = [
  "E-commerce", "Mobile Banking App", "SaaS Dashboard Analytics",
  "Healthcare Portal", "Real Estate Marketplace", "Educational Platform"
];

export default function WorkSection() {
  return (
    <>
      

      {/* Featured */}
      <h2 className="mt-8 text-xl font-semibold">Featured Work</h2>
      {featured.map((work) => (
        <div key={work.title} className="mt-4 border rounded-xl overflow-hidden">
          <img src={work.img} alt={work.title} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h3 className="font-medium">{work.title}</h3>
            <div className="flex gap-2 mt-2 flex-wrap">
              {work.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button className="mt-4 text-sm text-green-600 font-medium">See all portfolio</button>

      {/* All Work Grid */}
      <h2 className="mt-10 text-xl font-semibold">All Work</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {allWork.map((title) => (
          <div key={title} className="border rounded-xl overflow-hidden">
            <div className="h-32 bg-gray-200" />
            <div className="p-3">
              <p className="text-sm font-medium">{title}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-gray-100 rounded text-xs">React</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}