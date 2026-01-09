export type StatItem = {
  title: string;
  value: string;
  sub?: string;
  tone?: "good" | "muted";
  iconName:
    | "MiniMoneyIcon"
    | "MiniTagIcon"
    | "MiniUsersIcon"
    | "MiniDocIcon";
};

export type ProductStatus = "Active" | "Paused" | "Draft" | "Pending";

export type ProductItem = {
  id: string;
  status: ProductStatus;
  title: string;
  cateLeft: string;
  cateRight: string;
  price: string;
  rating: number;
  reviews: number;

  sales: number;
  revenue: string;
  conv: string;

  perfLabel: "Excellent" | "Good";
  perfPct: number;

  views: number;
  updated: string;

  img: string;
};

export const statsMock: StatItem[] = [
  {
    title: "Total Revenue",
    value: "$83,030",
    sub: "All-time earnings",
    tone: "good",
    iconName: "MiniMoneyIcon",
  },
  {
    title: "Total Sales",
    value: "1,262",
    sub: "Lifetime orders",
    tone: "muted",
    iconName: "MiniTagIcon",
  },
  {
    title: "Total Views",
    value: "21,159",
    sub: "All products",
    tone: "muted",
    iconName: "MiniUsersIcon",
  },
  {
    title: "Active Products",
    value: "4",
    sub: "of 7 total",
    tone: "muted",
    iconName: "MiniDocIcon",
  },
];

export const productMock: ProductItem[] = [
  {
    id: "modern",
    status: "Active",
    title: "Modern Dashboard UI Kit - Figma",
    cateLeft: "Design",
    cateRight: "UI Kits",
    price: "$49 - $149",
    rating: 4.9,
    reviews: 186,

    sales: 247,
    revenue: "$18.4k",
    conv: "7.2%",

    perfLabel: "Excellent",
    perfPct: 86,

    views: 3421,
    updated: "Updated 2 days ago",

    img: "/images/modern.png",
  },
  {
    id: "saas",
    status: "Active",
    title: "SaaS Landing Page React Template",
    cateLeft: "Development",
    cateRight: "Code Starters",
    price: "$79 - $199",
    rating: 5,
    reviews: 98,

    sales: 142,
    revenue: "$16.3k",
    conv: "6.6%",

    perfLabel: "Excellent",
    perfPct: 82,

    views: 2156,
    updated: "Updated 5 days ago",

    img: "/images/modern.png",
  },
  {
    id: "prompt",
    status: "Active",
    title: "AI Prompt Pack - ChatGPT & Claude (500+ Prompts)",
    cateLeft: "Content/Marketing",
    cateRight: "Prompt Packs",
    price: "$29 - $79",
    rating: 4.8,
    reviews: 312,

    sales: 456,
    revenue: "$21.8k",
    conv: "5.5%",

    perfLabel: "Good",
    perfPct: 64,

    views: 8234,
    updated: "Updated 1 week ago",

    img: "/images/modern.png",
  },
  {
    id: "icon",
    status: "Active",
    title: "Minimal Icon Set - 2000+ Icons",
    cateLeft: "Design",
    cateRight: "Icons/Illustrations",
    price: "$39 - $99",
    rating: 4.9,
    reviews: 245,

    sales: 328,
    revenue: "$19k",
    conv: "5.6%",

    perfLabel: "Good",
    perfPct: 60,

    views: 5892,
    updated: "Updated 3 days ago",

    img: "/images/modern.png",
  },
  {
    id: "checkout",
    status: "Paused",
    title: "E-commerce Checkout Flow - Figma Components",
    cateLeft: "Design",
    cateRight: "UI Kits",
    price: "$59 - $129",
    rating: 4.7,
    reviews: 67,

    sales: 89,
    revenue: "$6.7k",
    conv: "6.1%",

    perfLabel: "Excellent",
    perfPct: 78,

    views: 1456,
    updated: "Updated 2 weeks ago",

    img: "/images/modern.png",
  },
  {
    id: "motion",
    status: "Draft",
    title: "Framer Motion Animation Library - React",
    cateLeft: "Development",
    cateRight: "Components",
    price: "$0 - $0",
    rating: 0,
    reviews: 0,

    sales: 0,
    revenue: "$0",
    conv: "0%",

    perfLabel: "Good",
    perfPct: 0,

    views: 0,
    updated: "Complete your product setup",

    img: "/images/modern.png",
  },
  {
    id: "email",
    status: "Pending",
    title: "Cold Email Templates - B2B Sales (50 Templates)",
    cateLeft: "Content/Marketing",
    cateRight: "Copy Packs",
    price: "$0 - $0",
    rating: 0,
    reviews: 0,

    sales: 0,
    revenue: "$0",
    conv: "0%",

    perfLabel: "Good",
    perfPct: 0,

    views: 0,
    updated: "Under Review",
    img: "/images/modern.png",
  },
];
