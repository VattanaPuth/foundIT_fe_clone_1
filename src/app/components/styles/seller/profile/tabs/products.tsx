"use client";

import React from "react";
import ProjectCard, { type ProjectItem } from "@/app/components/styles/fav/ProjectCard";

export default function ProductsTab() {
  const items: ProjectItem[] = [
    {
      id: "p1",
      title: "Modern Dashboard UI Kit",
      subtitle: "React • TypeScript • Tailwind CSS",
      seller: "Mash Wiki",
      priceFrom: "$49",
      rating: "4.9",
      reviews: "438",
      badges: ["Bestseller"],
      updated: "Updated 2 days ago",
      coverTone: "dark",
      imageSrc:"/images/p1.png"
    },
    {
      id: "p2",
      title: "SaaS Website Template Pack",
      subtitle: "Next.js • Marketing Site",
      seller: "Mash Wiki",
      priceFrom: "$79",
      rating: "4.8",
      reviews: "312",
      badges: ["Featured"],
      updated: "Updated 1 week ago",
      coverTone: "light",
      imageSrc:"/images/p2.png"
    },
    {
      id: "p3",
      title: "Mobile App Design System",
      subtitle: "Figma • Design Tokens",
      seller: "Mash Wiki",
      priceFrom: "$99",
      rating: "5",
      reviews: "201",
      badges: ["Trending"],
      updated: "Updated 3 days ago",
      coverTone: "orange",
      imageSrc:"/images/p3.png"
    },
    {
      id: "p4",
      title: "E-commerce Components Library",
      subtitle: "Components • UI Kit",
      seller: "Mash Wiki",
      priceFrom: "$69",
      rating: "4.7",
      reviews: "89",
      badges: ["New"],
      updated: "Updated 5 days ago",
      coverTone: "brown",
      imageSrc:"/images/p4.png"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p) => (
        <ProjectCard key={p.id} item={p} onOpen={() => {}} />
      ))}
    </div>
  );
}
