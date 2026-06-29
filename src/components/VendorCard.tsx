import { Link } from "react-router-dom";
import { Star, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import type { Vendor } from "../types";

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header Background */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600"></div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Avatar */}
        <div className="flex justify-center -mt-12 mb-4">
          <img
            src={vendor.avatar}
            alt={vendor.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        {/* Vendor Name */}
        <h3 className="text-xl font-bold text-center text-gray-800 mb-1">
          {vendor.name}
        </h3>

        {/* Verification Badge */}
        {vendor.verificationStatus === "verified" && (
          <div className="flex justify-center mb-3">
            <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
              <CheckCircle size={16} />
              Vendeur vérifié
            </div>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(vendor.rating) ? "fill-yellow-400" : ""}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">{vendor.rating}/5</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mb-3 line-clamp-2">
          {vendor.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-y border-gray-200">
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600">{vendor.productsCount}</p>
            <p className="text-xs text-gray-600">Produits</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600">
              {new Date(vendor.joinDate).getFullYear()}
            </p>
            <p className="text-xs text-gray-600">Membre depuis</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-sm">
          {/* Location */}
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={16} className="text-blue-600 flex-shrink-0" />
            <span className="truncate">{vendor.location}</span>
          </div>

          {/* Email */}
          <a
            href={`mailto:${vendor.email}`}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Mail size={16} className="text-blue-600 flex-shrink-0" />
            <span className="truncate text-xs">{vendor.email}</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${vendor.phone}`}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Phone size={16} className="text-blue-600 flex-shrink-0" />
            <span className="font-semibold">{vendor.phone}</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/vendor/${vendor.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors text-center text-sm"
          >
            Voir boutique
          </Link>
          <a
            href={`https://wa.me/${vendor.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors text-center text-sm"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
