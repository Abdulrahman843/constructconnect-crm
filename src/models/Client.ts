import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: Date;
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  company: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Client = mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);
