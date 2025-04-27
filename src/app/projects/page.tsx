"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()) ||
    project.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Projects</h1>
        <Link href="/projects/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Project
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by project or client..."
        className="border p-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project._id} className="border-t">
                <td className="p-3">{project.name}</td>
                <td className="p-3">{project.clientName}</td>
                <td className="p-3">{project.status}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/projects/edit/${project._id}`} className="text-blue-600 underline">Edit</Link>
                  <Link href={`/projects/delete/${project._id}`} className="text-red-600 underline">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
