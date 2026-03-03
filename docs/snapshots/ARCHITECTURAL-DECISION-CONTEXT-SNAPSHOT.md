# Architectural Decision Context Snapshot

<!-- Meta: Integrity Lock: snapshot-v1.0.0 -->

## 1. Purpose

This document captures the **high-level architectural state** at a given point in time.

Its purpose is to **re-establish context** quickly in future sessions, without re-scanning all ADRs, docs, and source code.

**It is NOT:**
- A replacement for ADRs (those define architecture)
- A replacement for governance documents (those define authority)
- A replacement for operations docs (those define process)
- A complete architecture document

**It IS:**
- A compact, structured reminder
- A starting point for AI-assisted continuity
- A memory aid for humans and agents

## 2. Authority Reminder

**If this snapshot conflicts with official documentation, the official documentation prevails.**

In descending order of authority:

1. `/docs/adr/*.md` — Accepted ADRs (highest)
2. `/docs/operations/DEFINITION-OF-DONE.md`
3. `/docs/operations/PROMPT-GOVERNANCE-CONVENTION.md`
4. STEP documents in `/docs/operations/STEP*.md`
5. `/docs/architecture/*.md` — Architecture documentation
6. Operational prompts
7. **This snapshot** (lowest)

When resuming work:
- Always validate decisions against ADRs.
- Always follow the governance model.

This snapshot does NOT override ADRs.

## 3. System Overview

**Platform Context**:
- Multi-tenant SaaS
- Mobile-first client architecture
- RESTful API backend
- Relational database (PostgreSQL assumed)

**Technology Stack**:
- **Backend**: Node.js + TypeScript
  - Clean Architecture layering (Domain / Application / Interface / Infrastructure)
  - RESTful API endpoints
  - Repository pattern for data access
  - Dependency injection
- **Mobile**: Flutter
  - Clean Architecture layering (Presentation / Domain / Data)
  - BLoC pattern for state management
  - Repository pattern for data access
  - Dependency injection via get_it
  - Platform-agnostic UI components

**Architectural Style**:
- Layered architecture with strict dependency rules
- Domain-driven design principles
- Separation of concerns across layers
- Infrastructure abstraction via interfaces
- Mobile-first responsive design

## 4. ADR Coverage

The following ADRs define accepted architectural decisions:

- **ADR-001** — Multi-Tenancy Isolation Strategy
- **ADR-002** — Database Schema Strategy
- **ADR-003** — JWT Signing & Key Rotation Strategy
- **ADR-004** — Logging & Auditing Strategy
- **ADR-005** — API Versioning Strategy
- **ADR-006** — Secrets Management Foundation
- **ADR-007** — Error Handling Strategy
- **ADR-008** — Testing Strategy
- **ADR-009** — CI/CD Pipeline Structure
- **ADR-010** — Deployment Model
- **ADR-011** — Monitoring & Observability
- **ADR-012** — Rate Limiting & Throttling
- **ADR-013** — Feature Flag Strategy
- **ADR-014** — Advanced Secret Management Strategy
- **ADR-015** — Context Propagation Strategy
- **ADR-016** — Tenant Context Validation
- **ADR-017** — Repository Interface Standardization
- **ADR-018** — Dependency Injection Convention
- **ADR-019** — Domain Model Persistence Separation
- **ADR-020** — Application Service Responsibility Boundary
- **ADR-021** — Infrastructure Service Abstraction
- **ADR-022** — Backend Runtime & Clean Architecture Layering
- **ADR-023** — Flutter Client Clean Architecture

For structured navigation, see: `/docs/adr/ADR-INDEX.md`

ADR-022 and ADR-023 supersede any prior assumptions about Django or React Native.

## 5. Documented STEP State

The following STEP documents define operational workflows:

- **STEP-00** — Governance & Architecture First
- **STEP-01** — Multi-Tenancy Foundation
- **STEP-02** — Authentication & Security Core
- **STEP-03** — Domain & Application Layer
- **STEP-04** — Infrastructure & Persistence
- **STEP-05** — API & Integration Layer
- **STEP-06** — Testing & Deployment Pipeline

For scope ownership and responsibility matrix, see:  
`/docs/operations/STEP-RESPONSIBILITY-MATRIX.md`

## 6. Architectural Invariants

The following constraints are derived from ADRs and must be preserved:

1. **Tenant isolation is mandatory** — no cross-tenant data leakage
2. **Database is the source of truth** — no persistent state outside the database
3. **No cross-layer shortcuts** — respect layering rules strictly
4. **No hardcoded secrets** — all secrets must be externalized
5. **Structural changes require ADR governance** — no ad-hoc architecture modification

## 7. Resume Guidance

When resuming work on this project:

1. Load this snapshot for quick context.
2. Load relevant ADRs and STEP docs for authority.
3. Continue from the next planned step in the active STEP.

**Do not treat this snapshot as authoritative.**  
**Always validate against ADRs before implementing.**

---
