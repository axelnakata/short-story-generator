import React, { useState } from "react";
import GenreSelector from "./components/GenreSelector";
import WordCountSlider from "./components/WordCountSlider";
import StoryDisplay from "./components/StoryDisplay";
import axios from "axios";
import { FaMoon, FaSun } from "react-icons/fa";

const App = () => {
  const [genre, setGenre] = useState(""); // Selected genre
  const [selectedGenre, setSelectedGenre] = useState("");
  const [wordCount, setWordCount] = useState(300); // Default word count
  const [story, setStory] = useState(""); // Generated story
  const [error, setError] = useState(null); // Error handling
  const [theme, setTheme] = useState("light"); // Light or dark theme

  // Function to handle story generation
  // const generateStory = async () => {
  //   setError(null); // Clear previous errors
  //   setStory(""); // Clear previous story

  //   if (!selectedGenre) {
  //     alert("Please select a genre");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/completions",
  //       {
  //         model: "gpt-3.5-turbo",
  //         prompt: `Write a short story in the ${genre} genre with around ${wordCount} words.`,
  //         max_tokens: Math.min(wordCount, 500),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  //         },
  //       }
  //     );

  //     setStory(response.data.choices[0].text.trim());
  //   } catch (err) {
  //     setError("Failed to generate story. Please try again.");
  //   }
  // };

  const generateStory = async () => {
    setError(null); // Clear previous errors
    setStory(""); // Clear previous story
  
    if (!selectedGenre) {
      alert("Please select a genre");
      return;
    }
  
    // Define the word count (this can be dynamic based on your slider value)
    const wordCount = 200; // Adjust this as per your slider or state
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo",
          prompt: `Write a short story in the ${selectedGenre} genre with around ${wordCount} words.`,
          max_tokens: Math.min(wordCount, 500), // Ensure the word count doesn't exceed 500 tokens
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
  
      setStory(response.data.choices[0].text.trim());
    } catch (err) {
      setError("Failed to generate story. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center my-8">
          <h1
            className={`text-4xl font-bold ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Short Story Generator
          </h1>
          <p
            className={`text-lg ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Made by Axel Nino Nakata
          </p>
        </header>

        {/* Theme Toggle */}
        <div className="text-right">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
              theme === "light"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {theme === "light" ? (
              <>
                <FaMoon className="text-yellow-300" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <FaSun className="text-yellow-500" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Genre Selection */}
        <GenreSelector selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

        {/* Word Count Slider */}
        <WordCountSlider wordCount={wordCount} setWordCount={setWordCount} />

        {/* Generate Story Button */}
        <div className="relative text-center">
          <div className="absolute z-0 inset-0 flex items-center justify-center">
            <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-[200px] h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600 opacity-80 blur-lg rounded-xl"></div>
          </div>
          <button
            onClick={() => {
              if (!selectedGenre) {
                alert("Please select a genre");
                return;
              }
              generateStory();
            }}
            className={`relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold transition-all duration-200 sm:w-auto rounded-xl border-2 border-transparent ${
              theme === "light"
                ? "bg-gray-900 text-white hover:bg-gray-600 focus:ring-gray-900"
                : "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            Generate Story
          </button>
        </div>

        {/* Story Display */}
        <StoryDisplay story={story} error={error} />

        {/* Copy Story */}
        {story && (
          <div className="text-center mt-4">
            <button
              onClick={() => navigator.clipboard.writeText(story)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copy Story
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;