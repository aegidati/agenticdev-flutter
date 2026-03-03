# Project Constitution — agenticdev-flutter

## Purpose

This document defines the immutable structural invariants of the
`agenticdev-flutter` template.

It establishes the foundational rules that govern:

- Architecture
- Layering
- Multi-tenant handling
- Authentication boundaries
- Backend–Frontend separation
- Use of AI tooling (Copilot)

This Constitution overrides convenience.

Architectural integrity has priority over speed.

---

# 1. Authority Hierarchy

The project authority hierarchy is:

1. Project Constitution (this document)
2. ADR documents (`docs/adr/`)
3. ARCHITECTURE.md
4. Governance documents
5. Source code
6. Copilot suggestions

If any conflict arises, the higher authority prevails.

---

# 2. Architectural Invariants (Non-Negotiable Rules)

The following invariants MUST never be violated.

## 2.1 Clean Architecture Integrity

- Domain layer must remain pure.
- Domain must not import:
  - Flutter
  - HTTP libraries
  - Firebase SDK
  - Infrastructure modules
- Application must not depend on infrastructure.
- Presentation must not contain business logic.
- Infrastructure must implement application-defined ports.

Any cross-layer shortcut is forbidden.

---

## 2.2 No Business Logic in UI

Widgets may:

- Render data
- Trigger use cases

Widgets must NOT:

- Execute business rules
- Perform validation logic beyond UI concerns
- Call HTTP clients directly
- Access Firebase SDK directly

---

## 2.3 Backend Independence

The Flutter client treats the backend as an external system.

Rules:

- All backend interaction must go through repository interfaces.
- No hardcoded API logic in presentation.
- No backend-specific business assumptions inside UI.

Backend implementation details must remain replaceable.

---

## 2.4 Multi-Tenant Explicit Context

Tenant handling MUST be explicit.

- Tenant ID must never be implicit global state.
- Tenant context must be passed into tenant-scoped use cases.
- Cached data must be tenant-scoped.
- Cross-tenant leakage is considered a critical violation.

---

## 2.5 Authentication Boundary

Firebase Authentication is used as Identity Provider.

Rules:

- Firebase SDK usage must remain in infrastructure.
- Presentation must not depend directly on Firebase.
- Business authorization decisions belong to backend.
- Client must not trust identity claims blindly.

Identity and authorization are strictly separated.

---

## 2.6 No Silent Structural Changes

The following changes require a new ADR:

- New architectural layer
- Change in authentication model
- Change in tenancy model
- Introduction of global state patterns
- Change in dependency direction rules
- Introduction of a new cross-cutting framework

No structural modification may be introduced without documentation.

---

## 2.7 AI Tooling Constraint

Copilot is an assistant, not an architect.

Copilot-generated code:

- Must comply with this Constitution.
- Must comply with ADRs.
- Must be reviewed before merge.

AI suggestions do not override architectural constraints.

---

# 3. Backend Structural Invariants

For the Node.js backend:

- Domain layer must not depend on Fastify or Firebase.
- Use cases must depend only on ports.
- Infrastructure implements ports.
- HTTP layer must only adapt requests to use cases.
- Authentication middleware must be enforced at entry point.

Framework logic must remain in infrastructure or main.

---

# 4. Testing Invariants

Testing is mandatory for structural integrity.

- Domain logic must be unit tested.
- Application use cases must be testable in isolation.
- Infrastructure adapters must be testable independently.
- Presentation must include widget tests for UI logic.

No feature is considered complete without appropriate tests.

---

# 5. Definition of Done Supremacy

A feature is not DONE if:

- It violates layering.
- It introduces hidden coupling.
- It bypasses repository interfaces.
- It embeds business logic in presentation.
- It weakens tenant isolation.
- It bypasses authentication boundaries.

Speed never overrides structure.

---

# 6. Long-Term Stability Clause

This template is designed for long-term maintainability (10+ years).

Therefore:

- Architectural clarity is preferred over short-term convenience.
- Explicitness is preferred over magic.
- Structure is preferred over speed.
- Discipline is preferred over flexibility.

Any decision that sacrifices long-term clarity for short-term gain must be rejected.

---

# 7. Amendment Rule

This Constitution may only be modified if:

- A formal ADR is written.
- The impact is evaluated.
- The amendment improves clarity without weakening invariants.

Amendments must strengthen the system, not dilute it.

---

# 8. Final Principle

Architecture First.  
Structure Before Code.  
Explicit Over Implicit.  
Governance Over Convenience.

This template is a disciplined engineering system,
not just a collection of folders.