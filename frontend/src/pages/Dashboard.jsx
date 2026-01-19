import React, { useEffect, useState } from "react";
import { FaUser, FaGamepad, FaStar } from "react-icons/fa";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/get-user/${uid}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setUser(data.user);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // ✅ LOADING UI (CORRECT PLACE)
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading dashboard...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0d1224] text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Player Dashboard</h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Logout
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-4">
              <img
                src={user?.photo || "https://i.pravatar.cc/80"}
                alt="avatar"
                className="rounded-full w-20 h-20 border-4 border-blue-500"
              />
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-400 text-sm">Player Account</p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaGamepad /> Game Stats
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Total Games Played: <span className="text-white font-bold">127</span></li>
              <li>Wins: <span className="text-green-400 font-bold">58</span></li>
              <li>Losses: <span className="text-red-400 font-bold">69</span></li>
              <li>Highest Score: <span className="text-yellow-300 font-bold">9800</span></li>
            </ul>
          </div>

          {/* User Info */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaUser /> User Information
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Name: <span className="text-white font-semibold">{user?.name}</span></li>
              <li>Email: <span className="text-blue-300">{user?.email}</span></li>
              <li>Joined: <span className="text-gray-200">{user?.joined_at}</span></li>
              <li>Account Status: <span className="text-green-400 font-semibold">Active</span></li>
            </ul>
          </div>

          {/* Favorites */}
          <div className="bg-[#1a2138] p-5 rounded-xl shadow-lg md:col-span-3">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaStar /> Favorite Games
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Car Racing", "Shooting Arena", "Puzzle Quest", "Runner PRO"].map((game) => (
                <div
                  key={game}
                  className="bg-[#11172d] p-3 rounded-lg text-center hover:bg-[#18203a] cursor-pointer transition"
                >
                  {game}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
