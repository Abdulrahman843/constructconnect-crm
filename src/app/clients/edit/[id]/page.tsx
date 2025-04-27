"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Client {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // ✅ Safely extract id

  const [form, setForm] = useState<Client>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    if (!id) return; // ✅ Guard if id is missing

    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${id}`);
        if (!res.ok) throw new Error("Failed to fetch client");
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error("Error loading client:", error);
      }
    };

    fetchClient();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/clients");
      } else {
        console.error("Failed to update client");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Edit Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border w-full p-2"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="border w-full p-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          className="border w-full p-2"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition"
        >
          Update Client
        </button>
      </form>
    </div>
  );
}
