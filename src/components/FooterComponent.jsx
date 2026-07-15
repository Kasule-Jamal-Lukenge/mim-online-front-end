import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Contact Us", to: "/contact" },
];

const customerCareLinks = [
  { label: "My Orders", to: "/orders" },
  { label: "Cart", to: "/cart" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

export default function FooterComponent() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Alostore Africa</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Your one-stop destination for quality products, fast delivery, and
            reliable service across Africa.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FaChevronRight className="text-blue-500 text-xs transition-transform duration-200 group-hover:translate-x-1" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            {customerCareLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FaChevronRight className="text-blue-500 text-xs transition-transform duration-200 group-hover:translate-x-1" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
              <span>13004 Meridian Avenue St., Everett, Washington</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="flex-shrink-0" />
              <span>+1 (206) 791-7445</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="flex-shrink-0" />
              <span>support@alostoreafrica.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Alostore Africa. All rights reserved.</p>
          <p>Built with care for our customers.</p>
        </div>
      </div>
    </footer>
  );
}
