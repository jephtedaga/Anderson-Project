import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12">
            <h1 className="text-5xl font-bold mb-4">Anderson Market</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Plateforme marketplace d'accessoires premium dédiée au Congo Brazzaville. Notre mission est de connecter les meilleurs vendeurs et clients, avec une expérience professionnelle et fiable.
            </p>
          </div>

          <div className="p-12 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre vision</h2>
              <p className="text-gray-600 leading-8">
                Offrir une expérience d'achat moderne, transparente et locale qui met en valeur la qualité des accessoires vendus au Congo Brazzaville. Nous voulons faciliter l'accès aux meilleurs produits et soutenons des vendeurs vérifiés et responsables.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi nous choisir</h2>
              <ul className="space-y-4 text-gray-600">
                <li>• Vendeurs vérifiés et service client réactif.</li>
                <li>• Recommandations IA pour trouver rapidement l'accessoire idéal.</li>
                <li>• Interface fluide et professionnelle pour mobile et desktop.</li>
                <li>• Contact direct via WhatsApp pour chaque vendeur.</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600 mb-6">
              Pour toute demande, contactez-nous à <a href="mailto:info@andersonmarket.cg" className="text-blue-600">info@andersonmarket.cg</a> ou par téléphone au <a href="tel:+242061234567" className="text-blue-600">+242 06 123 4567</a>.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-700 transition-colors"
            >
              Voir les produits
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
