"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ✅ Define Project type
interface Project {
  _id: string;
  name: string;
  clientName: string;
  status: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-blue-700">Projects</h1>
          <Link
            href="/projects/add"
            className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all duration-300"
          >
            + Add Project
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by project or client..."
            className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-100 text-blue-700 text-sm sm:text-base">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Client</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{project.name}</td>
                    <td className="p-4">{project.clientName}</td>
                    <td className="p-4">{project.status}</td>
                    <td className="p-4 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/projects/edit/${project._id}`}
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/projects/delete/${project._id}`}
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
                    No projects found.
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
