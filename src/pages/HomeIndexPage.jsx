import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import toast from 'react-hot-toast';
import NavbarComponent from '../components/NavbarComponent';

export default function HomeIndexPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const { addToCart, totalItems } = useCart();

  const { cartItems, addToCart, updateQuantity, totalItems } = useCart();

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
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please log in to add products to your cart.');
      navigate('/login');
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

  // Product Card Component
  const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
          />
          
          {/* Overlay with details on hover */}
          <div className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-white text-center px-4">
              <p className="text-sm mb-2">
                {product.description || "Premium quality product with excellent features and durability."}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Quick Add
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1">
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent/>

      {/* Carousel */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to AloStore Africa</h1>
          <p className="max-w-2xl text-lg mb-6">Your one-stop destination for quality products and fast delivery.</p>
          <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Product Categories</h2>
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
          <div className="text-center mt-10">
            <Link to="/categories" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-10 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="px-10 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Most Sought After</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-10 py-16 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get in Touch</h2>
          <form className="bg-white shadow-lg p-8 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              className="border border-gray-300 rounded-lg p-3 w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              className="border border-gray-300 rounded-lg p-3 w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="text-center mt-8">
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-10 text-center">
          <p className="text-gray-400">&copy; 2025 Mim Online. All rights reserved.</p>
        </div>
      </footer>

      {/* 🟦 Modal Section */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
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
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
    </div>
  );
}