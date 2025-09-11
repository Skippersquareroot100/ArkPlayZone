"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import api from "@/app/lib/axios";

type Notif = { id: number; title: string; message: string; date: string; isRead: boolean };

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notif[]>([]);
  const storedId = Number(localStorage.getItem("id"));

  useEffect(() => {
    if (!storedId) return;

    // 1️⃣ Fetch existing notifications
    const fetchNotifications = async () => {
      const res = await api.get(`/notifications/staff/${storedId}`);
      const notifs: Notif[] = res.data.map((item: any) => ({
        id: item.pusherNotification.id,
        title: item.pusherNotification.title,
        message: item.pusherNotification.message,
        date: item.pusherNotification.date,
        isRead: item.isRead,
      }));

      setNotifications(notifs);

      // Show unread notifications in browser
      notifs.filter(n => !n.isRead).forEach(n => {
        if (Notification.permission === "granted") {
          new Notification(n.title, { body: n.message, icon: "/favicon.ico" });
        }
      });

      // Mark all as read in backend
      await api.post(`/notifications/staff/${storedId}/read-all`);
    };

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(() => fetchNotifications());
    } else {
      fetchNotifications();
    }

    // 2️⃣ Setup Pusher for real-time
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER! });
    const channel = pusher.subscribe(`private-user-${storedId}`);

    channel.bind("new-notification", (data: any) => {
      setNotifications(prev => [data, ...prev]);

      // Show in browser
      if (Notification.permission === "granted") {
        new Notification(data.title, { body: data.message, icon: "/favicon.ico" });
      }
    });

    return () => {
      channel.unbind_all && channel.unbind_all();
      pusher.unsubscribe(`private-user-${storedId}`);
      pusher.disconnect();
    };
  }, [storedId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Notifications</h1>
      <ul>
        {notifications.map(n => (
          <li key={n.id} className={`border p-2 ${n.isRead ? "bg-white" : "bg-gray-50"}`}>
            <b>{n.title}</b>
            <p>{n.message}</p>
            <small>{new Date(n.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
