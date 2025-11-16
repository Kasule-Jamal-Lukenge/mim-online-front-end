import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminCategories from "./pages/AdminCategories";
import AdminProducts from "./pages/AdminProducts";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
    </Router>
  );
}