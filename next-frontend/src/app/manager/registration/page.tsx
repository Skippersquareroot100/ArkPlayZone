"use client";
import { useState, useEffect } from "react";
import api from "@/app/lib/axios";

export default function RegistrationPage() {
  const [darkMode, setDarkMode] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetNo, setStreetNo] = useState<number | "">("");
  const [streetName, setStreetName] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState<number | "">("");
  const [salary, setSalary] = useState<number | "">("");
  const [role, setRole] = useState("staff");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deduction, setDeduction] = useState<number | "">(0);
  const [overtime, setOvertime] = useState<number | "">(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [visible, setVisible] = useState(false);

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

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !streetNo ||
      !streetName ||
      !apartmentName ||
      !city ||
      !postalCode ||
      !salary ||
      !role ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      showToast("Please fill in all fields before submitting!", "error");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (
      !nameRegex.test(firstName) ||
      (middleName && !nameRegex.test(middleName)) ||
      !nameRegex.test(lastName)
    ) {
      showToast("Name must contain only letters", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address!", "error");
      return;
    }

    const phoneRegex = /^01\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showToast(
        "Phone number must be 11 digits long and start with 01!",
        "error"
      );
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[@#$&]).{6,}$/;
    if (!passwordRegex.test(password)) {
      showToast(
        "Password must contain at least one lowercase letter, one special character (@, #, $, &) and be at least 6 characters long.",
        "error"
      );
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    try {
      const res = await api.post(
        "/manager/create-staff",
        {
          firstName,
          middleName,
          lastName,
          apartment_name: apartmentName,
          street_name: streetName,
          street_no: streetNo,
          city,
          postal_code: postalCode,
          salary,
          role,
          email,
          phone,
          password,
          deduction,
          overtime,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, 
        }
      );

      if (res.data.statusCode === 201) {
        showToast("Staff registered successfully!", "success");
        window.location.href = "/manager/dashboard";
      } else {
        showToast(res.data.message || "Registration failedjjjj!", "error");
      }
    } catch (err: any) {
      console.error("Axios error:", err);
      if (err.response) {
        showToast(
          err.response.data?.message || "Registration failed!pp",
          "error"
        );
      } else if (err.request) {
        showToast("No response from server. Please try again.", "error");
      } else {
        showToast(err.message || "Registration failed!", "error");
      }
    }

  };

  return (
    <main className="flex mt-20 items-center justify-center bg-theme text-theme transition">
      <div className="w-full max-w-3xl bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-accent">Create Staff</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-accent text-accent hover:bg-accent hover:text-white transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <form className="space-y-5" onSubmit={register}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Doe"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Smith"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Apartment Name
              </label>
              <input
                type="text"
                value={apartmentName}
                onChange={(e) => setApartmentName(e.target.value)}
                placeholder="Skyline Towers"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Street Name</label>
              <input
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                placeholder="Main St"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Street No</label>
              <input
                type="number"
                value={streetNo}
                onChange={(e) => setStreetNo(Number(e.target.value))}
                placeholder="123"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Dhaka"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Postal Code</label>
              <input
                type="number"
                value={postalCode}
                onChange={(e) => setPostalCode(Number(e.target.value))}
                placeholder="1207"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Salary</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                placeholder="50000"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Photo</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-theme bg-card focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg font-medium text-white
            bg-gradient-to-b from-[var(--color-accent-hover)] to-[var(--color-text)]
            hover:from-[var(--color-text)] hover:to-[var(--color-accent-hover)]
            transition transform active:-translate-y-1"
             

          >
            Register Staff
          </button>
        </form>
      </div>

      {toast && (
        <div
          className={`
            fixed bottom-28 -left-3 px-20 py-5 rounded-lg shadow-lg text-white
            ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
            transform transition-all duration-500 ease-in-out
            ${
              visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-40 opacity-0"
            }
          `}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}
