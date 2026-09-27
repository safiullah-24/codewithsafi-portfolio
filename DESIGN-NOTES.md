# CodeWithSafi V4 — Source / Signal

## Preservation

An independent experiment cloned from the approved V3 source commit b4453d85d71bd9ffed9261ce6db27656cfbead58. V3 remains in its original project, source repository, and deployment. All original assets, résumé, evidence notes, project data, and GitHub integration are retained. Portrait and logo files are unchanged.

## Reference audit — 27 September 2026

Reference: https://www.quantumlogicslimited.com/, inspected as a rendered experience in a browser before authoring V4. Homepage covered: navigation/dropdown, hero/typed terminal, metric reveal, technology marquee, product ecosystem, selectable engineering feature panels, four-step process, testimonials, values, leadership, recruiting CTA, and footer. Also inspected at 390px in an ordinary browser iframe: compact hamburger navigation, centered smaller hero, vertically stacked actions, hidden terminal, stacked sections.

- Near-black with subtly alternating graphite bands. Blue/purple accents, sparse small particles, thin outlines, restrained depth.
- Fixed compact navigation (~60px) and a clickable product dropdown. Mobile replaces the desktop navigation with a menu.
- Display typography approximately 60px/64px (hero), 44px/48px (section), with generous ~100px vertical breathing room and roughly 1120px content width.
- Entrances use short upward reveals (~650ms, cubic-bezier(.16,1,.3,1)); card feedback ~220ms. A steady ~28-second marquee contrasts with brief entrances.
- Hierarchy comes from scale and spacing. Most technical visuals explain product ideas rather than requiring heavy 3D rendering.
- Product cards, feature tabs, testimonial pagination, and navigation supply clear interaction affordances. Footer closes with a different, centered composition.
- Observed native-style pointer feedback and a luminous pointer appearance; no assumption about the underlying cursor implementation. No source code or assets retrieved/copied. No evidence of advanced pinned WebGL transitions; the useful principle is disciplined pacing, not a particular library.

## Translation into Safi's portfolio

| Reference principle | Original CodeWithSafi interpretation |
| --- | --- |
| Left/right marketing hero | Oversized personal name; preserved portrait set inside a technical coordinate study; personal role, disciplines, and Poly signature |
| Particle atmosphere | Original source-system geometry, quiet moving trajectories and pointer parallax |
| Product ecosystem | Capability atlas connected to specific contribution evidence, without proficiency scores |
| Feature switching | An interactive Poly research instrument tracing source, adapters, contracts, calls, and execution |
| Dark section cadence | Editorial chapters with alternating full-width stage, ruled index, and open typographic space |
| Process story | Safi's expanding practice, with CS foundations and honest learning boundaries |
| Technical demonstrations | Real Taylor-series mathematics, illustrative repository workflow, simulated peer signaling, and ML data flow |
| Recruitment close | Direct personal contact, GitHub, LinkedIn, résumé, and LeetCode |

No copied wording, branding, illustrations, assets, terminal composition, gradient headline, numerical claims, testimonials, or corporate team sections. QuantumLogicsLabs appears only where already supported as Safi's collaborator/internship context.

## Art direction and motion

Thesis: **one engineer, many connected systems**. Near-black, neutral graphite, warm-neutral off-white, cool gray. Cyan marks active paths; electric blue is a secondary signal. Space Grotesk and IBM Plex Mono stay self-hosted. Large, tightly composed names/headlines, fine rules, sparse metadata, and a full-width Poly chapter distinguish V4 from the approved layout.

Native CSS, SVG, requestAnimationFrame, and IntersectionObserver are sufficient. No extra GSAP/Lenis dependency: native scrolling retains touch/keyboard expectations, while transform/opacity reveals, staggered type, active chapter tracking, a Poly research stage, and mathematical interaction create the choreography. No scroll hijacking. Reduced motion uses static geometry, immediate navigation, and fully visible content; a persistent manual motion control remains available.

Desktop uses asymmetric editorial grids. Tablet retains the portrait alongside condensed typography, with fewer columns. Mobile is recomposed into a compact name/portrait opening, horizontal capability navigation with readable detail, stacked diagrams, and direct chapter controls. No hover-only content.

## Factual boundaries

`data/portfolio.ts` and `RESEARCH.md` remain the content source of truth. Project roles, public contribution links, experience, learning labels, and unfinished work retain their original boundaries. PolyBridge/Poly is Safi's original concept in architecture and prototyping with a team; diagrams and snippets are explicitly proposed architecture, not a working compiler. MeetForge is a local demonstration without camera/microphone access. No invented qualifications, metrics, or production claims.

## Final art-direction critique and fixes

The personal identity now precedes the technical apparatus, and the portrait remains an actual person rather than an abstract AI illustration. The strongest spatial change is the full-width Poly research chapter, separated from the varied project demonstrations. Cyan denotes active states and language links; most typography and surfaces remain neutral.

Browser review corrected inherited tab-height rules, removed cramped portrait metadata on phones, reduced excessive anchor offsets, constrained menu height for shorter screens, restored spaces where mobile line breaks collapse, and passed the Taylor slider label to its keyboard-focusable thumb. This improves legibility and behavior without adding ornamental motion. The familiar corporate elements from the reference—marketing metrics, testimonials, team cards, and product branding—were deliberately not transferred.

Review covered 1363px desktop, 820px tablet, and 390px/360px phone frames. All chapters and principal interactions were inspected. Native scroll, precise transforms, static reduced-motion states, and an interactive rather than fake-executing architecture diagram remain the chosen motion discipline. Source notes distinguish simulated/proposed visuals from shipped project capability.
