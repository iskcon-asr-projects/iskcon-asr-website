"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push("/admin/events");
    } else {
      setMessage({ type: "error", text: error.message });
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address first." });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Password reset link sent to your email!" });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#C5A059]/5 blur-[120px] rounded-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#8A6D3B]/5 blur-[100px] rounded-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-10 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-10">
            <h1 className="text-4xl text-[#C5A059] font-serif mb-3 tracking-tight">Admin Portal</h1>
            <p className="text-white/40 text-sm tracking-wide uppercase font-bold">Sign in to manage ISKCON Amritsar</p>
          </div>

          {message && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-none text-xs font-bold uppercase tracking-widest text-center ${
                message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@iskconamritsar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gradient-to-r from-[#C5A059] to-[#8A6D3B] text-black font-bold uppercase tracking-[0.3em] text-xs rounded-none hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_30px_rgba(197,160,89,0.2)] mt-2"
            >
              {isLoading ? "Verifying..." : "Login to Portal"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={handleForgotPassword}
              className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-[#C5A059] transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => router.push("/")}
            className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors"
          >
            ← Back to Public Site
          </button>
        </div>
      </motion.div>
    </div>
  );
}
