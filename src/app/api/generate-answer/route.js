import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { title, description } = await req.json();
 
    // Build prompt dynamically
    let prompt = `Question Title: ${title}\n`;
    if (description && description.trim() !== "") {
      prompt += `Description: ${description}\n`;
    }
    prompt += `Provide a full, detailed answer:`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    const cleanedContent = answer.replace(
      /```(\w+)?\n([^\n]+)\n```/g,
      (_, lang, code) =>
        code.length < 30
          ? "`" + code + "`"
          : "```" + (lang || "") + "\n" + code + "\n```"
    );
    return new Response(JSON.stringify({ message:cleanedContent,success:true }), { status: 200 });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ message: "Error generating answer",success:false }), {
      status: 500,
    });
  }
}
