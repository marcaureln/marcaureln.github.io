# AGENTS.md

## Project

Source of [marcaureln.com](https://marcaureln.com), Alex N'Guessan's personal website: a Nuxt 4 site with Nuxt Content (Markdown posts), Tailwind CSS 4, `@nuxt/icon` (Lucide), and `@nuxtjs/sitemap`. Every route is prerendered (`routeRules["/**"].prerender`) and shipped without client JS (`noScripts: true`), except `/homelab/oauth/callback`.

## Install

Node 24 (Volta pins 24.15.0) and pnpm 11.11.0 (`packageManager`).

```sh
pnpm install --frozen-lockfile
```

`postinstall` runs `nuxi prepare`, which generates `.nuxt/` (needed by `tsconfig.json` and `eslint.config.mjs`).

## Commands

- Lint: `pnpm lint` (ESLint flat config from `@nuxt/eslint`)
- Format: `pnpm format` (Prettier, `printWidth: 120`); check only: `pnpm exec prettier --check .`
- Type check: none set up (`vue-tsc` is not installed).
- Tests: none.
- Dev server: `pnpm dev`
- Static build: `pnpm generate` (output in `.output/public`, also linked as `dist`). Files in `public/` are copied as-is to the root of the output.

## Layout

- `app/` – Nuxt app: `app.vue`, `error.vue`, `pages/` (home, `posts/`, `homelab/`), `components/` (`components/content/` overrides the Prose components of Nuxt Content), `utils/` (auto-imported helpers; `site.ts` holds site metadata), `assets/css/`.
- `content/` – Markdown posts (`posts/`), homelab pages (`homelab/`), home page data (`home.yml`). Collections and frontmatter schemas are in `content.config.ts`.
- `public/` – static files (fonts, icons, images, logos, `robots.txt`).
- `scripts/` – build-time helpers imported by `nuxt.config.ts`: `git-history.ts` (adds `createdAt`/`updatedAt`/`changelog` to posts from `git log`), `rehype-mermaid.ts` (renders Mermaid code blocks to SVG), `theme.ts` (inline theme script).
- `nuxt.config.ts` – modules, route rules, prerender routes, content hooks.

## Conventions

- Vue SFCs with `<script setup lang="ts">`, script before template; Nuxt auto-imports (no explicit imports for composables or utils).
- TypeScript ESM, double quotes, semicolons, 120-column lines (Prettier). Void HTML elements are self-closed (`<img />`), per the ESLint rule.
- Styling with Tailwind utility classes in templates; shared styles in `app/assets/css/`.
- New frontmatter fields must be added to the schema in `content.config.ts`, or Nuxt Content drops them.
- Pages that nothing links to must be listed in `nitro.prerender.routes` so the static build includes them.
- Short comments only where the reason is not obvious.
- Commit messages: short imperative sentence (e.g. "Drop redundant sitemap exclude pattern").
