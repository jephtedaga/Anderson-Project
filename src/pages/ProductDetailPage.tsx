import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ImageGallery, VendorCard } from "../components";
import type { Product, Review } from "../types";
import apiService from "../services/api";
import aiService from "../services/aiService";
import { useCart } from "../contexts/CartContext";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productData = await apiService.getProductById(id);
          setProduct(productData);

          if (productData) {
            // Charger les avis
            const reviewsData = await apiService.getProductReviews(id);
            setReviews(reviewsData);

            // Charger les produits connexes
            const allProducts = await apiService.getProducts();
            const relatedData = aiService.getRelatedProducts(
              productData,
              allProducts,
              4
            );
            setRelatedProducts(relatedData);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h1>
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-8 text-sm">
          <Link to="/" className="hover:text-blue-600">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600">
            Produits
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Gallery */}
          <div className="lg:col-span-2">
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Category */}
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400"
                        : ""
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-4xl font-bold text-gray-900 mb-2">
                {product.price.toLocaleString("fr-CG")} FCFA
              </p>
              <p className="text-sm text-green-600 font-semibold">
                {product.inStock ? "✓ En stock" : "Rupture de stock"}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-700">Quantité:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isFavorite
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Heart size={20} className={isFavorite ? "fill-red-600" : ""} />
                  Favoris
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendeur</h2>
          <VendorCard vendor={product.vendor} />
        </section>

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Avis clients ({reviews.length})
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.author}
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating ? "fill-yellow-400" : ""
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Aucun avis pour ce produit</p>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Produits connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 line-clamp-2">
                      {p.name}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      {p.price.toLocaleString("fr-CG")} FCFA
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
