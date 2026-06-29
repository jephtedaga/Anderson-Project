import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import apiService from "../services/api";
import type { Product } from "../types";
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react";

export const CartPage = () => {
  const { items, totalItems, totalAmount, removeFromCart, updateQuantity, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cartProducts = items
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((entry): entry is { product: Product; quantity: number; productId: string; price: number } => Boolean(entry.product));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 card-theme p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
                <p className="text-gray-600 mt-2">{totalItems} article{s(totalItems)} sélectionné{s(totalItems)}</p>
              </div>
              <ShoppingBag className="text-blue-600" size={30} />
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-4">Chargement du panier...</p>
              </div>
            ) : cartProducts.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Votre panier est vide</h2>
                <p className="text-gray-600 mb-6">Ajoutez des accessoires depuis la page produits.</p>
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Voir les produits
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="rounded-3xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full md:w-44 h-44 object-cover rounded-3xl"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-2 flex-wrap text-sm text-gray-500">
                          <span>{product.category}</span>
                          <span>•</span>
                          <span>{product.vendor.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 pt-4">
                        <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-2">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="font-semibold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{(product.price * quantity).toLocaleString("fr-CG")} FCFA</p>
                          <p className="text-gray-500 text-sm">{product.price.toLocaleString("fr-CG")} FCFA / unité</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="rounded-full bg-red-50 text-red-600 p-3 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="w-full lg:w-96 bg-primary-600 text-white rounded-[28px] p-8 shadow-soft">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-100/80">Résumé de la commande</p>
              <h2 className="text-4xl font-bold mt-3">Total</h2>
            </div>
            <div className="space-y-4 text-white/90">
              <div className="flex items-center justify-between">
                <span>Articles</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Montant total</span>
                <span className="font-semibold text-xl">{totalAmount.toLocaleString("fr-CG")} FCFA</span>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <Link
                to="/checkout"
                className="block w-full bg-white text-blue-700 font-bold rounded-3xl py-4 text-center hover:bg-gray-100 transition-colors"
              >
                <CreditCard size={20} className="inline-block mr-2" />
                Passer à la caisse
              </Link>
              <button
                onClick={clearCart}
                className="w-full border border-white text-white py-4 rounded-3xl font-semibold hover:bg-white/10 transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

function s(count: number) {
  return count > 1 ? "s" : "";
}
