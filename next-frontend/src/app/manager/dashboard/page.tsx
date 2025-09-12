"use client";
import { useState, useEffect } from "react";
import api from "@/app/lib/axios";
import { useCookie } from "next-cookie";

interface FinancialRecord {
  salary_date: string;
  netSalary: string;
}

interface Staff {
  staff_id: number;
  deduction: number;
  overtime: number;
  salary: number;
  email: string;
  financialRecords: FinancialRecord[];
}

export default function StaffFinancialPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const fetchStaff = async () => {
      const id = localStorage.getItem("id"); // replace with dynamic staff ID if needed
      if (!id) return;

      try {
        const resStaff = await api.get(`/manager/staff/${id}`);
        const resFinancial = await api.get(`/manager/financials/${id}`);

        setStaff({
          ...resStaff.data,
          financialRecords: resFinancial.data.financialRecords,
        });
      } catch (err: any) {
        console.error(err);
        showToast("Failed to load staff data!", "error");
      }
    };

    fetchStaff();
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

  if (!staff) return <p className="p-6 text-theme">Loading...</p>;

  return (
    <main className="flex flex-col items-center mt-20 bg-theme text-theme min-h-screen transition">
      <div className="w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-accent">Staff Financial Overview</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-accent text-accent hover:bg-accent hover:text-white transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Top Blocks */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-card p-6 rounded-2xl shadow flex flex-col items-center">
            <h2 className="text-lg font-semibold text-accent">Salary</h2>
            <p className="text-2xl font-bold">{staff.salary.toLocaleString()} ৳</p>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow flex flex-col items-center">
            <h2 className="text-lg font-semibold text-accent">Overtime</h2>
            <p className="text-2xl font-bold">{staff.overtime.toLocaleString()} hr</p>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow flex flex-col items-center">
            <h2 className="text-lg font-semibold text-accent">Deduction</h2>
            <p className="text-2xl font-bold">{staff.deduction.toLocaleString()} ৳</p>
          </div>
        </div>

        {/* Financial Records */}
        <div className="bg-card p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-accent">Salary History</h2>
          <table className="w-full table-auto border-collapse border border-gray-300 text-theme">
            <thead>
              <tr className="bg-accent text-white">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {staff.financialRecords.map((record, idx) => (
                <tr key={idx} className="text-theme">
                  <td className="border px-4 py-2">
                    {new Date(record.salary_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{Number(record.netSalary).toLocaleString()} ৳</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <div
          className={`fixed bottom-28 -left-3 px-20 py-5 rounded-lg shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } transform transition-all duration-500 ease-in-out ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-40 opacity-0"
          }`}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}
