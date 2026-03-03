# ADR-007 — Flutter State Management Strategy (Bloc)

## Status

Accepted

---

## Context

The `agenticdev-flutter` template defines a Clean Architecture structure for the Flutter client:

- `lib/domain/`
- `lib/application/`
- `lib/infrastructure/`
- `lib/presentation/`

(See ADR-002 — Flutter Client Clean Architecture.)

We now need a **standard state management strategy** for the Flutter presentation layer that:

- Enforces separation between UI and business logic
- Plays well with Clean Architecture
- Is widely adopted and well-known
- Is explicit and predictable (no implicit magic)

You (the template maintainer) are more familiar with **Bloc** than other options (e.g. Riverpod, Provider), and Bloc is a good match for:

- Explicit event → state flow
- Testable presentation logic
- Clear boundary between UI (widgets) and orchestration logic

---

## Decision

The official state management solution for the Flutter client SHALL be **Bloc** (`flutter_bloc` package).

Bloc is responsible for:

- Orchestrating use cases from the application layer
- Managing UI state transitions
- Exposing states to widgets in the presentation layer

Widgets are responsible for:

- Rendering states
- Dispatching events to Bloc
- No business logic

### Layer Placement

Bloc classes SHALL live in the **presentation layer**:

- `lib/presentation/features/<feature_name>/bloc/`

Example:

- `lib/presentation/features/auth/bloc/auth_bloc.dart`
- `lib/presentation/features/tenant/bloc/tenant_bloc.dart`

Bloc may depend on:

- Application layer (use cases, repository interfaces)
- Domain layer (entities, value objects)

Bloc MUST NOT depend on:

- Infrastructure layer (API clients, storage, Firebase SDK)
- Platform-specific services

---

## Bloc Responsibilities

Bloc:

- Handles events and maps them to states
- Coordinates one or more use cases
- Translates domain/application results into UI-ready states
- Encapsulates loading, success, error flows

Bloc MUST NOT:

- Perform HTTP calls directly
- Access Firebase SDK directly
- Perform low-level storage operations
- Contain domain rules that belong in domain/application layers

---

## Widget Responsibilities

Widgets:

- Listen to Bloc states (`BlocBuilder`, `BlocListener`, etc.)
- Dispatch Bloc events on user interactions
- Render UI based on current state

Widgets MUST NOT:

- Contain business logic
- Call use cases directly
- Know about repositories or infrastructure implementations

All business interactions go through Bloc.

---

## Use Case Integration

Bloc interacts with the application layer as follows:

- Bloc is injected with one or more use cases
- When an event is received, Bloc:
  - Validates UI-level input
  - Calls the appropriate use case
  - Awaits the result (success/failure)
  - Emits new states accordingly

Example flow (conceptual):

1. `LoginSubmitted` event dispatched from UI
2. `AuthBloc` calls `LoginUserUseCase`
3. Use case returns success or failure
4. `AuthBloc` maps result to `AuthState.authenticated` or `AuthState.failure`
5. UI reacts to state change

---

## Multi-Tenant Handling

Tenant-related UI (e.g. tenant selector, tenant dashboard) SHOULD use dedicated Blocs, e.g.:

- `TenantListBloc`
- `ActiveTenantBloc`

Rules:

- Tenant context MUST be explicit in Bloc events and states
- Bloc MUST NOT rely on global static tenant variables
- Bloc interacts with use cases that are tenant-aware (e.g. `SelectTenantUseCase`, `ListTenantsUseCase`)

This aligns with ADR-004 — Multi-Tenant Context Handling.

---

## Error Handling

Bloc states SHOULD represent:

- Idle / initial
- Loading
- Success (with data)
- Failure (with user-friendly error message and optional technical details)

Error mapping rules:

- Infrastructure and application errors are transformed into UI-friendly messages inside Bloc
- Widgets render error states but DO NOT contain decision logic

---

## Testing Strategy

Bloc classes MUST be unit-testable in isolation.

Recommended practice:

- Mock use cases at application layer
- Test event → state transitions
- Test success and failure paths

This aligns with ADR-006 — Testing & Quality Strategy for Flutter.

---

## Consequences

Positive:

- Clear, explicit state management standard across all features
- Strong separation of concerns:
  - Widgets are “dumb” view components
  - Bloc is orchestration logic
  - Application layer holds use cases
  - Domain layer holds business rules
- Easier onboarding for new developers familiar with Bloc
- High testability of presentation logic

Trade-offs:

- More boilerplate compared to simpler state management solutions
- Developers must understand Bloc pattern and event/state modeling
- Strict discipline required to avoid drifting logic back into widgets

---

## Compliance

New features MUST:

- Use Bloc for non-trivial stateful UI
- Place Blocs in `lib/presentation/features/<feature>/bloc/`
- Inject use cases into Blocs, not directly into widgets
- Avoid direct infrastructure access from Bloc

Feature implementations that introduce:

- Business logic in widgets
- Direct HTTP/Firebase calls in Bloc
- Global mutable tenant state for UI

MUST be considered architectural violations and corrected before merge.