"use client";

import React from "react";
import { Globe, MapPin, Clock3, BadgeCheck, Link as LinkIcon } from "lucide-react";

function Chip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs text-orange-700">
      {text}
    </span>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700">
      {text}
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="px-5 py-4 ">
        <div className="text-md font-semibold text-gray-900">{title}</div>
      </div>
      <div className="p-5 pt-1">{children}</div>
    </div>
  );
}

export default function AboutTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-4">
        <Card title="About Mash Wiki">
          <div className="text-sm text-gray-600 leading-relaxed">
            We create beautiful, functional design products that help teams ship faster.
            Our UI kits are used by over 10,000 designers worldwide at companies like
            Stripe, Airbnb, and Notion.
          </div>
        </Card>

        <Card title="Specialties">
          <div className="flex flex-wrap gap-2">
            <Chip text="UI Kits" />
            <Chip text="Design Systems" />
            <Chip text="Figma Templates" />
          </div>
        </Card>

        <Card title="Software Expertise">
          <div className="flex flex-wrap gap-2">
            <Tag text="Figma" />
            <Tag text="Sketch" />
            <Tag text="Adobe XD" />
            <Tag text="Framer" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card title="Store Info">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              Austin, TX
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-gray-400" />
              Responds in 2 hours
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-gray-400" />
              30 days support
            </div>
          </div>
        </Card>

        <Card title="Links">
          <div className="space-y-2 text-sm">
            <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Globe className="w-4 h-4" />
              Website
            </a>
            <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <LinkIcon className="w-4 h-4" />
              Twitter
            </a>
            <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <LinkIcon className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
