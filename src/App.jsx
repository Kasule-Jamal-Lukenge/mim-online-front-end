import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminCategories from "./pages/AdminCategories";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
      </Routes>
    </Router>
  );
}