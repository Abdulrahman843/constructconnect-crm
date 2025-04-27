"use client";

import { useState } from "react";
import CompanyProfileForm from "./CompanyProfileForm";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>("company");

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Page Heading */}
        <h1 className="text-3xl font-extrabold text-blue-700 text-center md:text-left">
          Settings
        </h1>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section) => (
            <div
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`p-6 rounded-lg shadow-md cursor-pointer transition-all
                ${
                  activeSection === section.key
                    ? "border-2 border-blue-600 bg-blue-50 shadow-lg"
                    : "bg-white hover:shadow-lg"
                }
              `}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600 text-sm">{section.description}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          {activeSection === "company" && (
            <CompanyProfileForm />
          )}

          {activeSection === "team" && (
            <div className="text-center text-gray-600 py-12 text-lg">
              🚧 Team Members management coming soon!
            </div>
          )}

          {activeSection === "preferences" && (
            <div className="text-center text-gray-600 py-12 text-lg">
              ⚙️ Notification preferences coming soon!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
