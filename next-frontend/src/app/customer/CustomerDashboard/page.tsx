"use client";

import { CustomerNavBar } from "../component/customer_nav";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-theme">
     

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">
            Welcome back, Swajan!
          </h1>
          <p className="text-theme/70">
            Here’s a quick overview of your activities and upcoming fun!
          </p>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-theme font-semibold text-lg mb-2">Upcoming Events</h2>
            <p className="text-accent font-bold text-2xl">3</p>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-theme font-semibold text-lg mb-2">Slot Bookings</h2>
            <p className="text-accent font-bold text-2xl">12</p>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-theme font-semibold text-lg mb-2">Play Zone Occupancy</h2>
            <p className="text-accent font-bold text-2xl">18 / 20</p>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-theme font-semibold text-lg mb-2">Feedback</h2>
            <p className="text-accent font-bold text-2xl">5 New</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition">
            Book a Slot
          </button>
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition">
            Join Activity
          </button>
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition">
            Update Profile
          </button>
        </div>

        {/* Recent Activities Table */}
        <div className="bg-card shadow-md rounded-lg p-6">
          <h2 className="text-theme font-semibold text-xl mb-4">Recent Activities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-theme">
              <thead>
                <tr className="border-b border-accent">
                  <th className="px-4 py-2 text-left">Activity</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-accent hover:bg-accent-hover/20 transition">
                  <td className="px-4 py-2">Booked Ball Pit Slot</td>
                  <td className="px-4 py-2">2025-09-12</td>
                  <td className="px-4 py-2 text-accent font-semibold">Confirmed</td>
                </tr>
                <tr className="border-b border-accent hover:bg-accent-hover/20 transition">
                  <td className="px-4 py-2">Joined Obstacle Course</td>
                  <td className="px-4 py-2">2025-09-10</td>
                  <td className="px-4 py-2 text-accent font-semibold">Pending</td>
                </tr>
                <tr className="border-b border-accent hover:bg-accent-hover/20 transition">
                  <td className="px-4 py-2">Attended Story Time</td>
                  <td className="px-4 py-2">2025-09-08</td>
                  <td className="px-4 py-2 text-accent font-semibold">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
