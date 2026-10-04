# Kitabs architecture decision journal

**Status:** project-level design decisions accepted for documentation baseline; unvalidated in production. Revisit on device evidence or owner scope change. Each entry follows SKB's material-decision fields. The owner retains licensing, publication, and strategic authority.

## KIT-ADR-001 — Static export framework

**Context:** cinematic client scene, public searchable book pages, GitHub Pages. **Decision:** Next.js with `output: 'export'`, React, TypeScript. **Alternatives:** Vite + React (leaner, needs extra per-book HTML prerendering), generic SPA (weak direct route/SEO). **Rationale:** built-in per-route static HTML and metadata while keeping no server. **Consequences:** static export constraints; no runtime API, ISR, default image optimization, or request-time auth. **Status:** accepted for MVP; validate subpath and build output in phase 1. **Review trigger:** unacceptable bundle/build cost or export limitations. [Evidence](../research/REPORT.md).

## KIT-ADR-002 — Renderer and animation

**Context:** reusable 3D book/library objects and scroll choreography. **Decision:** R3F + Three.js WebGL for optional scene; GSAP ScrollTrigger for desktop timeline; CSS for small UI states. **Alternatives:** raw Three.js has less abstraction but more lifecycle glue; DOM/CSS 3D lowers GPU demand but weakens camera passage/shelf depth; WebGPU-first increases compatibility risk. **Rationale:** declarative scene with React state, mature loader ecosystem, controlled scroll timeline. **Consequences:** larger JS and strict cleanup/performance discipline; must dynamically import scene. **Status:** accepted, device validation pending. **Review trigger:** mobile targets fail budget or browser compatibility. [Evidence](../research/REPORT.md).

## KIT-ADR-003 — Static content and future data

**Context:** initial public catalogue needs no private data or editorial UI. **Decision:** validated Git-tracked JSON metadata and Markdown reader content through a `BookRepository` adapter. **Alternatives:** Supabase Postgres/Storage from day one, direct JSON imports in components. **Rationale:** lowest operational/security burden with a migration seam. **Consequences:** content changes require a build; no private reader permission on Pages. **Status:** accepted. **Review trigger:** editorial scale, personalization, or private content requirement.

## KIT-ADR-004 — Reader formats

**Context:** reader must be accessible and not assume PDF. **Decision:** MVP first-party HTML generated from Markdown; catalogue can link to a licensed external source. **Alternatives:** PDF (poor responsive/reflow experience), EPUB (valuable but requires complex browser reading system), image pages (high bandwidth and weak text accessibility). **Rationale:** semantic, responsive, searchable, testable reading. **Consequences:** EPUB/PDF ingestion is deferred; no automatic arbitrary upload. **Status:** accepted. **Review trigger:** initial licensed catalogue requires EPUB-only source.

## KIT-ADR-005 — Hosting and URL strategy

**Context:** static GitHub source of truth. **Decision:** GitHub Actions builds and deploys static export to GitHub Pages, with pre-rendered direct routes and configurable project base/custom domain. **Alternatives:** server host/CDN. **Rationale:** sufficient for public MVP and existing workflow. **Consequences:** Pages size/bandwidth limits and no server permissions; deployment requires owner gate. **Status:** accepted architecture, site unpublished. **Review trigger:** asset bandwidth or auth requirements exceed Pages.

## KIT-ADR-006 — Access and mobile

**Context:** motion/GPU cannot block content. **Decision:** DOM-first catalogue and reader; optional WebGL desktop enhancement; simplified mobile scene or no scene based on quality, touch UI, and reduced-motion/no-WebGL bypass. **Alternatives:** one canvas-only scene across devices. **Rationale:** accessibility, mobile reliability, crawlability. **Consequences:** two presentation paths must remain synchronized through one domain state. **Status:** accepted. **Review trigger:** testing finds diverging content/actions.

## KIT-ADR-007 — Asset format and performance

**Context:** book and library assets can dominate bandwidth and GPU memory. **Decision:** modular glTF/GLB, measured mesh compression, KTX2 where useful, responsive cover images, progressive loading, bounded lights/shadows, quality tiers. **Alternatives:** one monolithic GLB, uncompressed textures. **Rationale:** staged experience and mobile budget. **Consequences:** asset pipeline and device profiling work. **Status:** accepted provisional targets. **Review trigger:** measured decode/quality regression.

## Option comparison (5 = favorable, 1 = unfavorable; engineering estimate)

| Option | Visual | Complexity | Mobile/perf control | Pages/SEO fit | Maintainability/future data | Decision |
|---|---:|---:|---:|---:|---:|---|
| A React + R3F + GSAP (Vite) | 5 | 4 | 4 | 2 | 4 | Rejected for MVP due to extra prerender pipeline |
| B React + raw Three.js + GSAP | 5 | 2 | 4 | 2 | 2 | Rejected due to scene/lifecycle maintenance |
| C Next.js static + R3F + GSAP | 5 | 3 | 4 | 5 | 4 | Selected |
| D DOM/CSS + GSAP simulated 3D | 3 | 4 | 5 | 4 | 4 | Fallback visual strategy, useful on low-end devices |
| E WebGPU-first | 5 | 1 | 2 | 3 | 2 | Research only; portability and tooling risk |

Scores are design estimates, not benchmarks. All options can use the same static metadata adapter; raw Three.js and WebGPU add more custom asset/render lifecycle work. DOM/CSS has the strongest intrinsic accessibility, so its catalogue path is retained independent of renderer choice.

## Evaluation across all requested criteria

| Option | Performance and mobile | Asset pipeline | Accessibility | Backend integration | Developer experience |
|---|---|---|---|---|---|
| A Vite + React/R3F/GSAP | Fine with lazy scene and quality tiers; mobile still GPU-bound | Mature glTF loaders, React lifecycle | Needs separate DOM path | Adapter works without change | Fast dev/build; per-book HTML prerendering adds integration work |
| B React + raw Three.js | Maximum render control; manual lifecycle risks leaks on mobile | Same Three.js loaders, more glue | Needs separate DOM path | Adapter works without change | Scene events/state/cleanup are hand-built |
| C Next static + R3F/GSAP | Lazy import and pre-rendered content; monitor framework bundle and GPU | Mature glTF loaders; build-time content/asset checks | Pre-rendered DOM path plus canvas enhancement | Static adapter can later change; server features would require hosting migration | Route/metadata conventions fit SEO; export limitations must be tested |
| D DOM/CSS + GSAP | Lowest GPU demand; complex camera illusion may become costly CSS | Images/CSS instead of GLB; simplest asset pipeline | Strongest native semantics | Adapter works without change | Simple UI, difficult true spatial choreography |
| E WebGPU-oriented | Potential future gains, uncertain support and device behavior | Newer material/renderer path and validation load | Still needs separate DOM path | Adapter works without change | Highest API/tooling change risk |

GitHub Pages compatibility is strongest for C's pre-rendered static routes and for D's static DOM; A/B can deploy as static bundles but need additional route generation. E can ship static assets but renderer support is an independent risk. Future backend compatibility is largely determined by the data adapter, not renderer choice.
