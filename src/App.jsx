import React from "react";
import { Route, Router } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}