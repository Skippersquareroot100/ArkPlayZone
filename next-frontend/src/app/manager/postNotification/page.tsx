"use client";
import { useEffect } from "react";
import api from "@/app/lib/axios";

export default function PostNotificationPage() {

   // const[notification , setNotification] = useState("no notifications yet!");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/manager/notifications/employee");
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post Notification Page</h1>
       {fetchData.map((item:any) => (
        <div key={item.id} className="mb-2 p-2 border rounded">
          <p>{item.message}</p>
        </div>
      ))}
      {/* <p>{notification}</p> */}
    </div>
  )
}
