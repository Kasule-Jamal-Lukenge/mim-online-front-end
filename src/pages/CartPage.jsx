import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("/payment", {state:{cartItems}});
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent/>
      
      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-24 px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 font-semibold text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center border-b py-4">
                  {/* Product Column */}
                  <div className="col-span-5 flex items-center gap-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 break-words">{item.name}</h3>
                    </div>
                  </div>

                  {/* Unit Price Column */}
                  <div className="col-span-2 text-center">
                    <p className="text-green-600 font-medium">${Number(item.price).toFixed(2)}</p>
                  </div>

                  {/* Quantity Column */}
                  <div className="col-span-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      -
                    </button>
                    <span className="text-gray-700 px-4 py-1 border border-gray-300 rounded min-w-[50px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Column */}
                  <div className="col-span-2 text-right">
                    <p className="text-gray-800 font-semibold text-lg">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white bg-red-600 hover:bg-red-700 text-sm mt-1 px-3 py-1 rounded transition-colors"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="mt-6 pt-4 border-t-2">
                <div className="flex justify-end items-center gap-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Total: ${total.toFixed(2)}
                  </h2>
                  <button 
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                    onClick={handleCheckOut}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}