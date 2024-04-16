import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env.mjs";

// Create an OpenAI API client (that's edge-friendly!)
// Use the OPENAI_API_KEY environment variable
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// Set the runtime to edge for the best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    // Customize the model as needed
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
