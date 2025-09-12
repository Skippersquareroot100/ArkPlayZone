"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/axios";
import Image from "next/image";

interface Staff {
  staff_id: number;
  email: string;
  phone: string;
  salary: number;
  deduction: number;
  overtime: number;
  overtimeRate: number;
  role: string;
  photo: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  address: {
    city: string;
    postal_code: string;
    street: {
      street_no: string;
      street_name: string;
      apartment_name: string;
    };
  };
}

export default function StaffDetails() {
  const params = useParams();
  const { id } = params;
  const [staff, setStaff] = useState<Staff | null>(null);

  const [salary, setSalary] = useState<number | "">("");
  const [deduction, setDeduction] = useState<number | "">("");
  const [overtime, setOvertime] = useState<number | "">("");
  const [overtimeRate, setOvertimeRate] = useState<number | "">("");

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [visible, setVisible] = useState(false);
  const [updateTime, setUpdateTime] = useState<string>("");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await api.get(`/manager/details/${id}`);
        setStaff(res.data);
        setSalary(res.data.salary ?? "");
        setDeduction(res.data.deduction ?? "");
        setOvertime(res.data.overtime ?? "");
        setOvertimeRate(res.data.overtimeRate ?? "");
      } catch (err) {
        console.error("Error fetching staff:", err);
        showToast("Failed to fetch staff details.", "error");
      }
    };

    fetchStaff();

    // Fetch last update time from localStorage by staff id
    const lastUpdate = localStorage.getItem(`staff_update_${id}`);
    if (lastUpdate) setUpdateTime(lastUpdate);
  }, [id]);

  const updateSalary = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to submit this update?")) return;

    try {
      await api.patch(`/manager/salary/`, {
        email: staff?.email,
        salary,
        deduction,
        overtime,
        overtime_rate: overtimeRate,
      });

      const now = new Date();
      const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setUpdateTime(formattedTime);
      localStorage.setItem(`staff_update_${id}`, formattedTime);

      showToast("Salary details updated successfully.", "success");
    } catch (err: any) {
      console.error("Error updating salary:", err);
      const msg = err.response?.data?.message || "Failed to update salary details.";
      showToast(msg, "error");
    }
  };

  const deleteStaff = async () => {
    if (!confirm("Are you sure you want to delete this staff?")) return;
    try {
      await api.delete(`/manager/delete-staff`, { data: { email: staff?.email } });
      showToast("Staff deleted successfully.", "success");
      setTimeout(() => {
        window.location.href = "http://localhost:9001/manager/getAllStaff/";
      }, 1000);
    } catch (err: any) {
      console.error("Error deleting staff:", err);
      const msg = err.response?.data?.message || "Failed to delete staff.";
      showToast(msg, "error");
    }
  };

  if (!staff) return <p>No staff found!</p>;

  return (
    <div className="p-6 mt-10 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">
          {staff.name.firstName} {staff.name.middleName} {staff.name.lastName}
        </h1>
        <button
          className="py-3 px-4 mt-4 rounded-lg font-medium text-white
            bg-gradient-to-b from-red-500 to-red-700
            hover:from-red-700 hover:to-red-500
            transition transform active:-translate-y-1"
          onClick={deleteStaff}
        >
          Delete Staff
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Image
          src={`http://localhost:10000/manager/photos/${id}`}
          alt={staff.name.firstName}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <p className="text-gray-700">
            <strong>Role:</strong> {staff.role}
          </p>
          <p className="text-gray-700">
            <strong>ID:</strong> {staff.staff_id}
          </p>
        </div>
      </div>

      <table className="w-full border-collapse mb-6">
        <tbody>
          <tr className="border-b">
            <td className="p-2 font-semibold">Salary</td>
            <td className="p-2">
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-semibold">Deduction</td>
            <td className="p-2">
              <input
                type="number"
                value={deduction}
                onChange={(e) => setDeduction(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-semibold">Overtime</td>
            <td className="p-2">
              <input
                type="number"
                value={overtime}
                onChange={(e) => setOvertime(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-semibold">Overtime Rate</td>
            <td className="p-2">
              <input
                type="number"
                value={overtimeRate}
                onChange={(e) => setOvertimeRate(e.target.value === "" ? "" : Number(e.target.value))}
                className="border p-2 rounded w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="space-y-3">
        <p>
          <strong>Email:</strong> {staff.email}
        </p>
        <p>
          <strong>Phone:</strong> {staff.phone}
        </p>
        <div>
          <strong className="text-lg font-semibold mt-4">Address:</strong> {staff.address.street.street_no}, {staff.address.street.street_name}, {staff.address.street.apartment_name}, {staff.address.city}, {staff.address.postal_code}
        </div>

        <div>
          <button
            type="submit"
            onClick={updateSalary}
            className="py-3 mt-4 w-full rounded-lg font-medium text-white
             bg-gradient-to-b from-[var(--color-accent-hover)] to-[var(--color-text)] 
             hover:from-[var(--color-text)] hover:to-[var(--color-accent-hover)] 
             transition transform active:-translate-y-1"
          >
            Update Salary
          </button>
        </div>

        {/* Display last update time */}
        {updateTime && (
          <p className="mt-2 text-sm text-green-600 text-center">
            Salary last updated: {updateTime}
          </p>
        )}
      </div>

      {/* Toast Message */}
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
    </div>
  );
}
