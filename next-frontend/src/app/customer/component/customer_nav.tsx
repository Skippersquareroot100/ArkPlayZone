"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function CustomerNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if JWT exists on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    router.push("/login"); // redirect to login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-accent font-bold text-xl">
            ArkPlayZone
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6">
            <a
              href="/customer/CustomerDashboard"
              className="text-theme hover:text-accent transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/customer/Bookings"
              className="text-theme hover:text-accent transition-colors"
            >
              Bookings
            </a>
            <a
              href="/customer/Activity"
              className="text-theme hover:text-accent transition-colors"
            >
              Activity
            </a>
            <a
              href="/customer/Profile"
              className="text-theme hover:text-accent transition-colors"
            >
              Profile
            </a>

            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-theme hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="text-theme hover:text-accent transition-colors"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-accent focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/60 backdrop-blur-md border-t border-accent">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/customer/CustomerDashboard"
              className="block text-theme px-3 py-2 rounded-md hover:bg-accent hover:text-white transition"
            >
              Dashboard
            </a>
            <a
              href="/customer/Bookings"
              className="block text-theme px-3 py-2 rounded-md hover:bg-accent hover:text-white transition"
            >
              Bookings
            </a>
            <a
              href="/customer/Activity"
              className="block text-theme px-3 py-2 rounded-md hover:bg-accent hover:text-white transition"
            >
              Activity
            </a>
            <a
              href="/customer/Profile"
              className="block text-theme px-3 py-2 rounded-md hover:bg-accent hover:text-white transition"
            >
              Profile
            </a>

            {isLoggedIn ? (
              <button
                onClick={logout}
                className="block text-theme px-3 py-2 rounded-md hover:text-red-400 transition w-full text-left"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="block text-theme px-3 py-2 rounded-md hover:text-accent transition"
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
