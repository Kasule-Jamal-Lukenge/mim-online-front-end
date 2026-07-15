import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminCategories from "./pages/AdminCategories";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import HomeIndexPage from "./pages/HomeIndexPage";
import CartPage from "./pages/CartPage";
import ReceiptPage from "./pages/ReceiptPage";
import PaymentPage from "./pages/PaymentPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AllCustomersPage from "./pages/AllCustomersPage";
import AllProductsPage from "./pages/AllProductsPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import ContactUsPage from "./pages/ContactUsPage";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeIndexPage />}/>
        <Route path="/register" element={<RegistrationPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />  
        <Route path="/cart" element={<CartPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/payment" element={<PaymentPage />}/>
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/admin/customers" element={<AllCustomersPage />}/>
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/categories" element={<AllCategoriesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

      </Routes>
    </Router>
  );
}