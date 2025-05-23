import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Client } from "@/models/Client";

export const runtime = "nodejs"; // Optional

// Helper to extract ID from URL
function extractIdFromUrl(req: NextRequest) {
  const urlParts = req.nextUrl.pathname.split("/");
  return urlParts[urlParts.length - 1]; // Last part is the ID
}

// --- GET single client by ID
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const id = extractIdFromUrl(req);

    const client = await Client.findById(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json({ error: (error as Error).message || "Failed to fetch client" }, { status: 500 });
  }
}

// --- PUT update a client
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const id = extractIdFromUrl(req);

    const data = await req.json();
    const client = await Client.findByIdAndUpdate(id, data, { new: true });
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: (error as Error).message || "Failed to update client" }, { status: 500 });
  }
}

// --- DELETE a client
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = extractIdFromUrl(req);

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Client deleted" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ error: (error as Error).message || "Failed to delete client" }, { status: 500 });
  }
}
