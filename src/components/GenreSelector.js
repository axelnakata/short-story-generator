import React from "react";

const GenreSelector = ({ selectedGenre, setSelectedGenre }) => {
  const genres = ["Fantasy", "Sci-Fi", "Horror", "Romance", "Adventure"];

  return (
    <div className="flex flex-wrap justify-center gap-6 my-6">
      {genres.map((genre) => (
        <a
          key={genre}
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent page reload
            setSelectedGenre(genre); // Change the selected genre
          }}
          className="relative inline-block"
        >
          {/* Outer shadow effect */}
          <span
            className={`absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded ${
              selectedGenre === genre ? "bg-gray-900" : "bg-white"
            }`}
          ></span>
          {/* Elevated button */}
          <span
            className={`relative inline-block h-full w-full rounded border-2 ${
              selectedGenre === genre
                ? "border-white bg-gray-900 text-white" // White border in dark mode
                : "border-black bg-white text-black hover:bg-yellow-400 hover:text-gray-900"
            } px-3 py-1 text-base font-bold transition duration-100 hover:bg-yellow-400 hover:text-gray-900`}
          >
            {genre}
          </span>
        </a>
      ))}
    </div>
  );
};

export default GenreSelector;