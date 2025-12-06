// import React, { useEffect, useState, useContext } from "react";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";
// import NavbarComponent from "../components/NavbarComponent";
// import toast from "react-hot-toast";

// export default function AllCustomersPage() {
//   const { token } = useContext(AuthContext);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) return;

//     const fetchCustomers = async () => {
//       try {
//         const res = await api.get("/admin/customers", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCustomers(res.data);
//       } catch (err) {
//         console.error("Error fetching customers:", err);
//         toast.error("Failed to load customer data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <NavbarComponent />
//       <div className="pt-24 px-6 pb-6 max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//           Registered Customers
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading customers...</p>
//         ) : customers.length === 0 ? (
//           <p className="text-center text-gray-500">No customers found.</p>
//         ) : (
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <table className="w-full border-collapse text-gray-800 text-sm">
//               <thead className="bg-gray-200 text-gray-700 font-semibold">
//                 <tr>
//                   <th className="py-3 px-4 text-left">#</th>
//                   <th className="py-3 px-4 text-left">Name</th>
//                   <th className="py-3 px-4 text-left">Email</th>
//                   <th className="py-3 px-4 text-left">Phone</th>
//                   <th className="py-3 px-4 text-left">Registered On</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customers.map((cust, i) => (
//                   <tr key={cust.id} className="border-t hover:bg-gray-50">
//                     <td className="py-2 px-4">{i + 1}</td>
//                     <td className="py-2 px-4">
//                       {cust.first_name} {cust.last_name}
//                     </td>
//                     <td className="py-2 px-4">{cust.email}</td>
//                     <td className="py-2 px-4">{cust.phone}</td>
//                     <td className="py-2 px-4">
//                       {new Date(cust.created_at).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import toast from "react-hot-toast";

export default function AllCustomersPage() {
  const { token } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (!token) return;

    const fetchCustomers = async () => {
      try {
        const res = await api.get("/admin/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        toast.error("Failed to load customer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  // Filter customers by search
  const filteredCustomers = customers.filter(
    (cust) =>
      cust.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      cust.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      cust.email?.toLowerCase().includes(search.toLowerCase()) ||
      cust.phone?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ml-64">
        <p className="text-gray-500 text-lg">Loading customers...</p>
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
            <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-2">Customers</h1>
            <p className="text-gray-600">View and manage registered customers</p>
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
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Items per page */}
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>

            {/* Total Count */}
            <div className="flex items-center gap-2 text-gray-600">
              <i className="fas fa-users"></i>
              <span className="font-medium">
                {filteredCustomers.length} {filteredCustomers.length === 1 ? 'customer' : 'customers'}
              </span>
            </div>
          </div>

          {/* Customers Table */}
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
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Registered On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedCustomers.length > 0 ? (
                    paginatedCustomers.map((cust, index) => (
                      <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                {cust.first_name?.charAt(0).toUpperCase()}
                                {cust.last_name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium text-gray-800">
                              {cust.first_name} {cust.last_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-envelope text-gray-400 text-xs"></i>
                            {cust.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-phone text-gray-400 text-xs"></i>
                            {cust.phone || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-calendar text-gray-400 text-xs"></i>
                            {new Date(cust.created_at).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-gray-400">
                        <i className="fas fa-users text-4xl mb-2"></i>
                        <p>No customers found.</p>
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
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
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
    </div>
  );
}
