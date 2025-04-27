"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify"; // ✅ import toast

export default function DeleteClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Client deleted successfully!"); // ✅ success toast
        setStatus("success");
        setTimeout(() => {
          router.push("/clients"); // ✅ go back to list
        }, 1500);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to delete client");
        toast.error(errorData.error || "Failed to delete client"); // ✅ error toast
        setStatus("error");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred"); // ✅ error toast
      setStatus("error");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("Client ID is missing");
      setStatus("error");
      toast.error("Client ID missing"); // ✅ toast
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Delete Client</h1>

        {status === "loading" && (
          <>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this client? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
              >
                {isDeleting ? (
                  <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : null}
                {isDeleting ? "Deleting..." : "Yes, Delete Client"}
              </button>
              <Link
                href="/clients"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </Link>
            </div>
          </>
        )}

        {status === "success" && (
          <div className="text-green-600">
            <p className="mb-4">Client successfully deleted!</p>
            <p className="text-sm">Redirecting to clients list...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-red-600">
            <p className="mb-4">Error: {error}</p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Try Again
              </button>
              <Link
                href="/clients"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Back to Clients
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
