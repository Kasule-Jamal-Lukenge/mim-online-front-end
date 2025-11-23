import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function HomeIndexPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

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

  const { cartItems, addToCart, updateQuantity, totalItems } = useCart();

  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please log in to add products to your cart.');
      navigate('/login');
      return;
    }
    console.log('Product added to cart:', product.name);
    toast.success("Product Added To Cart!");
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-700">Mim Online</div>
        <div className="flex items-center gap-6 text-gray-700 font-medium">
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
            <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</Link>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
          )}
        </div>
      </nav>

      {/* Carousel */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold mb-3">Welcome to Gloria's Online Store</h1>
          <p className="max-w-xl">Your one-stop destination for quality products and fast delivery.</p>
        </div>
      </div>

      {/* Categories Section */}
      <section className="px-10 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <div 
            key={cat.id} 
            className="bg-white rounded-lg shadow-md p-4 text-center"
            >
              <img 
                src={cat.image_url ? cat.image_url : "/no-image.png"} 
                alt={cat.name} 
                className="w-full h-40 object-cover rounded-md mb-3" 
              />
              <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/categories" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">View All</Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-10 py-12 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg shadow p-4 text-center">
              <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="font-semibold text-gray-700">{product.name}</h3>
              <p className="text-green-600 font-bold mb-3">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="px-10 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Most Sought After</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 text-center">
              <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="font-semibold text-gray-700">{product.name}</h3>
              <p className="text-green-600 font-bold mb-3">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-10 py-16 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get in Touch</h2>
        <form className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="border border-gray-300 rounded p-2" />
            <input type="email" placeholder="Email Address" className="border border-gray-300 rounded p-2" />
          </div>
          <input type="text" placeholder="Subject" className="border border-gray-300 rounded p-2 w-full mt-4" />
          <textarea placeholder="Your Message" rows="5" className="border border-gray-300 rounded p-2 w-full mt-4"></textarea>
          <div className="text-center mt-6">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Send Message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
