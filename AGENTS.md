# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

(`CLAUDE.md` is a symlink to this file — edit `AGENTS.md`, not `CLAUDE.md`, to avoid two copies diverging.)

## Commands

```sh
npm run dev       # astro dev — local dev server at localhost:4321
npm run build     # astro check && astro build — type-checks, then builds static site to ./dist
npm run preview   # wrangler dev — serves ./dist through the Workers runtime (routes, _headers, 404 handling)
npm run deploy    # wrangler deploy — deploys ./dist as an assets-only Worker
```

There is no test suite and no linter configured in this repo. `astro check` (run as part of `npm run build`) is the only automated check — it type-checks `.astro`/`.ts` files and validates content collection frontmatter against the Zod schema in `src/content.config.ts`.

When starting the dev server for an interactive session, prefer background mode: `astro dev --background`, managed with `astro dev stop` / `astro dev status` / `astro dev logs`.

## Git workflow

Commit directly to `main` — don't create a feature branch first. Cloudflare Workers Builds deploys straight from `main` on every push, there's no PR/review step in this repo's workflow, and the default "branch before committing on the default branch" caution doesn't apply here.

## Architecture

This is a static Astro site (`output: 'static'`, no SSR adapter) deployed to **Cloudflare Workers Static Assets as an assets-only Worker** — there is no Worker script (`wrangler.jsonc` has no `main`). Cloudflare Workers Builds connects directly to the GitHub repo and runs `npm run build` then `npx wrangler deploy`; there is no GitHub Actions workflow.

Key consequence: the site ships **zero client-side JavaScript** by design (no islands, no `<script>` tags). Any new feature that seems to need client JS should be reconsidered first — this is a deliberate constraint, not an oversight.

### Routing & domains (`wrangler.jsonc`)

- `assets.not_found_handling: "404-page"` — Astro's `src/pages/404.astro` is served as a real 404, not an SPA fallback. There is no `_redirects`-based catch-all.
- `routes` lists both `snigji.com` and `www.snigji.com` as `custom_domain` routes. Both serve **identical content** (no redirect between them) — `astro.config.mjs` hardcodes `site: 'https://snigji.com'`, so every page's canonical/OG URLs always point at the apex regardless of which host served the request. Don't "fix" this by adding per-request host logic; that would require a Worker script, which this project deliberately doesn't have.
- Before a first deploy to a new domain, any existing DNS records (A/AAAA/CNAME) for that hostname in Cloudflare must be removed or the custom domain route will conflict.

### `.well-known/webfinger` (OIDC issuer discovery)

`public/.well-known/webfinger` is a **static, unparameterized** JSON file served verbatim for *any* `?resource=` query string (there's no server logic to vary the response). It exists so RPs can resolve the OIDC issuer for `acct:admin@snigji.com` via WebFinger (RFC 7033) — per that spec, the lookup happens against the account's email domain (`snigji.com`), not the IdP's own domain (`auth.snigji.com`, which is Okta and serves its own unrelated webfinger endpoint for IdP/home-realm discovery).

The `href` in this file **must exactly match** the `issuer` returned by `https://auth.snigji.com/.well-known/openid-configuration` (or `.../oauth2/<auth-server-id>/...` if a custom authorization server is used instead of the org server) — verify this hasn't drifted before changing Okta configuration. `public/_headers` sets `Content-Type: application/jrd+json` and CORS for this path specifically; other routes get a separate, more general header block.

`auth.snigji.com` must stay DNS-only (grey-cloud) in Cloudflare — it's Okta's custom domain, not served by this Worker.

### Content model

- `src/data/*.ts` — typed plain-object/array exports (`profile`, `experience`, `skills`, `projects`) consumed directly by `.astro` pages. This is the editable "source of truth" for portfolio content; several entries are still placeholder values marked `TODO`.
- `src/content/blog/*.md` + `src/content.config.ts` — Astro content collections using the `glob` loader. Frontmatter schema: `title`, `description`, `pubDate` (coerced date), `updatedDate?`, `tags[]`, `draft` (default `false`, filtered out of listings/feeds). A post's route slug is its collection `id` (filename without extension), used directly in `src/pages/blog/[...slug].astro` and `src/pages/blog/index.astro` as `/blog/<id>/`.
- `src/pages/rss.xml.ts` and `@astrojs/sitemap` both derive their entries from the same `blog` collection query (non-draft, sorted by `pubDate` desc) — keep that filter/sort logic consistent if either changes.

### Layout

`src/layouts/Base.astro` is the single shared layout (title/description/canonical/OG/Twitter meta, sitemap + RSS `<link>`s, `Header`/`Footer`). All pages route SEO metadata through its props rather than setting `<head>` tags themselves. Global styling (CSS custom properties for the dark/light terminal theme, toggled via `prefers-color-scheme`) lives in `src/styles/global.css`, imported once from `Base.astro`.
