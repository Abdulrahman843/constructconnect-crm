"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditClientPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/clients/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/clients");
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Edit Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" className="border w-full p-2" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="border w-full p-2"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder="Phone" className="border w-full p-2"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="text" placeholder="Company" className="border w-full p-2"
          value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Client</button>
      </form>
    </div>
  );
}
