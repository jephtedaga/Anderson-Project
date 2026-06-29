import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Share2, Link2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
                AM
              </div>
              Anderson Market
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Marketplace leader d'accessoires au Congo Brazzaville avec une sélection premium de produits de qualité.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Site web">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Partage">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Liens">
                <Link2 size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blue-400 transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="hover:text-blue-400 transition-colors">
                  Vendeurs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contactez-nous</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <span>Brazzaville, Congo</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <a href="tel:+242061234567" className="hover:text-blue-400 transition-colors">
                  +242 06 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <a href="mailto:info@andersonmarket.cg" className="hover:text-blue-400 transition-colors">
                  info@andersonmarket.cg
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
            <p>&copy; 2024 Anderson Market. Tous droits réservés.</p>
            <p>Développé avec passion au Congo Brazzaville 🇨🇬</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
