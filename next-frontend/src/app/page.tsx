"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if ("serviceWorker" in navigator && "Notification" in window) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker Registered");

          return Notification.requestPermission().then((permission) => {
            if (permission !== "granted") {
              console.warn("Notifications denied");
              return null;
            }
            return registration;
          });
        })
        .then((registration) => {
          if (!registration) return;


          registration.showNotification("Welcome!", {
            body: "You have successfully subscribed to push notifications!",
            icon: "/favicon.ico",
          });

        
        })
        .catch((err) =>
          console.error("Service Worker registration failed:", err)
        );
    }

     console.log("reload!!");
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
