import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  userMessage: string;
  botReply: string;
  createdAt: Date;
}

const ChatSchema: Schema = new Schema({
  userMessage: { type: String, required: true },
  botReply: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Chat = mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
