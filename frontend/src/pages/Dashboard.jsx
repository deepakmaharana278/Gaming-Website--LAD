import React, { useEffect, useState } from "react";
import { FaUser, FaGamepad, FaTimes } from "react-icons/fa";
import Layout from "../components/Layout";
import { useNavigate, Link } from "react-router-dom";
import { toggleFavoriteGame } from "../utils/favoriteGame";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch user
        const userRes = await fetch(`${import.meta.env.VITE_API_URL}/api/get-user/${uid}/`);
        const userData = await userRes.json();

        if (userData.status !== "ok") {
          navigate("/login");
          return;
        }

        setUser(userData.user);

        // Fetch stats
        const statsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard-stats/${uid}/`);
        const statsData = await statsRes.json();

        if (statsData.status === "ok") {
          setStats(statsData.stats);
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const progressPercent = stats && stats.games_needed > 0 ? Math.min(100, (stats.current_level_games / stats.games_needed) * 100) : 0;

  const handleRemoveFavorite = async (gameTitle) => {
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    const res = await toggleFavoriteGame(uid, gameTitle);

    if (res.status === "removed") {
      setStats((prev) => ({
        ...prev,
        favorite_game_cards: prev.favorite_game_cards.filter((g) => g.title !== gameTitle),
      }));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-white">Loading dashboard...</div>
      </Layout>
    );
  }

  if (!user || !stats) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-white">Failed to load dashboard</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-[#050816] via-[#0b1025] to-[#020617] text-white p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Player <span className="text-indigo-400">Dashboard</span>
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-5">
              <img src={user?.photo || "https://i.pravatar.cc/100"} alt="avatar" className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg" />

              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-sm text-gray-400">Player Account</p>
                <p className="text-sm text-indigo-300 mt-1">Welcome back, {user?.name?.split(" ")[0]} 👋</p>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">Level {stats?.level}</span>
                <span className="text-gray-400">{stats.games_needed > 0 ? `${stats.current_level_games} / ${stats.games_needed}` : "0 / 0"}</span>
              </div>

              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-linear-to-r from-green-400 to-emerald-500 transition-all duration-700" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
            {/* Header */}
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2 tracking-wide">
              <FaGamepad className="text-indigo-400 text-lg" />
              <span>Game Stats</span>
            </h3>

            {/* Stats List */}
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between items-center">
                <span className="text-gray-400">Total Games</span>
                <span className="text-white font-semibold">{stats?.total_games ?? 0}</span>
              </li>

              <div className="h-px bg-white/5" />

              <li className="flex justify-between items-center">
                <span className="text-gray-400">Most Played</span>
                <span className="font-semibold text-yellow-300 truncate max-w-27.5 text-right">{stats?.most_played ?? "None"}</span>
              </li>

              <div className="h-px bg-white/5" />

              <li className="flex justify-between items-center">
                <span className="text-gray-400">Last Played</span>
                <span className="font-semibold text-blue-300 truncate max-w-27.5 text-right">{stats?.last_game ?? "None"}</span>
              </li>

              <div className="h-px bg-white/5" />

              <li className="flex justify-between items-center">
                <span className="text-gray-400">Player Level</span>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 font-semibold text-xs">Lv {stats?.level ?? 1}</span>
              </li>
            </ul>

            {/* Subtle Glow */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-indigo-500/10 blur-2xl rounded-full" />
          </div>

          {/* User Info */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <FaUser className="text-indigo-400" /> User Info
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                Name: <span className="text-white font-semibold">{user?.name}</span>
              </li>
              <li>
                Email: <span className="text-indigo-300">{user?.email}</span>
              </li>
              <li>
                Joined: <span className="text-gray-200">{user?.joined_at}</span>
              </li>
              <li>
                Status: <span className="text-green-400 font-semibold">Active</span>
              </li>
            </ul>
          </div>

          {/* Favorite Games */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">⭐ Favorite Games</h3>

            {stats.favorite_game_cards?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {stats.favorite_game_cards.map((game) => (
                  <Link
                    key={game.id}
                    to={`/game/${encodeURIComponent(game.id)}`}
                    className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#0b1025] hover:border-indigo-400 transition"
                  >
                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveFavorite(game.title);
                      }}
                      className="absolute top-2 right-2 z-20 bg-red-600 p-1 rounded-full hover:bg-red-700"
                    >
                      <FaTimes size={18} />
                    </button>

                    {/* Image */}
                    <div className="aspect-4/3 overflow-hidden">
                      <img src={game.thumb} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="px-5 py-2 bg-indigo-600 rounded-full text-sm font-semibold">▶ Play</span>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h4 className="text-sm font-semibold line-clamp-2">{game.title}</h4>
                      <span className="text-xs text-gray-400">{game.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Add games to favorites to see them here ⭐</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
