# Architectural Decision Record Index — agenticdev-flutter

This repository contains the architectural decisions specific to the **agenticdev-flutter** template.

The scope is:

- Flutter client applications
- Clean Architecture layering
- Agentic development workflow (Planner / Implementer / Reviewer)
- Multi-tenant SaaS support from the client perspective
- Integration with external backends via APIs
- Firebase Authentication as Identity Provider

## ADR List

| ID      | Title                                                  | Status   |
|---------|--------------------------------------------------------|----------|
| ADR-001 | Architectural Governance & Agentic Workflow            | Accepted |
| ADR-002 | Flutter Client Clean Architecture                      | Accepted |
| ADR-003 | Backend Integration & API Abstraction                  | Accepted |
| ADR-004 | Multi-Tenant Context Handling (Client-Side)            | Accepted |
| ADR-005 | Authentication & Identity Strategy (Firebase)          | Accepted |
| ADR-006 | Testing & Quality Strategy for Flutter                 | Accepted |

## Notes

- These ADRs are **specific to the Flutter client template** and do not reference any Python/Django or React stacks.
- Backend details (runtime, database, etc.) are intentionally treated as external concerns; the Flutter app interacts with them via well-defined API abstractions.
- Any additional structural or cross-cutting concerns (e.g. analytics, feature flags) MUST be documented in new ADRs and added to this index.