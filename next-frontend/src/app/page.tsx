"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      router.replace("/login");
      return;
    }


    switch (storedRole) {
      case "manager":
        router.replace("/manager/dashboard");
        break;
      case "customer":
        router.replace("/customer/CustomerDashboard");
        break;
      case "admin":
        router.replace("/admin/AdminDashboard");
        break;
      default:
        router.replace("/login"); 
    }
  }, [router]);

  return null;
}
