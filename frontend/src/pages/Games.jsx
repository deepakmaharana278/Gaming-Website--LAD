import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
        setLoading(false);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let result = games;

    if (category !== "All") {
      result = result.filter(
        (g) => g.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(search.toLowerCase()) ||
          g.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredGames(result);
  }, [search, category, games]);

  const categories = ["All", ...new Set(games.map((g) => g.category))];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-800 h-52 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🎮 All Games
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">

          <input
            type="text"
            placeholder="Search game or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

        </div>

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
          <p className="text-center text-gray-400">No games found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <Link to={`/game/${games.indexOf(game)}`} key={index}>
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
        )}

      </div>
    </Layout>
  );
}
