import { Company } from "@/models/Company";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  let company = await Company.findOne();

  // ✅ Auto-create if no company found
  if (!company) {
    company = await Company.create({
      name: "ConstructConnect CRM",
      description: "Your trusted construction CRM platform.",
      logoUrl: "/images/constructconnectlogo.png", // Default logo inside /public/images/
    });
  }

  return NextResponse.json(company);
}

export async function POST(request: Request) {
  await connectDB();
  const { name, description, logoUrl } = await request.json();

  let company = await Company.findOne();
  if (company) {
    company.name = name;
    company.description = description;
    company.logoUrl = logoUrl;
    await company.save();
  } else {
    company = await Company.create({ name, description, logoUrl });
  }

  return NextResponse.json({ success: true, company });
}
