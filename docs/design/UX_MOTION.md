# UX, motion, accessibility, and responsive contracts

**Motion goal:** each movement explains a spatial relationship. Entry reveals the book; hinge explains opening; camera passage connects book and library; shelf reveal identifies collection; pull-out identifies book selection. All navigation remains direct without motion.

| Event | Desktop choreography | Reduced motion / low quality | Acceptance |
|---|---|---|---|
| Load/entrance | Poster immediately, book light/settle 400–700 ms after scene ready | Poster and content immediately; no translation | No blank page or forced wait |
| Cover/open | Scroll scrub hinge ~0–115° with bounded page deformation | Static open-book illustration or jump to catalogue | Reverse scroll is continuous; skip works |
| Camera enter | Labelled timeline, ~1 viewport of travel with occlusion cut | Crossfade ≤150 ms or instant | No clipping or content trap |
| Library/shelf | Camera settles; chosen shelf translates/reveals ≤500 ms | Direct section switch | HTML state matches scene |
| Book reveal | Ordered stagger 60–100 ms, bounded total ≤800 ms | Immediate full list | No book hidden from keyboard |
| Hover/focus/tap | 6–12 px pull, 120–220 ms ease-out; metadata DOM panel | Outline and metadata only | All inputs expose same information |
| Select/detail | Book advances then route/panel opens ≤450 ms | Immediate detail route | Direct URL works |
| Reader page | Optional short opacity transition ≤180 ms | Immediate chapter | Focus moves to chapter heading |
| Loading/error | Stable progress text/retry; no indefinite spinner | Same | Content path remains available |

Scrubbed animation duration is defined by scroll distance, not seconds. Timed values are targets to test. Use ease-out for response and ease-in-out for reversible spatial shifts; avoid bounce, idle camera drift, autoplay audio, and scroll-jacking. Stop and dispose timelines on route or media-query changes. Preserve scroll position only where it does not conceal the next page heading.

## Accessibility

Semantic landmarks, heading order, skip link, labelled controls, visible focus, keyboard collection/book traversal, and descriptive cover alt text are mandatory. Canvas is `aria-hidden` when its DOM equivalent carries actions; pointer hits dispatch the same domain selection. Screen readers get live loading/error status only when state changes, without narrating every frame. Test at 200% zoom and text resize; maintain WCAG 2.2 AA color, focus, and target-size criteria. `prefers-reduced-motion: reduce` prevents scene camera/scroll choreography and page turns; a visible “Reduce motion” setting can override to low-motion. If WebGL creation fails or context is lost, remove canvas, show catalogue, and offer retry without losing selection. The no-animation and no-JS route still exposes catalogue links and reader text.

## Responsive behavior

**Desktop ≥1024px:** full scene with scroll camera, pointer hover and click, side metadata overlay, DOM section links. **Tablet 600–1023px:** shorter/shallower scene, no pinned long camera tunnel, tap select, 2-column catalogue, detail drawer or route. **Mobile <600px:** poster or simplified single-book/shelf scene only after capability check; direct vertical catalogue and horizontal collection strip, tap to select/open, no hover dependency, smaller textures and lower DPR. Breakpoints are provisional and must be revised after content/target-device tests. Touch interactions cannot require precision dragging. Orientation/resizing may switch modes without losing selected slug or reader chapter.
