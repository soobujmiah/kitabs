# Verification and acceptance strategy

Tests are specified before implementation; no test result is claimed yet. Prefer behavior-level checks over snapshots of animation internals.

| Layer | Required checks | Gate |
|---|---|---|
| Static data | schema, ID/slug uniqueness, cross-reference integrity, cover alt, rights evidence, publication permissions, chapter order | Every PR |
| Unit | domain mapping, static adapter, path/base handling, quality selection, motion-mode selection | Every PR |
| Component | catalogue keyboard selection, detail availability, reader TOC/heading/focus, error/retry | Every PR |
| Accessibility | automated axe on home/detail/reader, keyboard manual run, screen reader sample, contrast/zoom, reduced motion | PR + release |
| Build | lint, typecheck, unit/component, static export, generated route/sitemap/metadata assertions, bundle/asset budget check | Every PR |
| Responsive | desktop/tablet/mobile viewport checks, touch-only flow, rotation/resizing and focus persistence | Phase exits + release |
| Animation | deterministic timeline labels and state at fixed progress values; reverse travel; skip/bypass; context-loss fallback | Scene phase exits |
| Deployment | Pages base path, direct refresh of every route type, assets/404, canonical/sitemap/robots, HTTPS/custom-domain if selected | Release |

Deterministic camera acceptance: at progress 0 book closed, at opening label cover open, at entry label camera past page plane, at library label shelf visible; reversing to each label restores expected pose within tolerance and no duplicate ScrollTrigger remains. Mock animation time and scroll progress in tests; run one browser smoke with real scrolling. Book focus/tap must produce identical metadata and action. Reduced motion must skip scene import/camera movement and still reach reader in ≤3 user actions from a book listing. No-WebGL must retain all catalogue URLs. Record screenshots/video only as evidence, not as the sole assertion.

Release requires no critical axe findings, keyboard completion of collection → detail → reader, rights clearance, passing CI, direct-route Pages smoke, and performance measurements against [budget](../architecture/PERFORMANCE.md). If a target is missed, document measured value, user impact, mitigation, and explicit release decision. CI artifact availability is reported; owner manually downloads any needed artifact.
