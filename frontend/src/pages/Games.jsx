import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { toggleFavoriteGame } from "../utils/favoriteGame";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [platform, setPlatform] = useState("All");
  const uid = localStorage.getItem("uid");
  const [favoriteGames, setFavoriteGames] = useState([]);

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
      result = result.filter((g) => g.category.toLowerCase() === category.toLowerCase());
    }

    if (platform !== "All") {
      result = result.filter((g) => g.platform.toLowerCase() === platform.toLowerCase());
    }

    if (search.trim()) {
      result = result.filter((g) => g.title.toLowerCase().includes(search.toLowerCase()) || g.category.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredGames(result);
    setCurrentPage(1);
  }, [search, platform, category, games]);

  // heading according to games
  let pageHeading = "Explore Games";

  if (category && category !== "All") {
    pageHeading = `${category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Games`;
  } else if (search.trim()) {
    pageHeading = `Search Results for "${search}"`;
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

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
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  // Favorite game
  useEffect(() => {
    if (!uid) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard-stats/${uid}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setFavoriteGames(data.stats.favorite_games || []);
        }
      });
  }, [uid]);

  const handleFavorite = async (gameTitle) => {
    if (!uid) return;

    const res = await toggleFavoriteGame(uid, gameTitle);

    if (res.status === "added") {
      setFavoriteGames((prev) => [...prev, gameTitle]);
    }

    if (res.status === "removed") {
      setFavoriteGames((prev) => prev.filter((g) => g !== gameTitle));
    }
  };

  // SEO LOGIC
  let seoTitle = "All Games | Play Free Online Games on LAD Games";
  let seoDescription = "Browse all free online games on LAD Games. Play action, puzzle, racing, arcade, and more browser games instantly without downloads.";
  let seoUrl = "https://ladgames.online/all-games";

  if (category && category !== "All") {
    const formattedCategory = category.replace(/-/g, " ");
    seoTitle = `${formattedCategory} Games | LAD Games`;
    seoDescription = `Play free ${formattedCategory} games online on LAD Games. No downloads required.`;
    seoUrl = `https://ladgames.online/all-games?category=${category}`;
  }

  if (search.trim()) {
    seoTitle = `Search Results for "${search}" | LAD Games`;
    seoDescription = `Search results for "${search}" games on LAD Games. Play free online games instantly.`;
    seoUrl = `https://ladgames.online/all-games?search=${encodeURIComponent(search)
      } `;
  }

  // Loader
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-800 h-52 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <Layout>
      <SEO title={seoTitle} description={seoDescription} keywords="free online games, all games, browser games, lad games" />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">🎮 {pageHeading}</h1>
        {filteredGames.length === 0 && !loading && <p className="text-center text-gray-400 mt-10">No games found</p>}

        <div className="text-center mb-3">
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="px-4 py-2 bg-gray-800 text-white rounded">
            <option value="All">All Platforms</option>
            <option value="desktop">Desktop</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
          </select>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {currentGames.map((game) => {
            const isFavorite = favoriteGames.includes(game.title);

            return (
              <div
                key={game.id}
                className="group relative bg-[#111827] rounded-xl overflow-hidden
                   border border-white/5 hover:border-indigo-500
                   transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* ⭐ Favorite Toggle Button */}
                {uid && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFavorite(game.title);
                    }}
                    className={`absolute cursor-pointer top-2 right-2 z-10
                    p-2 rounded-full transition
                    ${isFavorite ? "bg-yellow-500 text-black" : "bg-black/60 text-yellow-400 hover:bg-yellow-500 hover:text-black"}`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites (play 2+ min)"}
                  >
                    {isFavorite ? <FaStar size={22} /> : <FaRegStar size={22} />}
                  </button>
                )}

                {/* Clickable Game Card */}
                <Link to={`/game/${encodeURIComponent(game.slug)}`}>
                  {/* Thumbnail */}
                  <div className="aspect-4/3 bg-black overflow-hidden relative">
                    <img
                      src={game.thumb}
                      alt={game.title}
                      loading="lazy"
                      className="w-full h-full object-cover
                         group-hover:scale-105 transition duration-300"
                    />

                    {/* Play Overlay */}
                    <div
                      className="absolute inset-0 bg-black/60 opacity-0
                         group-hover:opacity-100 transition
                         flex items-center justify-center"
                    >
                      <span
                        className="px-5 py-2 bg-indigo-600 text-white
                               text-sm font-semibold rounded-full"
                      >
                        ▶ Play
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-white line-clamp-2">{game.title}</h3>
                    <span className="text-xs text-gray-400">{game.category}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap items-center">
            {/* Prev */}
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40">
              Prev
            </button>

            {/* Numbers */}
            {getPagination().map((page, i) =>
              page === "..." ? (
                <span key={`dots-${i}`} className="px-3 py-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded ${currentPage === page ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40">
              Next
            </button>

            {/* Last */}
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40">
              Last
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
