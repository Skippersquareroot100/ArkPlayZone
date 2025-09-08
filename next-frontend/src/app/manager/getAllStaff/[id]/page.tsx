"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/axios";

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

export default function StaffDetails() {
  const params = useParams();
  const { id } = params; 
  const [staff, setStaff] = useState<Staff | null>(null);


  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await api.get(`/manager/details/${id}`);
        setStaff(res.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
       
      }
    };

    fetchStaff();
  }, [id]);

 
  if (!staff) return <p>No staff found!</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        {staff.name.firstName} {staff.name.middleName} {staff.name.lastName}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={`http://localhost:10000/uploads/${staff.photo}`} 
          alt={staff.name.firstName}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <p className="text-gray-700"><strong>Role:</strong> {staff.role}</p>
          <p className="text-gray-700"><strong>ID:</strong> {staff.staff_id}</p>
        </div>
      </div>

      <div className="space-y-3">
        <p><strong>Email:</strong> {staff.email}</p>
        <p><strong>Phone:</strong> {staff.phone}</p>
        <p><strong>Salary:</strong> ${staff.salary}</p>
        <p><strong>Deduction:</strong> {staff.deduction}</p>
        <p><strong>Overtime:</strong> {staff.overtime}</p>

        <div>
          <h2 className="text-lg font-semibold mt-4">Address</h2>
          <p>{staff.address.street.street_no}, {staff.address.street.street_name}</p>
          <p>{staff.address.street.apartment_name}</p>
          <p>{staff.address.city}, {staff.address.postal_code}</p>
        </div>
      </div>
    </div>
  );
}
