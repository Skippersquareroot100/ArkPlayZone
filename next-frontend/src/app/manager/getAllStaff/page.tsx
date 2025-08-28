"use client";
import api from "@/app/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Staff {
  staff_id: number;
  email: string;
  phone: string;
  salary: number;
  deduction: number;
  overtime: number;
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

export default function GetAllStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const res = await api.get("/manager/details", {
          params: {
            role: "staff",
            page: 1,
            limit: 20,
          },
        });
        setStaff(res.data.data);
      } catch (err) {
        console.error("Error fetching staff details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, []);

  if (loading) return <p>Loading staff...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {staff.map((s) => (
        <Link
          key={s.staff_id}
          href={`/manager/getAllStaff/${s.staff_id}`} 
        >
          <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg cursor-pointer bg-white hover:bg-gray-50 transition">
            <h2 className="text-xl font-bold text-gray-800">
              {s.name.firstName} {s.name.middleName} {s.name.lastName}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">ID:</span> {s.staff_id}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Role:</span> {s.role}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
