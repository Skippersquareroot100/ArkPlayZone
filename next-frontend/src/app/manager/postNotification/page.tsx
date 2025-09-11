"use client";
import { useState, useEffect, useRef } from "react";
import api from "@/app/lib/axios";

interface Staff {
  id: number;
  name: string;
}

export default function PostNotificationPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [forWhom, setForWhom] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStaffs = async () => {
      const response = await api.get("/manager/getId");
      setStaffs(response.data);
    };
    fetchStaffs();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStaff = (id: number) => {
    setForWhom((prev) => {
      if (prev.includes(id)) {
        setSelectAll(false);
        return prev.filter((sid) => sid !== id);
      } else {
        const newSelection = [...prev, id];
        if (newSelection.length === staffs.length) setSelectAll(true);
        return newSelection;
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setForWhom([]);
      setSelectAll(false);
    } else {
      setForWhom(staffs.map((s) => s.id));
      setSelectAll(true);
    }
  };

  const handleSubmit = async () => {
    if (!title || !message || forWhom.length === 0) {
      alert("Please enter title, message, and select at least one staff");
      return;
    }
    await api.post("/notifications", {
      title,
      message,
      staffIds: forWhom,
    });
    alert("Notification sent!");
    window.location.reload(); 
    setTitle("");
    setMessage("");
    setForWhom([]);
    setSelectAll(false);
  };

  return (


    
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Send Notification</h1>

      <input
        className="border p-2 rounded w-full mt-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 rounded w-full mt-2"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="mt-3 relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="border w-full p-2 rounded text-left bg-white"
        >
          {forWhom.length === 0 ? "Select Staff" : `${forWhom.length} selected`}
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
            <div className="p-2 border-b flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span className="ml-2 font-medium">Select All</span>
            </div>
            {staffs.map((staff) => (
              <div key={staff.id} className="p-2 flex items-center border-b">
                <input
                  type="checkbox"
                  checked={forWhom.includes(staff.id)}
                  onChange={() => toggleStaff(staff.id)}
                />
                <span className="ml-2">{staff.id} - {staff.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
         type="button"
        onClick={handleSubmit}
        className="my-3.5 px-6 py-3 rounded-lg font-medium text-white
            bg-gradient-to-b from-[var(--color-accent-hover)] to-[var(--color-text)]
            hover:from-[var(--color-text)] hover:to-[var(--color-accent-hover)]
            transition transform active:-translate-y-1"
      >
        Send
      </button>
    </div>
  );
}
