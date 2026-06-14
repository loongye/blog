# AGENTS.md — Starlight Documentation Site

## Project Overview

Astro 6 + Starlight 0.40 personal homepage (Yong En · Full Stack Engineer). MDX/Markdown content in `src/content/docs/`. Package manager is **pnpm**.

## Essential Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (localhost:4321) |
| `pnpm build` | Build static site to `dist/` |
| `pnpm preview` | Preview built site locally |
| `pnpm astro` | Passthrough to Astro CLI |
| `pnpm install --frozen-lockfile` | Install deps (CI-safe, no lockfile changes) |

No test, lint, or typecheck scripts are configured. `pnpm astro check` can be used for diagnostics if `@astrojs/check` is installed.

## Code Organization

```
astro.config.mjs          — Starlight/astro config (sidebar, social links, title)
src/
  content.config.ts       — Content collection schema (Starlight docs collection)
  content/
    docs/                 — All documentation content (MDX + Markdown)
      index.mdx           — Homepage (splash layout)
      guides/             — Guide-type pages
      reference/          — Reference-type pages
  assets/                 — Static assets (images, etc.)
public/
  favicon.svg
dist/                     — Build output (gitignored)
.astro/                   — Generated types (gitignored)
```

## Application Architecture

- **Static site generation**: Astro builds all content at build time into HTML pages.
- **Content collections**: All docs live in a single `docs` collection defined in `src/content.config.ts`, using the Starlight `docsLoader` and `docsSchema`.
- **Routing**: URL structure mirrors the file tree under `src/content/docs/`. Each `.md`/`.mdx` file becomes a page. No manual route config needed — sidebar ordering is configured in `astro.config.mjs`.
- **Navigation sidebar**: Configured in `astro.config.mjs` via the `sidebar` array. Two approaches:
  - `slug: 'guides/example'` — manual entry pointing to a content file
  - `autogenerate: { directory: 'reference' }` — auto-generate from a directory's files

## Content Patterns

- **Frontmatter**: Standard YAML frontmatter with `title` (required), `description`, `template`, `hero`, etc.
- **Page types**: 
  - **Splash pages** (`template: splash`) — full-width hero layout, no sidebar (used for index.mdx)
  - **Default pages** — sidebar + content layout (used for guides, reference)
- **Components**: Starlight provides `Card`, `CardGrid` from `@astrojs/starlight/components`
- **Markdown vs MDX**: Both `.md` and `.mdx` are supported. Use `.mdx` when importing Starlight components.

## Key Gotchas

- **No linting or type checking is configured** — `tsconfig.json` extends `astro/tsconfigs/strict` but the project has no `astro check` or typecheck script.
- **pnpm strictness**: `pnpm-workspace.yaml` has `allowBuilds` for `esbuild` and `sharp` — if adding dependencies with native builds, they may need to be added here.
- **pnpm workspace gotcha**: `pnpm-workspace.yaml` must have a `packages` field or `pnpm install` fails with `packages field missing or empty`. Single-project workspaces use `packages: ['*']`.
- **Sidebar mismatches**: If a content file exists but isn't in the sidebar config, it will still be accessible by URL but won't appear in navigation. Conversely, a sidebar entry with a non-existent `slug` silently links to a 404.
- **File-based routing**: The URL path is the file path relative to `src/content/docs/`, minus the extension. A file at `src/content/docs/guides/example.md` becomes `/guides/example/`.
- **Asset paths**: Assets referenced in MDX/Markdown frontmatter (like hero images) use paths relative to the content file. The index.mdx references `../../assets/houston.webp`.
- **Duplicate titles**: Starlight renders the frontmatter `title` as the page heading automatically. Do **not** add a `# Title` heading in the Markdown body — it creates a visible duplicate.

## Dependencies

| Package | Purpose |
|---------|---------|
| `astro` ^6.4.5 | Static site framework |
| `@astrojs/starlight` ^0.40.0 | Documentation theme |
| `sharp` ^0.34.5 | Image optimization (required by Astro's image service) |

## What's Not Configured

- No test framework
- No CI/CD pipeline
- No linting/formatting (Prettier, ESLint)
- No custom components beyond the default Starlight components
- No custom styling overrides
