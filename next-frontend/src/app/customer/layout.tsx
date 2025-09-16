"use client";
import { useState } from "react";
import { CustomerNavBar } from "./component/customer_nav";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-theme">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50">
        <CustomerNavBar />
      </div>

      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* pt-20 gives space below the fixed navbar */}
        {children}
      </main>
    </div>
  );
}
