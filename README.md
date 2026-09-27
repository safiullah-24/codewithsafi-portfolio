# CodeWithSafi — V1 experiment

An independent experimental portfolio for **Safi Ullah / CodeWithSafi**, built from the approved V0 source without changing V0. The original portrait, logo, content evidence, projects, contact data, and GitHub integration are preserved.

- V4: https://codewithsafi-v4.safiullah24.chatgpt.site
- Approved V3: https://safi-engineering.safiullah24.chatgpt.site
- V3 baseline source: `b4453d85d71bd9ffed9261ce6db27656cfbead58`

## Local setup

Use **Node.js 22.13 or newer**. Install the package manager if it is not already available:

```bash
npm install --global pnpm@11.25.0
```

Open a terminal in this project directory, the directory containing `package.json`, then run:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by the development server. No environment variables, private API keys, database, or paid service are required. The GitHub route uses public requests with a dated local fallback.

Production build and local production server:

```bash
pnpm build
pnpm start
```

Type check:

```bash
node node_modules/typescript/bin/tsc --noEmit
```

## Technology

React 19.2.6, TypeScript 5.9.3, Vinext 1.0.0-beta.5, Vite 8.0.13, Next-compatible App Router 16.3.4, Tailwind CSS 4.2.1, Radix UI / existing shadcn primitives, Lucide icons, cmdk, and Cloudflare Workers-compatible output. The exact dependency graph is pinned by `pnpm-lock.yaml`.

Motion uses CSS transforms/opacity, native scroll, IntersectionObserver, requestAnimationFrame for restrained pointer/scroll response, and original SVG geometry. No additional animation package, WebGL, scroll hijacking, third-party analytics, or external image service is required. Fonts are self-hosted Space Grotesk and IBM Plex Mono, with licenses in `public/fonts`.

## V4 experience

- A large personal name, supplied portrait, CodeWithSafi identity, and PolyBridge/Poly creator signal in the opening.
- A seven-discipline capability atlas connecting honest practice/learning labels to project case studies.
- A dedicated PolyBridge / Poly chapter with five interactive architecture stages. Source format, adapters, contracts/IR, cross-language calls, and execution are explicitly R&D.
- A real Taylor-series approximation, illustrative repository workflow, simulated peer signaling, and an ML research flow.
- All five original case studies; preserved experience, collaborative work, journey, GitHub activity, résumé, and contact destinations.
- Keyboard/touch navigation, accessible dialogs, command search (`Ctrl/Cmd + K`), copy email, a persistent motion preference, and `prefers-reduced-motion` support.
- Distinct desktop, tablet, and phone compositions.

## Source map

- `components/v4/PortfolioV4.tsx`: V4 composition, navigation, motion coordination, journey, and contact.
- `components/v4/Instruments.tsx`: original orbit geometry, capability atlas, Poly instrument, and data pipeline.
- `app/v4.css`: V4 art direction, responsive rules, and motion system.
- `data/portfolio.ts`: authoritative profile, projects, skills, journey, and GitHub fallback.
- `components/portfolio/Portfolio.tsx`: preserved shared case-study and GitHub components; the earlier composition remains in source for reference.
- `components/portfolio/Visuals.tsx`: preserved mathematical and project-specific demonstrations.
- `app/globals.css`: shared fonts, component styles, original styles, and résumé/print styling.
- `app/api/github/route.ts`: public GitHub refresh and fallback.
- `app/resume`: printable résumé; use Print / Save as PDF.
- `RESEARCH.md`: contribution evidence and factual boundaries.
- `DESIGN-NOTES.md`: reference audit, original reinterpretation, art direction, and review decisions.

## Independent hosting

The interface, images, fonts, and content do not require ChatGPT. The existing build/runtime plumbing targets **Sites and Cloudflare Workers**. For independent deployment, configure the Worker entrypoint/assets and your provider bindings, replace the Sites hosting configuration as appropriate, and update the canonical URL in `app/layout.tsx` and résumé footer. A static-only host needs a replacement for `/api/github` (or the supplied snapshot). This project is a Vinext/Vite application with Next-compatible routes, not an unchanged stock Next.js/Vercel deployment. The README intentionally does not claim zero-configuration Vercel support.

## Preservation and content boundaries

The portrait is the exact supplied lossless WebP. Monochrome lighting is CSS only; no facial features were regenerated or edited. The supplied logo and all its existing derived assets are byte-identical to V3. The package manifest, lockfile, GitHub route, and factual data remain unchanged.

PolyBridge/Poly is Safi's original initiative in architecture and prototyping with a team. Diagrams do not claim a released compiler. MeetForge's visualization is a local simulation and never requests camera/microphone access. Collaborative contributions and exploratory technologies retain their original scope; no metrics or qualifications were invented.

## Verification

V4 was browser-reviewed at a 1363px desktop viewport, 820px tablet frame, and 390px / 360px phone frames. All main chapters were visually inspected. Checked skill/evidence selection, project dialog focus and close, Poly stage changes, Taylor slider keyboard input, repository stages, peer-signaling simulation, mobile navigation, journey expansion, command search, clipboard feedback, motion-off behavior, and preference persistence after reload. Page-level width checks found no horizontal overflow at the tested sizes. The slider's accessible name is forwarded to its focusable thumb.

The dated GitHub fallback was observed when live data was unavailable. No application-origin errors were observed in the inspected browser logs; browser-extension metadata errors were excluded. These checks do not certify 60fps on every device or real-user Core Web Vitals. The OS reduced-motion media rule is implemented in CSS and preference initialization; the explicit motion-off path was tested in the browser.
