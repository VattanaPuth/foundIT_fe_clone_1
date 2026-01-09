"use client";

import React from "react";

import Stat from "@/app/components/styles/seller/home/myproduct/stat";
import Filter from "@/app/components/styles/seller/home/myproduct/filter";
import Grid from "@/app/components/styles/seller/home/myproduct/grid";

import { statsMock, productMock } from "@/app/components/styles/seller/home/myproduct/mock";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* header/footer removed as requested */}

      <main className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6">
        {/* title */}
        <section>
          <div className="text-2xl font-semibold">My Products</div>
          <div className="mt-1 text-sm text-gray-500">
            Manage and track your product portfolio
          </div>
        </section>

        {/* stat */}
        <section className="mt-5">
          <Stat items={statsMock} />
        </section>

        {/* filter */}
        <section className="mt-4">
          <Filter />
        </section>

        {/* grid */}
        <section className="mt-5">
          <Grid items={productMock} />
        </section>
      </main>
    </div>
  );
}
