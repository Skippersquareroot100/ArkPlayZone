"use client";
import { useEffect, useState } from "react";
import api from "@/app/lib/axios";

type Notif = { id: number; title: string; message: string; date: string; isRead: boolean };

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notif[]>([]);
  const storedId = Number(localStorage.getItem("id"));

  useEffect(() => {
    if (!storedId) return;

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

      
      await api.post(`/notifications/staff/${storedId}/read-all`);
    };

    fetchNotifications();
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
