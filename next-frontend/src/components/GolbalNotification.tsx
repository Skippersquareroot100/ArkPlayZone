"use client";

import { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import api from "@/app/lib/axios";

export default function GlobalNotification() {
  const swRegistrationRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (!storedId) return;
    const userId = Number(storedId);

    async function setupServiceWorker() {
      if ("serviceWorker" in navigator && "Notification" in window) {
        try {
          const registration = await navigator.serviceWorker.register("/service-worker.js");
          swRegistrationRef.current = registration;

          const permission = await Notification.requestPermission();
          if (permission !== "granted") console.warn("Notifications permission denied");
        } catch (err) {
          console.error("Service Worker registration failed:", err);
        }
      }
    }
    setupServiceWorker();


    async function showUnreadNotifications() {
      try {
        const res = await api.get(`/notifications/staff/${userId}`);
        const notifications = (res.data || []).map((item: any) => ({
          id: item.pusherNotification.id,
          title: item.pusherNotification.title,
          message: item.pusherNotification.message,
          date: item.pusherNotification.date,
          isRead: item.isRead,
        }));

        notifications
          .filter(n => !n.isRead)
          .forEach(n => {
            if (Notification.permission === "granted") {
              new Notification(n.title, { body: n.message, icon: "/favicon.ico" });
            }
          });
      } catch (err) {
        console.error("Fetching unread notifications failed:", err);
      }
    }
    showUnreadNotifications();

 
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
     authEndpoint: "http://localhost:10000/pusher/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
         'Content-Type': 'application/json'
        },
      
      },
    });

    const channel = pusher.subscribe(`private-user-${userId}`);
    channel.bind("new-notification", (data: any) => {
      console.log("New notification received:", data);

      if (Notification.permission === "granted") {
        new Notification(data.title, { body: data.message, icon: "/favicon.ico" });
      }

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SHOW_NOTIFICATION",
          payload: {
            id: data.id,
            title: data.title,
            message: data.message,
            icon: "/favicon.ico",
            url: "/", 
          },
        });
      }
    });

    return () => {
      channel.unbind_all && channel.unbind_all();
      pusher.unsubscribe(`private-user-${userId}`);
      pusher.disconnect();
    };
  }, []);

  return null;
}
