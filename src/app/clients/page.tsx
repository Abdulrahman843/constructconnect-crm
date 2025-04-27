"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Client = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]); // ✅ correct type
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Clients</h1>
        <Link href="/clients/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Client
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        className="border p-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client._id} className="border-t">
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3">{client.phone}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/clients/edit/${client._id}`} className="text-blue-600 underline">Edit</Link>
                  <Link href={`/clients/delete/${client._id}`} className="text-red-600 underline">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
