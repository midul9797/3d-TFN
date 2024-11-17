import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const genAi = new GoogleGenerativeAI(
      process.env.NEXT_GOOGLE_API_KEY as string
    );
    const model = genAi.getGenerativeModel({ model: "gemini-pro" });
    const data = await req.json();
    const prompt = data.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();
    return NextResponse.json({ output: output });
  } catch (error) {
    console.log(error);
  }
}
