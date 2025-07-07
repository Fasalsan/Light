import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className=" shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-600">
                    <Link to="/">MyWebsite</Link>
                </div>

                <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-blue-500 transition">Home</Link>
                    <Link to="/about" className="hover:text-blue-500 transition">About</Link>
                    <Link to="/services" className="hover:text-blue-500 transition">Services</Link>
                    <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
                </div>

                <div className="hidden md:block">
                    <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                        Login
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-2xl text-gray-700" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-3">
                    <Link to="/" className="block text-gray-700 hover:text-blue-500" onClick={toggleMenu}>Home</Link>
                    <Link to="/about" className="block text-gray-700 hover:text-blue-500" onClick={toggleMenu}>About</Link>
                    <Link to="/services" className="block text-gray-700 hover:text-blue-500" onClick={toggleMenu}>Services</Link>
                    <Link to="/contact" className="block text-gray-700 hover:text-blue-500" onClick={toggleMenu}>Contact</Link>
                    <Link to="/login" className="block bg-blue-600 text-white text-center py-2 rounded-full hover:bg-blue-700 transition" onClick={toggleMenu}>Login</Link>
                </div>
            )}
        </nav>
    );
}
