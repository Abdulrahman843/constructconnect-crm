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

  // 🔥 Fetch existing company data
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

  // 🔥 Handle form submission
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
      <div className="text-center py-10 text-gray-500">
        Loading company info...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* ✨ Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Edit Company Profile</h2>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full"
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
            className="border border-gray-300 p-3 rounded-lg w-full"
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
            className="border border-gray-300 p-3 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full font-semibold transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Company Profile"}
        </button>
      </form>

      {/* ✨ Live Preview */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col items-center text-center space-y-4">
        {company.logoUrl && (
          <div className="relative w-24 h-24 rounded-full overflow-hidden border">
            <Image
              src={company.logoUrl}
              alt="Live Company Logo"
              fill
              className="object-cover"
            />
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800">{company.name || "Company Name"}</h2>
        <p className="text-gray-600">{company.description || "Company description goes here."}</p>
      </div>
    </div>
  );
}