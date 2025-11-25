import { useLocation, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51SWmLsGX7IdPsrl8yQT9MrxqPvECwkLnosfTur9r0gDRevhliGo0dbGWWUt9FP8MmE2IUKgmqO4ujwjVDF4tZQAs00ASxmd8gZ");


export default function ReceiptPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  console.log(cartItems);
oka
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // const handleCheckout = async () => {
  //   try {
  //     if(cartItems.length === 0){
  //       toast.error("There Are No Items In The Cart")
  //     }

  //     const response = await axios.post("http://127.0.0.1:8000/api/create-checkout-session", 
  //       { products:cartItems }
  //     );

  //     const { url } = response.data;
  //     window.location.href = url; // Redirecting to Stripe Checkout
  //   } catch (error) {
  //     console.error("Error creating checkout session:", error);
  //     alert("Failed to start payment process. Please try again.");
  //   }
  // };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Redirect to payment page with cart data
    navigate("/payment", {
      state: { cartItems, totalAmount },
    });
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <NavbarComponent/>
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Review Your Purchases And Confirm Order</h1>
        <div className="bg-white max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-600 text-center">Receipt</h1>

            <table className="w-full border-collapse text-black">
                <thead>
                <tr className="border-b text-left">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Unit Price</th>
                    <th className="pb-2">Total</th>
                </tr>
                </thead>

                <tbody>
                {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.quantity}</td>
                    {/* <td className="py-2">${item.price.toFixed(2)}</td>
                    <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td> */}
                    <td className="py-2">${Number(item.price).toFixed(2)}</td>
                    <td className="py-2">${(Number(item.price) * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="text-right mt-6 text-xl font-semibold">
                Total Amount: <span className="text-black">${totalAmount.toFixed(2)}</span>
            </div>
             {/* <button 
                className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
                // style={{float:"right"}}
                onClick={()=>navigate("/payment", {
                  state: { cartItems, totalAmount },
                })
              }
            >
              Proceed to Payment 
            </button> */}

            <button
            onClick={handleProceedToPayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            Proceed To Pay
          </button>
        </div>
    </div>
  );
}

// export default ReceiptPage;
