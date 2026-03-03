# ADR-006 — Testing & Quality Strategy for Flutter

## Status

Accepted

---

## Context

Long-term maintainability requires enforceable testing aligned with Clean Architecture.

---

## Decision

Testing SHALL follow layer-based strategy.

Domain:
- Pure unit tests

Application:
- Use case tests with mocked repositories

Infrastructure:
- Adapter and mapper tests

Presentation:
- Widget tests

---

## CI Requirements

- Static analysis must pass
- Unit tests must pass
- Widget tests must pass
- No architectural violations

---

## Definition of Done

A feature is complete only if:

- It respects ADR-002 layering
- It includes appropriate tests
- It introduces no cross-layer coupling

---

## Consequences

- High reliability
- Reduced regression risk
- Increased initial testing effort