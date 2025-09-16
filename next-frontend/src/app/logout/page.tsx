"use client";

import { useCookie } from "next-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const cookie = useCookie(); 

  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("jwt");


    cookie.delete("jwtToken"); 

    router.push("/");
  }, [router, cookie]);

  return null;
}
