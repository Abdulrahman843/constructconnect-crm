"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CompanyProfileForm() {
  const [company, setCompany] = useState({
    name: "",
    description: "",
    logoUrl: "/images/constructconnectlogo.png",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await fetch("/api/company");
        const data = await res.json();
        setCompany(data || {});
      } catch (error) {
        console.error("Failed to fetch company:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      if (res.ok) {
        toast.success("✅ Company profile updated!");
      } else {
        toast.error("❌ Failed to update company profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Error updating company.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-center text-gray-500 text-lg">Loading company info...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-blue-700 text-center md:text-left mb-4">
            Edit Company Profile
          </h2>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
            <input
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={company.description}
              onChange={handleChange}
              rows={4}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:border-blue-400 sm:text-sm resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Logo URL</label>
            <input
              type="text"
              name="logoUrl"
              value={company.logoUrl}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition-all duration-300 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Company Profile"}
          </button>
        </form>

        {/* Live Preview */}
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center space-y-6">
          {company.logoUrl && (
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-blue-300">
              <Image
                src={company.logoUrl}
                alt="Company Logo Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800">{company.name || "Company Name"}</h2>
          <p className="text-gray-600">{company.description || "Company description goes here."}</p>
        </div>
      </div>
    </div>
  );
}
