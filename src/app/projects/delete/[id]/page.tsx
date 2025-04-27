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
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Deleting project...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Confirm Delete</h1>
      <p className="mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setConfirm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => router.push("/projects")}
          className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
