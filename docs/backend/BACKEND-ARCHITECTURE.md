# Backend Architecture — Node.js + TypeScript

## Runtime

- Node.js
- TypeScript
- Fastify (HTTP layer)

---

# Layering

backend/src/
├── domain/
├── application/
├── infrastructure/
└── main/

---

## Domain

- Pure business entities
- No framework dependencies

---

## Application

- Use cases
- Ports (repository interfaces)

---

## Infrastructure

- HTTP adapters
- Firebase Admin integration
- Repository implementations

---

## Main

- Composition root
- Dependency wiring
- Server bootstrap

---

# Principles

- No framework logic in domain
- Use cases depend only on ports
- Infrastructure implements ports
- Authentication enforced at HTTP layer