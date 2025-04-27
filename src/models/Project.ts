import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  clientName: string;
  status: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  clientName: { type: String, required: true },
  status: { type: String, default: "Active" },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
