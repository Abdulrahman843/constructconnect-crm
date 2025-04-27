import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

// GET single project
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const project = await Project.findById(params.id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json(project);
}

// UPDATE project
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const project = await Project.findByIdAndUpdate(params.id, data, { new: true });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json(project);
}

// DELETE project
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const project = await Project.findByIdAndDelete(params.id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json({ message: "Project deleted" });
}
