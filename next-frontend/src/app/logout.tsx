"use-client"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("jwt");
    router.push("/login");
  }, []);

  return null;
}
