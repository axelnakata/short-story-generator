import React from "react";
import { FaCopy, FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";

const StoryDisplay = ({ story, error, theme }) => {
  const handleSaveAsPDF = () => {
    const doc = new jsPDF();

    // Add some padding and wrap text
    const pageWidth = doc.internal.pageSize.getWidth();
    const margins = 10; // Margin on each side
    const usableWidth = pageWidth - margins * 2;

    // Split the text into lines based on the usable width
    const lines = doc.splitTextToSize(story, usableWidth);

    // Write text to the PDF with padding
    doc.text(lines, margins, margins + 10); // Add vertical padding
    doc.save("short_story.pdf");
  };

  if (error) {
    return (
      <div
        className={`text-center p-4 rounded-lg ${
          theme === "dark" ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700"
        }`}
      >
        {error}
      </div>
    );
  }

  if (story) {
    return (
      <div
        className={`relative p-6 rounded-xl shadow-lg ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100"
            : "bg-gradient-to-br from-gray-200 via-gray-100 to-white text-gray-800"
        }`}
      >
        <p className="whitespace-pre-line leading-relaxed">{story}</p>
        <div className="mt-4 flex justify-center space-x-4">
          {/* Copy Button */}
          <button
            onClick={() => navigator.clipboard.writeText(story)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              theme === "dark"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <FaCopy />
            Copy Story
          </button>

          {/* Save as PDF Button */}
          <button
            onClick={handleSaveAsPDF}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              theme === "dark"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            <FaFilePdf />
            Save as PDF
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default StoryDisplay;