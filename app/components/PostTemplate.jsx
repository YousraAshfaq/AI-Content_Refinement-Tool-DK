"use client";

import ExportImageButton from "./ExportImageButton";

const PostTemplate = ({ content }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      {/* This div is the exportable template */}
      <div id="post-template" className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">{content.title}</h2>
        <p className="text-gray-700 mt-2">{content.description}</p>
      </div>

      {/* Button to Export Image */}
      <ExportImageButton targetId="post-template" />
    </div>
  );
};

export default PostTemplate;
