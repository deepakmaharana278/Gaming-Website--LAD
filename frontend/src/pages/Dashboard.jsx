import React, { useEffect, useState } from "react";
import { FaUser, FaGamepad, FaStar } from "react-icons/fa";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";


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

  const progressPercent = stats ? ((stats.recent_games % stats.games_per_level) / stats.games_per_level) * 100 : 0;

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
      <div className="min-h-screen bg-[#0d1224] text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Player Dashboard</h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-4">
              <img src={user?.photo || "https://i.pravatar.cc/80"} alt="avatar" className="rounded-full w-20 h-20 border-4 border-blue-500" />

              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-400 text-sm">Player Account</p>
                <p className="text-gray-400 text-sm mt-1">Welcome back, {user?.name?.split(" ")[0]} 👋</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-white">Level {stats?.level}</span>
                <span className="text-xs mt-2 text-gray-400">
                  {stats?.recent_games % stats?.games_per_level} / {stats?.games_per_level}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaGamepad /> Game Stats
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                Total Games Played : <span className="text-white font-bold"> {stats?.total_games ?? 0}</span>
              </li>
              <li>
                Most Played :<span className="text-yellow-300 font-bold"> {stats?.most_played ?? "None"}</span>
              </li>
              <li>
                Last Game Played :<span className="text-blue-300 font-bold"> {stats?.last_game ?? "None"}</span>
              </li>
              <li>
                Level :<span className="text-green-400 font-bold"> {stats?.level ?? 1}</span>
              </li>
            </ul>
          </div>

          {/* User Info */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaUser /> User Information
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                Name: <span className="text-white font-semibold">{user?.name}</span>
              </li>
              <li>
                Email: <span className="text-blue-300">{user?.email}</span>
              </li>
              <li>
                Joined: <span className="text-gray-200">{user?.joined_at}</span>
              </li>
              <li>
                Account Status: <span className="text-green-400 font-semibold">Active</span>
              </li>
            </ul>
          </div>

          {/* Favorite Game */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">⭐ Favorite Game</h3>

            {stats?.favorite_game ? (
              <div className="bg-[#11172d] p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-yellow-400">{stats.favorite_game}</p>
                  <p className="text-sm text-gray-400">Your chosen favorite</p>
                </div>
                <span className="text-3xl">🎮</span>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">You haven’t selected a favorite game yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
