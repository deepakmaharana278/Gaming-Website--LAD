import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout>
       <div className="bg-[#0b061a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          🎮 About <span className="text-purple-400">LAD</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          LAD is a free web-based gaming platform where fun starts instantly.
          No downloads. No installs. No waiting.
          Just open your browser and start playing.
        </p>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="bg-[#140c2b] rounded-2xl p-8 shadow-lg hover:shadow-purple-700/30 transition">
          <h2 className="text-3xl font-bold mb-4">👾 Who We Are</h2>
          <p className="text-gray-300 leading-relaxed">
            LAD was built by gamers who were tired of heavy downloads, long
            loading screens, and complicated setups. We believe gaming should
            be simple, fast, and accessible to everyone — whether you’re on a
            high-end PC or a basic device.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8">
        <div className="bg-[#140c2b] rounded-2xl p-8 shadow-lg hover:shadow-purple-700/30 transition">
          <h2 className="text-3xl font-bold mb-4">🕹️ What We Offer</h2>
          <ul className="text-gray-300 space-y-3">
            <li>⚡ Instant play — no downloads or installs</li>
            <li>🎮 100% free web-based games</li>
            <li>📱 Works on desktop, laptop & mobile</li>
            <li>🧩 Casual, arcade, puzzle & action games</li>
            <li>🌍 Play anytime, anywhere</li>
          </ul>
        </div>

        {/* Why LAD */}
        <div className="bg-[#140c2b] rounded-2xl p-8 shadow-lg hover:shadow-purple-700/30 transition">
          <h2 className="text-3xl font-bold mb-4">🔥 Why LAD?</h2>
          <p className="text-gray-300 leading-relaxed">
            LAD removes all the barriers between you and fun. No accounts,
            no installs, and no high system requirements. Whether you want
            a quick gaming break or a long session, LAD is always ready.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="bg-linear-to-r from-purple-800 to-indigo-900 rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">🚀 Our Vision</h2>
          <p className="text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We’re building LAD into a fast, fun, and reliable gaming hub.
            More games, better performance, and exciting community features
            are coming soon. Our goal is simple — make gaming accessible
            to everyone.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <h3 className="text-2xl font-bold mb-6">
          Ready to Play? 🎯
        </h3>
        <a
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-full text-lg font-semibold transition shadow-lg hover:shadow-purple-600/40"
        >
          ▶ Play Now
        </a>
      </section>
    </div>
    </Layout>
  )
}

export default About