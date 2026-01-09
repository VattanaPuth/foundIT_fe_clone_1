export type LicenseKey = "Personal" | "Commercial" | "Extended";

export type CartItem = {
  id: string;
  title: string;
  author: string;
  rating: number;
  sales: number;
  imageColor: string; // placeholder bg
  basePrice: number; // base for Personal
  license: LicenseKey;
};

export function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export function formatMoney(n: number) {
  return `$${n.toFixed(2)}`;
}

export function getLicensePrice(base: number, license: LicenseKey) {
  if (license === "Personal") return base;
  if (license === "Commercial") return base + 70;
  return base + 150; // Extended
}
