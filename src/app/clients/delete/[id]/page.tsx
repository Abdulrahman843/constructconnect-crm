"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function DeleteClientPage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id as string; // ✅ safely cast to string (important!)

  useEffect(() => {
    if (!id) return; // ✅ avoid running if id is undefined

    const deleteClient = async () => {
      try {
        const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });

        if (res.ok) {
          router.push("/clients");
        } else {
          console.error("Failed to delete client");
        }
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    };

    deleteClient();
  }, [id, router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-800">Deleting Client...</h1>
    </div>
  );
}
