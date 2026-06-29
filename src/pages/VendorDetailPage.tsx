import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VendorCard, ProductCard } from "../components";
import apiService from "../services/api";
import type { Product, Vendor } from "../types";

export const VendorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;
        const [vendorData, vendorProducts] = await Promise.all([
          apiService.getVendorById(id),
          apiService.getVendorProducts(id),
        ]);
        setVendor(vendorData);
        setProducts(vendorProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Vendeur introuvable</h1>
          <Link to="/vendors" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Retour aux vendeurs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <VendorCard vendor={vendor} />

        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Produits du vendeur</h2>
              <p className="text-gray-600">Découvrez toute la sélection proposée par {vendor.name}</p>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center text-gray-600">
              Aucun produit disponible pour ce vendeur.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VendorDetailPage;
