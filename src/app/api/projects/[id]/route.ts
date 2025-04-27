import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

export const runtime = 'nodejs'; // Good for MongoDB on Vercel

// Helper to extract ID from URL
function extractIdFromUrl(req: NextRequest) {
  const parts = req.nextUrl.pathname.split("/");
  return parts[parts.length - 1];
}

// --- GET single project by ID
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const id = extractIdFromUrl(req);

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// --- PUT update a project
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const id = extractIdFromUrl(req);

    const data = await req.json();
    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// --- DELETE a project
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = extractIdFromUrl(req);

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
