import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/mongodb";
import { Chat } from "@/models/Chat";

export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { conversation } = await req.json();

    await connectDB();

    const messages = [
      {
        role: "system",
        content: "You are a smart, friendly CRM assistant specialized in construction projects. Always be polite, and suggest next steps.",
      },
      ...conversation.map((line: string) => ({
        role: line.startsWith("You:") ? "user" : "assistant",
        content: line.replace(/^You: |^Bot: /, ""),
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = completion.choices[0].message?.content || "No reply";

    await Chat.create({
      userMessage: conversation.at(-1)?.replace(/^You: /, ""),
      botReply: reply,
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
