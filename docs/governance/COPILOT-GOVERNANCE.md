# Copilot Governance — agenticdev-flutter

## Purpose

This document defines the authoritative structure and rules for using
GitHub Copilot Chat inside this repository.

Copilot is considered a development accelerator, not an architectural authority.

All Copilot-generated code MUST comply with this document and the ADR set.

---

# 1. Authority Hierarchy

The following authority order applies:

1. ADR documents in `docs/adr/`
2. ARCHITECTURE.md
3. This governance file
4. Source code
5. Copilot suggestions

Copilot suggestions are never authoritative.

If Copilot output conflicts with ADRs, ADRs win.

---

# 2. Architectural Constraints Copilot Must Respect

Copilot-generated code MUST:

- Respect Clean Architecture layering (ADR-002)
- Avoid cross-layer imports
- Avoid business logic in presentation layer
- Avoid direct HTTP calls inside widgets
- Avoid implicit tenant handling (ADR-004)
- Keep Firebase SDK usage inside infrastructure (ADR-005)
- Respect Repository pattern (ADR-003)

Copilot MUST NOT:

- Introduce framework-specific code in domain layer
- Bypass repository interfaces
- Add global mutable state for tenant context
- Hardcode backend URLs inside UI components

---

# 3. Required Prompting Pattern

When using Copilot Chat for structural changes, the developer MUST:

1. Reference relevant ADR(s)
2. Specify target layer explicitly
3. Clarify that layering rules must be preserved

Example prompt:

"Implement a new feature following ADR-002 and ADR-003.
Create a use case in application layer, repository interface,
and infrastructure implementation. Do not place business logic in widgets."

---

# 4. Structural Changes

Any change involving:

- Folder structure
- Layer responsibilities
- Authentication model
- Tenant handling
- Cross-cutting concerns

Requires:

- A new ADR or ADR update
- Architectural review before merge

Copilot must not be used to silently introduce structural changes.

---

# 5. Definition of Done for Copilot-Generated Code

Before accepting Copilot output, the developer MUST verify:

- Correct layer placement
- No forbidden imports
- No cross-layer coupling
- Tests exist where required (ADR-006)
- Code aligns with existing architectural style

Copilot output must be reviewed, never auto-accepted blindly.

---

# 6. AI as Assistant, Not Architect

Copilot:

- Assists implementation
- Generates boilerplate
- Accelerates repetitive patterns

Copilot is not:

- Architectural decision maker
- Governance authority
- Reviewer of its own structural changes

The human developer remains responsible for architectural integrity.

---

# 7. Enforcement Principle

If Copilot output violates architectural constraints:

- The code MUST be refactored immediately
- The violation MUST NOT be merged
- If structural ambiguity exists, a new ADR must be written

Architectural discipline has priority over speed.

---

# 8. Long-Term Stability Rule

This template is designed for long-term maintainability.

Short-term convenience MUST NOT override:

- Clean Architecture boundaries
- Multi-tenant safety
- Authentication isolation
- Repository abstraction

All Copilot usage must reinforce architectural clarity, not degrade it.