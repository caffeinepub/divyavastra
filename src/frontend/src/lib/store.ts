export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string; // backward compat - first image
  images: string[]; // multiple images
  inStock: boolean;
};

export type Order = {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered";
  timestamp: number;
  currency: string;
  displayPrice: string;
};

export type PaymentSettings = {
  upiId: string;
  enabledMethods: string[];
};

export type AdminSettings = {
  passwordHash: string;
  isSetup: boolean;
};

const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Gopi Dress – Style 1",
    category: "Gopi Dresses",
    description:
      "Elegant pure cotton Gopi Dress with beautiful border and delicate khadi work. Perfect for temple visits, kirtans, and spiritual gatherings. Imported from Vrindavan Dham.",
    price: 6500,
    imageUrl: "https://i.ibb.co/jZ9HcXDg/IMG-4045.jpg",
    images: ["https://i.ibb.co/jZ9HcXDg/IMG-4045.jpg"],
    inStock: true,
  },
  {
    id: "p1b",
    name: "Gopi Dress – Style 2",
    category: "Gopi Dresses",
    description:
      "Graceful Gopi Dress with soft cotton fabric and traditional Vrindavan craftsmanship. Ideal for seva, kirtans, and all devotional occasions.",
    price: 6500,
    imageUrl: "https://i.ibb.co/hRC93SZn/IMG-4047.jpg",
    images: ["https://i.ibb.co/hRC93SZn/IMG-4047.jpg"],
    inStock: true,
  },
  {
    id: "p1c",
    name: "Gopi Dress – Style 3",
    category: "Gopi Dresses",
    description:
      "Beautiful Gopi Dress with traditional border work. Pure cotton fabric, comfortable and elegant for Matajis. Directly imported from Vrindavan.",
    price: 6500,
    imageUrl: "https://i.ibb.co/4hysqJF/IMG-4044.jpg",
    images: ["https://i.ibb.co/4hysqJF/IMG-4044.jpg"],
    inStock: true,
  },
  {
    id: "p1d",
    name: "Gopi Dress – Style 4",
    category: "Gopi Dresses",
    description:
      "Premium Gopi Dress with exquisite detailing and fine cotton fabric. A timeless devotional outfit for every Mataji. Limited pieces available.",
    price: 6500,
    imageUrl: "https://i.ibb.co/HLH9X5FN/IMG-4048.jpg",
    images: ["https://i.ibb.co/HLH9X5FN/IMG-4048.jpg"],
    inStock: true,
  },
  {
    id: "p2",
    name: "Bagalbandi (for Prabhujis)",
    category: "Bagalbandi",
    description:
      "Traditional devotional top ideal for temple visits, kirtan, and seva. Made from quality cotton fabric with handcrafted details.",
    price: 2100,
    imageUrl: "",
    images: [],
    inStock: true,
  },
  {
    id: "p3",
    name: "Dhoti & Chadar Set (for Prabhujis)",
    category: "Dhoti Sets",
    description:
      "Classic soft dhoti set for seva and festivals. Comfortable and traditional, perfect for all devotional occasions.",
    price: 2000,
    imageUrl: "",
    images: [],
    inStock: true,
  },
  {
    id: "p4",
    name: "Complete Devotee Couple Set",
    category: "Devotee Couple Sets",
    description:
      "Complete set for devotee couples — Gopi Dress and Bagalbandi together. Imported from Vrindavan Dham, limited pieces available.",
    price: 10600,
    imageUrl: "",
    images: [],
    inStock: true,
  },
];

const SEED_PAYMENT: PaymentSettings = {
  upiId: "divyavastra@upi",
  enabledMethods: ["UPI", "Card", "NetBanking", "COD"],
};

export function getProducts(): Product[] {
  const raw = localStorage.getItem("dv_products");
  if (!raw) {
    localStorage.setItem("dv_products", JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  }
  const parsed: Product[] = JSON.parse(raw);
  // Migrate old data: add images array if missing
  // Also inject new Gopi Dress products if not present
  const hasNewGopi = parsed.some((p) => p.id === "p1b");
  let base = parsed;
  if (!hasNewGopi) {
    // Add new Gopi Dress products after p1
    const p1Index = base.findIndex((p) => p.id === "p1");
    const newGopi = SEED_PRODUCTS.filter((p) =>
      ["p1", "p1b", "p1c", "p1d"].includes(p.id),
    );
    if (p1Index !== -1) {
      base = [
        ...base.slice(0, p1Index),
        ...newGopi,
        ...base.slice(p1Index + 1),
      ];
    } else {
      base = [...newGopi, ...base.filter((p) => p.id !== "p1")];
    }
    localStorage.setItem("dv_products", JSON.stringify(base));
  }
  const migrated = base.map((p) => {
    if (!p.images) {
      return { ...p, images: p.imageUrl ? [p.imageUrl] : [] };
    }
    return p;
  });
  return migrated;
}

export function saveProducts(products: Product[]) {
  localStorage.setItem("dv_products", JSON.stringify(products));
}

export function getOrders(): Order[] {
  const raw = localStorage.getItem("dv_orders");
  return raw ? JSON.parse(raw) : [];
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem("dv_orders", JSON.stringify(orders));
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const orders = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem("dv_orders", JSON.stringify(orders));
}

export function getPaymentSettings(): PaymentSettings {
  const raw = localStorage.getItem("dv_payment");
  if (!raw) {
    localStorage.setItem("dv_payment", JSON.stringify(SEED_PAYMENT));
    return SEED_PAYMENT;
  }
  return JSON.parse(raw);
}

export function savePaymentSettings(settings: PaymentSettings) {
  localStorage.setItem("dv_payment", JSON.stringify(settings));
}

export function getAdminSettings(): AdminSettings {
  const raw = localStorage.getItem("dv_admin");
  return raw ? JSON.parse(raw) : { passwordHash: "", isSetup: false };
}

export function saveAdminSettings(settings: AdminSettings) {
  localStorage.setItem("dv_admin", JSON.stringify(settings));
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem("dv_admin_session") === "true";
}

export function setAdminSession(value: boolean) {
  if (value) sessionStorage.setItem("dv_admin_session", "true");
  else sessionStorage.removeItem("dv_admin_session");
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
