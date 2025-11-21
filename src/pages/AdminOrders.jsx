import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [orderIdToDelete, setOrderIdToDelete] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);


  // Fetching orders
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
  const handleView = async (order) => {
    try {
        console.log("Fetching order details for:", order.id);
        const res = await api.get(`/admin/orders/${order.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelectedOrder(res.data);
        setShowDetails(true);
      } catch (err) {
        console.error("Error fetching order details:", err);
        toast.error("Failed to load order details.");
      }
  };

  const handleEdit = (order) => {
    console.log("Attempting To Edit");
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleDelete = async (orderId) => {
    console.log("Attempting To Delete");
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

  // Updating Order Status
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

  // Filtering Orders By Active Tab
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
              <th>Toggle Status</th>
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

                  <td className="p-3 border text-gray-600">
                    <button
                      onClick={() => handleEdit(order)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-500"
                    >
                      Edit
                    </button>
                  </td>

                  <td className="p-3 border text-center flex gap-2 justify-center">
                    <button
                      onClick={() => handleView(order)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => {
                        setOrderIdToDelete(order.id)
                        setShowDeleteModal(true);
                      }}
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

      {/* ===== DETAILS MODAL ===== */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Order Details — {selectedOrder.order_number}
            </h2>

            <p className="text-gray-600">
              <strong>Customer:</strong>{" "}
              {selectedOrder.user?.first_name} {selectedOrder.user?.last_name}
            </p>

            <p className="text-gray-600 pt-2">
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.created_at).toLocaleString()}
            </p>
            
            <p className="text-gray-600 pt-2">
              <strong>Status:</strong> {selectedOrder.status}
            </p>

            <h3 className="mt-4 mb-2 font-semibold text-gray-600">
              Items:
            </h3>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border text-center">Qty</th>
                  <th className="p-2 border text-center">Unit Price ($)</th>
                  <th className="p-2 border text-center">Total ($)</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 border"><p className="text-gray-600">{item.product?.name ?? "N/A"}</p></td>
                      <td className="p-2 border text-center"><p className="text-gray-600">{item.quantity}</p></td>
                      <td className="p-2 border text-center">
                        <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
                      </td>
                      <td className="p-2 border text-center">
                        <p className="text-gray-600">${(item.quantity * Number(item.price)).toFixed(2)}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 p-3">
                      No items found for this order.
                    </td>
                  </tr>
                )}

                <tr className="font-bold text-green-700">
                  <td colSpan="3" className="p-2 border text-right">
                    Grand Total:
                  </td>
                  <td className="p-2 border text-center">
                    ${selectedOrder?.total_price ? Number(selectedOrder.total_price).toFixed(2) : "0.00"}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-right mt-4">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Edit Order — {selectedOrder.order_number}
            </h2>

            <p className="text-gray-600 mb-2">
              <strong>Customer:</strong> {selectedOrder.user?.first_name}{" "}
              {selectedOrder.user?.last_name}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Current Status:</strong> {selectedOrder.status}
            </p>

            {/* Status Dropdown */}
            <label className="block text-gray-700 mb-1">Update Status</label>
            <select
              value={selectedOrder.status}
              onChange={(e) =>
                setSelectedOrder({ ...selectedOrder, status: e.target.value })
              }
              className="border border-gray-300 rounded w-full p-2 mb-4"
            >
              <option value="Received">Received</option>
              <option value="In-Delivery">In-Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await api.put(
                      `/admin/orders/${selectedOrder.id}/status`,
                      { status: selectedOrder.status },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("Order updated successfully!");
                    setShowEditModal(false);
                    fetchOrders();
                  } catch (err) {
                    console.error("Error updating order:", err);
                    toast.error("Failed to update order.");
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION MODAL ===== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Are You Sure You Want To Delete This Order?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await api.delete(`/admin/orders/${orderIdToDelete}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    toast.success("Order Deleted Successfully!");
                    setShowDeleteModal(false);
                    setOrderIdToDelete(null);
                    fetchOrders();
                  } catch (err) {
                    console.error("Error Deleting Order:", err);
                    toast.error("Failed To Delete Order.");
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

