import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
  { label: "My Orders", to: "/orders" },
];

export default function NavbarComponent() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
      setMobileOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleCartClick = () => {
    setMobileOpen(false);
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate("/cart");
    }
  };

  // Showing Admin Navbar If The User Is An Admin
  if (user?.role === "admin") {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-8 py-4 bg-white shadow-md">
        <div className="text-xl sm:text-2xl font-bold text-blue-700">Alostore Africa</div>
        <button
          onClick={handleLogout}
          className="border-2 border-red-500 text-red-500 px-3 sm:px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-colors text-sm sm:text-base"
        >
          Logout
        </button>
      </nav>
    );
  }

  //Displaying The Regular Navigation Bar For Regular Users And Guests
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex justify-between items-center px-4 sm:px-8 py-4">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-xl sm:text-2xl font-bold text-blue-700"
          >
            Alostore Africa
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-blue-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart icon */}
            <div
              onClick={handleCartClick}
              className="relative text-blue-600 transition-colors cursor-pointer"
            >
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>

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

          {/* Mobile: cart icon + hamburger toggle */}
          <div className="flex items-center gap-5 md:hidden">
            <div
              onClick={handleCartClick}
              className="relative text-blue-600 transition-colors cursor-pointer"
            >
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
              className="appearance-none bg-white text-blue-700 [color-scheme:light]"
            >
              {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-4 flex flex-col gap-1 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-blue-700 hover:bg-gray-50 rounded-lg px-3 py-2.5 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Login Required!</h2>
            <p className="text-gray-600 mb-6">You must login to view your cart.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/login");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Proceed to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
