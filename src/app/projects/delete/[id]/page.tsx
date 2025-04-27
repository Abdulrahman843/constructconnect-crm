"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      toast.success("Project deleted successfully!");
      router.push("/projects");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  if (!confirm) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Confirm Delete</h1>
        <p className="mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => router.push("/projects")}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // If confirmed
  handleDelete();
  return (
    <div className="p-8">
      <h1 className="text-2xl">Deleting project...</h1>
    </div>
  );
}
