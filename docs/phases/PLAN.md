# Phase plan and implementation gate

**Lifecycle vocabulary:** specified → implemented → locally verified → CI verified → released. A phase passes only with its stated evidence, documentation update, traceability update, and reviewed commit. No phase is marked complete from intent alone. Phase IDs encode dependencies; a11y, rights, performance, and SEO checks apply in every implementation phase rather than being postponed to final polish.

## PHASE-00 — Discovery and documentation baseline

**Objective:** establish verified repository/SKB context and internally consistent specification. **Scope:** audit, research, ADRs, design, data/asset, security/rights, tests/CI, performance, risk, traceability. **Dependencies:** none. **Inputs:** user brief, local/GitHub discovery, verified SKB, official sources. **Outputs:** baseline docs and readiness report. **Documentation:** all files linked from README. **Implementation tasks:** none; repository scaffolding only after gate. **Tests:** link/terminology/requirement consistency audit, source citation check. **Acceptance:** every major requirement maps to decision, phase, test and criterion; assumptions labelled. **Risks:** unknown initial books/license/domain and unmeasured budgets. **Exit:** written IMPLEMENTATION READY decision or explicit NOT READY with blockers.

## PHASE-01 — Static foundation and content contracts

**Objective:** working accessible static catalogue and build. **Scope:** Next export, domain/types, repository adapter, schema validation, first rights-cleared sample content, semantic routes, CI, `.repo/` tooling. **Dependencies:** 00 gate; initial content/rights choice. **Inputs:** architecture/ADR, data schema, rights evidence. **Outputs:** buildable static route set and CI. **Documentation:** architecture, data/rights, operations, handoff. **Implementation tasks:** scaffold app, adapter, validation, route generation, metadata, workflow. **Tests:** schema/unit, direct route export, lint/type/build, axe baseline. **Acceptance:** home/book/reader HTML generated from same model and readable with JS disabled; no secret/private bytes. **Risks:** static export path and content rights. **Exit:** CI verified, status sync verified, committed.

## PHASE-02 — Visual and reader foundation

**Objective:** premium DOM interface with complete reader before 3D. **Scope:** tokens, responsive catalogue/detail, HTML chapter reader, navigation, keyboard/focus. **Dependencies:** 01. **Inputs:** design/UX specs and licensed typography/assets. **Outputs:** polished flat experience. **Documentation:** design, reader/data, traceability. **Implementation tasks:** implement components/routes, chapter conversion, reading controls. **Tests:** component, keyboard, screen reader sample, zoom/contrast, responsive. **Acceptance:** collection → detail → reader works on desktop/mobile, with no canvas or motion. **Risks:** typography coverage and visual quality. **Exit:** design and a11y review passed, committed.

## PHASE-03 — Entry book and page passage

**Objective:** convincing giant-book introduction and reversible opening/entry. **Scope:** optimized entry GLB, poster/loading, scene loader, ScrollTrigger timeline, skip/reduced-motion. **Dependencies:** 02. **Inputs:** approved scene concept and asset rights. **Outputs:** first three scenes. **Documentation:** asset manifest, motion, performance evidence. **Implementation tasks:** create/export model, lazy scene, camera labels, cleanup. **Tests:** fixed progress/reverse, skip, context loss, mobile performance trace. **Acceptance:** no forced wait; direct catalogue remains; pose and reverse assertions pass within budget. **Risks:** page rig complexity, GPU decode. **Exit:** measured scene and fallback accepted, committed.

## PHASE-04 — Library and shelf exploration

**Objective:** enter a restrained room and navigate collections. **Scope:** modular room/shelves, camera settle, shelf focus and reveal, quality tiers. **Dependencies:** 03 and content taxonomy. **Inputs:** collections and optimized licensed assets. **Outputs:** scenes 4–5. **Documentation:** asset/interaction and measured budget. **Implementation tasks:** build room, shelf selection bridge, quality downgrade. **Tests:** desktop/touch navigation, state sync, render metrics, reverse. **Acceptance:** every shelf selection has matching DOM destination and stays within provisional GPU budget or documented reduction. **Risks:** asset size and lighting. **Exit:** browser/device evidence and commit.

## PHASE-05 — Book interaction and details

**Objective:** reveal books and connect scene selection to book pages. **Scope:** ordered reveals, hover/focus/tap, metadata overlay, selected book, direct detail route. **Dependencies:** 04. **Inputs:** validated catalogue and covers. **Outputs:** scenes 6–7. **Documentation:** motion, UX, traceability. **Implementation tasks:** book hit mapping, selection state, overlay, transitions. **Tests:** input parity, focus return, slug routing, repeated selection cleanup. **Acceptance:** same book metadata/action across canvas, keyboard, and touch; direct route refresh works. **Risks:** state divergence and hit precision. **Exit:** interaction tests and commit.

## PHASE-06 — Responsive, accessibility, and SEO hardening

**Objective:** close cross-device and content access gaps. **Scope:** mobile/tablet scene strategy, reduced-motion/no-WebGL/no-JS, metadata/sitemap, contrast/focus/zoom. **Dependencies:** 05. **Inputs:** cross-browser QA and route export. **Outputs:** parity evidence and search-ready HTML. **Documentation:** UX, SEO/operations, risk register. **Implementation tasks:** tune breakpoints/quality, fallback and metadata, fix defects. **Tests:** axe/manual assistive tech, touch, route source HTML, rotation, context loss. **Acceptance:** all R06/R07/R09 criteria pass; no critical a11y gap. **Risks:** divergent mobile path. **Exit:** QA evidence and commit.

## PHASE-07 — Performance and reliability

**Objective:** meet or explicitly resolve measured budgets. **Scope:** asset compression, memory/render profiling, loading/error recovery, dependency/security review. **Dependencies:** 06. **Inputs:** actual traces on representative devices. **Outputs:** benchmark record and optimized assets. **Documentation:** performance/risk/ADR revisions. **Implementation tasks:** profile, optimize, simplify where required. **Tests:** cold/warm load, FPS/draw/memory, failure injection, regression suite. **Acceptance:** budgets met or approved exception with impact/fallback; no unusable device class. **Risks:** phone GPU and Pages transfer. **Exit:** measured evidence and commit.

## PHASE-08 — Release and continuity

**Objective:** verified public Pages release. **Scope:** final rights audit, CI, Pages setup, direct-route smoke, handoff, SKB knowledge return. **Dependencies:** 07 and owner deployment/license/visibility decisions. **Inputs:** approved release commit, domain/config, rights records. **Outputs:** site URL and release evidence. **Documentation:** operations, handoff, SKB summary; `.repo/` generated by tooling. **Implementation tasks:** release workflow/config and deployment only after authorization. **Tests:** full CI, Pages smoke, metadata/HTTPS, reduced-motion and no-WebGL. **Acceptance:** all R01–R12 release criteria and rights clearance verified. **Risks:** domain, Pages limits, licensing. **Exit:** released site and verified continuity, committed.

## Gate and change control

The documentation gate requires repo/SKB audit, sourced research, stack comparison, journeys, design/motion, data/assets, budgets, accessibility/responsive, rights/security, SEO, testing/CI/Pages, phase plan, risk register, ADRs, and traceability. Check internal consistency before production implementation. During each phase, update impacted docs and traceability with actual behavior; never let a plan claim implemented evidence. Significant scope/data/security changes require ADR revision and, when owner authority is implicated, owner decision.
