// import { useState, useEffect, useContext } from "react";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";
// import OrdersChart from "../components/OrdersChart";
// import SalesChart from "../components/SalesChart";

// export default function AdminDashboard(){
//     const {user, token} = useContext(AuthContext);
//     const [stats, setStats] = useState({
//         totalCategories: 0,
//         totalProducts: 0,
//         totalOrders: 0,
//         totalUsers: 0,
//     });

//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try{
//                 const res = await api.get("/admin/analytics/summary", {
//                     headers: {Authorization: `Bearer ${token}`},
//                 });
//                 setStats(res.data);
//             }catch(err){
//                 console.error("Error Fetching Dashboard Data:", err);
//                 toast.error("Failed To Load Dashboard Stats");
//             }finally{
//                 setLoading(false);
//             }
//         };
//         fetchDashboardData();
//     }, [token]);

//     if(loading){
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <p className="text-gray-500 text-lg">Loading Dashboard...</p>
//             </div>
//         );
//     }

//     return(
//         <div className="min-h-screen bg-gray-100 p-6">
//             <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>
//              {/*  QuickStats */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                     <h2 className="text-gray-500 text-sm">Categories</h2>
//                     <p className="text-2xl font-bold text-blue-600">{stats.total_categories}</p>
//                 </div>

//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                     <h2 className="text-gray-500 text-sm">Products</h2>
//                     <p className="text-2xl font-bold text-green-600">
//                         {stats.total_products}
//                     </p>
//                 </div>

//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                     <h2 className="text-gray-500 text-sm">Total Orders</h2>
//                     <p className="text-2xl font-bold text-orange-600">
//                         {stats.total_orders}
//                     </p>
//                 </div>

//                 <div className="bg-white rounded-xl shadow p-6 text-center">
//                     <h2 className="text-gray-600">Delivered Orders</h2>
//                     <p className="text-2xl font-semibold text-green-600">{stats.delivered_orders}</p>
//                 </div>

//                 <div className="bg-white rounded-xl shadow p-6 text-center">
//                     <h2 className="text-gray-600">Orders In Delivery</h2>
//                     <p className="text-2xl font-semibold text-yellow-500">{stats.in_delivery_orders}</p>
//                 </div>

//                 <div className="bg-white rounded-xl shadow p-6 text-center">
//                     <h2 className="text-gray-600">Received Orders</h2>
//                     <p className="text-2xl font-semibold text-purple-600">{stats.received_orders}</p>
//                 </div>

//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                     <h2 className="text-gray-500 text-sm">Users</h2>
//                     <p className="text-2xl font-bold text-purple-600">
//                         {stats.total_users}
//                     </p>
//                 </div>

//                 <div className="bg-white rounded-xl shadow p-6 text-center">
//                     <h2 className="text-gray-600">Total Sales</h2>
//                     <p className="text-2xl font-semibold text-pink-600">${stats.total_sales}</p>
//                 </div>
//             </div>

            
//             {/* Recent Activity
//             <div className="bg-white p-6 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold mb-4">Recent Orders (Coming Soon)</h2>
//                 <p className="text-gray-500">Order table and charts will be added next.</p>
//             </div> */}

//             {/* Charts Section */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//                 {/* Orders Chart */}
//                 <div className="bg-white p-6 rounded-lg shadow">
//                     <h2 className="text-xl text-center font-semibold mb-4 text-gray-700">Number of Orders</h2>
//                     <OrdersChart token={token} />
//                 </div>

//                 {/* Sales Chart */}
//                 <div className="bg-white p-6 rounded-lg shadow">
//                     <h2 className="text-xl text-center font-semibold mb-4 text-gray-700">Sales</h2>
//                     <SalesChart token={token} />
//                 </div>
//             </div>

//         </div>
//     );
// }









import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import OrdersChart from "../components/OrdersChart";
import SalesChart from "../components/SalesChart";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";

export default function AdminDashboard(){
    const {user, token} = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalCategories: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try{
                const res = await api.get("/admin/analytics/summary", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setStats(res.data);
            }catch(err){
                console.error("Error Fetching Dashboard Data:", err);
                toast.error("Failed To Load Dashboard Stats");
            }finally{
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [token]);

    if(loading){
        return (
            <div className="flex justify-center items-center min-h-screen ml-64">
                <p className="text-gray-500 text-lg">Loading Dashboard...</p>
            </div>
        );
    }

    return(
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
                        <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-2">Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {user?.first_name || 'Admin'}! Here's your business overview</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Categories Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-list text-blue-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Categories</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.total_categories}</p>
                        </div>

                        {/* Products Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-box text-green-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Products</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.total_products}</p>
                        </div>

                        {/* Total Orders Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-shopping-cart text-orange-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.total_orders}</p>
                        </div>

                        {/* Users Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-users text-purple-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Users</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.total_users}</p>
                        </div>

                        {/* Delivered Orders Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-check-circle text-green-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Delivered Orders</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.delivered_orders}</p>
                        </div>

                        {/* In Delivery Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-truck text-yellow-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">In Delivery</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.in_delivery_orders}</p>
                        </div>

                        {/* Received Orders Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-clipboard-list text-indigo-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Received Orders</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.received_orders}</p>
                        </div>

                        {/* Total Sales Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-dollar-sign text-pink-600 text-xl"></i>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Sales</h3>
                            <p className="text-3xl font-bold text-gray-800">${stats.total_sales}</p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Orders Chart */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-1">Orders Overview</h2>
                                <p className="text-sm text-gray-500">Track your order trends over time</p>
                            </div>
                            <OrdersChart token={token} />
                        </div>

                        {/* Sales Chart */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-1">Sales Performance</h2>
                                <p className="text-sm text-gray-500">Monitor your revenue growth</p>
                            </div>
                            <SalesChart token={token} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}