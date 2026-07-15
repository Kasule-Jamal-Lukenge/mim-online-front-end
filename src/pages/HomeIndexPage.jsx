import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import toast from 'react-hot-toast';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import Spinner from '../components/Spinner';

export default function HomeIndexPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const { addToCart, } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes, popRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products?limit=8'),
          api.get('/products/popular')
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
        setPopularProducts(popRes.data);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      setShowLoginModal(true);       
      // navigate('/login');
      return;
    }
    console.log('Product added to cart:', product.name);
    // toast.success("Product Added To Cart!");
    addToCart(product);

    const exists = addToCart(product);
    if (exists) {
      // Showing Modal To Prompt Confirmation Of Quantity Increment If An Item Already Exists In The Cart
      setSelectedProduct(product);
      setShowModal(true);
    } else {
      toast.success("Product added to cart!");
    }
  };

  const confirmIncrease = () => {
    addToCart(selectedProduct, true); // Confirm Increasing In Quantity
    toast.success("Quantity increased!");
    setShowModal(false);
  };

  // Product Card Component (flips on hover to reveal the description)
  const ProductCard = ({ product }) => {
    return (
      <div className="group [perspective:1000px] h-80 transition-transform duration-300 hover:-translate-y-2">
        <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front face */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover flex-shrink-0"
            />
            <div className="p-4 flex items-center justify-between flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                <p className="text-green-600 font-bold text-lg">${Number(product.price).toFixed(2)}</p>
              </div>

              {/* Cart Icon */}
              <button
                onClick={() => handleAddToCart(product)}
                className="ml-3 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 flex-shrink-0"
              >
                <FaShoppingCart size={18} />
              </button>
            </div>
          </div>

          {/* Back face */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image_url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="relative h-full flex flex-col p-4 bg-white/60">
              <h3 className="font-semibold text-gray-800 mb-1 truncate flex-shrink-0">{product.name}</h3>
              <p className="text-green-600 font-bold mb-2 flex-shrink-0">${Number(product.price).toFixed(2)}</p>
              <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-600 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {product.description || "Premium quality product with excellent features and durability."}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex-shrink-0"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent/>

      {/* Carousel */}
      <div className="relative w-full h-[380px] sm:h-[450px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Welcome to AloStore Africa</h1>
          <p className="max-w-2xl text-base sm:text-lg mb-6">Your one-stop destination for quality products and fast delivery.</p>
          <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Product Categories</h2>
          {loading ? (
            <Spinner label="Loading categories..." className="py-16" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={cat.image_url ? cat.image_url : "/no-image.png"}
                    alt={cat.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/categories" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Featured Products</h2>
          {loading ? (
            <Spinner label="Loading products..." className="py-16" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Most Sought After</h2>
          {loading ? (
            <Spinner label="Loading popular products..." className="py-16" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-28 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Get in Touch</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Have a question about an order or a product? Send us a message
              and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Left info panel */}
            <div className="lg:col-span-2 bg-blue-700 text-white p-6 sm:p-10 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                We're here to help with orders, product questions, and
                anything else on your mind.
              </p>
              <div className="space-y-4 text-blue-100 text-sm">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt /> 13004 Meridian Avenue St., Everett, Washington
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt /> +1 (206) 791-7445
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope /> support@alostoreafrica.com
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-block mt-8 text-sm font-semibold text-white underline underline-offset-4 hover:text-blue-100 transition-colors"
              >
                Visit our full Contact page &rarr;
              </Link>
            </div>

            {/* Right panel: form */}
            <div className="lg:col-span-3 p-6 sm:p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterComponent />

      {/* 🟦 Modal Section */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Item Already In Cart
            </h2>
            <p className="text-gray-600 mb-6">
              "{selectedProduct?.name}" is already in your cart.
              <br /> Do you want to increase its quantity?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-red-400"
              >
                No
              </button>
              <button
                onClick={confirmIncrease}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Login Required!
            </h2>
            <p className="text-gray-600 mb-6">
              You must login to view your cart and add items.
            </p>
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
    </div>
  );
}