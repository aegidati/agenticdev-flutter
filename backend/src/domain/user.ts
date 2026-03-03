// Domain entity representing a user in the system.
// Pure business concept, no framework or DB knowledge.
export interface User {
  id: string;
  email: string;
  displayName?: string;
}