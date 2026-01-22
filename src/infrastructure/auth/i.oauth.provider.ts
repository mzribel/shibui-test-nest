export const OAUTH_PROVIDERS = ["google"] as const;
export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];


export interface IOAuthProvider {
  getAuthorizationUrl(input: {
    provider: OAuthProvider;
    redirectUri: string;
  }): Promise<{ url: string }>;

  exchangeCode(input: {
    provider: OAuthProvider;
    code: string;
    redirectUri: string;
  }): Promise<{ externalUserId: string; email?: string }>;
}