// import { Routes, Route } from "react-router-dom";
// import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./pages/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProductList from "./pages/ProductList";
import Navbar from "./pages/Navbar";


export default function App() {
  return (
    <AuthProvider>
      {/* Remove BrowserRouter or Router here */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
