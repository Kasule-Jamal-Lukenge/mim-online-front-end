import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function NavbarComponent() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls backend and clears user/token
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-700">Alostore Africa</div>
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link to="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
        <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
        <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>

        <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
          <FaShoppingCart size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
