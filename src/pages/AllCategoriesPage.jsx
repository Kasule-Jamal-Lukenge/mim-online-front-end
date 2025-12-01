import React, { useEffect, useState } from "react";
import api from "../api/axios";
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate } from "react-router-dom";

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent />
      <div className="pt-24 px-6 pb-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          All Categories
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Products
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
