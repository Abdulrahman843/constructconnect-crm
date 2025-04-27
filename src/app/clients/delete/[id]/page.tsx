"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function DeleteClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // ✅ safely cast id to string

  useEffect(() => {
    if (!id) return; // ✅ Skip if id is missing

    const deleteClient = async () => {
      try {
        const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });

        if (res.ok) {
          router.push("/clients");
        } else {
          console.error("Failed to delete client:", await res.text());
        }
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    };

    deleteClient();
  }, [id, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Deleting Client...</h1>
      <p className="text-gray-600">Please wait while we remove the client from the system.</p>
    </div>
  );
}
