"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const deleteProject = async () => {
      try {
        setIsDeleting(true);
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });

        if (!res.ok) {
          throw new Error("Delete failed");
        }

        toast.success("Project deleted successfully!");
        router.push("/projects");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete project.");
        router.push("/projects");
      } finally {
        setIsDeleting(false);
      }
    };

    if (confirm && id) {
      deleteProject();
    }
  }, [confirm, id, router]);

  if (isDeleting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <h1 className="text-2xl font-bold text-red-600">Deleting project...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-red-600">Confirm Delete</h1>
        <p className="text-gray-700">
          Are you sure you want to delete this project? <br />
          This action cannot be undone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setConfirm(true)}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300"
          >
            Yes, Delete
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-md font-semibold transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
