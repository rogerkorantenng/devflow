import { Auth0AI } from "@auth0/ai-vercel";
import { auth0 } from "./auth0";

export const auth0AI = new Auth0AI({
  auth0: {
    domain: process.env.AUTH0_DOMAIN!,
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  },
});

async function getRefreshToken() {
  const session = await auth0.getSession();
  return session?.tokenSet?.refreshToken ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Wrap = (t: any) => any;

export const withGitHub: Wrap = auth0AI.withTokenVault({
  refreshToken: getRefreshToken,
  connection: "github",
  scopes: ["repo", "read:org"],
});

export const withSlack: Wrap = auth0AI.withTokenVault({
  refreshToken: getRefreshToken,
  connection: "slack",
  scopes: ["channels:read", "chat:write", "users:read"],
});

export const withLinear: Wrap = auth0AI.withTokenVault({
  refreshToken: getRefreshToken,
  connection: "linear",
  scopes: ["read", "issues:create", "issues:update"],
});

export const withGoogleCalendar: Wrap = auth0AI.withTokenVault({
  refreshToken: getRefreshToken,
  connection: "google-oauth2",
  scopes: [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
  ],
});

export const withVercel: Wrap = auth0AI.withTokenVault({
  refreshToken: getRefreshToken,
  connection: "vercel",
  scopes: ["read", "deployments:create"],
});
