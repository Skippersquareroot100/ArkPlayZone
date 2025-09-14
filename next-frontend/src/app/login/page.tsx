"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/app/lib/axios";
import { delay } from "@/app/utils/delays";
import { useCookie } from "next-cookie";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [visible, setVisible] = useState(false);
  const cookie = useCookie("jwtToken");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const login = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // customer login check
      
        const customer_res = await api.post("/customer/login", {
          email,
          password,
          
        },
        { withCredentials: true}
        
      );
        if (customer_res.data.statusCode === 200) {
          
          const role = "customer";
          localStorage.setItem("role", role);
          localStorage.setItem("jwt", customer_res.data.token);
          localStorage.setItem("user_data", JSON.stringify(customer_res.data.data));
      

          return window.location.href = "/customer";
        
      }
        
       
      const res = await api.post("/manager/staff-login", {
        email,
        password,
      });
      
      if (res.data.statusCode === 200) {
        const token = res.data.token;
        const role = res.data.role;
        const id = res.data.id;


        cookie.set("jwtToken", token, {
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          httpOnly: true,
        });

        const readToken = () => {
          const jwt = cookie.get("jwtToken");
          console.log("JWT:", jwt);
        };

        localStorage.setItem("jwt", token);

        localStorage.setItem("role", role);
        localStorage.setItem("id", id);

        console.log("Login success:", res.data.message);

        if (email === "22-47010-1@student.aiub.edu" && password === "abc@123") {
          showToast("Login successful!", "success");
          delay(6).then(() => {
            window.location.href = "/admin/AdminDashboard";
          });
        } else if (role === "manager") {
          showToast("Login successful!", "success");
          window.location.href = "/manager/dashboard";
        } else if (role === "customer") {
          showToast("Login successful!", "success");
          window.location.href = "/customer/CustomerDashboard";
        } else if (role === "admin") {
          showToast("Login successful!", "success");
          window.location.href = "/admin/AdminDashboard";
        } else {
          window.location.href = "/login";
        }
      } else {
        showToast("Invalid credentials!", res.data.error);
      }
    } catch (err) {
      let errorMessage = "An error occurred!";
      if (typeof err === "object" && err !== null) {
        if ("response" in err && typeof (err as any).response?.data === "string") {
          errorMessage = (err as any).response.data;
        } else if ("message" in err && typeof (err as any).message === "string") {
          errorMessage = (err as any).message;
        }
      }
      showToast(errorMessage, "error");
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
            className="px-6 py-3 w-full rounded-lg font-medium text-white
             bg-gradient-to-b from-[var(--color-accent-hover)] to-[var(--color-text)] 
             hover:from-[var(--color-text)] hover:to-[var(--color-accent-hover)] 
             transition transform active:-translate-y-1"
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

      {toast && (
        <div
          className={`
      fixed bottom-28 -left-3 px-20 py-5 rounded-lg shadow-lg text-white
      ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
      transform transition-all duration-500 ease-in-out
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-40 opacity-0"}
    `}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}
