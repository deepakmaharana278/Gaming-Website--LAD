import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Layout from "../components/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Layout>
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-white text-xl mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 text-white rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="text-green-400 mt-3 text-sm">{message}</p>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default ForgotPassword;
