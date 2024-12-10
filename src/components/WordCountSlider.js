import React from "react";

const WordCountSlider = ({ wordCount, setWordCount }) => {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Word Count: {wordCount}</label>
      <input
        type="range"
        min="100"
        max="500"
        value={wordCount}
        onChange={(e) => setWordCount(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default WordCountSlider;