import React, { useState } from "react";
import Layout from "../components/Layout";
import { Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../utils/googleLogin";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { saveUserToBackend } from "../utils/saveUserToBackend";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    const res = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = res.user;
    localStorage.setItem("uid", firebaseUser.uid);

    // 🔥 SYNC USER WITH BACKEND
    await saveUserToBackend(firebaseUser);

    navigate("/all-games",);
  } catch (err) {
    setError("Invalid email or password");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <SEO
        title="Login | LAD Games"
        description="Login to LAD Games to access your account, track progress, and enjoy personalized gaming features."
        keywords="lad games login, login lad games, gaming account login"
        // url="https://ladgames.online/login"
      />
      <div
        className="min-h-screen flex items-center justify-center px-4 
                   bg-linear-to-br from-[#240750] via-[#4a044e] to-[#240750]"
      >
        <div
          className="w-full max-w-md bg-neutral-900/80 backdrop-blur-lg 
                     border border-neutral-800 rounded-xl shadow-lg p-8"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-white">Welcome Back 🎮</h2>
          <p className="text-center text-neutral-400 text-sm mt-2">Sign in to continue playing</p>

          {/* Error */}
          {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md 
                           bg-neutral-950 border border-neutral-700 
                           text-neutral-200 placeholder-neutral-500
                           focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md 
                           bg-neutral-950 border border-neutral-700 
                           text-neutral-200 placeholder-neutral-500
                           focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-neutral-400">
                <input type="checkbox" className="accent-blue-500" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-400 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md font-medium text-white
                         bg-linear-to-r from-blue-500 to-blue-700
                         hover:from-blue-600 hover:to-blue-800
                         transition disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-neutral-700" />
            <span className="px-3 text-neutral-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-neutral-700" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={() => googleLogin(navigate)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md
             bg-white text-black font-medium hover:bg-gray-400 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center mt-3 text-sm text-neutral-400">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:text-blue-500">
              Create one
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
