# ADR-002 — Flutter Client Clean Architecture

## Status

Accepted

---

## Context

The Flutter client must remain scalable, testable, and maintainable.

A strict layered architecture is required to:

- Separate UI from business logic
- Isolate infrastructure concerns
- Enable strong unit testing
- Avoid framework lock-in

---

## Decision

The Flutter client SHALL follow Clean Architecture principles.

The canonical structure under `lib/` MUST be:

lib/
├── domain/
├── application/
├── infrastructure/
└── presentation/

---

## Layer Responsibilities

Domain:
- Entities
- Value Objects
- Business rules
- Pure Dart logic

Application:
- Use cases
- Repository interfaces
- Orchestration logic

Infrastructure:
- API clients
- Local storage
- DTO mappers
- Concrete repository implementations

Presentation:
- Widgets
- Pages
- Navigation
- UI state wiring

---

## Dependency Rules

Allowed:

Presentation → Application → Domain  
Infrastructure → Application → Domain  

Forbidden:

- Domain importing Application or Infrastructure
- Application importing Infrastructure
- Presentation importing Infrastructure directly
- Circular dependencies

---

## Consequences

- High testability
- Clear separation of concerns
- Slight increase in boilerplate

---

## Compliance

Business logic inside widgets or direct infrastructure calls from UI are architectural violations.