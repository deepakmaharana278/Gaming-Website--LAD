import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20;

  // Sync URL params
  useEffect(() => {
    setSearch(params.get("search") || "");
    setCategory(params.get("category") || "All");
  }, [params]);

  // Fetch games
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtering
  useEffect(() => {
    let result = games;

    if (category !== "All") {
      result = result.filter(
        (g) => g.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(search.toLowerCase()) ||
          g.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredGames(result);
    setCurrentPage(1);
  }, [search, category, games]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = filteredGames.slice(
    startIndex,
    startIndex + gamesPerPage
  );

  // Pagination numbers logic
  const getPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  // Loader
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-800 h-52 rounded-xl"
          ></div>
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

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentGames.map((game, index) => (
            <Link
              to={`/game/${startIndex + index}`}
              key={startIndex + index}
            >
              <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition group">
                <img
                  src={game.thumb}
                  alt={game.title}
                  loading="lazy"
                  className="w-full h-40 object-cover"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-white text-lg font-bold">
                    ▶ Play
                  </span>
                </div>

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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap items-center">
            {/* Prev */}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              Prev
            </button>

            {/* Numbers */}
            {getPagination().map((page, i) =>
              page === "..." ? (
                <span
                  key={`dots-${i}`}
                  className="px-3 py-2 text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              Next
            </button>

            {/* Last */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              Last
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
