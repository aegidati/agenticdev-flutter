# ADR-001 — Architectural Governance & Agentic Workflow

## Status

Accepted

---

## Context

The `agenticdev-flutter` template defines a structured approach to building Flutter applications using:

- Clean Architecture principles
- Multi-tenant SaaS awareness
- Explicit architectural governance
- Agentic development workflow (Planner / Implementer / Reviewer)

The goal of this template is to enforce:

- Intentional architectural decisions
- Clear separation of responsibilities
- Repeatable development processes
- Long-term maintainability

---

## Decision

The project SHALL follow an ADR-driven governance model and an Agentic Workflow.

### ADR-Driven Architecture

- All structural or cross-cutting decisions MUST be documented as ADRs.
- No architectural change may be introduced without:
  - Updating an existing ADR, or
  - Creating a new ADR.
- The ADR index is the authoritative source of architectural decisions.

---

### Agentic Workflow Model

Development follows three conceptual roles:

Planner  
Defines scope, structure, and steps before implementation.

Implementer  
Produces code aligned with ADR constraints and Clean Architecture.

Reviewer  
Verifies compliance with:
- ADRs
- Layering rules
- Definition of Done
- Architectural invariants

These roles may be executed by humans, AI tools, or hybrid collaboration.

---

### Structural Integrity

The project MUST:

- Respect Clean Architecture layering (ADR-002)
- Avoid architectural shortcuts
- Avoid direct cross-layer coupling

---

### Definition of Done Alignment

Every feature MUST satisfy:

- Architectural compliance
- Layer integrity
- Appropriate test coverage (ADR-006)
- No business logic inside presentation layer

---

## Consequences

Positive:
- Architectural clarity
- Long-term maintainability
- Reduced accidental complexity

Trade-offs:
- Increased upfront discipline
- Slightly slower prototyping

---

## Compliance

Violations of governance rules or structural integrity MUST be corrected before merging.