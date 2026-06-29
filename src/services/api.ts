import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Product, Vendor, Review } from "../types";

class APIService {
  private api: AxiosInstance;

  constructor() {
    // Utiliser une API mock en développement
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
      timeout: 10000,
    });
  }

  // Produits
  async getProducts(filters?: any): Promise<Product[]> {
    try {
      const response = await this.api.get("/products", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      return this.getMockProducts();
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await this.api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du produit:", error);
      return null;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await this.api.get("/products/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      return [];
    }
  }

  // Vendeurs
  async getVendors(): Promise<Vendor[]> {
    try {
      const response = await this.api.get("/vendors");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des vendeurs:", error);
      return this.getMockVendors();
    }
  }

  async getVendorById(id: string): Promise<Vendor | null> {
    try {
      const response = await this.api.get(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du vendeur:", error);
      return null;
    }
  }

  async getVendorProducts(vendorId: string): Promise<Product[]> {
    try {
      const response = await this.api.get(`/vendors/${vendorId}/products`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits du vendeur:", error);
      return [];
    }
  }

  // Commandes
  async createOrder(order: {
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    paymentMethod: string;
    items: { productId: string; quantity: number; price: number }[];
    totalAmount: number;
  }): Promise<any> {
    try {
      const response = await this.api.post("/orders", order);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande:", error);
      return null;
    }
  }

  // Avis
  async getProductReviews(productId: string): Promise<Review[]> {
    try {
      const response = await this.api.get(`/products/${productId}/reviews`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des avis:", error);
      return [];
    }
  }

  async addReview(productId: string, review: Omit<Review, "id" | "date">): Promise<Review | null> {
    try {
      const response = await this.api.post(`/products/${productId}/reviews`, review);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
      return null;
    }
  }

  // Données mock pour le développement
  private getMockProducts(): Product[] {
    return [
      {
        id: "1",
        name: "Coque téléphone premium",
        description: "Coque de protection durable en silicone pour smartphone",
        price: 5000,
        images: ["https://via.placeholder.com/400x400?text=Coque+1"],
        category: "Accessoires téléphone",
        vendor: this.getMockVendors()[0],
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
        images: ["https://via.placeholder.com/400x400?text=Écouteurs"],
        category: "Accessoires audio",
        vendor: this.getMockVendors()[1],
        rating: 4.8,
        reviews: 298,
        inStock: true,
        tags: ["bluetooth", "sans-fil", "audio"],
      },
    ];
  }

  private getMockVendors(): Vendor[] {
    return [
      {
        id: "vendor1",
        name: "TechShop Congo",
        email: "contact@techshop.cg",
        phone: "+242 06 123 4567",
        location: "Brazzaville",
        avatar: "https://via.placeholder.com/150x150?text=TechShop",
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
        avatar: "https://via.placeholder.com/150x150?text=ModeAcc",
        rating: 4.4,
        productsCount: 32,
        joinDate: "2023-05-22",
        description: "Accessoires de mode tendance et modernes",
        verificationStatus: "verified",
      },
    ];
  }
}

export default new APIService();
