import { CartItem } from "@/app/components/styles/client_styles/cart_1/types";

export const cartMockData: CartItem[] = [
  {
    id: "c1",
    title: "Modern Dashboard UI Kit",
    author: "Sarah Chen",
    rating: 4.9,
    sales: 2341,
    imageColor: "bg-gray-900",
    basePrice: 79,
    license: "Commercial",
  },
  {
    id: "c2",
    title: "Premium Design System",
    author: "Alex Martinez",
    rating: 4.8,
    sales: 1823,
    imageColor: "bg-gray-300",
    basePrice: 49,
    license: "Personal",
  },
  {
    id: "c3",
    title: "SaaS Landing Page Template",
    author: "Emily Roberts",
    rating: 5.0,
    sales: 3456,
    imageColor: "bg-green-900",
    basePrice: 149,
    license: "Extended",
  },

  // +2 new mock products
  {
    id: "c4",
    title: "Minimal Portfolio Template",
    author: "Jordan Lee",
    rating: 4.7,
    sales: 978,
    imageColor: "bg-indigo-900",
    basePrice: 39,
    license: "Personal",
  },
  {
    id: "c5",
    title: "E-commerce UI Components Pack",
    author: "Nina Patel",
    rating: 4.9,
    sales: 2104,
    imageColor: "bg-orange-900",
    basePrice: 99,
    license: "Commercial",
  },
];
