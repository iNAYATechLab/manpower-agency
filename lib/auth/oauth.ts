/**
 * Step 128: Social Sign-In OAuth Backend Config
 * Supports Google, GitHub (via Supabase Auth compatible)
 */

export const OAUTH_PROVIDERS = {
  google: {
    enabled: true,
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    scope: ["openid", "email", "profile"],
  },
  github: {
    enabled: true,
    clientId: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    scope: ["read:user", "user:email"],
  },
} as const;

export type OAuthProvider = keyof typeof OAUTH_PROVIDERS;

export function isOAuthEnabled(provider: OAuthProvider): boolean {
  const cfg = OAUTH_PROVIDERS[provider];
  return !!(cfg.enabled && cfg.clientId && cfg.clientSecret);
}

export function getOAuthAuthorizationUrl(provider: OAuthProvider, redirectUri: string, state: string): string {
  if (provider === "google") {
    const params = new URLSearchParams({
      client_id: OAUTH_PROVIDERS.google.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: OAUTH_PROVIDERS.google.scope.join(" "),
      state,
      access_type: "offline",
      prompt: "consent",
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }
  if (provider === "github") {
    const params = new URLSearchParams({
      client_id: OAUTH_PROVIDERS.github.clientId,
      redirect_uri: redirectUri,
      scope: OAUTH_PROVIDERS.github.scope.join(" "),
      state,
    });
    return `https://github.com/login/oauth/authorize?${params}`;
  }
  throw new Error(`Unknown provider: ${provider}`);
}
