# Architecture and contracts

**Status:** specified, unimplemented. The [decisions](DECISIONS.md) describe why. The [research report](../research/REPORT.md) contains source evidence.

## System boundaries

```text
Git-tracked book records + reviewed Markdown + licensed assets
  -> build-time validation -> BookRepository adapter -> Book domain model
  -> Next.js static HTML routes: /, /books/[slug]/, /read/[slug]/
  -> optional client-only R3F scene + GSAP ScrollTrigger
  -> static export -> GitHub Actions -> GitHub Pages
```

The DOM catalogue, book details, and reader provide all content and actions. Canvas reflects selected shelf/book state and enhances navigation. It never owns the canonical catalogue, navigation state, or reader text. A user can bypass, disable, or lose WebGL and still complete every MVP task.

## Frontend modules and routes

- `src/domain/`: validated `Book`, `Collection`, `BookAsset`, `ReaderContent` and typed identifiers.
- `src/data/`: `BookRepository` interface, static file adapter, build-time schema and references check. Future API adapter must return the same domain model.
- `src/components/catalogue/`: semantic shelves/collections, filters, cards, details, controls.
- `src/components/experience/`: optional client scene, camera timeline, quality selector, state bridge. Dynamically load only after initial HTML paints and capability/motion checks.
- `src/components/reader/`: readable HTML chapters, TOC, next/previous, persistent position only with explicit local storage behavior.
- `app/`: pre-rendered home, collection, book, and reader routes; metadata/sitemap/robots/404. The exact framework file tree is fixed in the foundation phase.

Book selection is by canonical slug/URL. DOM navigation can update selection; a canvas hit may navigate to the same URL. Detail/reader routes render without the canvas. No browser-only API is used at build time.

## Data model (v1)

`Book`: `id` (stable opaque string), `slug` (unique URL key), `title`, optional `subtitle`, `authors` (one or more display names), `description`, `language` (BCP 47), optional `publishedYear`, optional `publisher`, optional `isbn`, `categoryId`, `tagIds`, `collectionIds`, `coverAssetId`, `readerContentId` or `null`, `featured` (boolean), `sortOrder` (integer), `rightsId`. Single `author` is excluded because `authors` covers single and multiple names. `format` belongs to reader content rather than the bibliographic record. `downloadUrl` is excluded until downloads and rights are explicitly approved.

`BookAsset`: `id`, `kind` (`cover | model | texture | preview | audio`), `path`, `alt` where meaningful, `width/height` for raster images, `bytes`, `rightsId`. `ReaderContent`: `id`, `bookId`, `format` (`html-markdown` in MVP), `extent` (`preview | complete`), ordered `chapters`, `rightsId`. `Chapter`: `id`, `title`, `order`, `sourcePath`. `RightsRecord`: `id`, `basis` (`owner-created | public-domain | open-license | licensed | restricted`), `source`, `jurisdiction`, `attribution`, `allowedActions`, `evidencePath`, `reviewedAt`, `verificationStatus`; publication requires `verified` and explicit display/read permission. Download permission is a separate future gate.

Cross-reference validation rejects duplicate slugs/IDs, missing assets or chapters, missing alt text, broken paths, unsafe external URLs, unpublished/restricted reader content, and absent rights evidence. Empty preview/sample records are allowed for catalogue-only books; details say “Preview unavailable.” Static records live under `content/books/*.json`, `content/collections/*.json`, `content/chapters/<slug>/*.md`, `content/rights/*.json`; public delivery files live under `public/assets/books/` and `public/assets/library/`. Use lowercase kebab-case paths, stable IDs, hashed build output for generated assets, and provenance manifest for third-party assets. Do not place private originals in `public/`.

## Rendering and asset pipeline

Source 3D assets stay outside `public/` until optimized and rights-reviewed. Export modular GLB: entry book, library shell, one shelf, shared spine geometry. Convert large color textures to KTX2 where tested; keep cover images as responsive AVIF/WebP plus fallback. Prefer baked ambient lighting, 1 real-time key light, and no real-time shadows on mobile. Load cover and HTML first; import scene code after idle/intent, entry GLB next, library GLB near transition, shelf/book assets when section is selected. Clean up geometry, textures, and scroll triggers on route changes. Use instancing for decorative repeats only; keep selected books individually addressable. No audio autoplay.

## Future backend seam

`BookRepository` has `listCollections`, `listBooks`, `getBookBySlug`, and `getReaderContent` operations. The static adapter resolves local, build-time records. A future Supabase adapter may provide *public* metadata through the same contract; restricted reader bytes require a separate authenticated/server flow with RLS, grants, and signed delivery. Static Pages cannot enforce private content permissions. Search in MVP is client-side over the small static catalogue; revisit indexed search when content volume and query behavior justify it.

## Security, SEO, deployment

There are no secrets or write APIs in MVP. Content and assets in the export are public and downloadable regardless of UI affordances. Build-time Markdown conversion must disallow raw unsafe HTML or sanitize it. External links need safe URL validation. Apply dependency and asset provenance review. Future Supabase publishable key is only acceptable with tested least-privilege grants and RLS; secret/service-role keys never enter client bundles.

Build-time book routes include title, description, canonical, Open Graph, accessible book information, and only accurate structured data. Generate sitemap from published slugs and robots for the chosen origin. Project Pages base path and custom-domain origin are configuration, not hard-coded links. GitHub Actions runs validation, lint, typecheck, tests, build, artifact upload, and deploy after gate approval; direct route refresh and site asset URLs are deployment smoke tests. GitHub remains source of truth. See [operations](../operations/DEPLOYMENT.md).
