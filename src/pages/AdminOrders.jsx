import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";

export default function AdminOrders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
      <div className="flex justify-center items-center min-h-screen ml-64">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <NavbarComponent />

        {/* Content Container */}
        <div className="pt-20 p-8">
          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-8">Orders</h1>
            <p className="text-gray-600">Manage and track all customer orders</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Received", "In-Delivery", "Delivered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order No.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Toggle Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {order.user
                            ? `${order.user.first_name ?? ""} ${order.user.last_name ?? ""}`.trim()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'In-Delivery'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEdit(order)}
                            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Change Status
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleView(order)}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              onClick={() => {
                                setOrderIdToDelete(order.id);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              title="Delete Order"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-gray-400">
                        <i className="fas fa-inbox text-4xl mb-2"></i>
                        <p>No orders found under "{activeTab}".</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DETAILS MODAL ===== */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
              <h2 className="text-3xl font-bold text-gray-800">
                Order Details
              </h2>
              <p className="text-blue-600 font-semibold mt-1">
                {selectedOrder.order_number}
              </p>
            </div>

            <div className="px-8 py-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Customer</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedOrder.user?.first_name} {selectedOrder.user?.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedOrder.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800'
                      : selectedOrder.status === 'In-Delivery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Items
              </h3>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Product
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">
                            {item.product?.name ?? "N/A"}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700">
                            ${Number(item.price).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700">
                            ${(item.quantity * Number(item.price)).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-gray-500 py-6">
                          No items found for this order.
                        </td>
                      </tr>
                    )}
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="px-4 py-4 text-right font-bold text-gray-800">
                        Grand Total:
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-green-600 text-lg">
                        ${selectedOrder?.total_price ? Number(selectedOrder.total_price).toFixed(2) : "0.00"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-2xl border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit Order Status
              </h2>
              <p className="text-blue-600 font-semibold mt-1">
                {selectedOrder.order_number}
              </p>
            </div>

            <div className="px-8 py-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Customer</p>
                <p className="text-gray-800 font-medium">
                  {selectedOrder.user?.first_name} {selectedOrder.user?.last_name}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Current Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedOrder.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800'
                    : selectedOrder.status === 'In-Delivery'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder({ ...selectedOrder, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="Received">Received</option>
                  <option value="In-Delivery">In-Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="px-8 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
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
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION MODAL ===== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-8 py-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Confirm Deletion
              </h2>
              <p className="text-gray-600">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
            </div>

            <div className="px-8 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-5 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
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
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}