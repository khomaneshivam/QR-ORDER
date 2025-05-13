import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-background p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-text font-bold text-lg">QR Order</Link>

        {/* Hamburger Button */}
        <button className="md:hidden text-text focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-text hover:text-accent">Home</Link>
          <Link to="/login" className="text-text hover:text-accent">Login</Link>
          <Link to="/register" className="text-text hover:text-accent">Register</Link>
          <Link to="/menu" className="text-text hover:text-accent">Menu</Link>
          <Link to="/dashboard" className="text-text hover:text-accent">Dashboard</Link>
          <Link to="/generate-qr" className="text-text hover:text-accent">Generate QR</Link>
        </div>

        {/* Theme Toggle (Visible on Desktop) */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-background shadow-lg p-6 z-50 transform transition-transform md:hidden">
          <button className="absolute top-4 right-4 text-text" onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>

          <div className="flex flex-col space-y-4 mt-10">
            <Link to="/" className="text-text hover:text-accent" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/login" className="text-text hover:text-accent" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="text-text hover:text-accent" onClick={() => setIsOpen(false)}>Register</Link>
            <Link to="/menu" className="text-text hover:text-accent" onClick={() => setIsOpen(false)}>Menu</Link>
            <Link to="/dashboard" className="text-text hover:text-accent" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to="/generate-qr" className="text-text hover:text-accent" onClick={() => setIsOpen(false)}>Generate QR</Link>
          </div>

          <div className="mt-6">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
