# agenticdev-flutter

Enterprise-grade Flutter + Node.js template for building multi-tenant SaaS systems with Clean Architecture, formal governance, and an agentic development workflow.

---

## Overview

agenticdev-flutter is a full-stack template designed for long-term maintainability and architectural integrity.

It combines:

- Flutter (frontend)
- Node.js + TypeScript (backend)
- Clean Architecture on both sides
- Multi-tenant SaaS awareness
- Firebase-based authentication
- ADR-driven governance
- Agentic development workflow (Planner / Implementer / Reviewer)

This repository is not a quick starter kit.  
It is a disciplined engineering foundation for scalable systems.

---

## Technology Stack

### Frontend
- Flutter
- Clean Architecture (domain / application / infrastructure / presentation)
- Firebase Authentication (client-side identity)
- Layer-based testing strategy

### Backend
- Node.js
- TypeScript
- Fastify (HTTP layer)
- Clean Architecture (domain / application / infrastructure / main)
- Firebase Admin (token verification)

---

## Architectural Governance

The project is governed by:

- docs/PROJECT-CONSTITUTION.md — structural invariants and authority hierarchy  
- docs/adr/ — Architectural Decision Records  
- docs/ARCHITECTURE.md — high-level architecture overview  
- docs/governance/COPILOT-GOVERNANCE.md — rules for using GitHub Copilot  
- docs/governance/DEFINITION-OF-DONE.md — criteria for considering work DONE  
- docs/workflow/ — agentic workflow and STEP execution  

Structural changes require documentation.  
No architectural shortcut is allowed without an ADR.

---

## Clean Architecture Structure

### Flutter Client

frontend/flutter_app/lib/
├── domain/
├── application/
├── infrastructure/
└── presentation/

- domain: pure Dart business logic (entities, value objects, rules)
- application: use cases and repository interfaces
- infrastructure: API clients, Firebase integration, storage, mappers
- presentation: widgets, pages, navigation, UI state wiring

Key rules:

- No business logic in widgets
- No HTTP calls in presentation
- No Firebase usage outside infrastructure
- No cross-layer imports

---

### Node.js Backend

backend/src/
├── domain/
├── application/
├── infrastructure/
└── main/

- domain: business entities and rules, no framework logic
- application: use cases and ports (repository interfaces)
- infrastructure: HTTP adapters, Firebase Admin integration, persistence adapters
- main: composition root and server bootstrap

Key rules:

- No framework logic in domain
- Use cases depend only on ports
- Infrastructure implements ports
- HTTP layer adapts requests to use cases, no business logic in routes

---

## Multi-Tenant SaaS Model

The template is designed for multi-tenant SaaS systems.

Core principles:

- Tenant context is explicit
- No global implicit tenant state
- Client enforces tenant context discipline
- Backend enforces tenant isolation
- Cross-tenant data leakage is a critical violation

Tenant handling is part of the architectural invariants defined in the Project Constitution.

---

## Authentication Model

Authentication uses Firebase as Identity Provider.

High-level flow:

1. Flutter authenticates via Firebase SDK
2. Firebase issues an ID token (JWT)
3. Flutter attaches the ID token to backend requests
4. Backend verifies the token using Firebase Admin
5. Backend enforces authorization and tenant isolation

Identity (Firebase) and authorization (backend) are strictly separated.

---

## Agentic Development Workflow

Development follows a structured model:

Planner  
Defines scope, relevant ADRs, and target layers before implementation.

Implementer  
Writes code aligned with ADRs and Clean Architecture constraints.

Reviewer  
Verifies compliance with:
- Project Constitution
- ADRs
- Definition of Done
- Layering rules

AI tools (e.g. GitHub Copilot) are assistants, not architectural authorities.  
All AI-generated code must be reviewed and must respect governance documents.

---

## Definition of Done

A feature is considered DONE only if:

- Clean Architecture layering is respected
- No cross-layer shortcuts are introduced
- Structural invariants are not violated
- Appropriate tests are written
- Any structural change is backed by an ADR
- Static analysis and test suites pass

If layering is broken, the feature is not done.

---

## Project Structure

.
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── main/
├── frontend/
│   └── flutter_app/
│       ├── pubspec.yaml
│       └── lib/
│           ├── domain/
│           ├── application/
│           ├── infrastructure/
│           └── presentation/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PROJECT-CONSTITUTION.md
│   ├── adr/
│   ├── backend/
│   ├── frontend/
│   ├── governance/
│   └── workflow/
└── README.md

---

## Getting Started

### Backend

cd backend  
npm install  
npm run dev  

### Flutter App

cd frontend/flutter_app  
flutter pub get  
flutter run  

---

## Recommended Reading Order

1. docs/PROJECT-CONSTITUTION.md  
2. docs/ARCHITECTURE.md  
3. docs/adr/ADR-INDEX.md  
4. docs/governance/COPILOT-GOVERNANCE.md  
5. docs/governance/DEFINITION-OF-DONE.md  
6. docs/workflow/  

Understanding these documents ensures correct architectural usage of the template.

---

## Intended Audience

This template is designed for teams who:

- Build multi-tenant SaaS systems
- Care about architecture
- Want strict layering discipline
- Use AI tools responsibly
- Prefer long-term maintainability over short-term hacks

If you need fast prototypes without structure, this template is not for you.

If you want disciplined, scalable systems — welcome.

---

## Long-Term Philosophy

The template is built around four principles:

Architecture First  
Structure Before Code  
Explicit Over Implicit  
Governance Over Convenience  

The goal is sustainable engineering.

---

## License

Add your preferred license information here.