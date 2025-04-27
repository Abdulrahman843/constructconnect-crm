"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", description: "", clientName: "", status: "Active" });

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/projects");
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Project Name" className="border w-full p-2" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="Description" className="border w-full p-2" required
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        <input type="text" placeholder="Client Name" className="border w-full p-2" required
          value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
        <select className="border w-full p-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Project</button>
      </form>
    </div>
  );
}
