import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function AdminCategories() {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update category
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/admin/categories/${editingCategory.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Category updated successfully!");
      } else {
        await api.post("/admin/categories", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Category added successfully!");
      }
      setShowModal(false);
      setForm({ name: "", description: "" });
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      toast.error("Failed to save category.");
    }
  };

  // Edit category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setForm({ name: category.name, description: category.description });
    setShowModal(true);
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete category.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Manage Categories</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setForm({ name: "", description: "" });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="p-3 border text-gray-600">{index + 1}</td>
                  <td className="p-3 border font-medium text-gray-800">{cat.name}</td>
                  <td className="p-3 border text-gray-600">
                    {cat.description || "—"}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                  placeholder="Enter category description"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingCategory ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
