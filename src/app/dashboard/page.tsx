"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-blue-700 text-center md:text-left">
        Dashboard
      </h1>

      {/* Widgets Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Clients */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Clients</h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>

        {/* Active Projects */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Active Projects</h2>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-purple-600">£32,400</p>
        </div>
      </div>
    </div>
  );
}
