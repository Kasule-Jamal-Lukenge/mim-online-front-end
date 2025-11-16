import React, { useState, useContext, useEffect, useMemo} from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function AdminProducts(){
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
    });
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Fetch products
    const fetchProducts = async () => {
        try {
        const res = await api.get("/admin/products", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
        } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products.");
        } finally {
        setLoading(false);
        }
    };

    // Fetch categories for dropdown
    const fetchCategories = async () => {
        try {
        const res = await api.get("/admin/categories", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
        } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Failed to load categories.");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [token]);

    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add or Update product
    const handleSave = async (e) => {
        e.preventDefault();
        try {
        if (editingProduct) {
            await api.put(`/admin/products/${editingProduct.id}`, form, {
            headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Product Updated Successfully!");
        } else {
            await api.post("/admin/products", form, {
            headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Product Added Successfully!");
        }
        setShowModal(false);
        setForm({ name: "", description: "", price: "", category_id: "" });
        setEditingProduct(null);
        fetchProducts();
        } catch (err) {
        console.error("Error Saving Product:", err);
        toast.error("Failed To Save Product.");
        }
    };

    // Edit product
    const handleEdit = (product) => {
        setEditingProduct(product);
        setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
        });
        setShowModal(true);
    };

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Are You Sure You Want To Delete This Product?")) return;
        try {
        await api.delete(`/admin/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product Deleted Successfully!");
        fetchProducts();
        } catch (err) {
        console.error("Error Seleting Product:", err);
        toast.error("Failed To Delete Product.");
        }
    };

    // Filter products by search input
    const filteredProducts = useMemo(() => {
        return products.filter(
        (prod) =>
            prod.name.toLowerCase().includes(search.toLowerCase()) ||
            (prod.description &&
            prod.description.toLowerCase().includes(search.toLowerCase())) ||
            (prod.category_name &&
            prod.category_name.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, products]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, itemsPerPage]);

    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-500 text-lg">Loading products...</p>
        </div>
        );
    }

    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Manage Products</h1>

            <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="border border-gray-300 rounded-md p-2 w-64 focus:ring focus:ring-blue-300"
            />

            {/* Items per page */}
            <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={15}>15 per page</option>
            </select>

            {/* Add button */}
            <button
                onClick={() => {
                setEditingProduct(null);
                setForm({
                    name: "",
                    description: "",
                    price: "",
                    category_id: "",
                });
                setShowModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                + Add Product
            </button>
            </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Price ($)</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {paginatedProducts.length > 0 ? (
                paginatedProducts.map((prod, index) => (
                    <tr key={prod.id} className="hover:bg-gray-50">
                    <td className="p-3 border text-gray-600">
                        {startIndex + index + 1}
                    </td>
                    <td className="p-3 border font-medium text-gray-800">
                        {prod.name}
                    </td>
                    <td className="p-3 border text-gray-600">
                        {prod.description || "—"}
                    </td>
                    <td className="p-3 border text-green-600 font-semibold">
                        ${prod.price}
                    </td>
                    <td className="p-3 border text-blue-700 font-medium">
                        {prod.category_name || "Uncategorized"}
                    </td>
                    <td className="p-3 border text-center">
                        <button
                        onClick={() => handleEdit(prod)}
                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-2"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(prod.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-400">
                    No products found.
                    </td>
                </tr>
                )}
            </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
                <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                    currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
                >
                Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                >
                    {i + 1}
                </button>
                ))}

                <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                    currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
                >
                Next
                </button>
            </div>
            )}
        </div>

        {/* Modal for Add/Edit */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-blue-700">
                {editingProduct ? "Edit Product" : "Add New Product"}
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
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Category
                    </label>
                    <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                        {cat.name}
                        </option>
                    ))}
                    </select>
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
                    {editingProduct ? "Update" : "Save"}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
}