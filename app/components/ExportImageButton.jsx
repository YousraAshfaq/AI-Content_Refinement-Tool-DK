"use client";

import { toPng } from "html-to-image";
import download from "downloadjs";
import { Button } from "@/components/ui/button";

const ExportImageButton = ({ targetId }) => {
  const handleDownload = async () => {
    const node = document.getElementById(targetId);
    if (!node) return;

    try {
      const dataUrl = await toPng(node);
      download(dataUrl, "post-template.png");
    } catch (error) {
      console.error("Error exporting image:", error);
    }
  };

  return (
    <Button onClick={handleDownload} className="mt-4">
      Download as Image
    </Button>
  );
};

export default ExportImageButton;
