# ADR-003 — Backend Integration & API Abstraction

## Status

Accepted

---

## Context

The Flutter client communicates with external backend services via APIs.

The backend implementation is external and may vary.

A strict abstraction layer is required to prevent tight coupling.

---

## Decision

All backend communication SHALL follow a Repository + API Adapter pattern.

Rules:

- HTTP clients MUST reside in `lib/infrastructure/api/`
- Repository interfaces MUST be defined in `lib/application/`
- Concrete repository implementations MUST reside in infrastructure
- Widgets MUST NEVER perform HTTP calls directly

---

## Data Flow

Widget → Use Case → Repository Interface → API Adapter → Backend

DTOs MUST be mapped into Domain entities.

---

## Error Handling

Infrastructure translates transport errors into structured domain/application errors.

---

## Consequences

- Backend independence
- Strong testability
- Clear architectural boundary

---

## Compliance

Direct HTTP usage inside presentation or domain layers is forbidden.