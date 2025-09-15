"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const userData = localStorage.getItem("user_data");

    if (!token || !userData) {
      router.push("/login"); // redirect if not logged in
      return;
    }

    try {
      setProfile(JSON.parse(userData));
    } catch (err) {
      console.error("Failed to parse user_data", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setProfile((prev: any) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.startsWith("credentials.")) {
      const field = name.split(".")[1];
      setProfile((prev: any) => ({
        ...prev,
        credentials: { ...prev.credentials, [field]: value },
      }));
    } else {
      setProfile((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("user_data", JSON.stringify(profile)); // update localStorage
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        {/* Profile Picture */}
        <img
          src={profile.credentials?.profile_photo || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-accent object-cover shadow-md"
        />

        {/* Name */}
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleInputChange}
            className="mt-4 text-xl border px-2 py-1 rounded"
          />
        ) : (
          <h2 className="text-2xl font-bold text-theme mt-4">
            {profile.name || "Customer"}
          </h2>
        )}
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={profile.email || ""}
            onChange={handleInputChange}
            className="mt-2 text-theme/70 border px-2 py-1 rounded"
          />
        ) : (
          <p className="text-gray-500">{profile.email}</p>
        )}
        

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full">
          {/* Customer ID */}
          <div className="bg-card text-center rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-theme">Customer ID</h3>
            <p className="text-gray-600">{profile.customer_id}</p>
          </div>

          {/* Phone */}
          <div className="bg-card text-center rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-theme">Phone</h3>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone || ""}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600">{profile.phone || "N/A"}</p>
            )}
          </div>

          {/* Username */}
          <div className="bg-card text-center rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-theme">Username</h3>
            {isEditing ? (
              <input
                type="text"
                name="credentials.username"
                value={profile.credentials?.username || ""}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-600">{profile.credentials?.username}</p>
            )}
          </div>

          {/* Address */}
          <div className="bg-card text-center rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-theme">Address</h3>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="address.city"
                  value={profile.address?.city || ""}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="border px-2 py-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="address.postal_code"
                  value={profile.address?.postal_code || ""}
                  onChange={handleInputChange}
                  placeholder="Postal Code"
                  className="border px-2 py-1 rounded w-full"
                />
              </>
            ) : (
              <p className="text-gray-600">
                {profile.address?.city}, {profile.address?.postal_code}
              </p>
            )}
          </div>

          {/* Loyalty Points */}
          <div className="bg-card text-center rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-theme">Loyalty Points</h3>
            <p className="text-gray-600">{profile.profile?.loyality_points}</p>
          </div>

          {/* Achievements */}
          <div className="bg-card text-center rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-theme">Achievement</h3>
            <p className="text-gray-600">
              {profile.profile?.achivement || "None"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition"
            >
              Edit Profile
            </button>
          )}
          <button
          onClick={() => window.location.href = "forgot-password"} 
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Change Password
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
