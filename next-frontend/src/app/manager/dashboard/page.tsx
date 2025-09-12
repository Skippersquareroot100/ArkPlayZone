"use client";
import Link from "next/link";

export default function ManagerDashboard() {

    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    console.log("ID:", id);
    console.log("Role:", role);
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <nav>
        <Link href="/manager/getAllStaff">View Staff</Link> <br />
        <Link href="/logout">Logout</Link> <br />
        <Link href="/manager/registration">Register Staff</Link> <br />
        <Link href="/manager/postNotification">Post Notification</Link> <br />
        <Link href="/manager/notification">Notification</Link> <br />
        <Link href="/manager/profile">Profile</Link> <br />

      </nav>
    </div>
  );
}
