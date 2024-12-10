import React, { useState } from "react";
import GenreSelector from "./components/GenreSelector";
import WordCountSlider from "./components/WordCountSlider";
import StoryDisplay from "./components/StoryDisplay";
import axios from "axios";
import { FaMoon, FaSun } from "react-icons/fa";

const App = () => {
  // console.log("API Key:", process.env.REACT_APP_OPENAI_API_KEY);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [wordCount, setWordCount] = useState(300); // Default word count
  const [story, setStory] = useState(""); // Generated story
  const [error, setError] = useState(null); // Error handling
  const [theme, setTheme] = useState("light"); // Light or dark theme
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to handle story generation
  const generateStory = async () => {
    // Reset previous states
    setStory("");
    setError(null);
    setIsLoading(true);

    try {
      // Make sure to replace with your actual OpenAI API key
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a creative storyteller who generates short stories."
            },
            {
              role: "user",
              content: `Write a ${wordCount}-word short story in the ${selectedGenre} genre. The story should be engaging and have a clear narrative arc.`
            }
          ],
          max_tokens: wordCount + 50, // Slight buffer for potential overflow
          temperature: 0.7 // Creativity level
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      // Extract the generated story
      const generatedStory = response.data.choices[0].message.content.trim();
      setStory(generatedStory);
    } catch (err) {
      console.error("Error generating story:", err);
      setError(err.response?.data?.error?.message || "Failed to generate story. Please try again.");
    } finally {
      setIsLoading(false);
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
        <div style={{ marginTop: '7.5vh', marginBottom: '5vh' }}>
          {/* Word Count Slider */}
          <WordCountSlider
            wordCount={wordCount}
            setWordCount={setWordCount}
            theme={theme}
          />
        </div>

        {/* Generate Story Button */}
        {/* <div className="relative text-center">
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
        </div> */}

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
            disabled={isLoading}
            className={`relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold transition-all duration-200 sm:w-auto rounded-xl border-2 border-transparent ${
              theme === "light"
                ? "bg-gray-900 text-white hover:bg-gray-600 focus:ring-gray-900"
                : "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Generating..." : "Generate Story"}
          </button>
        </div>

        {/* Story Display */}
        <div style={{ margin: "3rem 0" }}>
          <StoryDisplay story={story} error={error} theme={theme} />
        </div>

      </div>
    </div>
  );
};

export default App;