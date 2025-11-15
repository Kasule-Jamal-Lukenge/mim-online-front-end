import { useContext } from "react";

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
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-lg">Loading Dashboard...</p>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>
             {/*  QuickStats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h2 className="text-gray-500 text-sm">Categories</h2>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalCategories}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-gray-500 text-sm">Products</h2>
            <p className="text-2xl font-bold text-green-600">
                {stats.totalProducts}
            </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
                <h2 className="text-gray-500 text-sm">Orders</h2>
                <p className="text-2xl font-bold text-orange-600">
                    {stats.totalOrders}
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
                <h2 className="text-gray-500 text-sm">Users</h2>
                <p className="text-2xl font-bold text-purple-600">
                    {stats.totalUsers}
                </p>
            </div>

            
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Orders (Coming Soon)</h2>
                <p className="text-gray-500">Order table and charts will be added next.</p>
            </div>
        </div>
    );
}