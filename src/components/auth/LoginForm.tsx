"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { login, loginWithEmail } from "@/actions/authActions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      await loginWithEmail(email, password);
    } catch (err: any) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-[380px]"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur shadow-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Sign in to continue
          </p>
        </div>

        {/* Email / Password */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white"
          />

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            onClick={handleCredentialsLogin}
            className="w-full rounded-xl bg-zinc-800 text-white py-3 hover:bg-zinc-700"
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </motion.button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* GitHub */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={login}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </motion.button>
      </div>
    </motion.div>
  );
}
