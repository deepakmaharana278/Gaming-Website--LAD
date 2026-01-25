import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { saveGamePlay } from "../utils/saveGamePlay";

export default function GamePlayer() {
  const startTimeRef = useRef(Date.now());
  const intervalRef = useRef(null);
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const iframeRef = useRef(null);
  const hasSavedRef = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fetch game
  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/games/`)
    .then((res) => res.json())
    .then((data) => {
      // console.log("URL slug",slug)
      // console.log("first backend slug",data[0]?.slug)
      const decodedSlug = decodeURIComponent(slug);

      const found = data.find(
        (g) => g.slug === decodedSlug
      );

      setGame(found || null);
    })
    .catch((err) => {
      console.error("Failed to fetch game:", err);
      setGame(null);
    });
}, [slug]);

  // Fullscreen detection
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid || !game) return;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const playDuration = Math.floor((now - startTimeRef.current) / 1000);

      //  Count game as soon as 2 minutes completed
      if (playDuration >= 120 && !hasSavedRef.current) {
        saveGamePlay(uid, game.title, playDuration);
        hasSavedRef.current = true;
        clearInterval(intervalRef.current);
      }
    }, 5000); // check every 5 seconds

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [game]);

  const handleFullscreen = () => {
    iframeRef.current?.requestFullscreen?.();
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  // Conditional return AFTER hooks
  if (!game) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <button disabled className="bg-indigo-500 text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Loading...
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">{game?.title}</h1>
          <p className="text-gray-400 mt-1">Play instantly • No download</p>
        </div>

        {/* Game Container */}
        <div className="max-w-6xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-black">
          {/* Controls */}
          <div className="absolute z-10 top-3 right-3">
            {!isFullscreen ? (
              <button onClick={handleFullscreen} className="bg-black/70 text-white px-4 py-2 rounded-xl">
                ⛶
              </button>
            ) : (
              <button onClick={exitFullscreen} className="bg-red-600/80 text-white px-4 py-2 rounded-xl">
                ✕
              </button>
            )}
          </div>

          {/* Iframe */}
          <div className="w-full aspect-video">
            <iframe ref={iframeRef} src={game?.url} className="w-full h-full" allowFullScreen />
          </div>
        </div>

        {/* Description */}
        <div className="max-w-6xl mx-auto mt-6 bg-gray-900/60 rounded-xl p-5 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-2">About this game</h2>
          <p className="text-gray-300">{game?.description}</p>
        </div>
      </div>
    </Layout>
  );
}
