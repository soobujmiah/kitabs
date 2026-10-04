# PHASE-01 — static foundation evidence

**Status:** locally verified; GitHub checks passed, CI repository state sync pending. **Objective:** a rights-gated, crawlable static catalogue/reader foundation and reproducible CI. The phase is not complete until `.repo/` CI sync is verified.

## Implemented

- Next.js 16 static export, React 19, TypeScript, npm lockfile, lint/type/test/build scripts.
- `BookRepository` interface, static adapter, Zod records, duplicate/reference/path/size/rights validation. Published book/cover/reader require verified rights and appropriate actions.
- Semantic home, collection, book, one-chapter reader, metadata, JSON-LD, sitemap, robots, 404 routes. The scene is not implemented in this phase.
- One public-domain sample: *Pride and Prejudice* (1813 original English text) chapter 1 extracted from pinned Standard Ebooks source; original Kitabs cover. `docs/rights/pride-and-prejudice.md` records bounded rights evidence. The 445 web-collected local files remain outside Git and site output.
- MIT software license and reserved original design asset notice, `repo-knowledge` tool/schemas, and CI workflow. Public GitHub remote/CI and Pages are not yet verified.

## Verification log

- Initial `npm run check` failed because Next static export requires at least one `generateStaticParams` path; rights-reviewed sample resolved the empty catalogue case.
- Second build failed because `sitemap.ts` needed `dynamic = "force-static"`; sitemap and robots were corrected.
- A later `npm run build` passed: eight static pages, including direct collection/book/reader routes. Exported HTML smoke found title, sample action, chapter text, JSON-LD, sitemap reader URL and all expected route files.
- `python3 -m unittest discover -s tools/repo_knowledge/tests -p 'test_*.py' -q`: 39 tests passed. `repo_knowledge verify`: zero findings after init.
- Final `npm run check` passed: one validated published book/collection/cover/reader, lint, typecheck, four unit tests, and eight exported pages. The build was rerun with `KITABS_BASE_PATH=/kitabs` and `KITABS_SITE_ORIGIN=https://soobujmiah.github.io`; source inspection confirmed project-prefixed JS/cover/book links, canonical URL, and sitemap reader URL.
- `npm install` after replacing vulnerable lint/test transitive dependencies reported zero vulnerabilities; separate `npm audit --audit-level=moderate` also found zero vulnerabilities.
- `graphify update .` was attempted twice after code changes and failed with `cannot import name 'Node' from 'tree_sitter'`, even after a focused reinstall of the graphify environment's tree-sitter package. Graph output is unverified; this does not affect app build.
- GitHub Actions workflow `Kitabs CI and Repository State` run [37210636276](https://github.com/soobujmiah/kitabs/actions/runs/37210636276) completed successfully on the public repository at the phase source/state commit. The first push yielded no run, so it was triggered with `workflow_dispatch`. Its `sync` job was originally push-only and skipped on manual dispatch; the workflow condition has been corrected and requires another run to verify CI state sync.

## Remaining phase gates

Verify deterministic `.repo/` CI sync, source/rights exclusion audit, docs/traceability consistency, and reviewed commit. Accessibility/browser/device measurements and aesthetic approval remain later phases. No production deployment is included in PHASE-01.
