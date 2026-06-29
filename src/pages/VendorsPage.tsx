import { useEffect, useState } from "react";
import { VendorCard } from "../components";
import type { Vendor } from "../types";
import apiService from "../services/api";
import { Search, Star, TrendingUp } from "lucide-react";

export const VendorsPage = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await apiService.getVendors();
        setVendors(data);
      } catch (error) {
        console.error("Erreur lors du chargement des vendeurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = [...vendors];

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre vendeurs vérifiés
    if (verifiedOnly) {
      filtered = filtered.filter((v) => v.verificationStatus === "verified");
    }

    // Tri
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "products":
        filtered.sort((a, b) => b.productsCount - a.productsCount);
        break;
      default:
        // rating
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredVendors(filtered);
  }, [vendors, searchQuery, sortBy, verifiedOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vendeurs du Congo</h1>
          <p className="text-blue-100">
            Découvrez les meilleurs vendeurs d'accessoires au Congo Brazzaville
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Nom, ville..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="rating">Meilleure note</option>
                <option value="products">Plus de produits</option>
                <option value="name">Nom (A-Z)</option>
              </select>
            </div>

            {/* Verified Filter */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Vendeurs vérifiés seulement
                </span>
              </label>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSortBy("rating");
                  setVerifiedOnly(false);
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total vendeurs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vendors.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star className="text-yellow-400 fill-yellow-400" size={24} />
              <div>
                <p className="text-sm text-gray-600">Note moyenne</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    vendors.reduce((a, v) => a + v.rating, 0) / vendors.length
                  ).toFixed(1)}
                  /5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-sm text-gray-600">Vendeurs vérifiés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vendors.filter((v) => v.verificationStatus === "verified").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        <div>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Chargement des vendeurs...</p>
            </div>
          ) : filteredVendors.length > 0 ? (
            <>
              <div className="mb-4 text-gray-600 text-sm">
                {filteredVendors.length} vendeur
                {filteredVendors.length !== 1 ? "s" : ""} trouvé
                {filteredVendors.length !== 1 ? "s" : ""}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg">
              <p className="text-gray-600 text-lg">
                Aucun vendeur trouvé avec ces critères
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous êtes vendeur?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez la plateforme Anderson Market et vendez vos accessoires
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition-colors">
            S'inscrire en tant que vendeur
          </button>
        </div>
      </section>
    </div>
  );
};

export default VendorsPage;
