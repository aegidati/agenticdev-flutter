# Definition of Done — agenticdev-flutter

## Purpose

This document defines the criteria required for a feature or change
to be considered complete and eligible for merge.

It applies to both Flutter (frontend) and Node.js (backend).

---

# General Requirements

A feature is DONE only if:

- It complies with all relevant ADRs.
- Clean Architecture layering is respected.
- No architectural shortcuts are introduced.
- Code compiles without warnings.
- Tests pass.

---

# Flutter Requirements

- No business logic inside presentation layer.
- All use cases live in application layer.
- Infrastructure implements application-defined interfaces.
- Firebase SDK usage remains inside infrastructure.
- Tenant context is handled explicitly.

Tests required:
- Domain: unit tests.
- Application: use case tests.
- Presentation: widget tests where applicable.

---

# Backend Requirements

- No framework logic inside domain layer.
- Use cases do not depend on infrastructure.
- Routes/controllers do not contain business logic.
- Authentication middleware is enforced.
- Tenant isolation logic is preserved.

Tests required:
- Use case unit tests.
- Basic integration test for routes.

---

# Architectural Changes

If a feature introduces:

- New cross-cutting concern
- New structural pattern
- Change in authentication or tenancy model

A new ADR is required.

---

# Code Review Checklist

Before merge:

- Layering respected?
- No forbidden imports?
- Tests exist and pass?
- No hardcoded secrets?
- No direct HTTP in UI?
- No implicit tenant handling?

If any answer is "no", the feature is not DONE.