import React, { useState } from "react";
import Layout from "../components/Layout";
import { User, Mail, Lock } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin } from "../utils/googleLogin";
import SEO from "../components/SEO";
import { saveUserToBackend } from "../utils/saveUserToBackend";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  try {
    setLoading(true);

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = res.user;
    localStorage.setItem("uid", firebaseUser.uid);
    // 🔥 SAVE USER TO DJANGO
    await saveUserToBackend(firebaseUser, username);

    navigate("/dashboard");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <SEO
        title="Sign Up | LAD Games"
        description="Create a free LAD Games account to save favorites, track progress, and enjoy a personalized gaming experience."
        keywords="lad games signup, create gaming account, free gaming account"
        // url="https://ladgames.online/signup"
      />
      <div
        className="min-h-screen flex items-center justify-center
                   bg-linear-to-br from-[#240750] via-[#4a044e] to-[#240750]
                   px-4"
      >
        <div
          className="w-full max-w-md bg-neutral-900/80 backdrop-blur-lg
                     border border-neutral-800 rounded-xl shadow-lg p-8"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-white">Create Your Account 🚀</h2>
          <p className="text-center text-neutral-400 text-sm mt-2">Join and start playing instantly</p>

          {/* Error */}
          {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md
                           bg-neutral-950 border border-neutral-700
                           text-neutral-200 placeholder-neutral-500
                           focus:outline-none focus:border-blue-500"
              />
            </div>

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

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md
                           bg-neutral-950 border border-neutral-700
                           text-neutral-200 placeholder-neutral-500
                           focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start space-x-2 text-sm text-neutral-400">
              <input type="checkbox" required className="mt-1 accent-blue-500" />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-400 hover:text-blue-500">
                  Terms & Conditions
                </a>
              </span>
            </label>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md font-medium text-white
              bg-linear-to-r from-blue-500 to-blue-700            hover:from-blue-600 hover:to-blue-800                       transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
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
            onClick={() => googleLogin(navigate, setError)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-400 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center mt-3 text-sm text-neutral-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
