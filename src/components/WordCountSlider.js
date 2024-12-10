import React, { useState } from "react";

const WordCountSlider = ({ wordCount, setWordCount, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const marks = [100,300, 500];
  const isDarkMode = theme === "dark";

  return (
    <div
      className="space-y-4 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider */}
      <div className="relative px-6 w-full">
        {/* Word Count Bubble */}
        {isHovered && (
          <div
            className={`absolute -top-8 text-xs px-3 py-1 rounded shadow-md transition-opacity ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            style={{
              left: `calc(${((wordCount - 100) / 400) * 100}% - 16px)`,
              transform: "translateX(-50%)",
            }}
          >
            {wordCount} words
          </div>
        )}

        {/* Slider */}
        <input
          type="range"
          min="100"
          max="500"
          step="1"
          value={wordCount}
          onChange={(e) => setWordCount(Number(e.target.value))}
          className={`w-full h-2 appearance-none rounded-full cursor-pointer ${
            isDarkMode ? "bg-gray-600" : "bg-gray-300"
          }`}
          style={{
            background: `linear-gradient(to right, #38b2ac ${
              ((wordCount - 100) / 400) * 100
            }%, ${
              isDarkMode ? "#4a5568" : "#e2e8f0"
            } ${(wordCount - 100) / 400}%)`,
          }}
        />

        {/* Knob Customization */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 25px;
            width: 25px;
            border-radius: 50%;
            background: ${isDarkMode ? "white" : "black"};
            cursor: pointer;
          }
          input[type="range"]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${isDarkMode ? "white" : "black"};
            cursor: pointer;
          }
        `}</style>
      </div>

      {/* Marks */}
      <div className="flex justify-between mt-2 text-xs">
        {marks.map((mark) => (
          <span
            key={mark}
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordCountSlider;