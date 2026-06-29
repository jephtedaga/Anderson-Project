import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard, VendorCard } from "../components";
import type { Product, Vendor } from "../types";
import apiService from "../services/api";
import aiService from "../services/aiService";
import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, vendorsData] = await Promise.all([
          apiService.getProducts(),
          apiService.getVendors(),
        ]);

        setProducts(productsData);
        setVendors(vendorsData);

        // Obtenir les recommandations IA
        const aiRecs = await aiService.getRecommendations(
          productsData,
          ["1", "2"]
        );
        const recProducts = aiRecs
          .slice(0, 4)
          .map((rec) => productsData.find((p) => p.id === rec.productId))
          .filter(Boolean) as Product[];
        setRecommendations(recProducts);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-blue-200">
                <Sparkles size={20} />
                <span className="text-sm font-semibold">Nouveau au Congo</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Anderson <span className="text-blue-300">Market</span>
              </h1>

              <p className="text-xl text-blue-100 mb-6">
                Découvrez la plus grande marketplace d'accessoires premium au Congo Brazzaville. Des produits de qualité, des vendeurs vérifiés, et une expérience d'achat exceptionnelle.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Explorer les produits
                </Link>
                <Link
                  to="/vendors"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Découvrir les vendeurs
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex justify-center">
              <div className="w-80 h-80 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-white font-semibold">Achetez en confiance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Shield size={40} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Vendeurs Vérifiés</h3>
            <p className="text-gray-600">
              Tous nos vendeurs sont vérifiés et approuvés pour garantir la sécurité de vos achats.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Zap size={40} className="text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Livraison Rapide</h3>
            <p className="text-gray-600">
              Recevez vos accessoires rapidement dans le Congo Brazzaville et sa région.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <TrendingUp size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Prix Compétitifs</h3>
            <p className="text-gray-600">
              Comparez les prix entre vendeurs et trouvez les meilleures offres.
            </p>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="text-blue-600" size={32} />
                Recommandations IA
              </h2>
              <p className="text-gray-600 mt-2">
                Produits sélectionnés par notre système intelligent
              </p>
            </div>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Voir plus →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Products */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Accessoires Populaires</h2>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Voir tous →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Chargement...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Top Vendors */}
      {vendors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Meilleurs Vendeurs</h2>
            <Link
              to="/vendors"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Voir tous →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de clients satisfaits au Congo Brazzaville
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Commencer votre shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
