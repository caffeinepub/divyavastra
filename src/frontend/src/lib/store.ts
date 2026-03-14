export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  inStock: boolean;
};

export type Order = {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
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
  username: string;
  recoveryCode: string;
};

const DHOTI_IMAGES = [
  "https://i.ibb.co/kg1SYFNQ/Whats-App-Image-2026-03-11-at-23-42-34.jpg",
  "https://i.ibb.co/mVBsGjBN/Whats-App-Image-2026-03-11-at-23-42-34-1.jpg",
  "https://i.ibb.co/wxGX8nx/Whats-App-Image-2026-03-11-at-23-42-34-2.jpg",
  "https://i.ibb.co/8gpgLgBZ/Whats-App-Image-2026-03-11-at-23-42-35.jpg",
  "https://i.ibb.co/Z6Rw5YnZ/Whats-App-Image-2026-03-11-at-23-42-35-2.jpg",
];

const BAGALBANDI_IMAGES = [
  "https://i.ibb.co/HLqpFqTB/Whats-App-Image-2026-03-11-at-23-42-32.jpg",
  "https://i.ibb.co/FMLRg3L/Whats-App-Image-2026-03-11-at-23-42-32-1.jpg",
  "https://i.ibb.co/YFmxHJ5k/Whats-App-Image-2026-03-11-at-23-42-32-2.jpg",
  "https://i.ibb.co/v6mvBNP5/Whats-App-Image-2026-03-11-at-23-42-33.jpg",
  "https://i.ibb.co/CKfTSftB/Whats-App-Image-2026-03-11-at-23-42-33-2.jpg",
];

const COUPLE_IMAGES = [
  "https://i.ibb.co/s948DdH2/Whats-App-Image-2026-03-11-at-23-19-21-1.jpg",
  "https://i.ibb.co/zhJPRcHM/Whats-App-Image-2026-03-11-at-23-19-23.jpg",
  "https://i.ibb.co/9k2YFkqH/Whats-App-Image-2026-03-11-at-23-19-22-1.jpg",
  "https://i.ibb.co/4RJSspBd/Whats-App-Image-2026-03-11-at-23-19-21-2.jpg",
  "https://i.ibb.co/Y4k091GF/Whats-App-Image-2026-03-11-at-23-19-24-1.jpg",
];

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
    id: "p2b",
    name: "Bagalbandi Set – Vrindavan Style",
    category: "Bagalbandi",
    description:
      "Beautifully crafted Bagalbandi Set straight from Vrindavan Dham. Perfect for daily seva, kirtan, and temple visits. Premium cotton fabric with traditional devotional detailing. Limited pieces available.",
    price: 2100,
    imageUrl: BAGALBANDI_IMAGES[0],
    images: BAGALBANDI_IMAGES,
    inStock: true,
  },
  {
    id: "p3",
    name: "Dhoti & Chadar Set (for Prabhujis)",
    category: "Dhoti Sets",
    description:
      "Classic soft dhoti set for seva and festivals. Comfortable and traditional, perfect for all devotional occasions. Imported from Vrindavan Dham.",
    price: 2000,
    imageUrl: DHOTI_IMAGES[0],
    images: DHOTI_IMAGES,
    inStock: true,
  },
  {
    id: "p4",
    name: "Sacred Devotee Couple Set – Vrindavan Collection",
    category: "Devotee Couple Sets",
    description:
      "Adorn yourself and your beloved in the divine grace of Vrindavan. This premium couple set includes an elegant Gopi Dress for Mataji and a traditional Bagalbandi-Dhoti for Prabhuji — crafted for seva, kirtan, and sacred celebrations.",
    price: 10600,
    imageUrl: COUPLE_IMAGES[0],
    images: COUPLE_IMAGES,
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
  let base: Product[] = JSON.parse(raw);

  base = base.filter((p) => p.id !== "p2");

  const hasNewGopi = base.some((p) => p.id === "p1b");
  if (!hasNewGopi) {
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
  }

  const hasBagalbandiSet = base.some((p) => p.id === "p2b");
  if (!hasBagalbandiSet) {
    const p2b = SEED_PRODUCTS.find((p) => p.id === "p2b")!;
    base = [...base, p2b];
  }

  base = base.map((p) => {
    if (p.id === "p3") {
      return { ...p, imageUrl: DHOTI_IMAGES[0], images: DHOTI_IMAGES };
    }
    if (p.id === "p2b") {
      return {
        ...p,
        imageUrl: BAGALBANDI_IMAGES[0],
        images: BAGALBANDI_IMAGES,
      };
    }
    if (p.id === "p4") {
      return {
        ...p,
        name: "Sacred Devotee Couple Set – Vrindavan Collection",
        description:
          "Adorn yourself and your beloved in the divine grace of Vrindavan. This premium couple set includes an elegant Gopi Dress for Mataji and a traditional Bagalbandi-Dhoti for Prabhuji — crafted for seva, kirtan, and sacred celebrations.",
        imageUrl: COUPLE_IMAGES[0],
        images: COUPLE_IMAGES,
      };
    }
    return p;
  });

  localStorage.setItem("dv_products", JSON.stringify(base));

  return base.map((p) => {
    if (!p.images) {
      return { ...p, images: p.imageUrl ? [p.imageUrl] : [] };
    }
    return p;
  });
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
  if (!raw)
    return {
      passwordHash: "",
      isSetup: false,
      username: "divyash123",
      recoveryCode: "",
    };
  const parsed = JSON.parse(raw);
  return {
    username: "divyash123",
    recoveryCode: "",
    ...parsed,
  };
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
