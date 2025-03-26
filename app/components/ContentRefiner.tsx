"use client"; 
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("Instagram Post"); // Default value
  const [refinedContent, setRefinedContent] = useState("");

  const handleRefine = async () => {
    try {
      const response = await axios.post("/api/refine", {
        title,
        description,
        contentType,  // Send content type to API
      });
      setRefinedContent(response.data.refinedText);
    } catch (error) {
      console.error("Error refining content:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Content Refinement Tool</h2>

      <Textarea 
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />

      <Textarea
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />

      {/* Content Type Dropdown */}
      <Select onValueChange={(value) => setContentType(value)} value={contentType}>
        <SelectTrigger className="mb-4">
          <SelectValue placeholder="Select Content Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Instagram Post">Instagram Post</SelectItem>
          <SelectItem value="LinkedIn Article">LinkedIn Article</SelectItem>
          <SelectItem value="Blog Post">Blog Post</SelectItem>
          <SelectItem value="Tweet">Tweet</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleRefine} className="w-full">
        Refine Content
      </Button>

      {refinedContent && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="font-semibold">Refined Content:</h3>
          <p>{refinedContent}</p>
        </div>
      )}
    </div>
  );
}
