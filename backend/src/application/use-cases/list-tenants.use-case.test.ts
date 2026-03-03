import { describe, it, expect } from '@jest/globals';
import { InMemoryTenantRepository } from '../../infrastructure/tenant/in-memory-tenant-repository';
import { ListTenantsUseCase } from './list-tenants.use-case';
import { Tenant } from '../../domain/tenant';

describe('ListTenantsUseCase', () => {
  it('should return tenants for a known user', async () => {
    const repo = new InMemoryTenantRepository();
    const useCase = new ListTenantsUseCase(repo);

    const result = await useCase.execute({ userId: 'demo-user' });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return empty array for unknown user', async () => {
    const repo = new InMemoryTenantRepository();
    const useCase = new ListTenantsUseCase(repo);

    const result = await useCase.execute({ userId: 'unknown-user' });

    expect(result).toEqual([]);
  });
});

