import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import NavbarComponent from "../components/NavbarComponent";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OrderHistoryPage() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your orders.");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load your orders. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  const handlePayNow = (order) => {
    // Navigate to payment page with order info
    navigate("/payment", {
      state: {
        orderId: order.id,
        orderNumber: order.order_number,
        total: order.total_price,
        items: order.items?.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent />
      <div className="pt-24 px-4 sm:px-6 pb-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          My Order History
        </h1>

        {loading ? (
          <Spinner label="Loading your orders..." className="py-24" />
        ) : orders.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-gray-800">
              <thead className="bg-gray-200 text-gray-700 font-semibold">
                <tr>
                  <th className="py-3 px-4 text-left">Order No</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Total</th>
                  <th className="py-3 px-4 text-center">Payment</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium">
                      {order.order_number}
                    </td>
                    <td className="py-3 px-4">{order.status}</td>
                    <td className="py-3 px-4 text-center">
                      ${Number(order.total_price).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.payment_status === "Paid" ? (
                        <span className="text-green-600 font-semibold">
                          Paid
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.payment_status === "Paid" ? (
                        <span className="text-gray-500 text-sm">—</span>
                      ) : (
                        <button
                          onClick={() => handlePayNow(order)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
