---
title: QuineCMS demo site
updated: 2026-11-15
---
# QuineCMS demo site

An independent public demo repository based on the content, assets, and original
Enode extension in `quinecms-dev-site`.

The installed QuineCMS engine is pinned to
`cdb3c540c7043daa25a68cfda48642c6e9ee6628`, which introduces admin demo mode.
The site commands enforce demo mode and use a documented public demo login.
Visitors can author content in their own tab without Git writes or media uploads.

See [setup and verification](implementation.md) for the repository boundaries and
checks. Markdown is authoritative; `pnpm wiki:build` generates the local wiki and
`pnpm wiki:check` validates it.
