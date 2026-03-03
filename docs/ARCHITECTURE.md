# Architecture Overview — agenticdev-flutter

## Purpose

The `agenticdev-flutter` template defines a structured foundation for building Flutter applications using:

- Clean Architecture
- Multi-tenant SaaS awareness
- Firebase-based authentication
- API abstraction for backend integration
- ADR-driven architectural governance
- Agentic development workflow (Planner / Implementer / Reviewer)

This document provides a high-level overview of the architecture.  
Normative decisions are defined in the ADR documents under `docs/adr/`.

---

# Architectural Principles

The architecture is governed by the following principles:

1. Clean Architecture layering
2. Explicit separation of concerns
3. No cross-layer shortcuts
4. Multi-tenant context must be explicit
5. Authentication delegated to Firebase
6. Backend treated as external API
7. All structural decisions documented via ADRs

See:
- ADR-001 — Architectural Governance & Agentic Workflow
- ADR-002 — Flutter Client Clean Architecture

---

# System Context

The system consists of:

Flutter Client (this repository)
↓
External Backend APIs
↓
External Infrastructure (DB, services, etc.)

The backend implementation is outside the scope of this template.

The Flutter client interacts only via well-defined API boundaries.

---

# Clean Architecture Structure

The canonical Flutter structure under `lib/` is:

lib/
├── domain/
├── application/
├── infrastructure/
└── presentation/

---

## Domain Layer

Location: `lib/domain/`

Contains:

- Entities
- Value Objects
- Business rules
- Pure Dart logic

Constraints:

- No Flutter dependencies
- No HTTP
- No Firebase SDK
- No storage logic

---

## Application Layer

Location: `lib/application/`

Contains:

- Use cases
- Repository interfaces
- Orchestration logic

Responsibilities:

- Coordinate domain logic
- Define contracts for infrastructure
- Expose clean APIs to presentation

Constraints:

- May depend on domain
- Must not depend on infrastructure
- Must not depend on Flutter widgets

---

## Infrastructure Layer

Location: `lib/infrastructure/`

Contains:

- API clients
- Local storage adapters
- DTO ↔ Domain mappers
- Firebase integration
- Concrete repository implementations

Responsibilities:

- Implement application-defined interfaces
- Handle external I/O

Constraints:

- May depend on application and domain
- Must not introduce reverse dependencies

---

## Presentation Layer

Location: `lib/presentation/`

Contains:

- Widgets
- Pages
- Navigation logic
- UI state wiring

Responsibilities:

- Render UI
- Delegate business actions to use cases

Constraints:

- Must not contain business logic
- Must not perform direct HTTP calls
- Must not depend directly on infrastructure

---

# Backend Integration Model

The backend is treated as an external service.

Communication flow:

Widget  
→ Use Case  
→ Repository Interface  
→ API Adapter  
→ Backend  

Rules:

- HTTP clients exist only in infrastructure.
- DTOs are mapped to domain entities.
- Transport errors are translated into structured application-level errors.

See:
- ADR-003 — Backend Integration & API Abstraction

---

# Multi-Tenant Handling (Client-Side)

The Flutter client is multi-tenant aware.

Rules:

- Tenant context must be explicit.
- Tenant ID is part of authenticated session state.
- Tenant ID must be passed into tenant-scoped use cases.
- No global mutable tenant variables.
- Local caches must be tenant-scoped.

See:
- ADR-004 — Multi-Tenant Context Handling

---

# Authentication Model

Authentication is delegated to Firebase Authentication.

Flow:

1. Flutter client authenticates via Firebase SDK.
2. Firebase issues an ID token (JWT).
3. Client attaches token to backend requests.
4. Backend validates token and enforces authorization.

Rules:

- Firebase SDK usage lives in infrastructure.
- Presentation layer must not depend directly on Firebase.
- Identity (Firebase) is separated from authorization (backend responsibility).

See:
- ADR-005 — Authentication & Identity Strategy

---

# Testing & Quality Model

Testing follows layer-based strategy:

Domain:
- Pure unit tests

Application:
- Use case tests (mock repositories)

Infrastructure:
- Adapter tests

Presentation:
- Widget tests

CI Requirements:

- Static analysis must pass
- Unit tests must pass
- Widget tests must pass
- No architectural violations

See:
- ADR-006 — Testing & Quality Strategy

---

# Agentic Development Model

Development follows the Agentic Workflow defined in ADR-001:

Planner:
- Defines scope and structure.

Implementer:
- Writes code aligned with ADR constraints.

Reviewer:
- Verifies compliance with architecture and Definition of Done.

This workflow may involve AI tooling (e.g., Copilot) but architectural responsibility remains explicit and documented.

---

# Architectural Integrity

The following are architectural invariants:

- No business logic in presentation layer.
- No infrastructure dependency in domain layer.
- No direct API calls from widgets.
- No implicit tenant context.
- All structural changes require an ADR.

Violations must be rejected during review.

---

# Scope Boundaries

This template defines:

- Flutter architecture
- Client-side multi-tenancy handling
- Authentication integration
- API abstraction
- Governance and workflow

This template does NOT define:

- Backend runtime implementation
- Database schema
- Infrastructure deployment

Those concerns belong to backend repositories.

---

# Conclusion

`agenticdev-flutter` provides:

- A Clean Architecture-ready Flutter template
- Multi-tenant SaaS awareness
- Firebase-based authentication integration
- Strong governance via ADRs
- Agentic development workflow

It is designed for long-term maintainability, scalability, and architectural clarity.