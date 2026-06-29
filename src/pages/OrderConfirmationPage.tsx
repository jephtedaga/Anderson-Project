import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export const OrderConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-10 text-center">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Commande confirmée !</h1>
        <p className="text-gray-600 mb-8">
          Merci pour votre commande. Nous préparons votre colis et reviendrons vers vous dès que possible pour la livraison.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-3xl bg-blue-600 text-white py-4 font-semibold hover:bg-blue-700 transition-colors"
          >
            Continuer mes achats
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-3xl border border-blue-600 text-blue-600 py-4 font-semibold hover:bg-blue-50 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
