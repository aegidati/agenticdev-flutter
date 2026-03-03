# Architecture Overview — agenticdev-flutter

## Purpose

This document provides a high-level overview of the architecture for the `agenticdev-flutter` template.

It defines:

* Overall system boundaries
* Frontend (Flutter) architecture
* Backend (Node.js + TypeScript) architecture
* Cross-cutting concerns (authentication, multi-tenancy, logging, testing)
* The relationship between code and Architectural Decision Records (ADRs)

This document does not override:

1. Project Constitution (`docs/PROJECT-CONSTITUTION.md`)
2. ADR documents (`docs/adr/ADR-*.md`)

In case of conflict, the Constitution and ADRs prevail.

---

## 1. System Scope

The template is a full-stack architectural baseline designed for multi-tenant SaaS systems.

It includes:

* Flutter frontend client
* Node.js + TypeScript backend
* Firebase Authentication as identity provider
* Clean Architecture on both frontend and backend
* Bloc as official state management solution for Flutter

The goal of this template is long-term architectural stability and production readiness.

---

## 2. Authority & Related ADRs

This document is governed by:

* ADR-001 — Architectural Governance & Agentic Workflow
* ADR-002 — Flutter Client Clean Architecture
* ADR-003 — Backend Integration & API Abstraction
* ADR-004 — Multi-Tenant Context Handling
* ADR-005 — Authentication & Identity Strategy
* ADR-006 — Testing & Quality Strategy
* ADR-007 — Flutter State Management Strategy (Bloc)

All structural decisions must align with these ADRs.

---

## 3. Frontend Architecture — Flutter

### 3.1 Clean Architecture Layering

The Flutter client follows Clean Architecture:

```
lib/
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

### domain

* Pure Dart logic
* Entities and value objects
* Domain rules
* No Flutter framework
* No HTTP
* No Firebase SDK

### application

* Use cases
* Repository interfaces
* Business orchestration
* Depends only on domain

### infrastructure

* API client implementations
* Firebase integrations
* Local storage adapters
* DTO mapping
* Implements interfaces defined in application

### presentation

* Widgets
* Pages
* Navigation
* Bloc classes
* UI state logic only

Dependency direction must always flow inward:

* presentation → application → domain
* infrastructure → application → domain

No cross-layer shortcuts are allowed.

---

### 3.2 State Management (Bloc)

Bloc is the official state management strategy (ADR-007).

Rules:

* Bloc classes reside in the presentation layer.
* Bloc depends on use cases defined in the application layer.
* Bloc may use domain entities.
* Bloc must not depend on infrastructure implementations.
* Widgets dispatch events to Bloc.
* Widgets render states exposed by Bloc.
* Widgets must not contain business logic.

Bloc acts as the orchestration layer between UI and use cases.

---

## 4. Backend Architecture — Node.js + TypeScript

The backend mirrors Clean Architecture principles.

```
backend/src/
├── domain/
├── application/
├── infrastructure/
└── main/
```

### domain

* Business entities (User, Tenant, etc.)
* Domain rules
* No Fastify
* No Firebase
* No framework code

### application

* Use cases
* Ports (repository interfaces)
* Business orchestration
* No framework dependencies

### infrastructure

* Fastify HTTP server and routes
* Firebase Admin integration
* Repository implementations
* Logging adapters
* External integrations

### main

* Composition root
* Dependency wiring
* Server bootstrap

Dependency flow:

* infrastructure → application → domain
* main assembles components but contains no business logic

---

## 5. Authentication Model

Authentication uses Firebase as Identity Provider.

### Client Flow

1. Flutter authenticates via Firebase SDK.
2. Firebase issues an ID token (JWT).
3. The client sends the token to the backend via the `Authorization: Bearer <token>` header.

### Server Flow

1. Backend verifies the token using Firebase Admin SDK.
2. Backend extracts the user identity.
3. Backend enforces authorization rules.
4. Backend enforces tenant isolation.

Identity (Firebase) and authorization (backend) are strictly separated.
The backend is the ultimate authority for access control.

---

## 6. Multi-Tenant Model

The system is multi-tenant by design.

Principles:

* Tenant context must always be explicit.
* No global implicit tenant state.
* Frontend handles tenant selection explicitly.
* Backend enforces tenant isolation at the data layer.
* Cross-tenant data access is a critical violation.

Tenant context must be propagated through use cases and validated server-side.

---

## 7. Cross-Cutting Concerns

### 7.1 Logging

Backend:

* Structured JSON logging
* Logs include service identifier and environment context

Frontend:

* UI-level logging for debugging
* Crash reporting may be integrated in derived projects

---

### 7.2 Testing

Testing is mandatory per ADR-006.

Frontend:

* Unit tests for domain and application layers
* Widget tests for presentation layer

Backend:

* Unit tests for use cases
* Integration tests for HTTP endpoints

No feature is considered complete if it violates testing requirements.

---

## 8. Development Workflow

The project follows an agentic workflow:

Planner:

* Defines scope
* Identifies relevant ADRs
* Designs structure before code

Implementer:

* Writes code respecting layering and invariants

Reviewer:

* Validates compliance with Constitution, ADRs, Architecture, and Definition of Done

AI tools (e.g., Copilot) assist but do not define architecture.

---

## 9. Evolution Rules

Any change involving:

* Layer structure
* State management strategy
* Authentication model
* Multi-tenant model
* Backend runtime or framework

Requires:

* A new ADR
* Architectural review
* Update of this document if needed

Architecture evolves through ADRs, not through undocumented code changes.

---

## 10. Architectural Principles

The template follows these core principles:

* Architecture First
* Structure Before Code
* Explicit Over Implicit
* Governance Over Convenience
* Long-Term Maintainability Over Short-Term Speed

This repository is a disciplined architectural baseline, not a rapid prototype scaffold.
