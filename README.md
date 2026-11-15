# QuineCMS demo site

A public QuineCMS admin demo using the Enode recreation from `quinecms-dev-site`:
three pages, eleven block types, one layout, and bundled media. Visitors can edit
content and preview their changes in their own tab. Git saves, publishing, and
media uploads are disabled; edits do not change the deployed site or repository.

The engine is pinned in `package.json` and `pnpm-lock.yaml` to
[`cdb3c540c7043daa25a68cfda48642c6e9ee6628`](https://github.com/rengwu/quinecms/commit/cdb3c540c7043daa25a68cfda48642c6e9ee6628),
which includes admin demo mode. All site commands use this installed dependency.

## Run

Requires Node.js 22.12+ and pnpm 10.34.1.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `/admin/` on the printed local address and use the public demo login:

- **Email:** `demo@quinecms.local`
- **Password:** `quinecms-demo`

No `.env` is required. `pnpm setup:local` optionally creates one from
`.env.example`, preserving an existing file. Set `ADMIN_EMAIL` and
`ADMIN_PASSWORD` in that file or the build environment to customize the login.
Build environment values take precedence. Rebuild after changing credentials.

The site commands always set `ADMIN_DEMO_MODE=true`, even if the environment
sets it to false. Git/R2 credentials are unnecessary and excluded by the engine
from the encrypted admin payload. The build also decrypts its output and fails
unless demo mode is enabled and both provider configurations are null.

## Build and host

```sh
pnpm validate:content
pnpm check
pnpm build
pnpm check:build
pnpm preview
```

For static hosting, install with `pnpm install --frozen-lockfile`, build with
`pnpm build`, and publish `dist/` at the domain root. No server, database,
Git token, R2 account, or secret is required. Use the repository's `pnpm` scripts
so the demo settings and artifact verification run.

| Route | Contents |
| --- | --- |
| `/` | Enode homepage recreation |
| `/platform/overview` | Platform overview |
| `/platform/assets` | Asset connectivity |
| `/admin/` | QuineCMS demo editor |

Reloading the admin requires login again and restores edits from the tab's demo
recovery. **Discard edits** restores the deployed starting content. Backup
import/export, existing media, previews, and local authoring remain available.
Rebuild and redeploy to change the starting content for all visitors.

## Site source

- `content/` owns the pages, layout settings, and media records.
- `extensions/enode/` owns the original layout and block renderers.
- `public/enode/` contains bundled assets and their source URLs in `sources.json`.
- `quinecms.config.json` registers the site extension; no design library is needed.
- `.quinecms/workspace/` and `dist/` are ignored generated output.

The Enode content and assets are retained from the development site. Other
marketing and contact links lead to Enode's live website. Demo mode protects the
engine's Git and media operations; custom extensions remain trusted site code.
Shared engine changes belong in QuineCMS, followed by an intentional pin update.

## Documentation

[Project notes](docs/wiki/index.md) · [Setup and verification](docs/wiki/implementation.md) ·
[Engine demo contract](https://github.com/rengwu/quinecms/blob/cdb3c540c7043daa25a68cfda48642c6e9ee6628/docs/wiki/features/demo-mode.md)

```sh
pnpm wiki:build
pnpm wiki:check
```
