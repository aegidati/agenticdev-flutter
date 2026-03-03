# ADR-023: Flutter Client Clean Architecture

## Status
Accepted

## Date
2026-03-03

## Context

This template uses Flutter as the primary client and inherits architectural governance and invariants from ADR-001…ADR-022.

To keep consistency with the backend architecture and preserve maintainability in a multi-tenant SaaS context, the Flutter client must adopt a strict Clean Architecture layering model with clear dependency direction and transport isolation.

## Decision

### 1) Flutter client layers

The Flutter client is organized into four layers:

1. **Domain**  
   Business rules, entities, value objects, domain services, and repository contracts.  
   No framework, UI, or transport concerns.

2. **Application**  
   Use cases, application services, orchestration, and application-facing ports/contracts.  
   Coordinates domain behavior and interaction boundaries.

3. **Presentation**  
   Widgets, screens, view models/presenters/controllers, UI state representation, navigation triggers.  
   Responsible for rendering and user interaction only.

4. **Infrastructure (Data)**  
   Concrete data sources and adapters: HTTP clients, local storage, serialization, repository implementations.  
   Technical details only.

### 2) Allowed dependency direction

Dependencies are allowed only from outer layers to inner layers.

Allowed:
- Presentation → Application
- Application → Domain
- Infrastructure (Data) → Application and/or Domain contracts (for implementations)

Not allowed:
- Domain → Application / Presentation / Infrastructure
- Application → Presentation
- Presentation → Infrastructure concrete data sources
- Any inward layer importing Flutter UI, HTTP SDK, or platform-specific details

### 3) Remote communication rule

Direct HTTP/API calls from Presentation are forbidden.

- Presentation must invoke Application use cases.
- Application uses repository/port abstractions.
- Infrastructure (Data) provides concrete remote implementations (REST/GraphQL/etc.).
- Transport details (headers, serialization, retries, client setup) remain in Infrastructure.

### 4) Navigation and state management boundary (library-agnostic)

State management remains library-agnostic at architecture level.

- Presentation owns UI state rendering and UI event handling.
- Application owns business workflows and use-case execution.
- Presentation may map use-case outputs into view state.
- Navigation decisions are triggered from Presentation based on Application outcomes.
- Navigation framework/router APIs must not leak into Domain or Application.

## Consequences

### A) Folder structure impact (`frontend/flutter_app/lib`)

A layered structure is mandatory. Example baseline:

- `domain/`
  - `entities/`
  - `value_objects/`
  - `services/`
  - `repositories/` (contracts)
- `application/`
  - `use_cases/`
  - `dto/`
  - `ports/`
  - `services/`
- `presentation/`
  - `pages/`
  - `widgets/`
  - `state/`
  - `controllers/` or `viewmodels/`
  - `navigation/` (route wiring only)
- `infrastructure/`
  - `data_sources/remote/`
  - `data_sources/local/`
  - `repositories/` (implementations)
  - `mappers/`
  - `http/` (client setup/interceptors)

Naming may vary, but layer responsibilities and dependency rules are mandatory.

### B) Testing strategy impact

Testing is layer-oriented:

- **Domain/Application tests (unit-first)**
  - Domain: pure business rules and invariants.
  - Application: use-case orchestration with mocked ports/repositories.
- **Infrastructure tests (integration)**
  - Repository implementations, serializers, remote/local data source behavior.
- **Presentation tests (widget)**
  - Widget rendering, interaction flow, and UI state transitions.
  - Presentation tests validate behavior via Application interfaces, not direct HTTP.

This separation ensures fast deterministic tests for core logic and targeted UI verification.

### C) CI impact (client side)

CI must enforce at least:

1. Lint/static analysis (`flutter analyze`)
2. Formatting checks (`dart format --set-exit-if-changed`)
3. Tests by scope:
   - unit tests (domain/application)
   - widget tests (presentation)
   - integration tests where configured

A change is not complete if any quality gate fails.

## Compliance

All Flutter client features and refactors must comply with ADR-001…ADR-023.  
Any exception or structural deviation requires a new ADR.