import mongoose, { Schema } from "mongoose";

const CompanySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    logoUrl: { type: String },
  }, { timestamps: true });

// Always check if model already exists to avoid overwrite in Next.js
export const Company = mongoose.models.Company || mongoose.model("Company", CompanySchema);
