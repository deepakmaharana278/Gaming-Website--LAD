import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Trending() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/`)
      .then(res => res.json())
      .then(data => {
        // 🔥 TRENDING LOGIC
        const trendingGames = [...data]
          .sort((a, b) => {
            // If backend has views/plays
            if (a.plays && b.plays) return b.plays - a.plays;

            // fallback → latest games
            return new Date(b.created_at || 0) - new Date(a.created_at || 0);
          })
          .slice(0, 16);

        setGames(trendingGames);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          🔥 Trending Games
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {games.map((game, index) => (
            <Link to={`/game/${index}`} key={index} className="group">
              <div className="bg-[#111827] rounded-xl overflow-hidden border border-white/5 hover:border-orange-500 transition">

                {/* Image */}
                <div className="aspect-4/3 bg-black overflow-hidden relative">
                  <img
                    src={game.thumb}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Trending Badge */}
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    🔥 Trending
                  </span>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white line-clamp-2">
                    {game.title}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {game.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
