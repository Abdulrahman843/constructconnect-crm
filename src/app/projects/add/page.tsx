"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    clientName: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Project created successfully!");
        router.push("/projects");
      } else {
        toast.error("Failed to create project.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Add Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="border w-full p-2"
          required
          value={form.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          className="border w-full p-2"
          required
          value={form.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setForm({ ...form, description: e.target.value })
          }
        ></textarea>
        <input
          type="text"
          placeholder="Client Name"
          className="border w-full p-2"
          required
          value={form.clientName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, clientName: e.target.value })
          }
        />

        <button
          type="submit"
          className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
