import { getSession } from "@auth0/nextjs-auth0";

export async function getRequiredSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export async function getRefreshToken() {
  const session = await getRequiredSession();
  return session.refreshToken;
}
