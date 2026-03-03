# Architectural Lock Procedure — agenticdev-flutter

## Purpose

This document defines the formal procedure required to declare the architecture of this repository as **LOCKED**.

Architectural lock means:

* Documentation and code are aligned
* No structural violations exist
* Authority hierarchy is respected
* The repository is safe to use as a template baseline

Architectural lock is mandatory before:

* Creating a new repository derived from this template
* Releasing a new template version
* Declaring production readiness

---

## 1. Preconditions for Lock

Before initiating a lock check, the following must be true:

* Project Constitution exists and is finalized
* ADR-INDEX is up to date
* All active ADR files exist and are coherent
* ARCHITECTURE.md reflects the real system
* Copilot Governance is aligned with Constitution
* Backend builds successfully
* Backend tests run successfully
* Flutter project builds successfully

If any of the above is not satisfied, lock cannot proceed.

---

## 2. Documentation Guardian Audit

The lock process requires executing the official Documentation Guardian prompt.

The prompt is defined in:

* docs/governance/DOCUMENTATION-GUARDIAN-PROMPT.md

The Guardian must verify:

* Authority hierarchy consistency
* ADR compliance
* Layer structure alignment
* Testing baseline presence
* Absence of undocumented structural decisions
* Absence of legacy technology references

The Guardian output must follow this format:

* P0: Critical structural violations
* P1: Inconsistencies requiring correction
* P2: Improvements recommended
* LOCK STATUS: (LOCKED / NOT LOCKED)

---

## 3. Lock Rules

Architecture can be declared LOCKED only if:

* No P0 issues exist
* No authority conflicts exist
* All mandatory ADR constraints are satisfied
* Required test baseline exists
* Documented layers exist in real code

If P1 issues exist, they must be explicitly reviewed and accepted before lock.

If P0 issues exist, lock is automatically denied.

---

## 4. Lock Declaration Format

If the Guardian confirms lock, add the following commit message:

docs: architectural lock confirmed — no P0 violations

Optional: create a Git tag:

vX.Y.Z-architecture-locked

---

## 5. Unlock Conditions

Architecture automatically becomes UNLOCKED if:

* A structural folder change occurs
* A new framework is introduced
* Authentication model changes
* Multi-tenant model changes
* State management strategy changes
* Backend runtime changes
* A new cross-cutting concern is introduced without ADR

In such cases:

1. Create or update ADR
2. Update ARCHITECTURE.md
3. Run Documentation Guardian again
4. Re-declare lock

---

## 6. Architectural Discipline Principle

This repository prioritizes:

* Governance over speed
* Explicit structure over implicit convenience
* Long-term stability over short-term experimentation

Architectural lock is a deliberate control mechanism, not a formality.

---

## 7. Final Rule

No repository derived from this template should be created while architecture is UNLOCKED.

Architecture First.
Lock Before Scale.

---
