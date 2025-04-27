import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/mongodb";
import { Chat } from "@/models/Chat";

export const runtime = 'nodejs'; // ✅ (for Vercel functions!)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    await connectDB();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a smart, friendly CRM assistant specialized in construction projects. Always be polite, and suggest next steps.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message?.content || "No reply";

    await Chat.create({
      userMessage: message,
      botReply: reply,
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);

    // 🛠 Fix: safely cast `error` to Error
    const err = error as Error;

    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
