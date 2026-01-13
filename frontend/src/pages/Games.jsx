import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-800 h-52 rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">🎮 All Games</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <Link to={`/game/${index}`} key={index}>
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 group">
              <img
                src={game.thumb}
                alt={game.title}
                loading="lazy"
                className="w-full h-40 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-white text-lg font-bold">▶ Play</span>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {game.title}
                </h3>

                <span className="inline-block mt-1 text-xs bg-indigo-600 text-white px-2 py-1 rounded">
                  {game.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
