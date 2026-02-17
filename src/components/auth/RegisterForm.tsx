"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { login } from "@/actions/authActions";
import axios from "axios";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[420px] relative"
    >
      <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8">
        {/* Soft Gradient Layer */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Start building your AI powered projects
          </p>
        </div>

        <div className="space-y-5 relative">
          {/* Name */}
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600/60 transition-all"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600/60 transition-all"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/60 transition-all"
          />

          {error && <p className="text-xs text-red-400">{error}</p>}

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            onClick={handleSubmit}
            className="w-full rounded-2xl py-3 font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8 relative">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-500 tracking-widest">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* GitHub Register */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={login}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white text-black py-3 font-medium hover:bg-gray-200 transition-all"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </motion.button>
      </div>
    </motion.div>
  );
}
