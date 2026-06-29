import { useState, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    const params = new URLSearchParams();
    if (trimmed) {
      params.set("q", trimmed);
    }
    navigate(`/products?${params.toString()}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <header className="bg-brand text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top section */}
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="w-10 h-10 bg-white text-blue-600 rounded-lg flex items-center justify-center font-bold">
              AM
            </div>
            <span>Anderson Market</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="flex w-full bg-white rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Chercher un accessoire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2 text-gray-800 outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Cart & Menu */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="hidden md:flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors relative">
              <ShoppingCart size={20} />
              <span className="font-semibold">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white px-1">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="flex bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Chercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 text-gray-800 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              to="/products"
              className="block px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Produits
            </Link>
            <Link
              to="/vendors"
              className="block px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Vendeurs
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Panier
            </Link>
          </nav>
        )}
      </div>

      {/* Navigation Bar */}
      <nav className="hidden md:flex bg-brand/90">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          <Link
            to="/products"
            className="py-3 hover:bg-blue-600 px-4 rounded-t-lg transition-colors font-medium"
          >
            Produits
          </Link>
          <Link
            to="/vendors"
            className="py-3 hover:bg-blue-600 px-4 rounded-t-lg transition-colors font-medium"
          >
            Vendeurs
          </Link>
          <Link
            to="/categories"
            className="py-3 hover:bg-blue-600 px-4 rounded-t-lg transition-colors font-medium"
          >
            Catégories
          </Link>
          <Link
            to="/about"
            className="py-3 hover:bg-blue-600 px-4 rounded-t-lg transition-colors font-medium"
          >
            À propos
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
