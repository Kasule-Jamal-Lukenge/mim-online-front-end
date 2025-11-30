// import React, { useState, useContext, useEffect, useMemo} from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// export default function AdminProducts(){
//     const { token } = useContext(AuthContext);
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showModal, setShowModal] = useState(false);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         price: "",
//         category_id: "",
//         image: null,
//     });
//     const [search, setSearch] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(5);

//     // Fetch products
//     const fetchProducts = async () => {
//         try {
//         const res = await api.get("/admin/products", {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         setProducts(res.data);
//         } catch (err) {
//         console.error("Error fetching products:", err);
//         toast.error("Failed to load products.");
//         } finally {
//         setLoading(false);
//         }
//     };

//     // Fetch categories for dropdown
//     const fetchCategories = async () => {
//         try {
//         const res = await api.get("/admin/categories", {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         setCategories(res.data);
//         } catch (err) {
//         console.error("Error Fetching Categories:", err);
//         toast.error("Failed To Load Categories.");
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, [token]);

//     // Handle Input Change
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // // Add Or Update product
//     // const handleSave = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         if (editingProduct) {
//     //             await api.put(`/admin/products/${editingProduct.id}`, form, {
//     //                 headers: { Authorization: `Bearer ${token}` },
//     //             });
//     //             toast.success("Product Updated Successfully!");
//     //         } else {
//     //             console.log(form);
//     //             await api.post("/admin/products", form, {
//     //             headers: { Authorization: `Bearer ${token}` },
//     //             });
//     //             toast.success("Product Added Successfully!");
//     //         }
//     //         setShowModal(false);
//     //         setForm({ name: "", description: "", price: "", category_id: "" });
//     //         setEditingProduct(null);
//     //         fetchProducts();
//     //     } catch (err) {
//     //         console.error("Error Saving Product:", err);
//     //         toast.error("Failed To Save Product.");
//     //     }
//     // };

//     // Add Or Update product
//     const handleSave = async (e) => {
//     e.preventDefault();

//     try {
//         if (editingProduct) {
//         // ✅ For updates, still allow JSON if no new file
//         const formData = new FormData();
//         formData.append("name", form.name);
//         formData.append("description", form.description);
//         formData.append("price", form.price);
//         formData.append("stock", form.stock);
//         formData.append("category_id", form.category_id);
//         if (form.image) formData.append("image", form.image);

//         await api.put(`/admin/products/${editingProduct.id}`, formData, {
//             headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//             },
//         });
//         toast.success("Product Updated Successfully!");
//         } else {
//             // For adding new product, send FormData with the image
//             const formData = new FormData();
//             formData.append("name", form.name);
//             formData.append("description", form.description);
//             formData.append("price", form.price);
//             formData.append("stock", form.stock);
//             formData.append("category_id", form.category_id);
//             if (form.image) formData.append("image", form.image);

//             await api.post("/admin/products", formData, {
//                 headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "multipart/form-data",
//                 },
//             });
//             toast.success("Product Added Successfully!");
//         }

//         setShowModal(false);
//         setForm({
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         category_id: "",
//         image: null,
//         });
//         setEditingProduct(null);
//         fetchProducts();
//     } catch (err) {
//         console.error("Error Saving Product:", err.response?.data || err);
//         toast.error("Failed To Save Product.");
//     }
//     };


//     // Edit product
//     const handleEdit = (product) => {
//         setEditingProduct(product);
//         setForm({
//             name: product.name,
//             description: product.description,
//             price: product.price,
//             category_id: product.category_id,
//         });
//         setShowModal(true);
//     };

//     // Delete product
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are You Sure You Want To Delete This Product?")) return;
//         try {
//         await api.delete(`/admin/products/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("Product Deleted Successfully!");
//         fetchProducts();
//         } catch (err) {
//         console.error("Error Seleting Product:", err);
//         toast.error("Failed To Delete Product.");
//         }
//     };

//     // Filter products by search input
//     const filteredProducts = useMemo(() => {
//         return products.filter(
//         (prod) =>
//             prod.name.toLowerCase().includes(search.toLowerCase()) ||
//             (prod.description &&
//             prod.description.toLowerCase().includes(search.toLowerCase())) ||
//             (prod.category_name &&
//             prod.category_name.toLowerCase().includes(search.toLowerCase()))
//         );
//     }, [search, products]);

