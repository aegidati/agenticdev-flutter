import { createServer } from './fastify-server';
import type { AuthRepository } from '../../application/ports/auth-repository';
import type { ListTenantsUseCase } from '../../application/use-cases/list-tenants.use-case';
import type { Logger } from '../logging/logger';
import { describe, expect, it, jest } from '@jest/globals';

const mockAuthRepository: AuthRepository = {
  verifyIdToken: async () => {
    return {
      id: 'test-user',
      email: 'test@example.com'
    };
  }
};

const mockListTenantsUseCase: ListTenantsUseCase = {
  execute: async () => {
    return [];
  }
} as unknown as ListTenantsUseCase;

const mockLogger: Logger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    with: jest.fn(() => mockLogger),
    log: jest.fn()
} as unknown as Logger;

describe('Fastify Server - /health endpoint', () => {
  it('should return 200 and status ok', async () => {
    const app = createServer({
      authRepository: mockAuthRepository,
      listTenantsUseCase: mockListTenantsUseCase,
      logger: mockLogger
    });

    const response = await app.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ status: 'ok' });
  });
});