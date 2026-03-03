/**
 * Tenant entity - represents a multi-tenant partition in the system.
 * This is a core domain model that defines tenant identity and properties.
 */
export interface Tenant {
  /**
   * Unique identifier for the tenant
   */
  id: string;

  /**
   * Human-readable tenant name
   */
  name: string;

  /**
   * Optional description of the tenant
   */
  description?: string;

  /**
   * Indicates whether the tenant is currently active
   */
  isActive: boolean;

  /**
   * Timestamp when the tenant was created
   */
  createdAt: Date;

  /**
   * Timestamp of last update
   */
  updatedAt: Date;
}