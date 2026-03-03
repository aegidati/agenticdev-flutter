# Agentic Workflow — agenticdev-flutter

## Overview

The project follows an agentic development model.

Three conceptual roles exist:

- Planner
- Implementer
- Reviewer

These roles may be executed by humans, AI tools, or a hybrid process.

---

# Planner

Responsible for:

- Defining scope
- Identifying relevant ADRs
- Designing structure before implementation
- Breaking work into logical steps

Planner output:
- Clear implementation plan
- Identified layers
- Defined interfaces

---

# Implementer

Responsible for:

- Writing code aligned with ADRs
- Respecting Clean Architecture
- Avoiding shortcuts
- Keeping responsibilities separated

---

# Reviewer

Responsible for:

- Verifying architectural compliance
- Ensuring Definition of Done is satisfied
- Detecting layering violations
- Rejecting structural drift

---

# Mandatory Rule

Implementation must never precede planning.

Architectural thinking always comes before code.