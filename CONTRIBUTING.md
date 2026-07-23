# Contributing to StudyFinder

Thanks for taking the time to contribute! This document defines the conventions
this project follows so the codebase stays consistent, readable, and easy to
review — whether there's one contributor or ten.

These conventions are based on widely adopted, industry-standard references
rather than ad-hoc preference:

- [neostandard](https://github.com/neostandard/neostandard) — correctness/logic rules, via ESLint flat config
- [Prettier](https://prettier.io/) — all formatting (indentation, quotes, semicolons, line length)
- [Conventional Commits](https://www.conventionalcommits.org/) — commit message format
- [Semantic Versioning (SemVer)](https://semver.org/) — release/version numbering
- [Keep a Changelog](https://keepachangelog.com/) — changelog format

If a situation isn't covered here, defer to what `eslint.config.mjs` and
Prettier already enforce, then open a discussion in a PR if it's genuinely
ambiguous.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Naming Conventions](#naming-conventions)
4. [Coding Style](#coding-style)
5. [Git Workflow](#git-workflow)
6. [Commit Message Convention](#commit-message-convention)
7. [Pull Request Process](#pull-request-process)
8. [Testing Guidelines](#testing-guidelines)
9. [Documentation](#documentation)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/<org>/study_finder.git
cd study_finder

# Install dependencies
npm install

# Start the dev server
npm run dev

# Run the test suite
npm test

# Build for production
npm run build
```

Before opening a PR, make sure `npm test` passes and `npm run build` completes
without errors.

---

## Project Structure

```
src/
├── components/     # Reusable UI-building functions (return HTML strings)
├── pages/          # Route-level views composed from components
├── models/         # Domain classes (e.g. User, StudySession)
├── store/          # Application state management (single source of truth)
├── services/       # Data-fetching / persistence layer (API calls, storage)
├── utils/          # Stateless helper functions (formatting, generators, etc.)
├── data/           # Static/mock JSON data
└── styles/         # Global stylesheets
```

Each folder has **one job**. If you're not sure where something belongs, ask
in the PR description rather than guessing — misplaced files are one of the
easiest things to accumulate as "quiet debt" in a codebase.

---

## Naming Conventions

### Folders

Use **lowercase, plural, kebab-case** for multi-word folder names:

```
✅ components/, models/, utils/, data/
✅ user-activities/
❌ Components/, model/, Utils/
```

### Files

| File exports...                  | Convention                               | Example                                       |
| -------------------------------- | ---------------------------------------- | --------------------------------------------- |
| A single class                   | `PascalCase.js` (matches class name)     | `User.js`, `StudySession.js`                  |
| A UI-building/component function | `PascalCase.js` (matches function name)  | `SessionCard.js`, `TopNavigation.js`          |
| A plain utility/helper function  | `camelCase.js`                           | `formatTime.js`, `loadUsers.js`               |
| A config file                    | `kebab-case.config.js`                   | `vite.config.js`                              |
| A test file                      | mirrors the file under test + `.test.js` | `User.test.js`                                |
| A test fixture/factory           | `<singular-entity>.fixture.js`           | `user.fixture.js`, `study-session.fixture.js` |
| A fallback/seed data file        | `<plural-entity>.seed.json`              | `users.seed.json`, `sessions.seed.json`       |

**Rule of thumb:** the filename should always match the name of its default/primary
export exactly (case-sensitive). This avoids the single most common source of
import bugs in JS projects — filesystem case mismatches that only surface in
CI/CD on case-sensitive Linux runners, not on local macOS/Windows machines.

### Variables & Functions

```js
// camelCase for variables and functions
const activeSessions = [];
function calculateDistance(a, b) { ... }

// Booleans read as a question / predicate
const isFull = session.participants.length >= session.capacity;
const hasNewNotifications = true;

// Event handlers prefixed with "handle"
function handleJoinClick(event) { ... }
```

### Classes

```js
// PascalCase, singular noun
class User { ... }
class StudySession { ... }

// Private fields use the # syntax, not underscore prefixes
class User {
  #id;
  #name;
}
```

### Constants

```js
// SCREAMING_SNAKE_CASE only for true constants (module-level, never reassigned,
// represent a fixed configuration value)
const MAX_PARTICIPANTS_SHOWN = 3;

// Everything else that happens to not be reassigned is just `const`, not
// SCREAMING_SNAKE_CASE — reserve that for genuine "config" values
const users = await loadUsers(); // not USERS
```

### Module Exports

Export style depends on **what kind of file it is**, not personal preference —
enforced by `eslint.config.mjs`, not just documented here:

| File type                                                     | Export style                                 | Why                                                                                                         |
| ------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `components/**`, `pages/**` (UI-building functions)           | **Default export**                           | The file's entire reason to exist is "this one component" — one thing in, one thing out.                    |
| `models/**`, `store/**`, `utils/**`, `services/**`, `data/**` | **Named exports only** — no `export default` | These files often export more than one thing, and named exports keep every import explicit and rename-safe. |

```js
// ✅ components/SessionCard.js — default export, this file IS the component
export default function SessionCard({ session }) { ... }

// ✅ models/User.js — named export, no default
export class User { ... }

// ❌ utils/formatTime.js — do not default-export a utility
export default function formatTime(date) { ... } // wrong for this folder

// ✅ utils/formatTime.js — correct
export function formatTime(date) { ... }
```

If you're not sure which bucket a new file falls into, check which folder
it lives in first — the folder decides the export style, not the other way
around.

---

## Coding Style

Correctness and logic rules are enforced by [neostandard](https://github.com/neostandard/neostandard)
via ESLint's flat config, with [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x)
added for import validation. All formatting — indentation, quotes, semicolons,
line length — is owned entirely by [Prettier](https://prettier.io/), not
ESLint, to avoid the two tools disagreeing with each other.

General conventions this implies:

- **Never use `var`.** Use `const` by default, `let` only when reassignment is required.
- **Prefer arrow functions** for anonymous functions and callbacks.
- **Use template literals** instead of string concatenation.
- **Use destructuring** for objects and arrays where it improves readability.
- **Always use strict equality** (`===` / `!==`).
- **Always use semicolons.**
- **2-space indentation.**
- **Trailing commas** in multi-line object/array literals.
- **Blank line before and after every function declaration and every class method**, and before every `return` — enforced via `@stylistic/eslint-plugin`, the one formatting exception layered on top of Prettier for spacing rules Prettier doesn't cover.

Run before committing:

```bash
npm run lint
npm run format
```

---

## Git Workflow

We use a lightweight trunk-based workflow:

- `main` is always deployable.
- All work happens on a branch off `main`, named:

```
<type>/<short-description>

feature/create-session-form
fix/broken-test-imports
chore/update-dependencies
docs/contributing-guide
refactor/app-store-cleanup
```

Valid `<type>` prefixes: `feature`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`.

- Rebase onto `main` before opening a PR — avoid merge commits in feature branches.
- Delete your branch after it's merged.

---

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short summary>

<optional body>

<optional footer>
```

**Types:**

| Type       | Use for                                                 |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature                                           |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only changes                              |
| `style`    | Formatting, missing semicolons, etc. (no code change)   |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or correcting tests                              |
| `chore`    | Build process, tooling, or dependency changes           |
| `perf`     | Performance improvement                                 |

**Examples:**

```
feat(store): add localStorage persistence to AppStore
fix(tests): correct fixture imports for User and StudySession
docs(contributing): add naming convention guidelines
refactor(router): extract navigateTo into its own module
```

Keep the summary line under 72 characters, written in the imperative mood
("add", not "added" or "adds").

---

## Pull Request Process

1. Ensure your branch is up to date with `main`.
2. Ensure `npm test` and `npm run build` both pass locally.
3. Fill out the PR description: **what** changed, **why**, and **how to test it**.
4. Keep PRs focused — one logical change per PR. Large PRs get large delays.
5. At least one approval is required before merging.
6. Squash-merge into `main` so history stays readable.

---

## Testing Guidelines

- Every new class method or utility function should have a corresponding test.
- Tests live next to the code they test, or in `__fixtures__/` for shared test data.
- Fixture/factory files follow `<singular-entity>.fixture.js` (e.g. `user.fixture.js`) and export a
  `create<Entity>(overrides = {})` factory function — never hardcode a full object inline in the test file itself.
- Test names should describe the behavior, not the implementation:

```js
// ✅ describes behavior
test('does not add a participant when the session is full', () => { ... });

// ❌ describes implementation
test('isFull returns true', () => { ... });
```

- Run the full suite before every PR: `npm test`.

---

## Documentation

- Every exported class and function should have a [JSDoc](https://jsdoc.app/) comment
  describing its purpose, parameters, and return value.
- Inline comments should explain **why**, not **what** — the code already says what.
- Update this file whenever a new convention is introduced or an old one changes.

```js
/**
 * Adds a participant to the session if it is not already full.
 * @param {string|number} participantId - The participant identifier to add.
 * @returns {void}
 */
addParticipants(participantId) { ... }
```

---

Following these conventions consistently is what makes a codebase look and
feel professional in review — not any single clever trick. When in doubt,
consistency beats personal preference.
