const features = [
  {
    title: "Workflow Builder",
    desc: "Drag-and-drop automation pipelines across GitHub, Slack, Linear, Calendar, and Vercel",
    icon: "⟳",
  },
  {
    title: "Command Palette",
    desc: "Cmd+K to triage issues, generate standups, deploy previews — keyboard-first",
    icon: "⌘",
  },
  {
    title: "Token Vault Security",
    desc: "Auth0 Token Vault handles all OAuth tokens. Your agent never stores credentials.",
    icon: "🔐",
  },
  {
    title: "Step-Up Auth",
    desc: "Destructive actions like production deploys require MFA re-verification",
    icon: "⚠",
  },
  {
    title: "Permission Control",
    desc: "See exactly what your agent can access. Revoke any service with one click.",
    icon: "🛡",
  },
  {
    title: "Full Audit Trail",
    desc: "Every agent action logged with service, scope, timestamp, and approval status",
    icon: "📋",
  },
];

const services = [
  { name: "GitHub", desc: "Issues, PRs, labels, reviews" },
  { name: "Slack", desc: "Messages, standups, alerts" },
  { name: "Linear", desc: "Tickets, sprints, sync" },
  { name: "Google Calendar", desc: "Events, meeting prep" },
  { name: "Vercel", desc: "Deploys, previews, promote" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-4 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1 text-xs text-zinc-400">
          Powered by Auth0 Token Vault
        </div>
        <h1 className="mb-4 text-6xl font-bold tracking-tight">
          Dev<span className="text-blue-400">Flow</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg text-zinc-400">
          AI DevOps Command Center. Build automation workflows across your dev
          tools — with your agent always under your control.
        </p>
        <div className="flex gap-4">
          <a
            href="/auth/login"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 transition"
          >
            Get Started
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 transition"
          >
            View Source
          </a>
        </div>
      </section>

      {/* Connected Services */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          5 Services, One Agent
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {services.map((s) => (
            <div
              key={s.name}
              className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-3 text-center"
            >
              <p className="font-semibold">{s.name}</p>
              <p className="text-xs text-zinc-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Built for Security & Control
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-2 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">
        Built for the Auth0 for AI Agents Hackathon — DevFlow 2026
      </footer>
    </main>
  );
}
