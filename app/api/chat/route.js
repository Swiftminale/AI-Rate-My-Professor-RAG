import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `
You are a helpful agent designed to assist students in finding the top professors based on their specific needs, using data from the Rate My Professor database. When a student asks for recommendations, you retrieve relevant information using a Retrieval-Augmented Generation (RAG) model to identify the top 3 professors that best match the student's query. Each professor you recommend should be selected based on their ratings, student reviews, teaching style, and subject expertise. Ensure your responses are clear, concise, and tailored to the query.

Instructions:

1. When given a query (e.g., "Best computer science professors for AI"), retrieve relevant information on the top 3 professors and summarize key details, such as their average rating, teaching style, and notable student feedback.
2. If the query includes specific preferences (e.g., "professors with good communication skills" or "who are easy graders"), ensure the recommendations reflect those needs.
3. Present the results clearly, highlighting why each professor is a good fit for the student’s query, and rank them from 1 to 3.
4. If a student requests more information about a professor, provide detailed insights based on retrieved data, including ratings on specific aspects like difficulty, helpfulness, or clarity.
`;

export async function POST(req) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    // spaceId: process.env.PINECONE_SPACE_ID
  });
  const index = pc.index("rag").namespace("ns1");
  const openai = new OpenAI();

  const text = data[data.length - 1].content;
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encodeing_format: "float",
  });

  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  });

  let resultString =
    "\n\nReturned results from vector DB (done automatically):\n";
  results.matches.forEach((match, index) => {
    resultString += `\n${index + 1}. **Professor ${
      match.metadata.professor
    }**\n`;
    resultString += `- **Subject:** ${match.metadata.subject}\n`;
    resultString += `- **Rating:** ⭐${match.metadata.stars}\n`;
    resultString += `- **Review:** "${match.metadata.review}"\n`;
    resultString += `\n`; // Added newline between professors
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;

  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Use the correct model
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage.map((msg) => ({
        role: "user",
        content: msg.content,
      })), // Ensure role is 'user' for all messages
      { role: "user", content: lastMessageContent }, // Correct role assignment for user's last message
    ],
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
