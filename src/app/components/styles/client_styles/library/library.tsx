"use client";

import React, { useMemo, useState } from "react";
import LibraryHeader from "@/app/components/styles/client_styles/library/components/library_header";
import LibraryTabs from "@/app/components/styles/client_styles/library/components/libraray_tabs";
import ProductGrid from "@/app/components/styles/client_styles/library/components/product_grid";
import UpdatesList from "@/app/components/styles/client_styles/library/components/updates_list";
import InvoicesList from "@/app/components/styles/client_styles/library/components/invoice_list";
import InvoiceModal from "@/app/components/styles/client_styles/library/components/invoice_modal";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";
import {
  invoicesMock,
  productsMock,
  updatesMock,
  type InvoiceItem,
  type ProductItem,
  type TabKey,
  type UpdateItem,
} from "@/app/components/styles/client_styles/library/ts/mock_data";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("products");
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState<ProductItem[]>(productsMock);
  const [updates, setUpdates] = useState<UpdateItem[]>(updatesMock);
  const [invoices] = useState<InvoiceItem[]>(invoicesMock);

  const productCount = products.length;
  const updatesCount = useMemo(
    () => products.filter((p) => p.updateAvailable).length,
    [products]
  );

  const [updatingMap, setUpdatingMap] = useState<Record<string, boolean>>({});

  async function applyUpdateForProduct(productId: string) {
    const target = products.find((p) => p.id === productId);
    if (!target || !target.updateAvailable) return;

    setUpdatingMap((prev) => ({ ...prev, [productId]: true }));

    // fake delay
    await new Promise((r) => setTimeout(r, 900));

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, updateAvailable: false, updateStatus: "Lifetime" }
          : p
      )
    );

    // remove from Updates tab list too
    setUpdates((prev) => prev.filter((u) => u.productId !== productId));

    setUpdatingMap((prev) => ({ ...prev, [productId]: false }));
  }

  // Invoice modal
  const [openInvoiceId, setOpenInvoiceId] = useState<string | null>(null);

  function openInvoiceByProduct(productId: string) {
    const inv = invoices.find((x) => x.productId === productId);
    if (!inv) return;
    setOpenInvoiceId(inv.id);
  }

  return (
    <>
    <ClientNavHeader/>
    <div className="mx-auto w-full  px-4 sm:px-6 lg:px-8 py-6">
      {/* You will import Header/Footer yourself */}

      <main className="mx-auto w-full  px-4 py-10">
        <LibraryHeader
          productCount={productCount}
          updatesCount={updatesCount}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
        />

        <LibraryTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          updatesCount={updatesCount}
        />

        {activeTab === "products" ? (
          <ProductGrid
            products={products}
            updatingMap={updatingMap}
            onApplyUpdate={applyUpdateForProduct}
            onOpenInvoice={openInvoiceByProduct}
          />
        ) : null}

        {activeTab === "updates" ? (
          <UpdatesList
            updates={updates}
            updatingMap={updatingMap}
            onApplyUpdate={applyUpdateForProduct}
          />
        ) : null}

        {activeTab === "invoices" ? (
          <InvoicesList
            invoices={invoices}
            products={products}
            onOpenInvoice={(invoiceId) => setOpenInvoiceId(invoiceId)}
          />
        ) : null}
      </main>

      <InvoiceModal
        openInvoiceId={openInvoiceId}
        invoices={invoices}
        products={products}
        onClose={() => setOpenInvoiceId(null)}
      />
    </div>
    <ClientFooter/>
    </>
  );
}
