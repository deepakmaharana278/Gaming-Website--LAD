import React from "react";
import Layout from "../components/Layout";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#240750] via-[#4a044e] to-[#240750]"
      >
        <div
          className="w-full max-w-md bg-neutral-900/80 backdrop-blur-lg 
                      border border-neutral-800 rounded-xl shadow-lg p-8"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-white">Welcome Back 🎮</h2>
          <p className="text-center text-neutral-400 text-sm mt-2">Sign in to continue playing</p>

          {/* Form */}
          <form className="mt-6 space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 
                             text-neutral-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-2 rounded-md 
                         bg-neutral-950 border border-neutral-700 
                         text-neutral-200 placeholder-neutral-500
                         focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 
                             text-neutral-400"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
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
              <a href="#" className="text-blue-400 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-md font-medium text-white
                       bg-linear-to-r from-blue-500 to-blue-700
                       hover:from-blue-600 hover:to-blue-800
                       transition"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-neutral-700" />
            <span className="px-3 text-neutral-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-neutral-700" />
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-neutral-400">
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
