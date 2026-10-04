# Research report — 2026-10-04

Evidence labels: **FACT** is supported by the linked primary source; **RECOMMENDATION** is a Kitabs design choice; **OPEN QUESTION** needs owner input or target-device evidence. Vendor capabilities are not measured Kitabs performance.

## Frontend and rendering

| Finding | Evidence | Kitabs implication |
|---|---|---|
| **FACT:** React Three Fiber (R3F) is a React renderer for Three.js; `Canvas` creates a scene/camera/render loop. Its current release pairing must match the React major. | [R3F introduction](https://r3f.docs.pmnd.rs/), [first scene](https://r3f.docs.pmnd.rs/getting-started/your-first-scene) | **RECOMMENDATION:** use R3F for reusable scene objects; keep book data and accessible controls in HTML. Pin compatible versions when implementing. |
| **FACT:** GSAP ScrollTrigger supports scrubbed timelines, pinning, responsive conditions, and cleanup. `gsap.matchMedia()` is the current responsive API. | [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) | **RECOMMENDATION:** one labelled scene timeline driven by scroll on desktop; no scroll hijacking. |
| **FACT:** Next.js static export writes HTML for routes but excludes runtime server features such as API routes, ISR, default image optimization, and request-time logic. | [Next.js static exports](https://nextjs.org/docs/pages/guides/static-exports) | **RECOMMENDATION:** pre-render catalogue and each public book route for SEO, use ordinary optimized image files, and keep reader content build-time. |
| **FACT:** Vite builds a static `dist` site and requires the correct `base` for a GitHub project site. | [Vite static deployment](https://vite.dev/guide/static-deploy.html) | Vite is a lean alternative; adding reliable per-book static HTML would need a separate prerender pipeline. |

## 3D pipeline and interaction

| Finding | Evidence | Kitabs implication |
|---|---|---|
| **FACT:** Three.js loads glTF/GLB; Draco compresses mesh data but adds client decode work. | [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html), [DRACOLoader](https://threejs.org/docs/pages/DRACOLoader.html) | **RECOMMENDATION:** export modular GLB from source assets, compare raw/Draco/meshopt size and decode time on mobile before choosing per asset. |
| **FACT:** KTX2/Basis texture files transcode to supported GPU compression formats. | [KTX2Loader](https://threejs.org/docs/pages/KTX2Loader.html) | **RECOMMENDATION:** use KTX2 for large diffuse textures after visual and device checks; provide image fallback if needed. |
| **FACT:** Mobile GPUs have tighter texture and fill-rate constraints; lower render buffer size and compressed textures can help. | [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) | **RECOMMENDATION:** cap DPR, compress textures, avoid expensive shadows/postprocessing, measure draw calls and memory, load scene on demand. |
| **RECOMMENDATION:** page turning should use a small rigged mesh or bounded procedural page deformation; validate silhouette and reversibility before building complex cloth simulation. Shelves use transform/reveal, book hover/tap uses a selected state shared with HTML. Instancing suits repeated non-interactive spines; interactive books need stable individual identity. LOD/frustum culling are useful only when profiling proves a win. | Architectural inference from Three.js APIs and scene requirements | **OPEN QUESTION:** final asset source, polygon counts, and measured decode behavior. |

## Hosting, access, and content

| Finding | Evidence | Kitabs implication |
|---|---|---|
| **FACT:** GitHub Pages supports Actions deployment and custom domains; published site size is limited to 1 GB, with a soft 100 GB/month bandwidth limit. | [Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site), [Vite Actions example](https://vite.dev/guide/static-deploy.html) | **RECOMMENDATION:** static export to Pages. Set `basePath`/asset prefix only for a project URL; avoid client-only route dependence. Test direct refresh of book routes and custom-domain transition. Do not plan private-reader access on Pages. |
| **FACT:** Supabase exposes client-readable data by grants and RLS; secret/service-role credentials bypass RLS and must stay server-side. Storage access also uses policies; private content can use signed URLs. | [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Storage access](https://supabase.com/docs/guides/storage/security/access-control), [downloads](https://supabase.com/docs/guides/storage/serving/downloads) | **RECOMMENDATION:** no Supabase in MVP. Add it only for editorial scale, authenticated collections, or restricted content, with a separate security design and server authority where required. |
| **FACT:** EPUB 3.3 is a W3C publication format; WebGL alone cannot provide semantic book text. | [EPUB 3.3](https://www.w3.org/TR/epub-33/) | **RECOMMENDATION:** MVP reader uses first-party HTML generated from reviewed Markdown. EPUB import/rendering, PDF, and image books are later format adapters after accessibility and rights tests. |
| **FACT:** Project Gutenberg warns that reuse outside the US requires local copyright review; Creative Commons license terms vary. | [Gutenberg license](https://www.gutenberg.org/policy/license.html), [Creative Commons licenses](https://creativecommons.org/share-your-work/use-remix/cc-licenses/) | **RECOMMENDATION:** publish only owner-created or individually rights-verified works; retain source, territory, license, attribution, and permitted actions per asset and content edition. |

## Accessibility, search, and comparable patterns

**FACT:** WCAG's animation guidance calls for suppressing nonessential interaction motion; scroll parallax can cause vestibular harm. [W3C animation guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions). **RECOMMENDATION:** offer `prefers-reduced-motion` bypass and an explicit “Skip animation / Browse books” link before the canvas. Keyboard and screen reader flows use DOM controls, not canvas hit targets as the sole path.

**FACT:** Google can render JavaScript, but JavaScript crawling has limitations; per-book source HTML is safer for discoverability. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript). **RECOMMENDATION:** static route HTML, unique metadata/canonical, sitemap, and book data markup only when accurate. The [Google Book data guidance](https://developers.google.com/search/docs/appearance/structured-data/book) has specific eligibility constraints; do not promise rich results.

**RECOMMENDATION:** borrow interaction *patterns* from cinematic architecture sites—clear entry composition, one controlled camera journey, progressive detail, stable text overlay—without copying any site's layout, assets, or choreography. R3F [examples](https://r3f.docs.pmnd.rs/getting-started/examples) and Three.js [examples](https://threejs.org/examples/) are implementation references, not design licenses.

## Open research questions and validation

1. Owner-approved source/code license, repository visibility, domain, library identity, and initial books/languages are unconfirmed.
2. Rights for every cover, text, model, font, audio, and texture must be checked before publication.
3. Exact performance budgets below are provisional engineering targets; profile at least one mid-range Android browser and one desktop browser before freezing them.
4. WebGPU is a research track, not MVP dependency: R3F's [WebGPU documentation](https://r3f.docs.pmnd.rs/next/webgpu/overview) describes a newer path, while WebGL has the simpler compatibility target for this release. Revisit after measured support and feature parity.
