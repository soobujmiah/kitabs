# PHASE-01 — static foundation evidence

**Status:** complete at foundation scope; GitHub checks and deterministic CI state sync verified. **Objective:** a rights-gated, crawlable static catalogue/reader foundation and reproducible CI. Immersive scenes, full reader collection, public Pages deployment, and release QA are later phases.

## Implemented

- Next.js 16 static export, React 19, TypeScript, npm lockfile, lint/type/test/build scripts.
- `BookRepository` interface, static adapter, Zod records, duplicate/reference/path/size/rights validation. Published book/cover/reader require verified rights and appropriate actions.
- Semantic home, collection, book, one-chapter reader, metadata, JSON-LD, sitemap, robots, 404 routes. The scene is not implemented in this phase.
- One public-domain sample: *Pride and Prejudice* (1813 original English text) chapter 1 extracted from pinned Standard Ebooks source; original Kitabs cover. `docs/rights/pride-and-prejudice.md` records bounded rights evidence. The 445 web-collected local files remain outside Git and site output.
- MIT software license and reserved original design asset notice, `repo-knowledge` tool/schemas, and CI workflow. Public GitHub remote and CI are verified; Pages deployment remains outstanding.

## Verification log

- Initial `npm run check` failed because Next static export requires at least one `generateStaticParams` path; rights-reviewed sample resolved the empty catalogue case.
- Second build failed because `sitemap.ts` needed `dynamic = "force-static"`; sitemap and robots were corrected.
- A later `npm run build` passed: eight static pages, including direct collection/book/reader routes. Exported HTML smoke found title, sample action, chapter text, JSON-LD, sitemap reader URL and all expected route files.
- `python3 -m unittest discover -s tools/repo_knowledge/tests -p 'test_*.py' -q`: 39 tests passed. `repo_knowledge verify`: zero findings after init.
- Final `npm run check` passed: one validated published book/collection/cover/reader, lint, typecheck, four unit tests, and eight exported pages. The build was rerun with `KITABS_BASE_PATH=/kitabs` and `KITABS_SITE_ORIGIN=https://soobujmiah.github.io`; source inspection confirmed project-prefixed JS/cover/book links, canonical URL, and sitemap reader URL.
- `npm install` after replacing vulnerable lint/test transitive dependencies reported zero vulnerabilities; separate `npm audit --audit-level=moderate` also found zero vulnerabilities.
- `graphify update .` was attempted twice after code changes and failed with `cannot import name 'Node' from 'tree_sitter'`, even after a focused reinstall of the graphify environment's tree-sitter package. Graph output is unverified; this does not affect app build.
- GitHub Actions workflow `Kitabs CI and Repository State` run [37210636276](https://github.com/soobujmiah/kitabs/actions/runs/37210636276) passed checks on manual dispatch; its original push-only sync condition skipped that event. The corrected workflow's [push run 37211105994](https://github.com/soobujmiah/kitabs/actions/runs/37211105994) passed both `checks` and `sync`. The CI-generated `.repo/STATUS.md` on remote `main` reports build/test passed for source commit `120f862`, run `37211105994`, `sync.source: ci`, PHASE-00 complete and PHASE-01 active at observation time.
- Staged-file audit before public push found no PDF/EPUB/local-collection payload, secret patterns, or generated cache files. README/source/rights evidence and export were reviewed; GitHub repository is public and MIT applies only to software/documentation.

## Remaining phase gates

Foundation exit criteria passed. Tag `phase-01-done` after this evidence update to let `.repo/` derive the completed phase. Accessibility/browser/device measurements and aesthetic approval remain later phases. No production deployment is included in PHASE-01.
