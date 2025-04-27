"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DeleteClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to handle the deletion
  const handleDelete = async () => {
    if (isDeleting) return; // Prevent multiple deletion attempts
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/clients/${id}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        setStatus("success");
        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push("/clients");
        }, 1500);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to delete client");
        setStatus("error");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("An unexpected error occurred");
      setStatus("error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Don't auto-delete on page load - wait for user confirmation
  useEffect(() => {
    if (!id) {
      setError("Client ID is missing");
      setStatus("error");
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
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Client"}
              </button>
              <Link 
                href={`/clients/${id}`}
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