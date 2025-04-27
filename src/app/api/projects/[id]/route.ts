import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

// ✅ GET single project
export async function GET(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const project = await Project.findById(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// ✅ PUT update a project
export async function PUT(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const data = await request.json();
  const project = await Project.findByIdAndUpdate(id, data, { new: true });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// ✅ DELETE a project
export async function DELETE(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Project deleted" });
}
