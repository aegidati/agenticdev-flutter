import type { Tenant } from '../../domain/tenant';
import type { TenantRepository } from '../ports/tenant-repository';

export interface ListTenantsInput {
  userId: string;
}

/**
 * Use case: list all tenants available to a given user.
 */
export class ListTenantsUseCase {
  constructor(private readonly tenantRepository: TenantRepository) {}

  async execute(input: ListTenantsInput): Promise<Tenant[]> {
    return this.tenantRepository.listTenantsForUser(input.userId);
  }
}