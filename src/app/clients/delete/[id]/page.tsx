"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function DeleteClientPage() {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const deleteClient = async () => {
      await fetch(`/api/clients/${id}`, { method: "DELETE" });
      router.push("/clients");
    };
    deleteClient();
  }, [id, router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl">Deleting Client...</h1>
    </div>
  );
}
