# Kitabs

Kitabs is a planned cinematic, accessible digital book library. The visitor enters through a giant book, explores a library and shelves, and opens individual books. A semantic HTML catalogue and reader remain available without WebGL or motion.

**State:** documentation baseline passed; PHASE-01 foundation is in progress. No production experience is deployed. The repository will be public on GitHub. Code and documentation use [MIT](LICENSE); the original visual identity and design assets are reserved as described in [ASSET_RIGHTS.md](ASSET_RIGHTS.md). No third-party books or assets may be added without a rights record.

Start with [AI_ASSISTANT.md](AI_ASSISTANT.md), then [project specification](docs/product/SPECIFICATION.md), [research](docs/research/REPORT.md), [architecture](docs/architecture/ARCHITECTURE.md), [phase plan](docs/phases/PLAN.md), and [traceability](docs/TRACEABILITY.md). [Current handoff](docs/handoff/CURRENT.md) states the next gate.

The MVP architecture is a statically exported Next.js site on GitHub Pages with static book metadata, HTML reader content, and an optional WebGL scene. The current PHASE-01 build has one rights-reviewed book with a sample chapter; the immersive WebGL experience is planned for later phases. No backend is required for MVP.

Local checks: `npm ci`, then `npm run check`. For a Pages-path build use `KITABS_BASE_PATH=/kitabs KITABS_SITE_ORIGIN=https://soobujmiah.github.io npm run build`. The production site has not been deployed.
