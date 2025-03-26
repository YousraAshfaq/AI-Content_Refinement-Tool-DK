🚀 AI-Powered Content Creator
An AI-powered tool that refines text, generates post templates for various platforms, and allows users to download content as an image. Built with Next.js, Tailwind CSS, and Google Gemini AI API.

✨ Features
📜 AI Refinement: Enhances text using Google Gemini AI.

📝 Generate Post: Creates AI-generated content for social media and blogs.

🎨 Platform-Specific Templates: Formats content for Instagram, LinkedIn, Twitter, Blogs, etc.

🖼️ Download as Image: Converts AI-generated content into an image.

🚀 Fast & Responsive: Optimized with Next.js and Tailwind CSS.

📸 Demo
🔗 Live Demo https://ai-content-refinement-tool-j75bmv0z9-yousraashfaqs-projects.vercel.app/

🛠️ Tech Stack
Framework: Next.js

Styling: Tailwind CSS, ShadCN

AI API: Google Gemini AI

🏗️ Setup & Installation

1️⃣ Clone the repository
git clone https://github.com/YousraAshfaq/AI-Content_Refinement-Tool-DK.git
cd AI-Content-Refinement-Tool-DK
2️⃣ Install dependencies
npm install
3️⃣ Set up environment variables
Create a .env.local file in the root directory and add:
GEMINI_API_KEY=your-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
4️⃣ Run the development server
npm run dev

🔗 API Endpoints
🔹 /api/refine
Method: POST

Body: { "content": "text", "contentType": "General" }

Response: { "refinedText": "AI-enhanced content" }

🔹 /api/generate-template
Method: POST

Body: { "content": "text", "contentType": "Instagram Post" }

Response: { "template": "Generated template text" }



