import { NextResponse } from "next/server";
import OpenAI from "openai"; // ✅ new import
import { connectDB } from "@/lib/mongodb";
import { Chat } from "@/models/Chat"; // ✅ your model

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ use your environment variable
});

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    await connectDB(); // ✅ connect MongoDB

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ✅
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

    // ✅ Save conversation to MongoDB
    await Chat.create({
      userMessage: message,
      botReply: reply,
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
