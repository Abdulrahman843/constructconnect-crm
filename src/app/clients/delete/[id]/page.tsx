"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

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
        toast.success("Client deleted successfully!");
        setStatus("success");
        setTimeout(() => {
          router.push("/clients");
        }, 1500);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to delete client");
        toast.error(errorData.error || "Failed to delete client");
        setStatus("error");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
      setStatus("error");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("Client ID is missing");
      setStatus("error");
      toast.error("Client ID missing");
    }
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-center text-2xl font-bold text-gray-800">Delete Client</h1>

        {status === "loading" && (
          <>
            <p className="text-center text-gray-600">
              Are you sure you want to delete this client? <br /> This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-6">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-all duration-300"
              >
                {isDeleting && (
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
                )}
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>

              <Link
                href="/clients"
                className="flex justify-center items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </Link>
            </div>
          </>
        )}

        {status === "success" && (
          <div className="text-center text-green-600">
            <p className="mb-2 font-semibold">Client deleted successfully!</p>
            <p className="text-sm">Redirecting to clients list...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center text-red-600 space-y-4">
            <p className="font-semibold">Error: {error}</p>

            <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
              <button
                onClick={handleDelete}
                className="flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300"
              >
                Try Again
              </button>

              <Link
                href="/clients"
                className="flex justify-center items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-all duration-300"
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
