import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { content, contentType } = await req.json();
    console.log("📌 Received Content:", content, "📌 Content Type:", contentType);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ API key is missing!");
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    let prompt = "";
    
    switch (contentType) {
      case "Instagram Post":
        prompt = `Create an engaging Instagram post with a catchy caption, emojis, and relevant hashtags. Content: ${content}`;
        break;
      case "LinkedIn Article":
        prompt = `Write a well-structured LinkedIn article with a strong opening, insights, bullet points, and relevant hashtags. Content: ${content}`;
        break;
      case "Twitter Thread":
        prompt = `Convert this into a compelling Twitter thread with multiple tweets, each under 280 characters. Content: ${content}`;
        break;
      case "Blog Post":
        prompt = `Generate a well-structured blog post with headings, subheadings, and clear paragraphs. Content: ${content}`;
        break;
      default:
        prompt = `Refine this text for better clarity and structure. Content: ${content}`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("📌 Gemini API Response Data:", JSON.stringify(data, null, 2));

    if (!response.ok || !data.candidates || data.candidates.length === 0) {
      console.error("❌ Gemini API Error:", data);
      return NextResponse.json({ error: "Failed to generate template." }, { status: response.status });
    }

    const template =
      data.candidates[0]?.content?.parts?.[0]?.text || "No template available.";

    return NextResponse.json({ template });
  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
