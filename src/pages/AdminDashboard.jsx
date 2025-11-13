import { useSelector } from "react-redux";
import { fetchSummary } from "../features/analyticsSlice";
import { BarChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from "recharts";

export default function AdminDashboard(){
    const dispatch = useDispatch();
    const {summary, loading, error } = useSelector((state)=>state.analytics);

    useEffect(() => {
        dispatch(fetchSummary());
    }, [dispatch]);

    if(loading)return <p>Loading dashboard....</p>;
    if(error) return <p>Error: {error}</p>;

    const data = [
        {name: 'Received', value: summary.received_orders},
        {name: 'In-Delivery', value: summary.in_delivery_orders},
        {name: 'Delivered', value: summary.delvered_orders},
    ];

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-blue-100 rounded">Total Orders: {summary.total_orders}</div>
                <div className="p-4 bg-green-100 rounded">Total Users: {summary.total_users}</div>
                <div className="p-4 bg-yellow-100 rounded">Total Sales: {summary.total_sales}</div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#4f46e5"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}