"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/app/lib/axios";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/manager/staff-login", {
        email,
        password,
      });
      if (res.data.statusCode === 200) {
        const token = res.data.token;
        const role = res.data.role;

        localStorage.setItem("jwt", token);
        localStorage.setItem("role", role);

        console.log("Login success:", res.data.message);

        if(email === "22-47010-1@student.aiub.edu" && password === "abc@123")
        {
            console.log("Admin logged in hard coded");
             window.location.href = "/admin/AdminDashboard";
        }
        else if (role === "manager") {
            
          window.location.href = "/manager/dashboard";
        } else if (role === "customer") {
          window.location.href = "/customer/CustomerDashboard";
        }
        else if (role === "admin") {
          window.location.href = "/admin/AdminDashboard";
        }
         else {
          window.location.href = "/";
        }
      } else {
        console.error("Login error:", res.data.error);
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

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
    <main className="flex mt-40 items-center justify-center  bg-theme  text-theme transition">
      <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-accent">Sign in</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-accent text-accent hover:bg-accent hover:text-white transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <form className="space-y-5" onSubmit={login}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card text-theme focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card text-theme focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          <button
            type="submit"
            className="mt-6 rounded-lg w-full p-2 text-white bg-accent hover:bg-accent/80 transition"
          >
            Login
          </button>
        </form>

        <div>
          <p className="mt-4 text-sm text-center text-theme">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2 text-sm text-center text-theme">
            <Link
              href="/forgot-password"
              className="text-accent hover:underline"
            >
              Forget Password?
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
