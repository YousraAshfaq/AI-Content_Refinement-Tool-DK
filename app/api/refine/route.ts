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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Refine this text for a ${contentType}: ${content}` },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("📌 Gemini API Response Data:", JSON.stringify(data, null, 2));

    if (!response.ok || !data.candidates || data.candidates.length === 0) {
      console.error("❌ Gemini API Error:", data);
      return NextResponse.json({ error: "Failed to refine text." }, { status: response.status });
    }

    const refinedText =
      data.candidates[0]?.content?.parts?.[0]?.text || "No refined text available.";

    return NextResponse.json({ refinedText });
  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
