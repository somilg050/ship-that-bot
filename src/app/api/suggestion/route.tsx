import { NextResponse } from "next/server";

const questions = [
  {
    id: 1,
    question:
      "Store and retrieve dynamic questions for your chatbot to suggest, can be managed through a database or retrieved via an API endpoint.",
  },
  {
    id: 2,
    question:
      "Utilize this API route to seamlessly integrate data fetching into your application, ensuring smooth user experiences.",
  },
  {
    id: 3,
    question:
      "Integrating LLMs can help in providing more relevant and contextually appropriate questions, making the interaction more engaging for users.",
  },
];

export async function GET() {
  return new NextResponse(JSON.stringify(questions), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
