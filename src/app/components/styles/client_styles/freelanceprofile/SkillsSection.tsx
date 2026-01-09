import React from "react";

const skills = ["React", "Node.js", "UI/UX", "TypeScript", "Figma", "PostgreSQL", "AWS"];

export default function SkillsSection() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3">Skills & Tools</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}