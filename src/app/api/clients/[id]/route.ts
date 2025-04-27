import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Client } from "@/models/Client";

// ✅ GET single client by ID
export async function GET(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const client = await Client.findById(id);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(client);
}

// ✅ PUT update a client
export async function PUT(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const data = await request.json();
  const client = await Client.findByIdAndUpdate(id, data, { new: true });
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(client);
}

// ✅ DELETE a client
export async function DELETE(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const client = await Client.findByIdAndDelete(id);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Client deleted" });
}
