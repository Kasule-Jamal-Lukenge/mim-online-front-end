import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function NavbarComponent() {
  const { user } = useContext(AuthContext);
  const { totalItems } = useCart();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md mb-6">
      <div className="text-2xl font-bold text-blue-700">Mim Online</div>
      <div className="flex items-center gap-6 text-gray-700 font-medium w-100">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/categories" className="hover:text-blue-600">Categories</Link>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>

        <Link to="/cart" className="relative">
          <FaShoppingCart size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
