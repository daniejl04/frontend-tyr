export type SessionUser = {
  userId: string;
  username: string;
  role: string;
  email?: string;
  permissions: string[];
  expiresAt: number;
};
