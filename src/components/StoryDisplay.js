import React from "react";

const StoryDisplay = ({ story, error }) => {
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (story) {
    return <div className="p-4 border rounded bg-gray-100">{story}</div>;
  }

  return null;
};

export default StoryDisplay;