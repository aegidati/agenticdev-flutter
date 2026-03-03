# Copilot Governance — agenticdev-flutter

## Purpose

This document defines the rules for using GitHub Copilot Chat inside this repository.

Copilot is considered a development accelerator, not an architectural authority.

All Copilot-generated code MUST comply with:

1. Project Constitution
2. ADR set
3. Architecture overview
4. This governance file

---

## 1. Authority Hierarchy (for Copilot)

When evaluating any Copilot suggestion, the following authority order applies:

1. **Project Constitution**  
   - `docs/PROJECT-CONSTITUTION.md`  
   - Defines structural invariants and ultimate authority.

2. **ADR documents**  
   - `docs/adr/ADR-*.md`  
   - Define specific architectural decisions (Flutter layers, Bloc, multi-tenant rules, auth, etc.).

3. **Architecture overview**  
   - `docs/ARCHITECTURE.md`  
   - High-level system structure.

4. **Governance documents**  
   - This file (Copilot Governance)  
   - Definition of Done  
   - Workflow docs.

5. **Source code**

6. **Copilot suggestions**

Copilot suggestions are never authoritative.

If Copilot output conflicts with any higher authority, the higher authority wins.

---

## 2. Architectural Constraints Copilot Must Respect

Copilot-generated code MUST:

- Respect Clean Architecture layering for Flutter (ADR-002):
  - `domain` → pure Dart
  - `application` → use cases & interfaces
  - `infrastructure` → external integrations
  - `presentation` → widgets & UI state

- Respect backend layering (Node.js + TS):
  - `domain` → pure business entities
  - `application` → use cases & ports
  - `infrastructure` → adapters (HTTP, auth, persistence)
  - `main` → composition root

- Respect Bloc as state management (ADR-007):
  - Bloc lives in presentation layer
  - Widgets are dumb views
  - Use cases are injected into Blocs, not into widgets

- Respect multi-tenant and auth rules (ADR-004, ADR-005)

Copilot MUST NOT:

- Introduce framework-specific code in domain layer (Flutter / Node)
- Bypass repository interfaces defined in application layer
- Add global mutable state for tenant context
- Hardcode secrets, API keys, or backend URLs inside widgets
- Introduce new architectural layers without a new ADR

---

## 3. Required Prompting Pattern

When using Copilot Chat for architectural or structural work, developers MUST:

1. Reference relevant ADR(s) and the Constitution in the prompt.
2. Specify the target layer explicitly (domain / application / infrastructure / presentation).
3. Clarify that layering rules and multi-tenant/auth invariants must be preserved.

Example prompt:

> "Implement a new feature following PROJECT-CONSTITUTION, ADR-002 and ADR-007.  
>  Create a Bloc in the presentation layer, use cases in application layer, and repository interfaces.  
>  Do NOT place business logic in widgets and do NOT call HTTP or Firebase directly from Bloc."

Copilot answers that violate these constraints MUST be discarded or fixed.

---

## 4. Structural Changes

Any change involving:

- Folder structure
- Layer responsibilities
- Authentication model
- Multi-tenant model
- Cross-cutting concerns (logging, error handling, validation)
- Backend runtime or framework

REQUIRES:

- A new ADR or ADR update
- Architectural review before merge

Copilot must not be used to silently introduce structural changes.

---

## 5. Definition of Done for Copilot-Generated Code

Before accepting any Copilot suggestion, the developer MUST verify:

- Correct layer placement (frontend and backend)
- No forbidden imports (no infra in domain, no HTTP in widgets, etc.)
- No cross-layer coupling
- Tests exist and are aligned with ADR-006 where required
- Code aligns with existing architectural style and patterns

Copilot output must be reviewed, never auto-accepted blindly.

If a suggestion conflicts with Constitution or ADRs, the suggestion MUST be rejected or fixed manually.

---

## 6. AI as Assistant, Not Architect

Copilot:

- Assists implementation
- Generates boilerplate
- Suggests repetitive patterns

Copilot is NOT:

- An architectural decision maker
- A governance authority
- A reviewer of its own structural changes

The human developer remains responsible for architectural integrity
and for enforcing the Project Constitution.

---

## 7. Enforcement Principle

If Copilot output violates architectural constraints:

- The offending code MUST be refactored immediately.
- The violation MUST NOT be merged.
- If ambiguity arises, a new ADR MUST be written.

Architectural discipline has priority over speed.

---

## 8. Long-Term Stability Rule

This template is designed for long-term maintainability.

Short-term convenience MUST NOT override:

- Clean Architecture boundaries
- Multi-tenant safety
- Authentication isolation
- Repository abstraction
- Authority hierarchy (Constitution → ADR → Architecture)

All Copilot usage must reinforce architectural clarity, not degrade it.