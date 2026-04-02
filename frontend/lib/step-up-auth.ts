import { auth0AI } from "./token-vault";

export const withDeployApproval = auth0AI.withAsyncAuthorization({
  userID: async () => {
    const { getSession } = await import("@auth0/nextjs-auth0");
    const session = await getSession();
    return session?.user?.sub || "";
  },
  bindingMessage: async (params: { action: string; target: string }) =>
    `Approve: ${params.action} to ${params.target}`,
  requestedExpiry: 300,
  scope: "openid deploy:production",
});

export const withForceMergeApproval = auth0AI.withAsyncAuthorization({
  userID: async () => {
    const { getSession } = await import("@auth0/nextjs-auth0");
    const session = await getSession();
    return session?.user?.sub || "";
  },
  bindingMessage: async (params: { pr: string; repo: string }) =>
    `Approve force merge: PR #${params.pr} in ${params.repo}`,
  requestedExpiry: 300,
  scope: "openid repo:admin",
});
