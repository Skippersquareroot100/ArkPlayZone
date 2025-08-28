"use client";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);


  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-theme text-theme transition p-4">
      <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-accent">Welcome Back</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-accent text-accent hover-bg-accent transition text-sm"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card text-theme focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card text-theme focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-accent text-white hover-bg-accent font-semibold transition"
          >
            Login
          </button>
        </form>

        
        <div className="mt-6 flex justify-between text-sm text-accent">
          <a href="#" className="hover:underline">Forgot password?</a>
          <a href="#" className="hover:underline">Sign up</a>
        </div>
      </div>
    </main>
  );
}
