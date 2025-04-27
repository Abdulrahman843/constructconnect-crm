import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Client } from "@/models/Client";

// Define the runtime for Vercel Functions
export const runtime = 'nodejs'; // Using Node.js runtime for MongoDB compatibility

// Define the params type
type Params = {
  params: {
    id: string;
  };
};

// ✅ GET single client by ID
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();
    const { id } = params;

    const client = await Client.findById(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}

// ✅ PUT update a client
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();
    const { id } = params;

    const data = await req.json();
    const client = await Client.findByIdAndUpdate(id, data, { new: true });
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}

// ✅ DELETE a client
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();
    const { id } = params;

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Client deleted" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}