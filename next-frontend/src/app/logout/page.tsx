"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("jwt");
    router.push("/");
  }, [router]);

  return null;
}
