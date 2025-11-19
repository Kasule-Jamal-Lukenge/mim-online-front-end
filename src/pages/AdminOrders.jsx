// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// export default function AdminOrders() {
//   const { token } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState("All");
//   const [loading, setLoading] = useState(true);

//   // Fetching All Orders
//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/admin/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to load orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [token]);

//   // Handling status update
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await api.put(
//         `/admin/orders/${orderId}/status`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(`Order updated to "${newStatus}"`);
//       fetchOrders();
//     } catch (err) {
//       console.error("Error updating status:", err);
//       toast.error("Failed to update order status.");
//     }
//   };

//   // Filtering orders by status
//   const filteredOrders =
//     activeTab === "All"
//       ? orders
//       : orders.filter((o) => o.status === activeTab);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-500 text-lg">Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">Orders</h1>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300 pb-2">
//         {["All", "Received", "In-Delivery", "Delivered"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-t-md font-medium transition ${
//               activeTab === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 hover:bg-gray-300 text-gray-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
//         <table className="w-full text-sm text-left border border-gray-200">
//           <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//             <tr>
//               <th className="p-3 border">#</th>
//               <th className="p-3 border">Customer</th>
//               <th className="p-3 border">Product</th>
//               <th className="p-3 border">Quantity</th>
//               <th className="p-3 border">Total ($)</th>
//               <th className="p-3 border">Status</th>
//               <th className="p-3 border text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order, index) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="p-3 border text-gray-600">{index + 1}</td>
//                   <td className="p-3 border">
//                     {order.user.first_name || "N/A"}</td>
//                   <td className="p-3 border">{order.product?.name}</td>
//                   <td className="p-3 border">{order.quantity}</td>
//                   <td className="p-3 border font-semibold text-green-600">
//                     ${order.total_price}
//                   </td>
//                   <td className="p-3 border text-blue-700 font-medium">
//                     {order.status}
//                   </td>
//                   <td className="p-3 border text-center">
//                     {order.status === "Received" && (
//                       <button
//                         onClick={() =>
//                           handleStatusChange(order.id, "In-Delivery")
//                         }
//                         className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
//                       >
//                         Mark In-Delivery
//                       </button>
//                     )}
//                     {order.status === "In-Delivery" && (
//                       <button
//                         onClick={() =>
//                           handleStatusChange(order.id, "Delivered")
//                         }
//                         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                       >
//                         Mark Delivered
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center p-4 text-gray-400">
//                   No orders found under "{activeTab}".
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  // ===== ACTION HANDLERS =====
const handleView = (order) => {
  setSelectedOrder(order);
  setShowDetails(true);
};

const handleEdit = (order) => {
  setSelectedOrder(order);
  setShowEditModal(true);
};

const handleDelete = async (orderId) => {
  if (!window.confirm("Are you sure you want to delete this order?")) return;
  try {
    await api.delete(`/admin/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Order deleted successfully!");
    fetchOrders();
  } catch (err) {
    console.error("Error deleting order:", err);
    toast.error("Failed to delete order.");
  }
};


  useEffect(() => {
    fetchOrders();
  }, [token]);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(
        `/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Order updated to "${newStatus}"`);
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update order status.");
    }
  };

  // Filter orders by active tab
  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === activeTab.toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

    console.log(orders)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Orders</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300 pb-2">
        {["All", "Received", "In-Delivery", "Delivered"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-md font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

    {/* Orders Table */}
    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="p-3 border">#</th>
            <th className="p-3 border">Order No.</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 border text-gray-600">{index + 1}</td>
                <td className="p-3 border font-semibold text-blue-600">
                  {order.order_number}
                </td>
                <td className="p-3 border text-gray-800">
                  {order.user
                    ? `${order.user.first_name ?? ""} ${order.user.last_name ?? ""}`.trim()
                    : "N/A"}
                </td>
                <td className="p-3 border text-gray-600">
                 { order.status }
                </td>
                <td className="p-3 border text-gray-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 border text-center flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(order)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleView(order)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-400">
                No orders found under "{activeTab}".
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    </div>
  );
}

