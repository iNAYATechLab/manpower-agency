/**
 * Step 9: Arena.ai Project GitHub Webhook Connection
 */

export const arenaWebhookConfig = {
  provider: "arena.ai",
  repository: "iNAYATechLab/manpower-agency-saas",
  events: ["push", "pull_request", "workflow_run"],
  webhookUrl: process.env.ARENA_WEBHOOK_URL || "https://arena.ai/api/webhooks/github",
  secret: process.env.ARENA_WEBHOOK_SECRET,
  contentType: "json",
  active: true,
  isValid(): boolean {
    return !!this.webhookUrl && !!this.secret;
  },
};

export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  // HMAC SHA256 verification will be implemented with Node crypto
  // Placeholder for now - validated in API route
  return signature.length > 0 && secret.length > 0 && payload.length > 0;
}
