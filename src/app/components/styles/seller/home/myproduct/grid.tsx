"use client";

import React from "react";
import type { ProductItem } from "@/app/components/styles/seller/home/myproduct/mock";
import Card from "@/app/components/styles/seller/home/myproduct/card";

export default function Grid({ items }: { items: ProductItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((it) => (
        <Card key={it.id} item={it} />
      ))}
    </div>
  );
}
