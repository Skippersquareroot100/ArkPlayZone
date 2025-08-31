"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import LoginPage from "./manager/login/page";
import { getURL } from "next/dist/shared/lib/utils";

export default function Home() {

  const router = useRouter();
  const storedRole = localStorage.getItem("role"); 
  const [role, setRole] = useState<string | null>(null);

  console.log("path:", getURL());

  useEffect(()=>{

    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

  },[])


  useEffect(() => {
     if (role === null) return;
   
    if (!role) {
      router.replace("/manager/login"); 
      return;
    }

    switch (role) {
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
      
    }
  }, [role, router]);

   

  if (role) return null;

  return null;
}
