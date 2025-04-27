import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Client } from "@/models/Client";

// GET single client
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const client = await Client.findById(params.id);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
  return NextResponse.json(client);
}

// UPDATE client
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const client = await Client.findByIdAndUpdate(params.id, data, { new: true });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
  return NextResponse.json(client);
}

// DELETE client
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const client = await Client.findByIdAndDelete(params.id);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
  return NextResponse.json({ message: "Client deleted" });
}
