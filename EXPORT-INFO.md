# Approved V4 source export

This archive preserves the source corresponding to the current approved V4 deployment. No website source was changed to create it. The original README, research, design notes, components, routes, motion logic, assets, fonts, configuration, and lockfile are included unchanged.

- Source commit: `740297002ab28d42250fafd2a8f779c17ed15662`
- Site: https://codewithsafi-v4.safiullah24.chatgpt.site
- Site version: 1 of the separate V4 project
- Exported: 2026-09-27T18:13:13+00:00
- Original source files: 128
- Additional export-only files: `EXPORT-INFO.md` and `SOURCE-MANIFEST.sha256`

## Open and run

Unzip the archive and open the `CodeWithSafi-Approved-V4-Source` directory containing `package.json`. On macOS, use VS Code's Open Folder, then open its terminal.

Use Node.js 22.13 or newer. If pnpm is unavailable, install it once:

```sh
npm install --global pnpm@11.25.0
```

Install dependencies and run the development server:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by the server (normally http://localhost:5173).

Build and optionally run the production build locally:

```sh
pnpm build
pnpm start
```

The complete setup, technology stack, source map, and independent-hosting notes are in `README.md`. No environment variables or API keys are required, so no environment example file is necessary. The GitHub API integration uses public requests with a local fallback.

## Preservation and portability

Every original source file was verified byte-for-byte against the recorded deployed Git commit. `SOURCE-MANIFEST.sha256` lists SHA-256 checksums for those original files. The two export-only documents do not change application behavior.

The archive omits installed dependencies, generated builds, runtime caches, and Git history. Dependencies are restored using the included lockfile; builds are regenerated with `pnpm build`.

The interface and assets do not require ChatGPT hosting. The current deployment configuration targets Sites/Cloudflare Workers. Self-hosting requires provider-specific Worker/assets configuration and updating the site URL in `app/layout.tsx` and the resume footer. Retained ChatGPT authentication helpers are not used by the portfolio; Sites access controls do not transfer to another host. A static-only host needs a replacement for `/api/github` or use of the included snapshot. This is a Vinext/Vite application with Next-compatible routes and is not a zero-configuration stock Next.js deployment.

The approved V3 project was not modified.