//     // Pagination logic
//     const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginatedProducts = filteredProducts.slice(
//         startIndex,
//         startIndex + itemsPerPage
//     );

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) setCurrentPage(page);
//     };

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [search, itemsPerPage]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <p className="text-gray-500 text-lg">Loading products...</p>
//             </div>
//         );
//     }

    
//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//             <h1 className="text-3xl font-bold text-blue-700">Manage Products</h1>

//             <div className="flex flex-wrap items-center gap-3">
//             {/* Search */}
//             <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="border border-gray-300 rounded-md p-2 w-64 focus:ring focus:ring-blue-300"
//             />

//             {/* Items per page */}
//             <select
//                 value={itemsPerPage}
//                 onChange={(e) => setItemsPerPage(Number(e.target.value))}
//                 className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
//             >
//                 <option value={5}>5 per page</option>
//                 <option value={10}>10 per page</option>
//                 <option value={15}>15 per page</option>
//             </select>

//             {/* Add button */}
//             <button
//                 onClick={() => {
//                 setEditingProduct(null);
//                 setForm({
//                     name: "",
//                     description: "",
//                     price: "",
//                     category_id: "",
//                 });
//                 setShowModal(true);
//                 }}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             >
//                 + Add Product
//             </button>
//             </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
//             <table className="w-full text-sm text-left border border-gray-200">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                 <tr>
//                 <th className="p-3 border">#</th>
//                 <th className="p-3 border">Name</th>
//                 {/* <th className="p-3 border">Description</th> */}
//                 <th className="p-3 border">Price ($)</th>
//                 <th className="p-3 border">Category</th>
//                 <th className="p-3 border text-center">Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {paginatedProducts.length > 0 ? (
//                 paginatedProducts.map((prod, index) => (
//                     <tr key={prod.id} className="hover:bg-gray-50">
//                     <td className="p-3 border text-gray-600">
//                         {startIndex + index + 1}
//                     </td>
//                     <td className="p-3 border font-medium text-gray-800">
//                         {prod.name}
//                     </td>
//                     {/* <td className="p-3 border text-gray-600">
//                         {prod.description || "—"}
//                     </td> */}
//                     <td className="p-3 border text-green-600 font-semibold">
//                         ${prod.price}
//                     </td>
//                     <td className="p-3 border text-blue-700 font-medium">
//                         {prod.category_name || "Uncategorized"}
//                     </td>
//                     <td className="p-3 border text-center">
//                         <button
//                         onClick={() => handleEdit(prod)}
//                         className="px-3 py-1 text-sm bg-blue-400 text-white rounded hover:bg-yellow-500 mr-2"
//                         >
//                         <i className="fa fa-edit"></i>
//                         </button>
//                         <button
//                         onClick={() => handleDelete(prod.id)}
//                         className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//                         >
//                         <i className="fa fa-trash"></i>
//                         </button>
//                     </td>
//                     </tr>
//                 ))
//                 ) : (
//                 <tr>
//                     <td colSpan="7" className="text-center p-4 text-gray-400">
//                     No products found.
//                     </td>
//                 </tr>
//                 )}
//             </tbody>
//             </table>

