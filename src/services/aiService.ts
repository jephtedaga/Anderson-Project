import type { Product, AIRecommendation } from "../types";

class AIService {
  /**
   * Génère des recommandations produits basées sur l'historique et les préférences
   */
  async getRecommendations(
    products: Product[],
    userHistory: string[] = []
  ): Promise<AIRecommendation[]> {
    try {
      // Simulation IA - en production, utiliser une API d'IA réelle
      // comme OpenAI, Hugging Face, ou votre service IA personnalisé
      
      const recommendations: AIRecommendation[] = [];
      const categoryScores: { [key: string]: number } = {};

      // Analyser l'historique de l'utilisateur
      userHistory.forEach((productId) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
          categoryScores[product.category] =
            (categoryScores[product.category] || 0) + 1;
        }
      });

      // Générer des recommandations basées sur les catégories préférées
      products.forEach((product) => {
        if (!userHistory.includes(product.id)) {
          const categoryScore = categoryScores[product.category] || 0;
          const similarProductsScore = products.filter(
            (p) =>
              p.category === product.category &&
              userHistory.includes(p.id)
          ).length;

          const confidence = Math.min(
            0.95,
            (categoryScore + similarProductsScore * 0.5) / 10
          );

          if (confidence > 0.3) {
            recommendations.push({
              productId: product.id,
              reason: `Basé sur votre intérêt pour ${product.category}`,
              confidence,
            });
          }
        }
      });

      return recommendations.sort((a, b) => b.confidence - a.confidence);
    } catch (error) {
      console.error("Erreur lors de la génération des recommandations:", error);
      return [];
    }
  }

  /**
   * Analyse les images uploadées pour détecter les accessoires
   */
  async analyzeImage(_imageFile: File): Promise<{
    category: string;
    confidence: number;
    tags: string[];
  }> {
    try {
      // En production, utiliser une API de vision par ordinateur
      // comme Google Cloud Vision, AWS Rekognition, ou Azure Computer Vision
      
      // Pour le développement, retourner une analyse simulée
      return {
        category: "Accessoires",
        confidence: 0.92,
        tags: ["accessoire", "tendance", "qualité"],
      };
    } catch (error) {
      console.error("Erreur lors de l'analyse d'image:", error);
      throw error;
    }
  }

  /**
   * Filtre les produits basés sur les critères IA
   */
  filterProductsByAI(
    products: Product[],
    criteria: {
      budget?: number;
      category?: string;
      rating?: number;
      verified?: boolean;
    }
  ): Product[] {
    return products.filter((product) => {
      if (criteria.budget && product.price > criteria.budget) return false;
      if (criteria.category && product.category !== criteria.category)
        return false;
      if (criteria.rating && product.rating < criteria.rating) return false;
      if (
        criteria.verified &&
        product.vendor.verificationStatus !== "verified"
      )
        return false;
      return true;
    });
  }

  /**
   * Génère des suggestions de produits connexes
   */
  getRelatedProducts(
    product: Product,
    allProducts: Product[],
    limit: number = 5
  ): Product[] {
    return allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

export default new AIService();
