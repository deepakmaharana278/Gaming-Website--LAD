import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import HomeSlider from "./HomeSlider";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

const quotes = [
  "Play more. Stress less. 🎮",
  "Every game is a new adventure.",
  "Where fun never logs out.",
  "One more game won’t hurt 😉",
  "Level up your free time.",
  "Gaming is not a hobby, it’s a lifestyle.",
];

const Home = () => {
  const [dailyQuote, setDailyQuote] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("quoteDate");
    const storedIndex = localStorage.getItem("quoteIndex");

    if (storedDate === today && storedIndex !== null) {
      setDailyQuote(quotes[storedIndex]);
    } else {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      localStorage.setItem("quoteDate", today);
      localStorage.setItem("quoteIndex", randomIndex);
      setDailyQuote(quotes[randomIndex]);
    }
  }, []);

  return (
    <Layout>
      <SEO
        title="LAD Games | Play Free Online Games"
        description="Play free online games on LAD Games. No downloads, no signup required."
        keywords="free online games, browser games, lad games"
        // url="https://ladgames.online/"
      />
      {/* Slider */}
      <HomeSlider />

      {/* Welcome Section */}
      <section className="px-4 pb-10 text-center bg-linear-to-b from-[#240750] via-[#344C64] to-[#240750]">
        <h1 className="pt-10 text-2xl sm:text-3xl md:text-4xl font-bold text-[#57a671]">Welcome to LAD Games 🎮</h1>
        <div className="relative mt-4 flex justify-center">
          <span className="h-0.5 w-40 bg-[#57A6A1] rounded-full"></span>
        </div>
        {/* Daily Quote */}
        <p className="mt-4 italic text-sm sm:text-base text-gray-300">“{dailyQuote}”</p>

        <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">Play free online games anytime. No downloads, no signup required.</p>

        <button onClick={()=>navigate('/all-games')} className="mt-6 bg-[#57A6A1] text-[#240750] px-6 py-2 rounded-md font-semibold text-sm sm:text-base hover:opacity-90">Start Playing</button>
      </section>

      <section
        className="relative px-4 py-16  bg-linear-to-b from-[#240750]
          via-[#344C64] to-[#240750] text-white"
      >
        {/* Section Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#57A6A1]">Why Play on LAD?</h2>

        <p className="mt-3 text-sm sm:text-base text-gray-300 text-center max-w-2xl mx-auto">Built for gamers who just want to play — fast, free, and fun.</p>

        {/* Feature Grid */}
        <div
          className="mt-12 max-w-7xl mx-auto grid grid-cols-1   sm:grid-cols-2  md:grid-cols-4 gap-6"
        >
          {/* Feature 1 */}
          <div
            className="group bg-[#240750]/80 border border-[#577B8D]
      rounded-xl  p-6 text-center transition
      hover:border-[#57A6A1]
      hover:-translate-y-1
    "
          >
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="font-semibold text-lg">Free to Play</h3>
            <p className="mt-2 text-sm text-gray-300">All games are 100% free — no hidden costs.</p>
          </div>

          {/* Feature 2 */}
          <div
            className="group bg-[#240750]/80 border border-[#577B8D] rounded-xl p-6 text-center transition  hover:border-[#57A6A1]
              hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-semibold text-lg">Instant Play</h3>
            <p className="mt-2 text-sm text-gray-300">No downloads, no installs — just click & play.</p>
          </div>

          {/* Feature 3 */}
          <div
            className="group bg-[#240750]/80 border border-[#577B8D] rounded-xl p-6 text-center transition  hover:border-[#57A6A1]
              hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-semibold text-lg">Mobile Friendly</h3>
            <p className="mt-2 text-sm text-gray-300">Optimized for mobile, tablet, and desktop.</p>
          </div>

          {/* Feature 4 */}
          <div
            className="group bg-[#240750]/80 border border-[#577B8D] rounded-xl p-6 text-center transition  hover:border-[#57A6A1]
            hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">🆕</div>
            <h3 className="font-semibold text-lg">New Games Daily</h3>
            <p className="mt-2 text-sm text-gray-300">Fresh games added regularly to keep things exciting.</p>
          </div>
        </div>

        {/* Bottom Divider Glow */}
        <div
          className="absolute bottom-0           left-1/2  -translate-x-1/2 w-32           h-1 bg-[#57A6A1]  rounded-full
            blur-sm opacity-70"
        />
      </section>
    </Layout>
  );
};

export default Home;