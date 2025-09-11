"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedId = localStorage.getItem("id");

    if (!storedRole || !storedId) {
      router.replace("/login");
      return;
    }

    const userId = Number(storedId);

    // 1️⃣ Register Service Worker & request notification permission
    let swRegistration: ServiceWorkerRegistration | null = null;
    if ("serviceWorker" in navigator && "Notification" in window) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          swRegistration = registration;
          return Notification.requestPermission();
        })
        .then((permission) => {
          if (permission !== "granted") console.warn("Notifications not granted");
          else console.log("Notifications permission granted");
        })
        .catch((err) => console.error("Service Worker registration failed:", err));
    }

    // 2️⃣ Subscribe to Pusher for real-time notifications
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/pusher/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });

    const channel = pusher.subscribe(`private-user-${userId}`);

    channel.bind("new-notification", (data: any) => {
      console.log("New notification received:", data);

      // Send to service worker to show OS notification
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SHOW_NOTIFICATION",
          payload: {
            id: data.id,
            title: data.title,
            message: data.message,
            icon: "/favicon.ico",
            url: "/", // optional: URL to open when notification clicked
          },
        });
      } else if (Notification.permission === "granted") {
        new Notification(data.title, { body: data.message, icon: "/favicon.ico" });
      }
    });

    // 3️⃣ Redirect user based on role
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

    // 4️⃣ Cleanup on unmount
    return () => {
      channel.unbind_all && channel.unbind_all();
      pusher.unsubscribe(`private-user-${userId}`);
      pusher.disconnect();
    };
  }, [router]);

  return null;
}
