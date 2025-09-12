"use client";
import { useState, useEffect } from "react";
import api from "@/app/lib/axios";
import { useCookie } from "next-cookie";
import Image from "next/image";
export default function ProfilePage() {
  const cookie = useCookie("jwtToken");
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [ck, setCk] =   useState("");
  const [stid,setStid]=useState<number>(0);
  const [profile, setProfile] = useState({
    name: { firstName: "", middleName: "", lastName: "" },
    address: { city: "", postal_code: "", street: { street_no: "", street_name: "", apartment_name: "" } },
    email: "",
    phone: "",
    salary: "",
    role: "",
    password: "",
    confirmPassword: "",
    photo: "",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const fetchProfile = async () => {
      const jwt = localStorage.getItem("jwt");
      const id = localStorage.getItem("id");
       setStid(Number(id));
     
      console.log("JWT in ProfilePage:", ck);
      if (!jwt || !id) return;

      try {
        const res = await api.get(`/manager/staff/${id}`);

        const data = res.data;
        setProfile({
          name: data.name || { firstName: "", middleName: "", lastName: "" },
          address: data.address || { city: "", postal_code: "", street: { street_no: "", street_name: "", apartment_name: "" } },
          email: data.email || "",
          phone: data.phone || "",
          salary: data.salary || "",
          role: data.role || "",
          password: "",
          confirmPassword: "",
          photo: data.photo || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        showToast("Failed to load profile!", "error");
      }
    };

    fetchProfile();
  },[]);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

 
    if (["firstName", "middleName", "lastName"].includes(name)) {
      setProfile((prev) => ({ ...prev, name: { ...prev.name, [name]: value } }));
    } else if (["street_no", "street_name", "apartment_name"].includes(name)) {
      setProfile((prev) => ({
        ...prev,
        address: { ...prev.address, street: { ...prev.address.street, [name]: value } },
      }));
    } else if (["city", "postal_code"].includes(name)) {
      setProfile((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.password && profile.password !== profile.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    const formData = new FormData();
 
    formData.append("firstName", profile.name.firstName);
    formData.append("middleName", profile.name.middleName);
    formData.append("lastName", profile.name.lastName);
    formData.append("street_no", profile.address.street.street_no);
    formData.append("street_name", profile.address.street.street_name);
    formData.append("apartment_name", profile.address.street.apartment_name);
    formData.append("city", profile.address.city);
    formData.append("postal_code", profile.address.postal_code);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("salary", profile.salary.toString());
    formData.append("role", profile.role);
    if (profile.password) formData.append("password", profile.password);
    if (file) formData.append("file", file);

    const jwt =localStorage.getItem("jwt");
    const id = localStorage.getItem("id");
   
  

    try {
      await api.put(`/manager/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      });
      showToast("Profile updated successfully!", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.message || "Profile update failed!", "error");
      
    }


  };
  
   

  return (
    <main className="flex mt-20 items-center justify-center bg-theme text-theme transition">
      <div className="w-full max-w-3xl bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-accent">Update Profile</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-accent text-accent hover:bg-accent hover:text-white transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
               <Image
                        src={`http://localhost:10000/manager/photos/${stid}`}
                        alt="profile pic"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border"
                      />
            </div>
            <input type="file" onChange={handleFileChange} className="px-4 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="text" name="firstName" placeholder="First Name" value={profile.name.firstName} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="text" name="middleName" placeholder="Middle Name (Optional)" value={profile.name.middleName} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="text" name="lastName" placeholder="Last Name" value={profile.name.lastName} onChange={handleChange} className="border p-2 rounded-lg" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="text" name="apartment_name" placeholder="Apartment Name" value={profile.address.street.apartment_name} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="text" name="street_name" placeholder="Street Name" value={profile.address.street.street_name} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="text" name="street_no" placeholder="Street No" value={profile.address.street.street_no} onChange={handleChange} className="border p-2 rounded-lg" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="text" name="city" placeholder="City" value={profile.address.city} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="text" name="postal_code" placeholder="Postal Code" value={profile.address.postal_code} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="text" name="phone" placeholder="Phone" value={profile.phone} onChange={handleChange} className="border p-2 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="number" name="salary" placeholder="Salary" value={profile.salary} onChange={handleChange} className="border p-2 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="role" placeholder="Role" value={profile.role} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="password" name="password" placeholder="Password" value={profile.password} onChange={handleChange} className="border p-2 rounded-lg" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={profile.confirmPassword} onChange={handleChange} className="border p-2 rounded-lg" />
          </div>

          <button type="submit" className="w-full px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-b from-[var(--color-accent-hover)] to-[var(--color-text)] hover:from-[var(--color-text)] hover:to-[var(--color-accent-hover)] transition transform active:-translate-y-1">
            Update Profile
          </button>
        </form>
      </div>

      {toast && (
        <div className={`fixed bottom-28 -left-3 px-20 py-5 rounded-lg shadow-lg text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} transform transition-all duration-500 ease-in-out ${visible ? "translate-x-0 opacity-100" : "-translate-x-40 opacity-0"}`}>
          {toast.message}
        </div>
      )}
    </main>
  );
}
