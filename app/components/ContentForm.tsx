"use client";
import { useState } from "react";
import axios from "axios";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

export default function ContentForm() {
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState("General");
  const [refinedText, setRefinedText] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [loadingRefine, setLoadingRefine] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  const handleDownloadImage = () => {
    setTimeout(() => {
      const contentElement = document.getElementById("refined-content");
      if (!contentElement) return console.error("Error: Element not found.");

      toPng(contentElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "refined-content.png";
          link.click();
        })
        .catch((error) => console.error("Error generating image:", error));
    }, 100);
  };

  const handleRefine = async () => {
    if (!content) return;
    setLoadingRefine(true);
    try {
      const response = await axios.post("/api/refine", { content, contentType });
      setRefinedText(response.data.refinedText || "No refined text available.");
    } catch (error) {
      console.error("Error refining content:", error);
      setRefinedText("Failed to refine text.");
    }
    setLoadingRefine(false);
  };

  const handleGenerateTemplate = async () => {
    if (!content) return;
    setLoadingTemplate(true);
    try {
      const response = await axios.post("/api/generate-template", { content, contentType });
      setGeneratedTemplate(response.data.template || "No template available.");
    } catch (error) {
      console.error("Error generating template:", error);
      setGeneratedTemplate("Failed to generate template.");
    }
    setLoadingTemplate(false);
  };

  // Function to get different designs based on content type
  const renderTemplate = () => {
    const styles = {
      "Instagram Post": "border-pink-500 bg-pink-50 text-pink-700",
      "LinkedIn Article": "border-blue-500 bg-blue-50 text-blue-700",
      "Twitter Thread": "border-cyan-500 bg-cyan-50 text-cyan-700",
      "Blog Post": "border-green-500 bg-green-50 text-green-700",
      General: "border-gray-500 bg-gray-50 text-gray-700",
    };
  
    const selectedStyle = styles[contentType as keyof typeof styles];
  
    return (
      <div className={`p-4 border-l-4 rounded-lg shadow-md ${selectedStyle}`}>
        <h3 className="font-bold text-lg">{contentType}</h3>
        <p className="mt-2 leading-relaxed">{generatedTemplate}</p>
      </div>
    );
  };
  

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-gray-800">AI Content Refinement</h2>

      {/* Content Input */}
      <textarea
        className="w-full p-3 border rounded-lg mt-4 focus:ring-2 focus:ring-blue-400"
        placeholder="Enter your content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Dropdown for Content Type Selection */}
      <label className="block mt-4 font-semibold text-gray-700">
        Select Content Type:
        <select
          className="w-full p-3 mt-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Instagram Post">Instagram Post</option>
          <option value="LinkedIn Article">LinkedIn Article</option>
          <option value="Twitter Thread">Twitter Thread</option>
          <option value="Blog Post">Blog Post</option>
        </select>
      </label>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button
          className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          onClick={handleRefine}
          disabled={loadingRefine}
        >
          {loadingRefine ? "Refining..." : "Refine"}
        </Button>

        <Button
          className="px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          onClick={handleGenerateTemplate}
          disabled={loadingTemplate}
        >
          {loadingTemplate ? "Generating..." : "Generate Post Template"}
        </Button>
      </div>

      {/* Refined Output + Download Button */}
      {refinedText && (
        <>
          <div id="refined-content" className="mt-6 p-4 bg-gray-100 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800">Refined Content:</h3>
            <p className="mt-2 text-gray-700">{refinedText}</p>
          </div>

          <button
            className="mt-4 w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            onClick={handleDownloadImage}
          >
            Download as Image
          </button>
        </>
      )}

      {/* Generated Post Template */}
      {generatedTemplate && (
        <div className="mt-6 p-5 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Generated Post Template</h3>
          {renderTemplate()}
        </div>
      )}
    </div>
  );
}
