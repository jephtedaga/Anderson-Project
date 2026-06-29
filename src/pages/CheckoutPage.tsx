import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import apiService from "../services/api";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export const CheckoutPage = () => {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("Client Anderson Market");
  const [customerAddress, setCustomerAddress] = useState("Adresse de livraison par défaut");
  const [customerPhone, setCustomerPhone] = useState("+242 06 000 0000");
  const [paymentMethod, setPaymentMethod] = useState("MTN Money / Airtel Money");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) {
      setErrorMessage("Votre panier est vide.");
      return;
    }

    if (!customerName || !customerAddress || !customerPhone) {
      setErrorMessage("Veuillez renseigner toutes les informations de livraison.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const orderPayload = {
      customerName,
      customerAddress,
      customerPhone,
      paymentMethod,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    };

    const createdOrder = await apiService.createOrder(orderPayload);

    setIsSubmitting(false);

    if (!createdOrder) {
      setErrorMessage("Impossible de valider la commande pour le moment. Réessayez plus tard.");
      return;
    }

    clearCart();
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card-theme p-8">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-6 flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Retour
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Paiement</h1>
            <p className="text-gray-600 mb-8">
              Finalisez votre commande en choisissant la méthode de paiement.
            </p>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-3xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Informations de livraison</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full input-theme"
                  />
                  <input
                    type="text"
                    placeholder="Adresse de livraison"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full input-theme"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full input-theme"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Méthode de paiement</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 rounded-3xl border p-4 cursor-pointer transition-colors ${paymentMethod === "MTN Money / Airtel Money" ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-600 hover:bg-gray-50"}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="MTN Money / Airtel Money"
                      checked={paymentMethod === "MTN Money / Airtel Money"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span className="font-semibold">MTN Money / Airtel Money</span>
                  </label>
                  <label className={`flex items-center gap-3 rounded-3xl border p-4 cursor-pointer transition-colors ${paymentMethod === "Paiement à la livraison" ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-600 hover:bg-gray-50"}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="Paiement à la livraison"
                      checked={paymentMethod === "Paiement à la livraison"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span className="font-semibold">Paiement à la livraison</span>
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Résumé de la commande</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between">
                    <span>Articles</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-bold">{totalAmount.toLocaleString("fr-CG")} FCFA</span>
                  </div>
                  <div className="rounded-3xl bg-blue-50 p-4 text-blue-800">
                    <p className="font-semibold">Note:</p>
                    <p>Cette version propose une validation de commande complète. L'intégration de paiement réelle est à connecter côté backend.</p>
                  </div>
                  {errorMessage && (
                    <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-red-700">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="bg-primary-600 text-white rounded-[28px] p-8 shadow-soft">
            <h2 className="text-2xl font-bold mb-4">Votre commande</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between gap-4 bg-white/10 rounded-3xl p-4">
                  <div>
                    <p className="font-semibold">Article {item.productId}</p>
                    <p className="text-sm text-white/80">Quantité: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{(item.price * item.quantity).toLocaleString("fr-CG")} FCFA</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className={`w-full btn-theme rounded-3xl py-4 flex items-center justify-center gap-2 transition-opacity ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <CheckCircle2 size={20} /> {isSubmitting ? "Validation..." : "Confirmer la commande"}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
