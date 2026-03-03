# ADR-022: Backend Runtime & Clean Architecture Layering (Node.js + TypeScript)

## Status
Accepted

## Date
2026-03-03

## Context

This template targets multi-tenant SaaS solutions and inherits the architectural governance and invariants defined by ADR-001…ADR-021.

A backend baseline is required to ensure:
- consistent runtime and language choices across services,
- strict layer boundaries aligned with Clean Architecture,
- portability across HTTP frameworks without contaminating core business logic,
- predictable quality gates in local development and CI.

## Decision

### 1) Backend runtime and language
The backend runtime is **Node.js LTS** and the implementation language is **TypeScript**.

- Node.js version must track active LTS in project tooling.
- TypeScript is mandatory for all backend source code under `backend/src`.
- Strict typing is required (no architecture-level bypass through untyped core modules).

### 2) Clean Architecture layers
Backend code is organized into the following layers:

1. **Domain**  
   Enterprise/business rules, entities, value objects, domain services, invariants.

2. **Application**  
   Use cases, orchestration, ports (interfaces), application services, DTO mapping rules between boundaries.

3. **Interface/Presentation (HTTP)**  
   Transport-facing contracts: controllers/handlers, request/response validation, routing composition.

4. **Infrastructure**  
   Technical implementations: database adapters, external API clients, message brokers, framework bootstrapping, concrete repository implementations.

### 3) Dependency direction
Dependencies are allowed only from outer layers to inner layers.

Allowed:
- Interface/Presentation → Application
- Infrastructure → Application and/or Domain (via ports/contracts where applicable)
- Application → Domain

Not allowed:
- Domain → Application / Interface / Infrastructure
- Application → Interface / Infrastructure concrete framework details
- Any inward layer importing transport/framework-specific modules

This enforces the Clean Architecture dependency rule: **policy inward, details outward**.

### 4) HTTP framework isolation
Any HTTP framework (e.g., Fastify, Express) is confined to **Interface/Presentation and Infrastructure composition/bootstrapping**.

- Framework types, request/response objects, decorators, middleware-specific primitives must not leak into Domain or Application.
- Domain and Application remain framework-agnostic and testable in isolation.

## Consequences

### A) Folder structure impact (`backend/src`)
`backend/src` must reflect layer separation. Example baseline:

- `domain/`
  - `entities/`
  - `value-objects/`
  - `services/`
  - `repositories/` (domain-side contracts if applicable)
- `application/`
  - `use-cases/`
  - `ports/` (inbound/outbound interfaces)
  - `dto/`
  - `services/`
- `interface/`
  - `http/`
    - `controllers/`
    - `routes/`
    - `validators/`
    - `presenters/`
- `infrastructure/`
  - `persistence/`
  - `http/` (server/framework wiring)
  - `external/`
  - `config/`
- `main/` or `bootstrap/` (composition root)

Naming may vary, but boundary intent is mandatory.

### B) Testing strategy impact
Testing is layer-oriented:

- **Unit tests**
  - Domain: entities, value objects, domain services, invariants (pure and fastest).
  - Application: use-case orchestration with mocked ports.
- **Integration tests**
  - Infrastructure adapters (DB, external clients, repositories).
  - Interface ↔ Application wiring with test doubles or test infrastructure.
- **E2E tests**
  - Full HTTP flows through the running backend (routing, middleware, auth, persistence integration).
  - Multi-tenant isolation behavior validated at API level.

Test suites must avoid violating layer boundaries.

### C) CI impact
CI must enforce at least:

1. **Lint** (code quality/style rules)
2. **Type-check** (`tsc --noEmit` or equivalent)
3. **Tests**
   - unit
   - integration
   - e2e (as configured for template gates)

A change is not complete if lint/type-check/tests fail.

## Compliance

All backend features and refactors must comply with ADR-001…ADR-021 plus this ADR.
Any exception or structural deviation requires a new ADR.