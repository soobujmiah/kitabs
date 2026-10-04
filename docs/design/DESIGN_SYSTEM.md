# Visual design system — candidate direction

**Status:** specified direction, pending visual prototype and owner review. The design uses dark academia, cinematic depth, and a quiet editorial reader. It must remain legible in flat/low-motion mode. These are project tokens, not a copied reference site.

## Palette and surfaces

| Token | Value | Use |
|---|---|---|
| `ink` | `#171411` | Main dark background |
| `walnut` | `#30241C` | Shelf/wood base |
| `paper` | `#F1E8D6` | Reader and light cards |
| `parchment` | `#D7C9AF` | Muted light surface |
| `brass` | `#C5A469` | Accent, never sole state cue |
| `text-light` | `#F5F0E7` | Text on dark surfaces |
| `text-dark` | `#251E18` | Text on paper |
| `focus` | `#F7C96C` | Visible outline |
| `danger` | `#B74639` | Error with text/icon |

Verify all token pairs for WCAG 2.2 AA before release; adjust by measured contrast. Do not overlay body text on raw textures or moving 3D without an opaque/scrimmed backing.

## Type and layout

Use a licensed expressive serif for display headings and book titles, a readable serif for long-form reader text, and a neutral sans for controls/metadata; system fallbacks ship until font rights, subset, and language coverage are verified. Reader target: 65–75 characters per line, adjustable text size, 1.5–1.7 line height. 8px spacing base; layout steps 8/16/24/32/48/72. Touch target minimum 44×44 CSS px. A 12-column desktop grid becomes a 2-column tablet catalogue and 1-column mobile catalogue, while reader remains a centered measure.

## Material and lighting

The entry cover uses deep embossed walnut/leather-like material with restrained brass type. Paper is warm and nearly matte; shelf wood grain is low contrast and baked into optimized textures. Lighting has one warm key and a cooler ambient fill to separate planes. Shadows are baked/soft and sparse; no bloom dependence. Paper and wood texture should have a flat-color fallback. Cover typography must remain real DOM text where content matters. Do not use decorative particles where they harm clarity or budget.

## Components and interaction states

Catalogue card: cover, title, authors, category, availability; selected/focus state combines outline, lift, and textual state. Shelf controls are real buttons/links. Detail panel uses generous whitespace and a stable back/close affordance. Reader offers light paper surface, dark readable text, chapter navigation, and optional theme control. Hover motion is decorative; focus and touch get equivalent information/actions. Error and loading views keep navigation usable.

## Quality review

Review cover composition, page silhouette, camera occlusion, material scale, contrast, responsive typography, and reduced-motion layout on actual browsers. Aesthetic approval is a release gate, not evidence that the current tokens have been visually validated. Superdesign canvas was unavailable by owner choice; this specification is authored directly and must be assessed through prototypes/screenshots in the design phase.
