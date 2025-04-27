import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await connectDB();
  const { name, description, clientName, status } = await req.json();

  const project = await Project.create({ name, description, clientName, status });
  return NextResponse.json(project);
}
