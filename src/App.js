import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuManagement from "./pages/MenuManagement";
import OrderManagement from "./pages/OrderManagement";
import HotelDashboard from "./pages/HotelDashboard";
import QRGeneration from "./pages/QRGeneration";
import HotelOrderPage from "./pages/HotelOrderPage";
import Navbar from "./components/Navbar";

import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="mb-10">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<MenuManagement />} />
        <Route path="/order" element={<OrderManagement />} />
        <Route path="/dashboard" element={<HotelDashboard />} />
        <Route path="/generate-qr" element={<QRGeneration />} />
        <Route path="/place-order" element={<HotelOrderPage />} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
