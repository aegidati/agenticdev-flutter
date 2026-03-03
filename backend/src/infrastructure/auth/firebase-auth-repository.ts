import type { AuthRepository } from '../../application/ports/auth-repository';
import type { User } from '../../domain/user';

interface FirebaseConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

// In un progetto reale qui useresti Firebase Admin SDK.
// Per il template lasciamo un placeholder ben strutturato.
export class FirebaseAuthRepository implements AuthRepository {
  constructor(private readonly config: FirebaseConfig) {}

  async verifyIdToken(idToken: string): Promise<User> {
    // TODO: implementare verifica reale tramite Firebase Admin SDK.
    // Per ora, lanciamo un errore chiaro, così chi usa il template
    // capisce che deve completare questo punto.
    throw new Error(
      'FirebaseAuthRepository.verifyIdToken not implemented. ' +
        'Configure Firebase Admin SDK using config.projectId, config.clientEmail and config.privateKey.'
    );
  }
}