"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Home,
  Users,
  UserPlus,
  Bell,
  Megaphone,
  User,
  LogOut,
} from "lucide-react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-theme text-theme">

      <aside
        className={`fixed top-0 left-0 bottom-0 h-full bg-card text-theme shadow-lg transform transition-all duration-300
        ${open ? "w-64" : "w-16"} 
        `}
      >
 
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {open && <h1 className="text-xl font-bold text-accent">ARK PLAYZONE</h1>}
          <button
            className="p-2 rounded hover:bg-accent hover:text-green-600"
            onClick={() => setOpen(!open)}
          >
            <Menu size={25} />
          </button>
        </div>


        <nav className="mt-6 pl-2 pr-2">
          <ul className="space-y-2">
              <li>
              <Link
                href="http://localhost:9001/manager/dashboard"
                className="flex font-bold items-center gap-3 p-2 rounded hover-bg-accent hover:text-white cursor-pointer"
              >
                <Home size={25} />
                {open && <span>Home</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/manager/getAllStaff"
                className="flex font-bold items-center gap-3 p-2 rounded hover-bg-accent hover:text-white cursor-pointer"
              >
                <Users size={25} />
                {open && <span>View Staff</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/manager/registration"
                className="flex font-bold items-center gap-3 p-2 rounded hover-bg-accent hover:text-white cursor-pointer"
              >
                <UserPlus size={25} />
                {open && <span>Register Staff</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/manager/postNotification"
                className="flex font-bold items-center gap-3 p-2 rounded hover-bg-accent hover:text-white cursor-pointer"
              >
                <Megaphone size={25} />
                {open && <span>Post Notification</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/manager/notification"
                className="flex font-bold items-center gap-3 p-2 rounded hover-bg-accent  hover:text-white cursor-pointer"
              >
                <Bell size={25} />
                {open && <span>Notifications</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/manager/profile"
                className="flex font-bold items-center gap-3 p-2 rounded hover-bg-accent hover:text-white cursor-pointer"
              >
                <User size={25} />
                {open && <span>Profile</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                className="flex font-bold items-center gap-3 p-2 rounded hover-bg-accent hover:text-white cursor-pointer"
              >
                <LogOut size={25} />
                {open && <span>Logout</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

  
      <main
        className={`flex-1 bg-theme p-6 transition-all duration-300 ${
          open ? "ml-64" : "ml-16"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
