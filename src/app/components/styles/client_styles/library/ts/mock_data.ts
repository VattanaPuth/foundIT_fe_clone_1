export type TabKey = "products" | "updates" | "invoices";

export type ProductUpdateStatus = "Expired" | "Lifetime";

export type ProductItem = {
  id: string;
  title: string;
  author: string;
  imageTone: "dark" | "gray" | "green" | "purple";
  licenseLabel: string;
  version: string;
  purchasedDate: string;

  updateAvailable: boolean;
  updateFromTo?: string;

  updateStatus: ProductUpdateStatus;
  supportStatus: "Expired" | "Active";
};

export type UpdateItem = {
  id: string;
  productId: string;
  title: string;
  author: string;
  imageTone: ProductItem["imageTone"];
  fromVersion: string;
  toVersion: string;
  paidUpgrade: boolean;
  whatsNew: string[];
};

export type InvoiceItem = {
  id: string;
  productId: string;
  invoiceNumber: string;
  date: string;
  paymentMethod: string;
  status: "Paid" | "Pending";
  amount: number;
};

export const productsMock: ProductItem[] = [
  {
    id: "p1",
    title: "React Starter Template",
    author: "CodeCraft Studio",
    imageTone: "dark",
    licenseLabel: "Extended License",
    version: "v1.5.0",
    purchasedDate: "Purchased Feb 3, 2024",
    updateAvailable: true,
    updateFromTo: "v1.5.0 → v2.3.0",
    updateStatus: "Expired",
    supportStatus: "Expired",
  },
  {
    id: "p2",
    title: "Icon Pack Pro - 2000+ Icons",
    author: "IconMaster",
    imageTone: "purple",
    licenseLabel: "Commercial License",
    version: "v3.0.0",
    purchasedDate: "Purchased Jan 28, 2024",
    updateAvailable: true,
    updateFromTo: "v3.0.0 → v3.2.1",
    updateStatus: "Expired",
    supportStatus: "Expired",
  },
  {
    id: "p3",
    title: "Modern Dashboard UI Kit",
    author: "DesignStudio Pro",
    imageTone: "gray",
    licenseLabel: "Commercial License",
    version: "v2.1.0",
    purchasedDate: "Purchased Jan 15, 2024",
    updateAvailable: true,
    updateFromTo: "v2.1.0 → v2.3.0",
    updateStatus: "Expired",
    supportStatus: "Expired",
  },
  {
    id: "p4",
    title: "SaaS Landing Page Template",
    author: "WebFlow Masters",
    imageTone: "green",
    licenseLabel: "Personal License",
    version: "v2.5.0",
    purchasedDate: "Purchased Dec 10, 2023",
    updateAvailable: false,
    updateStatus: "Lifetime", // ✅ already lifetime by default
    supportStatus: "Expired",
  },
];

export const updatesMock: UpdateItem[] = [
  {
    id: "u1",
    productId: "p1",
    title: "React Starter Template",
    author: "CodeCraft Studio",
    imageTone: "dark",
    fromVersion: "1.5.0",
    toVersion: "2.3.0",
    paidUpgrade: true,
    whatsNew: [
      "New folder structure options",
      "Improved performance settings",
      "Updated documentation",
    ],
  },
  {
    id: "u2",
    productId: "p2",
    title: "Icon Pack Pro - 2000+ Icons",
    author: "IconMaster",
    imageTone: "purple",
    fromVersion: "3.0.0",
    toVersion: "3.2.1",
    paidUpgrade: true,
    whatsNew: [
      "Added 200+ new icons",
      "Fixed export issues in Figma",
      "Updated documentation",
    ],
  },
  {
    id: "u3",
    productId: "p3",
    title: "Modern Dashboard UI Kit",
    author: "DesignStudio Pro",
    imageTone: "gray",
    fromVersion: "2.1.0",
    toVersion: "2.3.0",
    paidUpgrade: true,
    whatsNew: [
      "Added dark mode support for components",
      "New navigation menu variants",
      "Improved mobile responsiveness",
    ],
  },
];

export const invoicesMock: InvoiceItem[] = [
  {
    id: "inv1",
    productId: "p1",
    invoiceNumber: "INV-2-2024",
    date: "February 3, 2024",
    paymentMethod: "Credit Card •••• 4242",
    status: "Paid",
    amount: 129.0,
  },
  {
    id: "inv2",
    productId: "p2",
    invoiceNumber: "INV-3-2024",
    date: "January 28, 2024",
    paymentMethod: "Credit Card •••• 4242",
    status: "Paid",
    amount: 129.0,
  },
  {
    id: "inv3",
    productId: "p3",
    invoiceNumber: "INV-4-2024",
    date: "January 15, 2024",
    paymentMethod: "Credit Card •••• 4242",
    status: "Paid",
    amount: 129.0,
  },
  {
    id: "inv4",
    productId: "p4",
    invoiceNumber: "INV-5-2024",
    date: "December 10, 2023",
    paymentMethod: "Credit Card •••• 4242",
    status: "Paid",
    amount: 129.0,
  },
];
