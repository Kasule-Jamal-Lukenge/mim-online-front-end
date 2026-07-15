import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaThLarge, FaArrowRight } from "react-icons/fa";

function CategoryCard({ category, onView }) {
  return (
    <div
      onClick={() => onView(category)}
      className="group [perspective:1000px] h-72 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front face */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl shadow-md overflow-hidden">
          <img
            src={category.image_url || "/no-image.png"}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
          <h2 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white truncate">
            {category.name}
          </h2>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl shadow-md bg-white overflow-hidden">
          <img
            src={category.image_url || "/no-image.png"}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative h-full flex flex-col p-5 bg-white/60">
            <h3 className="font-semibold text-blue-700 mb-2 truncate flex-shrink-0">
              {category.name}
            </h3>
            <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-600 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {category.description ||
                "Explore our range of quality products in this category."}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(category);
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium flex-shrink-0"
            >
              View Products <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  const visibleCategories = useMemo(
    () =>
      categories.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
      ),
    [categories, search]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Shop by Category</h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg">
          Find exactly what you're looking for, organized into our most
          popular categories.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Search bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-10">
          <div className="relative w-full sm:w-96">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="pb-16">
          {loading ? (
            <Spinner label="Loading categories..." className="py-24" />
          ) : visibleCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center text-gray-500">
              <FaThLarge size={48} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium">No categories found</p>
              <p className="text-sm">Try adjusting your search.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-6">
                Showing {visibleCategories.length} categor
                {visibleCategories.length !== 1 ? "ies" : "y"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onView={(c) => navigate(`/category/${c.id}`)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}
