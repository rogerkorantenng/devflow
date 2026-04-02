import { auth0AI } from "./token-vault";
import { auth0 } from "./auth0";

export const withDeployApproval = auth0AI.withAsyncAuthorization({
  userID: async () => {
    const session = await auth0.getSession();
    return session?.user?.sub || "";
  },
  bindingMessage: async (params: { action: string; target: string }) =>
    `Approve: ${params.action} to ${params.target}`,
  requestedExpiry: 300,
  scope: "openid deploy:production",
});

export const withForceMergeApproval = auth0AI.withAsyncAuthorization({
  userID: async () => {
    const session = await auth0.getSession();
    return session?.user?.sub || "";
  },
  bindingMessage: async (params: { pr: string; repo: string }) =>
    `Approve force merge: PR #${params.pr} in ${params.repo}`,
  requestedExpiry: 300,
  scope: "openid repo:admin",
});
