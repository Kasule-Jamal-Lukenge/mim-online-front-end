// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import NavbarComponent from "../components/NavbarComponent";

// const stripePromise = loadStripe("pk_test_51SWmLsGX7IdPsrl8yQT9MrxqPvECwkLnosfTur9r0gDRevhliGo0dbGWWUt9FP8MmE2IUKgmqO4ujwjVDF4tZQAs00ASxmd8gZ");

// export default function PaymentPage() {
//   const location = useLocation();
//   const { cartItems } = location.state || { cartItems: [] };
//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleStripeCheckout = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/create-checkout-session", {
//         products: cartItems,
//       });
//       window.location.href = response.data.url;
//     } catch (error) {
//       console.error("Stripe Error:", error);
//       alert("Payment failed. Try again.");
//     }
//   };

//   const handlePayPalApprove = async (orderID) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/paypal/capture-order", {
//         orderID,
//       });
//       alert("Payment successful via PayPal!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("PayPal Error:", error);
//       alert("Payment capture failed.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <NavbarComponent/>
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Proceed to Payment</h1>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* LEFT SECTION - ORDER SUMMARY */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Order Summary</h2>
//           <hr className="mb-6" />
//           <table className="w-full border-collapse text-black text-sm">
//             <thead>
//               <tr className="border-b text-left">
//                 <th className="pb-2 w-2/5">Product</th>
//                 <th className="pb-2 w-1/5 text-center">Qty</th>
//                 <th className="pb-2 w-1/5 text-right">Unit Price</th>
//                 <th className="pb-2 w-1/5 text-right">Total</th>
//               </tr>
//             </thead>

//             <tbody>
//               {cartItems.map((item, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="py-2 truncate max-w-0" title={item.name}>{item.name}</td>
//                   <td className="py-2 text-center">{item.quantity}</td>
//                   <td className="py-2 text-right">${Number(item.price).toFixed(2)}</td>
//                   <td className="py-2 text-right">${(Number(item.price) * item.quantity).toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="mt-2 pt-2">
//             <div className="flex justify-between text-xl font-bold text-gray-800">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SECTION - PAYMENT OPTIONS */}
//         <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
//           <h2 className="text-xl text-center font-semibold mb-4 text-gray-700">Choose Payment Option</h2>
//           <hr className="mb-6" />
          
//           <div className="flex flex-col gap-6 items-center max-w-md mx-auto w-full">
//             <button
//               onClick={handleStripeCheckout}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow w-full max-w-sm"
//             >
//               Pay with Debit or Credit Card
//             </button>

//             <div className="w-full max-w-sm">
//               <PayPalScriptProvider
//                 options={{
//                   "client-id": "AXs--UziEnKcq_NwUDWcbTF8E5MB6GKqT4T5IP6bNEQ_VFNzA7jwrKGSHgY4Q_rodmpMGaA_QVFIpzqg",
//                   currency: "USD",
//                 }}
//               >
//                 <PayPalButtons
//                   style={{ layout: "vertical" }}
//                   fundingSource="paypal"
//                   createOrder={async () => {
//                     const response = await axios.post(
//                       "http://127.0.0.1:8000/api/paypal/create-order",
//                       { amount: total.toFixed(2) }
//                     );
//                     return response.data.id;
//                   }}
//                   onApprove={async (data) => {
//                     await handlePayPalApprove(data.orderID);
//                   }}
//                   onError={(err) => console.error("PayPal Error:", err)}
//                 />
//               </PayPalScriptProvider>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import NavbarComponent from "../components/NavbarComponent";

const stripePromise = loadStripe(
  "pk_test_51SWmLsGX7IdPsrl8yQT9MrxqPvECwkLnosfTur9r0gDRevhliGo0dbGWWUt9FP8MmE2IUKgmqO4ujwjVDF4tZQAs00ASxmd8gZ"
);

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle undefined state safely
  const { state } = location || {};
  const cartItems = state?.cartItems || [];
  const total = cartItems.length
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  // If no cart items or state, show fallback
  if (!state || !cartItems.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
        <NavbarComponent />
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          No payment data found
        </h1>
        <p className="text-gray-500 mb-6">
          It seems you navigated here directly. Please go back to your cart.
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Back to Cart
        </button>
      </div>
    );
  }

  // 🟦 STRIPE PAYMENT
  const handleStripeCheckout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-checkout-session",
        { products: cartItems }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Stripe Error:", error);
      alert("Payment failed. Try again.");
    }
  };

  // 🟦 PAYPAL PAYMENT
  const handlePayPalApprove = async (orderID) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/paypal/capture-order",
        { orderID }
      );
      alert("Payment successful via PayPal!");
      console.log(response.data);
      navigate("/"); // or navigate to success page
    } catch (error) {
      console.error("PayPal Error:", error);
      alert("Payment capture failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <NavbarComponent />
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Proceed to Payment
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SECTION - ORDER SUMMARY */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
            Order Summary
          </h2>
          <hr className="mb-6" />
          <table className="w-full border-collapse text-black text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 w-2/5">Product</th>
                <th className="pb-2 w-1/5 text-center">Qty</th>
                <th className="pb-2 w-1/5 text-right">Unit Price</th>
                <th className="pb-2 w-1/5 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 truncate max-w-0" title={item.name}>
                    {item.name}
                  </td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">
                    ${Number(item.price).toFixed(2)}
                  </td>
                  <td className="py-2 text-right">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 pt-2">
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - PAYMENT OPTIONS */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
          <h2 className="text-xl text-center font-semibold mb-4 text-gray-700">
            Choose Payment Option
          </h2>
          <hr className="mb-6" />

          <div className="flex flex-col gap-6 items-center max-w-md mx-auto w-full">
            <button
              onClick={handleStripeCheckout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow w-full max-w-sm"
            >
              Pay with Debit or Credit Card
            </button>

            <div className="w-full max-w-sm">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AXs--UziEnKcq_NwUDWcbTF8E5MB6GKqT4T5IP6bNEQ_VFNzA7jwrKGSHgY4Q_rodmpMGaA_QVFIpzqg",
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  fundingSource="paypal"
                  createOrder={async () => {
                    const response = await axios.post(
                      "http://127.0.0.1:8000/api/paypal/create-order",
                      { amount: total.toFixed(2) }
                    );
                    return response.data.id;
                  }}
                  onApprove={async (data) => {
                    await handlePayPalApprove(data.orderID);
                  }}
                  onError={(err) => console.error("PayPal Error:", err)}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
