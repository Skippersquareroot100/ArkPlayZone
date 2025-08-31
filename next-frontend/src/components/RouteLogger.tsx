"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export function RouteLogger({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "allowed" | "redirecting">("checking");

  useEffect(() => {
    const frole = localStorage.getItem("role");
    const rolePath = pathname.split("/")[1];

     if (!frole) {
      if (pathname !== "/" && pathname !== "/login") {
        setStatus("redirecting");
        router.replace("/");
        return;
      }
      setStatus("allowed"); 
      return;
    }


    if (rolePath && rolePath !== frole) {
      if (pathname !== "/not-found") {
        setStatus("redirecting");
        router.replace("/not-found");
        return;
      }
    }


    setStatus("allowed");
  }, [pathname, router]);

  if (status === "checking") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
        <p>Loading...</p>
      </div>
    ); 
  }

  if (status === "redirecting") return null;

  return <>{children}</>; 
}
