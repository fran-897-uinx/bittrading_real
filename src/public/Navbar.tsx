"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-700">BitTrading</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="#faq" className="hover:text-blue-600">FAQ</Link></li>
          <li><Link href="#plans" className="hover:text-blue-600">Privacy Policy</Link></li>
          <li><Link href="#contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link
            href="/login/"
            className="border-b border-blue-600 text-blue-600 px-4 py-2 rounded-2xl hover:font-semibold hover:scale-105 transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup/"
            className="border-b border-blue-600 text-blue-600 px-4 py-2 rounded-2xl hover:font-semibold hover:scale-105 transition-all"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-blue-700 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col items-center py-4 space-y-3 text-gray-700">
            <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="#faq" onClick={toggleMenu}>FAQ</Link></li>
            <li><Link href="#plans" onClick={toggleMenu}>Plans</Link></li>
            <li><Link href="#contact" onClick={toggleMenu}>Contact</Link></li>
            <li className="pt-2 border-t w-4/5 text-center">
              <Link href="/login/" className="block py-2 text-blue-600" onClick={toggleMenu}>Login</Link>
              <Link href="/signup/" className="block py-2 text-blue-600" onClick={toggleMenu}>Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
