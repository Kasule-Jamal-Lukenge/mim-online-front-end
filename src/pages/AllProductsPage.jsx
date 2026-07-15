import React, { useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaSearch, FaBoxOpen } from "react-icons/fa";
import toast from "react-hot-toast";

function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <div className="group [perspective:1000px] h-80 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front face */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
          <img
            src={product.image_url || "/no-image.png"}
            alt={product.name}
            className="w-full h-52 object-cover flex-shrink-0"
          />

          <div className="p-4 flex items-center justify-between gap-3 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
              <p className="text-green-600 font-bold text-lg">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 flex-shrink-0"
              title="Add to cart"
            >
              <FaShoppingCart size={16} />
            </button>
          </div>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={product.image_url || "/no-image.png"}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative h-full flex flex-col p-4 bg-white/60">
            <h3 className="font-semibold text-gray-800 mb-1 truncate flex-shrink-0">{product.name}</h3>
            <p className="text-green-600 font-bold mb-2 flex-shrink-0">
              ${Number(product.price).toFixed(2)}
            </p>
            <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-600 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {product.description ||
                "Premium quality product with excellent features and durability."}
            </div>
            <div className="flex-shrink-0 flex gap-2 mt-3">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onViewDetails(product)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const visibleProducts = useMemo(() => {
    let list = products.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, search, sortBy]);

  const handleAddToCart = (product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const alreadyExists = addToCart(product);
    if (alreadyExists) {
      toast("Already in cart — quantity unchanged.", { icon: "ℹ️" });
    } else {
      toast.success("Product added to cart!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg">
          Browse our full catalog of quality products, handpicked for value
          and durability.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Search + sort bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full sm:w-96">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-56 bg-white text-gray-900 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        <div className="pb-16">
          {loading ? (
            <Spinner label="Loading products..." className="py-24" />
          ) : visibleProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center text-gray-500">
              <FaBoxOpen size={48} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Try adjusting your search.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-6">
                Showing {visibleProducts.length} product
                {visibleProducts.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={(p) => navigate(`/product/${p.id}`)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Login Required!</h2>
            <p className="text-gray-600 mb-6">You must login to add items to your cart.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/login");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Proceed to Login
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterComponent />
    </div>
  );
}
