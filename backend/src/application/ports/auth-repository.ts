import type { User } from '../../domain/user';

// Abstraction for authentication operations (e.g. Firebase token verification).
export interface AuthRepository {
  verifyIdToken(idToken: string): Promise<User>;
}