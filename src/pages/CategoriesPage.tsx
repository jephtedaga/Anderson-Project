import { Link } from "react-router-dom";

const categories = [
  "Accessoires téléphone",
  "Accessoires audio",
  "Wearables",
  "Mode",
  "Gadgets",
  "Sacs & pochettes",
];

export const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Catégories</h1>
            <p className="text-gray-600 mt-2">Explorez les accessoires par catégorie.</p>
          </div>
          <Link to="/products" className="text-blue-600 hover:text-blue-800 font-semibold">
            Voir tous les produits
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="group block rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all"
            >
              <div className="text-blue-600 text-4xl mb-5">📦</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{category}</h2>
              <p className="text-gray-600">Découvrez les meilleurs produits pour cette catégorie.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
