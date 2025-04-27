import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Client } from "@/models/Client";

export async function GET() {
  await connectDB();
  const clients = await Client.find().sort({ createdAt: -1 });
  return NextResponse.json(clients);
}

export async function POST(req: Request) {
  await connectDB();
  const { name, email, phone, company } = await req.json();

  const client = await Client.create({ name, email, phone, company });
  return NextResponse.json(client);
}
