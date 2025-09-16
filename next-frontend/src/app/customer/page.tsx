"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-theme min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Welcome to ArkPlayZone!
          </h1>
          <p className="text-theme/70 mb-6 text-lg md:text-xl">
            The ultimate indoor playground for kids! Fun, safe, and full of
            activities.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent-hover transition"
            >
              Get Started
            </Link>
            <Link
              href="/bookings"
              className="bg-theme text-accent border border-accent px-6 py-3 rounded-md hover:bg-accent hover:text-white transition"
            >
              Book a Slot
            </Link>
          </div>
        </div>
        {/* Hero Image */}
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-screen">
            <img
              src="/media/landing_hero.jpg"
              alt="Playground"
              className="w-full h-full object-cover rounded-2xl opacity-20 block"
            />
          </div>
        </div>
      </section>

      {/* Features / Activities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-accent text-center mb-12">
          Fun Activities for Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card z-1 rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <h3 className="text-theme font-semibold text-xl mb-2">Ball Pit</h3>
            <p className="text-theme/70">
              Dive into our colorful ball pit and enjoy endless fun safely.
            </p>
          </div>
          <div className="bg-card z-1 rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <h3 className="text-theme font-semibold text-xl mb-2">
              Obstacle Course
            </h3>
            <p className="text-theme/70">
              Challenge yourself in our safe indoor obstacle course for kids.
            </p>
          </div>
          <div className="bg-card z-1 rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <h3 className="text-theme font-semibold text-xl mb-2">
              Story Time & Crafts
            </h3>
            <p className="text-theme/70">
              Fun learning activities like storytime, crafts, and creative play.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-card/80 backdrop-blur-md py-16">
        <h2 className="text-3xl font-bold text-accent text-center mb-12">
          What Parents Say
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card bg-theme rounded-lg shadow-md p-6 text-center">
            <p className="text-theme/70 mb-4">
              "My kids love ArkPlayZone! Safe, fun, and full of exciting
              activities."
            </p>
            <p className="text-accent font-semibold">- Sarah K.</p>
          </div>
          <div className="bg-card bg-theme rounded-lg shadow-md p-6 text-center">
            <p className="text-theme/70 mb-4">
              "Great indoor playground, perfect for rainy days. Highly
              recommended!"
            </p>
            <p className="text-accent font-semibold">- Mark T.</p>
          </div>
          <div className="bg-card bg-theme rounded-lg shadow-md p-6 text-center">
            <p className="text-theme/70 mb-4">
              "My children are always excited to come here. Excellent staff and
              activities."
            </p>
            <p className="text-accent font-semibold">- Lina P.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">Ready for Fun?</h2>
        <Link
          href="/bookings"
          className="bg-accent text-white px-8 py-4 rounded-md hover:bg-accent-hover transition text-lg"
        >
          Book a Slot Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-card shadow-inner py-6 text-center text-theme">
        &copy; 2025 ArkPlayZone. All rights reserved.
      </footer>
    </div>
  );
}
