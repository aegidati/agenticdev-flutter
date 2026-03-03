# ADR-005 — Authentication & Identity Strategy (Firebase)

## Status

Accepted

---

## Context

The Flutter client requires secure authentication with minimal credential handling logic.

Firebase Authentication provides:

- Email/password login
- Social providers
- Token-based identity
- Strong Flutter SDK support

---

## Decision

Firebase Authentication SHALL be used as external Identity Provider.

Firebase:
- Handles login and token issuance.

Backend:
- Verifies tokens.
- Enforces tenant and authorization rules.

---

## Client Rules

- Firebase SDK usage MUST reside in infrastructure.
- ID tokens MUST be attached to backend requests.
- Presentation MUST NOT depend directly on Firebase SDK.
- Authentication state MUST be exposed via application layer.

---

## Consequences

- Reduced security surface
- Strong mobile integration
- External dependency on Firebase

---

## Compliance

Business decisions MUST NOT rely solely on Firebase claims without backend validation.