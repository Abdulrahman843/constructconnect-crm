"use client";

import { useState } from "react";
import CompanyProfileForm from "./CompanyProfileForm"; // ✅ Import Company Profile Form

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>("company"); // 🛠 Default to "company"

  const settingsSections = [
    {
      key: "company",
      title: "Company Information",
      description: "Manage your company profile, logo, and description here.",
    },
    {
      key: "team",
      title: "Team Members",
      description: "Invite team members and set permissions.",
    },
    {
      key: "preferences",
      title: "Preferences",
      description: "Customize your notification and communication settings.",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Settings</h1>

      {/* Section Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {settingsSections.map((section) => (
          <div
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`p-6 rounded-lg shadow-md cursor-pointer transition
              ${
                activeSection === section.key
                  ? "border-2 border-blue-600 shadow-lg bg-blue-50"
                  : "bg-white hover:shadow-lg"
              }
            `}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {section.title}
            </h2>
            <p className="text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Section Content */}
      <div className="bg-white p-8 rounded-lg shadow-md transition">
        {activeSection === "company" && (
          <CompanyProfileForm />
        )}

        {activeSection === "team" && (
          <div className="text-center text-gray-600">
            🚧 Team Members management coming soon!
          </div>
        )}

        {activeSection === "preferences" && (
          <div className="text-center text-gray-600">
            ⚙️ Notification preferences coming soon!
          </div>
        )}
      </div>
    </div>
  );
}
