"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("devflow_username");
    if (username) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    if (username.trim()) {
      localStorage.setItem("devflow_username", username.trim());
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-2">
          Dev<span className="text-blue-400">Flow</span>
        </h1>
        <p className="text-zinc-400">AI DevOps Command Center</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          autoFocus
          required
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-blue-500 transition"
        />
        <button
          type="submit"
          className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 transition"
        >
          Enter DevFlow
        </button>
      </form>
      <p className="text-xs text-zinc-600 max-w-xs text-center">
        Powered by Auth0 Token Vault — your agent manages OAuth tokens securely
      </p>
    </main>
  );
}
