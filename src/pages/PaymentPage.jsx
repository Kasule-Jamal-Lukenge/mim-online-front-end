import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const stripePromise = loadStripe("pk_test_51SWmLsGX7IdPsrl8yQT9MrxqPvECwkLnosfTur9r0gDRevhliGo0dbGWWUt9FP8MmE2IUKgmqO4ujwjVDF4tZQAs00ASxmd8gZ");

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cartItems } = location.state || { cartItems: [] };

  const handleCheckout = async () => {
    try {
      if(cartItems.length === 0){
        toast.error("There Are No Items In The Cart")
      }

      const response = await axios.post("http://127.0.0.1:8000/api/create-checkout-session", 
        { products:cartItems }
      );

      const { url } = response.data;
      window.location.href = url; // Redirecting to Stripe Checkout
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to start payment process. Please try again.");
    }
  };

   const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Proceed to Payment</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Review your order and pay securely using your debit or credit card.
      </p>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Items</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2 text-gray-700"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="text-right font-bold mt-4 text-gray-800">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
      >
        Pay with Card
      </button>
    </div>
  );
}
