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
  const [clients, setClients] = useState<Client[]>([]);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-blue-700">Clients</h1>
          <Link
            href="/clients/add"
            className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all duration-300"
          >
            + Add Client
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-100 text-blue-700 text-sm sm:text-base">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{client.name}</td>
                    <td className="p-4">{client.email}</td>
                    <td className="p-4">{client.phone}</td>
                    <td className="p-4 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/clients/edit/${client._id}`}
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/clients/delete/${client._id}`}
                        className="text-red-600 hover:underline text-sm sm:text-base"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
