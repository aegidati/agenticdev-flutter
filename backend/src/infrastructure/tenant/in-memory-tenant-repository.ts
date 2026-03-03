import type { Tenant } from '../../domain/tenant';
import type { TenantRepository } from '../../application/ports/tenant-repository';

// Simple in-memory implementation used as a placeholder for the template.
// In a real project, you would replace this with a DB-backed repository.
export class InMemoryTenantRepository implements TenantRepository {
  private readonly data: Record<string, Tenant[]> = {
    // Example: user "demo-user" has two tenants.
    'demo-user': [
      {
          id: 'tenant-1', name: 'Acme Corp',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: 'tenant-2', name: 'Globex',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
      }
    ]
  };

  async listTenantsForUser(userId: string): Promise<Tenant[]> {
    return this.data[userId] ?? [];
  }
}