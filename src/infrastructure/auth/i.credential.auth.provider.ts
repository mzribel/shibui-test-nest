export interface ICredentialAuthProvider {
  registerWithPassword(input: { email: string; password: string }): Promise<{ externalUserId: string; email?: string }>;
  loginWithPassword(input: { email: string; password: string }): Promise<{ externalUserId: string; email?: string }>;
}