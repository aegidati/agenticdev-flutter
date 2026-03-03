import type { Tenant } from '../../domain/tenant';

// Abstraction for tenant-related operations.
// Implementations live in the infrastructure layer.
export interface TenantRepository {
  /**
   * Returns all tenants available to the given user.
   */
  listTenantsForUser(userId: string): Promise<Tenant[]>;
}