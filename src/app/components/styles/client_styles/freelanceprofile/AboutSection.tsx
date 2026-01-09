// src/components/clientprofile/AboutSection.tsx
import React from "react";

export default function AboutSection() {
  return (
    <div className="space-y-10 text-gray-700">
      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
        <p className="leading-relaxed text-lg">
          Experienced full-stack developer with 8+ years of experience building scalable web applications. 
          Specialized in React, Node.js, and modern UI/UX design principles.
        </p>
      </section>

      {/* Experience Highlights */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Experience Highlights</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>8+ years in full-stack web development</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>Specialized in SaaS and B2B platforms</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>Strong focus on accessibility and performance</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>Led teams of 3–5 developers on enterprise projects</span>
          </li>
        </ul>
      </section>

      {/* Services I Offer */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services I Offer</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>Custom web application development</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>UI/UX design and prototyping</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>API development and integration</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>Performance optimization and scaling</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1.5">•</span>
            <span>Technical consulting and architecture</span>
          </li>
        </ul>
      </section>

      {/* Industries */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Industries</h2>
        <div className="flex flex-wrap gap-3">
          {["Fintech", "Healthcare", "Education", "E-commerce", "SaaS"].map((industry) => (
            <span
              key={industry}
              className="px-5 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      {/* Employment History */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Employment History</h2>
        <div className="space-y-8">
          {/* Job 1 */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <h3 className="text-xl font-semibold text-gray-900">Senior Full-Stack Developer</h3>
              <span className="text-gray-500">2020 – Present</span>
            </div>
            <p className="text-lg font-medium text-gray-800 mt-1">Tech Innovations Inc.</p>
            <p className="mt-2 leading-relaxed">
              Led development of customer-facing SaaS platform serving 10K+ users
            </p>
          </div>

          {/* Job 2 */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <h3 className="text-xl font-semibold text-gray-900">Full-Stack Developer</h3>
              <span className="text-gray-500">2017 – 2020</span>
            </div>
            <p className="text-lg font-medium text-gray-800 mt-1">Digital Solutions Co.</p>
            <p className="mt-2 leading-relaxed">
              Built and maintained e-commerce platforms for Fortune 500 clients
            </p>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Languages</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg">English</span>
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium">Native</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Spanish</span>
            <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
              Conversational
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}