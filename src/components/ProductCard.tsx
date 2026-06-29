import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card-theme overflow-hidden transition-shadow duration-300 hover:shadow-soft">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="relative pb-full overflow-hidden bg-gray-200" style={{ paddingBottom: "100%" }}>
          <img
            src={imageError ? "https://via.placeholder.com/300x300?text=Image" : product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            className="absolute top-0 left-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />

          {/* Status Badge */}
          {product.inStock && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              En stock
            </div>
          )}

          {/* Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Heart
              size={20}
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
            />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Vendor Info */}
        <Link
          to={`/vendor/${product.vendor.id}`}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold mb-2 inline-block"
        >
          {product.vendor.name}
          {product.vendor.verificationStatus === "verified" && "✓"}
        </Link>

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mb-2"
        >
          {product.name}
        </Link>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "fill-yellow-400" : ""}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {product.price.toLocaleString("fr-CG")}
            </p>
            <p className="text-xs text-gray-500">FCFA</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap mb-4">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
