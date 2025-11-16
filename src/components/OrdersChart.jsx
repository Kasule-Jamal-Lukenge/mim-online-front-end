import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Add animation

export default function OrdersChart({ token }) {
  const [data, setData] = useState([]);
  const [view, setView] = useState("week");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get(`/admin/analytics/orders/${view}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(res.data);
    setTimeout(() => setLoading(false), 300); // small delay for smoothness
  };

  useEffect(() => {
    fetchData();
  }, [view, token]);

  return (
    <div>
      {/* Dropdown toggle */}
      <div className="flex justify-end mb-2">
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border rounded-md p-1 text-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  animationDuration={800} // 👈 smooth bar growth
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
