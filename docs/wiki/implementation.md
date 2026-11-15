---
title: Setup and verification
updated: 2026-11-15
---
# Setup and verification

## Source

The demo retains the development site's three pages, eleven block definitions,
layout, content records, bundled assets, and `quinecms.config.json`. It does not
copy the source site's environment, dependencies, generated workspace, build
output, or local setup history. It has its own Git repository and lockfile.

## Demo boundary

All site commands load the optional local `.env`, then enforce
`ADMIN_DEMO_MODE=true`. The public default login is `demo@quinecms.local` with
password `quinecms-demo`; the environment may override the login. The engine is
the installed dependency pinned to `cdb3c540c7043daa25a68cfda48642c6e9ee6628`.

The pinned engine excludes Git and R2 configuration before encrypting the admin.
It disables saving, publishing, and uploads while retaining local authoring and
separate demo tab recovery. Site extensions remain trusted code. Navigation,
content links, and extension defaults use paths on the current origin. The shared
link helper also converts absolute HTTP(S) and protocol-relative URLs entered in
the editor to local paths, retaining query strings and fragments. Non-web schemes
are disabled. Missing demo routes return the host's normal 404. Source URLs in the
bundled asset manifest are provenance metadata, not navigation links.

`pnpm build` runs an artifact check after the engine build. `pnpm check:demo`
decrypts the actual admin with the configured login and requires `demo: true`,
`git: null`, and `r2: null`. `pnpm check:build` includes this same check alongside
the engine's asset and runtime checks.

## Verification

Run `pnpm install --frozen-lockfile`, `pnpm validate:content`, `pnpm check`,
`pnpm build`, and `pnpm check:build`. Build and verify the wiki with
`pnpm wiki:build` and `pnpm wiki:check`. Static hosting uses the resulting `dist/`
directory at the domain root.

Verified on 2026-11-15:

- Installation succeeds with the frozen lockfile; only the engine revision and
  its package integrity changed from the source site's dependency graph.
- The initial copy retained all 26 content files, 31 extension files, 25 public
  assets, and the site configuration. Navigation URLs and the shared link helper
  now keep visitors on the demo origin.
- Content validation passes. Source checking reports zero errors and warnings,
  with one existing unused-import hint in the pinned engine.
- The production build generates all four routes and passes the engine's asset
  and runtime checks.
- A build with `ADMIN_DEMO_MODE=false` and dummy Git/R2 credentials still produces
  an admin payload with `demo: true`, `git: null`, and `r2: null`.
- Wiki generation and internal-link validation pass.

These are local source and production-artifact checks. No hosting deployment or
live provider operation is part of this repository setup; the copied site designs
were not changed or subjected to another browser review.
