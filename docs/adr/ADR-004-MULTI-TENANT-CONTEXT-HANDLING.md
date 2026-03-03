# ADR-004 — Multi-Tenant Context Handling (Client-Side)

## Status

Accepted

---

## Context

The system supports multi-tenant SaaS scenarios.

The Flutter client must handle tenant context explicitly and safely.

---

## Decision

Tenant identity SHALL be treated as explicit application context.

Rules:

- Tenant ID MUST be part of authenticated session state.
- Tenant ID MUST be passed explicitly into tenant-scoped use cases.
- No global mutable tenant variables are allowed.
- Cached data MUST be scoped per tenant.

---

## Context Flow

Authentication → Resolve active tenant → Store tenant context → Pass tenant to use cases

---

## Consequences

- Reduced risk of cross-tenant data mixing
- Explicit business context handling

---

## Compliance

Implicit tenant assumptions or shared caches across tenants are architectural violations.