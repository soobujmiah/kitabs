# Requirement traceability matrix

`Specified` means documentation exists. `Partly local` means a subset has implementation and local evidence, not that the whole requirement or CI/release gate passed. Update evidence at each phase exit. Decision IDs resolve in [decision journal](architecture/DECISIONS.md); tests in [strategy](testing/STRATEGY.md).

| Req | Design / architecture | Phase | Implementation target | Test / acceptance | State |
|---|---|---|---|---|---|
| R01 | Journey 1; ADR-001/002 | 02–03 | Home DOM + entry scene | Poster/title/skip; source HTML; load smoke | Partly local: static hero/skip only |
| R02 | Motion opening/entry; ADR-002 | 03 | Timeline + page rig | Fixed progress and reverse pose tests | Specified |
| R03 | Journey 4–5; ADR-003/006 | 04 | Collection routes + shelf bridge | Selection parity, direct links | Specified |
| R04 | Journey 6; UX motion; ADR-006 | 05 | Cards/scene books/overlay | Hover/focus/tap same metadata/action | Specified |
| R05 | Journey 7–8; ADR-004 | 01–02,05 | Detail/reader routes | Direct refresh, TOC/focus, no-content state | Partly local: one chapter preview route |
| R06 | Accessibility; ADR-006 | 01–06 | DOM/fallback/motion mode | Keyboard, axe, no-JS/WebGL, reduce | Partly local: semantic HTML/skip; audit pending |
| R07 | Responsive; ADR-006 | 02,04–06 | Three presentation modes | Touch, rotation, viewport tests | Specified |
| R08 | Performance; ADR-007 | 03–07 | Lazy assets/quality tiers | Budget/device traces | Specified |
| R09 | SEO; ADR-001/005 | 01,06 | Static routes/metadata/sitemap | HTML/source and Pages route smoke | Partly local: static source checked; Pages pending |
| R10 | Rights/security; ADR-003/005 | 01–08 | Rights records/publish guard | Data validation and release audit | Partly local: sample reviewed and guard unit-tested; release audit pending |
| R11 | Data adapter; ADR-003 | 01 | Domain + BookRepository | Adapter contract/unit tests | Foundation implemented; CI check passed, future API contract test remains deferred |
| R12 | CI/Pages; ADR-005 | 01,08 | Workflow/export/deploy | CI and public smoke | CI checks and state sync verified; Pages deployment pending |

Every requirement has a decision/design source, phase, implementation destination, and test. A future change must add an ID or update the row before merging. Actual test run IDs and commit facts belong in `.repo/` when enabled; human-authored test interpretation may live in phase evidence/handoff.
