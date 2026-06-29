import type { Product, Review, Vendor, Order } from "./types";

const vendors: Vendor[] = [
  {
    id: "vendor1",
    name: "TechShop Congo",
    email: "contact@techshop.cg",
    phone: "+242 06 123 4567",
    location: "Brazzaville",
    avatar: "/images/vendor-techshop.svg",
    rating: 4.6,
    productsCount: 45,
    joinDate: "2023-01-15",
    description: "Leader en vente d'accessoires technologiques de qualité",
    verificationStatus: "verified",
  },
  {
    id: "vendor2",
    name: "Mode Accessories CG",
    email: "mode@accessories.cg",
    phone: "+242 06 987 6543",
    location: "Pointe-Noire",
    avatar: "/images/vendor-modeacc.svg",
    rating: 4.4,
    productsCount: 32,
    joinDate: "2023-05-22",
    description: "Accessoires de mode tendance et modernes",
    verificationStatus: "verified",
  },
];

const products: Product[] = [
  {
    id: "1",
    name: "Coque téléphone premium",
    description: "Coque de protection durable en silicone pour smartphone",
    price: 5000,
    images: ["/images/product-phone.svg"],
    category: "Accessoires téléphone",
    vendor: vendors[0],
    rating: 4.5,
    reviews: 125,
    inStock: true,
    tags: ["protection", "smartphone", "durée"],
  },
  {
    id: "2",
    name: "Écouteurs Bluetooth",
    description: "Écouteurs sans fil avec excellente qualité sonore",
    price: 25000,
    images: ["/images/product-headphones.svg"],
    category: "Accessoires audio",
    vendor: vendors[1],
    rating: 4.8,
    reviews: 298,
    inStock: true,
    tags: ["bluetooth", "sans-fil", "audio"],
  },
  {
    id: "3",
    name: "Montre connectée premium",
    description: "Montre avec suivi santé, notifications et autonomie prolongée.",
    price: 85000,
    images: ["/images/product-watch.svg"],
    category: "Wearables",
    vendor: vendors[0],
    rating: 4.7,
    reviews: 190,
    inStock: true,
    tags: ["montre", "wearable", "smart"],
  },
];

const reviews: Review[] = [
  {
    id: "review1",
    productId: "1",
    vendorId: "vendor1",
    rating: 5,
    comment: "Très bonne qualité, livraison rapide.",
    author: "Marie",
    date: "2024-05-01",
  },
  {
    id: "review2",
    productId: "2",
    vendorId: "vendor2",
    rating: 4,
    comment: "Son excellent, confortable à porter.",
    author: "Jean",
    date: "2024-04-28",
  },
];

const orders: Order[] = [];

export { products, vendors, reviews, orders };
