"use client";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center p-8 bg-blue-100 overflow-hidden">

      {/* Background Crane Image (Animated) */}
      <div className="absolute inset-0 bg-[url('/images/crane.jpeg')] bg-cover bg-center opacity-50 brightness-90 animate-backgroundMove"></div>

      {/* Light White Overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Main Content */}
      <div className="relative z-10">

        {/* Title and Subtitle */}
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-md">
          Welcome to <span className="text-blue-600">ConstructConnect CRM</span>
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl leading-relaxed">
          A modern, powerful CRM built specifically for construction companies.
          Manage your clients, projects, subscriptions, and support — all in one place.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-6xl">
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center justify-center">📋 Manage Projects</h2>
            <p className="text-gray-600 text-base">Track ongoing projects, update statuses, and assign clients effortlessly.</p>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center justify-center">👥 Client Management</h2>
            <p className="text-gray-600 text-base">Maintain a complete client database, including contacts, companies, and notes.</p>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center justify-center">💳 Subscriptions</h2>
            <p className="text-gray-600 text-base">Manage subscriptions, payments, and upgrades with ease.</p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
        >
          🚀 Get Started
        </a>

        {/* Bonus: Stats Counters */}
        <section className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-700">150+</h2>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-blue-700">80+</h2>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-blue-700">10+</h2>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </section>

        {/* Bonus: Testimonials */}
        <section className="relative z-10 mt-20 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">What Our Clients Say</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 italic">{"ConstructConnect CRM completely transformed the way we manage projects. Highly recommended!"}</p>
            <div className="mt-4 font-semibold text-blue-600">— John D., CEO, BuildPro Ltd.</div>
          </div>
        </section>

        {/* Bonus: Partner Logos */}
        <section className="relative z-10 mt-20 py-10">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
            {"Trusted by Leading Companies"}
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <Image src="/images/logo1.svg" alt="Partner 1" width={100} height={50} className="h-12 object-contain" />
            <Image src="/images/logo2.svg" alt="Partner 2" width={100} height={50} className="h-12 object-contain" />
            <Image src="/images/logo3.svg" alt="Partner 3" width={100} height={50} className="h-12 object-contain" />
            <Image src="/images/logo4.svg" alt="Partner 4" width={100} height={50} className="h-12 object-contain" />
          </div>
        </section>

      </div>
    </div>
  );
}
