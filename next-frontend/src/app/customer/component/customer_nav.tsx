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
              href="/customer"
              className="text-theme hover:text-accent transition-colors"
            >
              Home
            </a>
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
              href="/customer/profile"
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
        </div>
      </div>
    </nav>
  );
}
