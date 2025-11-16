import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function SalesChart({ token }) {
  const [data, setData] = useState([]);
  const [view, setView] = useState("week");

  const fetchData = async () => {
    const res = await api.get(`/admin/analytics/sales/${view}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [view, token]);

  return (
    <div>
      {/* Dropdown to select view */}
      <div className="flex justify-end mb-2">
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border rounded-md p-1 text-sm"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
