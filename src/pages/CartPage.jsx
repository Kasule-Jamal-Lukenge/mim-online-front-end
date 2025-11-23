import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("/receipt", {state:{cartItems}});
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-3">
              <div className="flex items-center gap-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="text-gray-700 p-2" style={{ border:" 1px solid", borderRadius:"4px"} }>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <div>
                <p className="text-gray-700 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white-600 text-sm mt-1"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-bold text-gray-800">
              Total: ${total.toFixed(2)}
            </h2>
            <button 
                className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
                onClick={handleCheckOut}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