//             {/* Pagination */}
//             {totalPages > 1 && (
//             <div className="flex justify-center mt-4 space-x-2">
//                 <button
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 border rounded ${
//                     currentPage === 1
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-white hover:bg-gray-100"
//                 }`}
//                 >
//                 Prev
//                 </button>

//                 {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                     key={i + 1}
//                     onClick={() => goToPage(i + 1)}
//                     className={`px-3 py-1 border rounded ${
//                     currentPage === i + 1
//                         ? "bg-blue-600 text-white"
//                         : "bg-white hover:bg-gray-100"
//                     }`}
//                 >
//                     {i + 1}
//                 </button>
//                 ))}

//                 <button
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 border rounded ${
//                     currentPage === totalPages
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-white hover:bg-gray-100"
//                 }`}
//                 >
//                 Next
//                 </button>
//             </div>
//             )}
//         </div>

//         {/* Modal for Add/Edit */}
//         {showModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//                 <h2 className="text-xl font-semibold mb-4 text-blue-700">
//                 {editingProduct ? "Edit Product" : "Add New Product"}
//                 </h2>

//                 <form onSubmit={handleSave} className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                     Name
//                     </label>
//                     <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                     Description
//                     </label>
//                     <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     rows="3"
//                     className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                         Price ($)
//                     </label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={form.price}
//                         onChange={handleChange}
//                         required
//                         className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
//                     />
//                     </div>

//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                     Category
//                     </label>
//                     <select
//                     name="category_id"
//                     value={form.category_id}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
//                     >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                         {cat.name}
//                         </option>
//                     ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                         Product Image
//                     </label>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={(e) =>
//                         setForm({ ...form, image: e.target.files[0] })
//                         }
//                         className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
//                     />
//                 </div>


//                 <div className="flex justify-end space-x-2 mt-4">
//                     <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//                     >
//                     Cancel
//                     </button>
//                     <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                     {editingProduct ? "Update" : "Save"}
//                     </button>
//                 </div>
//                 </form>
//             </div>
//             </div>
//         )}
//         </div>
//     );
// }










import React, { useState, useContext, useEffect, useMemo} from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";

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
        category_id: "",
        image: null,
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
        console.error("Error Fetching Categories:", err);
        toast.error("Failed To Load Categories.");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [token]);

    // Handle Input Change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add Or Update product
    const handleSave = async (e) => {
    e.preventDefault();

    try {
        if (editingProduct) {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("stock", form.stock);
        formData.append("category_id", form.category_id);
        if (form.image) formData.append("image", form.image);

        await api.put(`/admin/products/${editingProduct.id}`, formData, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Product Updated Successfully!");
        } else {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("stock", form.stock);
            formData.append("category_id", form.category_id);
            if (form.image) formData.append("image", form.image);

            await api.post("/admin/products", formData, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Product Added Successfully!");
        }

        setShowModal(false);
        setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        image: null,
        });
        setEditingProduct(null);
        fetchProducts();
    } catch (err) {
        console.error("Error Saving Product:", err.response?.data || err);
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
            <div className="flex justify-center items-center min-h-screen ml-64">
                <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
        );
    }

    
    return (
        <div className="flex min-h-screen bg-gray-50">
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
                        <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-2">Products</h1>
                        <p className="text-gray-600 mt-4">Manage your product inventory</p>
                    </div>

                    {/* Search and Actions Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Search */}
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 bg-white focus:border-blue-500 transition-all"
                                />
                            </div>

                            {/* Items per page */}
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-500 bg-white focus:border-blue-500 transition-all"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={15}>15 per page</option>
                            </select>
                        </div>

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
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <i className="fas fa-plus"></i>
                            Add Product
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paginatedProducts.length > 0 ? (
                                        paginatedProducts.map((prod, index) => (
                                            <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {startIndex + index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                    {prod.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="text-green-600 font-semibold">
                                                        ${prod.price}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {prod.category_name || "Uncategorized"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => handleEdit(prod)}
                                                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                                            title="Edit Product"
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(prod.id)}
                                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                            title="Delete Product"
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-12 text-gray-400">
                                                <i className="fas fa-inbox text-4xl mb-2"></i>
                                                <p>No products found.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 py-4 border-t border-gray-200 bg-gray-50">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        currentPage === 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                    }`}
                                >
                                    <i className="fas fa-chevron-left mr-2"></i>
                                    Previous
                                </button>

                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => goToPage(i + 1)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                currentPage === i + 1
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        currentPage === totalPages
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                    }`}
                                >
                                    Next
                                    <i className="fas fa-chevron-right ml-2"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editingProduct ? "Edit Product" : "Add New Product"}
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {editingProduct ? "Update product information" : "Fill in the details to add a new product"}
                            </p>
                        </div>

                        <div className="px-8 py-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Name:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Enter product description"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price ($):
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category:
                                </label>
                                <select
                                    name="category_id"
                                    value={form.category_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Image:
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        placeholder="Please Add An Image..."
                                        onChange={(e) =>
                                            setForm({ ...form, image: e.target.files[0] })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    {editingProduct ? "Update Product" : "Add Product"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}