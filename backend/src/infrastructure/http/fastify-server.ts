import Fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest
} from 'fastify';
import type { AuthRepository } from '../../application/ports/auth-repository';
import type { ListTenantsUseCase } from '../../application/use-cases/list-tenants.use-case';
import type { Logger } from '../logging/logger';

interface Deps {
  authRepository: AuthRepository;
  listTenantsUseCase: ListTenantsUseCase;
  logger: Logger;
}

interface AuthedRequest extends FastifyRequest {
  user?: {
    id: string;
    email: string;
    displayName?: string;
  };
}

export function createServer(deps: Deps): FastifyInstance {
  const { authRepository, listTenantsUseCase, logger } = deps;

  const app = Fastify({ logger: false });

  // Health pubblico, NESSUN controllo auth
  app.get('/health', async () => {
    return { status: 'ok' };
  });

  // Hook auth solo per rotte che lo richiedono
  app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    // salta l'auth per /health
    if (request.url === '/health') {
      return;
    }

    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      logger.warn('Missing or invalid Authorization header', {
        path: request.url
      });
      reply.code(401);
      throw new Error('Unauthorized');
    }

    const token = authHeader.substring('Bearer '.length);

    try {
      const user = await authRepository.verifyIdToken(token);
      (request as AuthedRequest).user = {
        id: user.id,
        email: user.email,
        displayName: user.displayName
      };
    } catch (error) {
      logger.warn('Failed to verify token', { error, path: request.url });
      reply.code(401);
      throw new Error('Unauthorized');
    }
  });

  app.get('/tenants', async (request: FastifyRequest) => {
    const authed = request as AuthedRequest;
    const user = authed.user;

    if (!user) {
      throw new Error('User not in request context');
    }

    const tenants = await listTenantsUseCase.execute({ userId: user.id });
    return { items: tenants };
  });

  return app;
}