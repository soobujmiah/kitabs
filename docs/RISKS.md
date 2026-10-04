# Risk register — planning state

Probability/impact: L low, M medium, H high. Owner means responsible role, not a claim of approval. All entries are open until measured/verified.

| ID | Risk | P/I | Mitigation | Fallback | Owner | Status |
|---|---|---|---|---|---|---|
| K01 | Mobile GPU frame drops/thermal | H/H | DPR/scene quality tiers, device profiling | DOM catalogue/poster | Engineering | Open |
| K02 | Large GLB/decode delays | M/H | Modular assets, compression comparison, staged load | Flat scene/poster | 3D asset | Open |
| K03 | Texture memory/context loss | H/H | KTX2, size caps, disposal and loss handler | Remove canvas, keep selection | Engineering | Open |
| K04 | Pages size/bandwidth or caching | M/H | Asset budget, versioned paths, monitor | External CDN/new host after decision | Operations | Open |
| K05 | Direct route/base path failure | M/H | Export route and refresh smoke | Root catalogue link/404 | Engineering | Open |
| K06 | Browser/WebGL/WebGPU differences | M/H | WebGL optional, browser matrix; no WebGPU MVP | DOM-only mode | Engineering | Open |
| K07 | Animation complexity/scroll traps | H/H | Labelled single timeline, deterministic reverse tests | Skip motion/direct navigation | Motion | Open |
| K08 | Accessibility parity failure | H/H | DOM-first architecture, keyboard/a11y checks every phase | Disable scene feature until parity | UX/engineering | Open |
| K09 | SEO hidden behind JS/canvas | M/H | Pre-render HTML and sitemap; source HTML checks | Publish flat routes first | Engineering | Open |
| K10 | Reader format scope explosion | H/M | Markdown HTML MVP, format adapter boundary | Catalogue/external licensed link | Product | Open |
| K11 | Copyright/licensing error | H/H | Per-edition and per-asset rights evidence, release audit | Remove/withhold content | Owner/content | Open |
| K12 | Backend migration coupling | M/M | BookRepository contract and adapter tests | Keep static catalogue longer | Architecture | Open |
| K13 | Dependency/maintenance burden | M/M | Small dependency set, pinned versions, CI | Simplify scene/stack at review trigger | Engineering | Open |
| K14 | No initial book/content identity | H/M | Owner supplies or approves original sample content | Use clearly labelled catalogue-only placeholders, no public launch | Product/owner | Open |
