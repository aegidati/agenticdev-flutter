import { createServer } from '../infrastructure/http/fastify-server';
import { FirebaseAuthRepository } from '../infrastructure/auth/firebase-auth-repository';
import { InMemoryTenantRepository } from '../infrastructure/tenant/in-memory-tenant-repository';
import { ListTenantsUseCase } from '../application/use-cases/list-tenants.use-case';
import { config } from '../config/config';
import { logger } from '../infrastructure/logging/logger';

async function bootstrap() {
  logger.info('Bootstrapping backend service', {
    env: config.nodeEnv,
    port: config.port
  });

  const authRepository = new FirebaseAuthRepository(config.firebase);
  const tenantRepository = new InMemoryTenantRepository();
  const listTenantsUseCase = new ListTenantsUseCase(tenantRepository);

  const app = createServer({
    authRepository,
    listTenantsUseCase,
    logger
  });

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    logger.info('Server listening', { url: `http://localhost:${config.port}` });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  logger.error('Unhandled bootstrap error', { error: err });
  process.exit(1);
});