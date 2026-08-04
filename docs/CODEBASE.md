# Portfolio codebase guide

This document describes where code lives, naming conventions, and how to change global design tokens without hunting through the repo.

## Directory layout

| Path | Purpose |
|------|---------|
| `src/main.tsx` | App entry: loads global CSS, mounts `App`. |
| `src/App.tsx` | Page composition (sections + footer). |
| `src/data/` | Static content: `profile.ts`, `projects.ts`, `layout.ts`, constellation edges. |
| `src/types/` | Shared TypeScript types. |
| `src/styles/tokens.css` | **Single source for fonts, colours, spacing, motion.** |
| `src/styles/site.css` | Layout, sections, components (uses tokens only — no raw hex for brand colours). |
| `src/styles/celestial.css` | Fixed full-page cosmos + shooting stars. |
| `src/styles/map-layers.css` | Experience map nebula + 2D starfield layers. |
| `src/components/sections/` | Page sections (Hero, Intro, Experience, Career, Toolkit, Contact). |
| `src/components/constellation/` | Interactive star chart + star systems. |
| `src/components/celestial/` | Three.js background, scroll motion helpers. |
| `src/components/project/` | Project detail drawer. |
| `src/hooks/` | Reusable React hooks (see below). |
| `src/theme/` | Reading CSS variables from JavaScript (Three.js colours). |
| `src/constants/` | Shared constants (motion easing, CSS variable names). |

## Changing fonts and colours

Edit **`src/styles/tokens.css`** only.

- **Body copy:** `--body-font`
- **Headings / display:** `--heading-font`
- **Coordinates, plate labels, meta:** `--code-font`

Legacy aliases `--font-sans`, `--font-display`, and `--font-mono` point at those three — existing CSS keeps working.

Brand colours use `--color-*` names (`--color-bg`, `--color-ink`, `--color-accent`, `--color-accent-cool`, chart figure lines, etc.). Three.js reads the same values via `src/theme/cssVariables.ts` so the WebGL field matches the page.

## Hooks

Custom hooks live in **`src/hooks/`**. Each file exports one hook with a descriptive name:

| Hook | File | Used by |
|------|------|---------|
| `useMapPointerParallax` | `useMapPointerParallax.ts` | `ExperienceMap` — pointer-driven layer parallax on the chart. |
| `useScrollLinkedProgress` | `useScrollLinkedProgress.ts` | `CosmosScene` — smoothed 0–1 scroll progress for the camera. |
| `useBodyScrollLock` | `useBodyScrollLock.ts` | `ProjectDrawer` — locks body scroll while open. |

**Convention:** Hooks start with `use`, live in `src/hooks/`, and contain no JSX. Prefer Framer’s `useReducedMotion()` in components for enter animations unless the hook is shared.

## Components vs. helpers

- **Components** (`*.tsx` under `components/`): render UI; may use hooks and data modules.
- **Data** (`src/data/`): no React; plain exports for copy and layout coordinates.
- **Constants** (`src/constants/`): non-React shared values (e.g. motion easing curves).
- **Theme** (`src/theme/`): bridge from CSS tokens to JS (Three.js).

## Adding a new section

1. Create `src/components/sections/YourSection.tsx`.
2. Use `SectionHead` for eyebrow/title/lede when appropriate.
3. Add styles in `site.css` under a clear comment block; use token variables.
4. Wrap with `Approach` if other sections use scroll entrance.
5. Register the section in `src/App.tsx`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run lint` — oxlint
