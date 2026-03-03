# ADR Index — agenticdev-flutter

This document lists all Architectural Decision Records (ADRs)
that define the authoritative architecture of the agenticdev-flutter template.

All ADRs are considered normative unless explicitly marked as deprecated.

The authority hierarchy is defined in:
- docs/PROJECT-CONSTITUTION.md

---

## Core Governance

### ADR-001 — Architectural Governance & Agentic Workflow
Defines the decision-making model, authority hierarchy, and the Planner / Implementer / Reviewer workflow.

### ADR-006 — Testing & Quality Strategy
Defines testing requirements for frontend and backend, and aligns with Definition of Done.

---

## Flutter Client

### ADR-002 — Flutter Client Clean Architecture
Defines the layer structure:
- domain
- application
- infrastructure
- presentation

Enforces strict dependency direction and separation of concerns.

### ADR-004 — Multi-Tenant Context Handling (Client-Side)
Defines explicit tenant context rules and prevents implicit global state.

### ADR-005 — Authentication & Identity Strategy
Defines Firebase Authentication integration and separation between identity and authorization.

### ADR-007 — Flutter State Management Strategy (Bloc)
Defines Bloc as the official state management solution.
Specifies:
- Bloc placement in presentation layer
- Event → State modeling
- Interaction with use cases
- Prohibited cross-layer dependencies

---

## Backend (Node.js + TypeScript)

### ADR-003 — Backend Integration & API Abstraction (Client Perspective)
Defines how the Flutter client interacts with backend APIs through repository abstractions.

### ADR-008 (Reserved)
Reserved for future backend-specific structural decisions
(e.g. database strategy, persistence model, validation framework).

---

## Future ADRs (Planned Extensions)

The following areas may require future ADRs:

- Database Strategy (backend)
- Validation Strategy (backend)
- Logging & Observability Strategy
- Error Handling Standardization
- Caching Strategy
- API Versioning Strategy

All structural changes MUST be documented with a new ADR.

---

## Status Summary

Current authoritative ADRs:

- ADR-001
- ADR-002
- ADR-003
- ADR-004
- ADR-005
- ADR-006
- ADR-007

Total active ADRs: 7

---

## Amendment Rule

Any modification to:

- Layer structure
- State management
- Authentication model
- Multi-tenant model
- Backend runtime model

Requires:
1. A new ADR or ADR update
2. Explicit documentation in this index
3. Architectural review

No undocumented structural changes are allowed.