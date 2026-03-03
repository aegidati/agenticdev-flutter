# Flutter Architecture — Clean Architecture

## Structure

lib/
├── domain/
├── application/
├── infrastructure/
└── presentation/

---

## Domain

Pure Dart logic.

---

## Application

Use cases and repository interfaces.

---

## Infrastructure

API clients, Firebase integration, storage adapters.

---

## Presentation

Widgets and UI logic only.

---

# Key Rules

- No business logic in widgets.
- No HTTP calls in UI.
- No Firebase usage outside infrastructure.
- Tenant context must be explicit.