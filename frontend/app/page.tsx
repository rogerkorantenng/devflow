import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold tracking-tight">DevFlow</h1>
      <p className="text-lg text-zinc-400">AI DevOps Command Center</p>
      <Link
        href="/api/auth/login"
        className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition"
      >
        Sign in with Auth0
      </Link>
    </main>
  );
}
