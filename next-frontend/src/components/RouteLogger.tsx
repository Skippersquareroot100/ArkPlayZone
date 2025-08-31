"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function RouteLogger() {
  const pathname = usePathname();
  const router = useRouter();
  const frole = localStorage.getItem("role");


  
  useEffect(() => {
    const rolePath = pathname.split("/")[1];

    if (!frole) {
      if (pathname !== "/" && pathname !== "/manager/login") {
        router.replace("/");
      }
      return;
    }

    if (rolePath !== "" && rolePath !== frole) {
      if (pathname !== "/not-found") {
        router.replace("/not-found");
      }
    }
  }, [pathname, router]);

  return null;
}
