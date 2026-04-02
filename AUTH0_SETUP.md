# Auth0 Tenant Configuration Guide

## Step 1: Create Auth0 Application

1. Go to Auth0 Dashboard -> Applications -> Create Application
2. Type: Regular Web Application
3. Name: DevFlow
4. Settings:
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
5. Under Advanced Settings -> Grant Types: enable `Refresh Token`, `Token Exchange`
6. Copy Domain, Client ID, Client Secret to `frontend/.env.local`

## Step 2: Enable Social Connections

In Auth0 Dashboard -> Authentication -> Social:

1. **GitHub**: Enable, add Client ID + Secret from GitHub OAuth app
   - Scopes: `repo, read:org`
   - Create GitHub OAuth app at: https://github.com/settings/developers
2. **Google**: Enable, add Client ID + Secret from Google Cloud Console
   - Scopes: `calendar.readonly, calendar.events`
   - Create at: https://console.cloud.google.com/apis/credentials
3. **Slack**: Enable, add Client ID + Secret from Slack app
   - Scopes: `channels:read, chat:write, users:read`
   - Create at: https://api.slack.com/apps
4. **Linear**: Custom Social Connection
   - OAuth URL: `https://linear.app/oauth/authorize`
   - Token URL: `https://api.linear.app/oauth/token`
   - Create at: https://linear.app/settings/api

## Step 3: Enable Token Exchange

1. Go to Auth0 Dashboard -> Settings -> Advanced
2. Enable "Token Exchange" grant type
3. For each social connection, enable it as a "Federated Connection" for Token Vault

## Step 4: Enable Guardian MFA (for CIBA step-up auth)

1. Go to Auth0 Dashboard -> Security -> Multi-factor Auth
2. Enable Guardian Push Notification
3. This enables CIBA-based step-up authentication

## Step 5: Update Environment Variables

Update `frontend/.env.local`:
```
AUTH0_SECRET=<keep-existing>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://YOUR_TENANT.auth0.com
AUTH0_CLIENT_ID=<from-step-1>
AUTH0_CLIENT_SECRET=<from-step-1>
AUTH0_DOMAIN=YOUR_TENANT.auth0.com
OPENAI_API_KEY=<your-openai-key>
BACKEND_URL=http://localhost:8000
```

Update `backend/.env`:
```
AUTH0_DOMAIN=YOUR_TENANT.auth0.com
AUTH0_CLIENT_ID=<from-step-1>
AUTH0_CLIENT_SECRET=<from-step-1>
```
