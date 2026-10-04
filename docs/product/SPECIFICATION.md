# Product specification

**Goal:** a premium interactive public digital library that moves from **book → page → library → shelf → book**, while letting every visitor browse and read directly. Initial audience: general desktop/mobile visitors; initial title, editorial collection, and language inventory require owner confirmation. No paywall, accounts, user uploads, private books, or backend in MVP.

## Requirements and acceptance contracts

| ID | Requirement | Observable acceptance |
|---|---|---|
| R01 | Entry giant book and clear library identity | Cover/title appears with loading/skip controls; semantic catalogue is present in source HTML. |
| R02 | Scroll opens book and enters library | Desktop timeline has labelled reversible opening/entry states; reverse scroll restores prior state without a jump. |
| R03 | Library and shelf exploration | Visitor can choose collection and shelf via canvas or HTML; current selection is visible and URL/state consistent. |
| R04 | Sequential book reveal and inspection | Books reveal in a predictable order; hover/focus/tap exposes equivalent title, author, category and action. |
| R05 | Book details and reader | Direct URLs load detail and readable HTML chapters, TOC, back navigation; catalogue-only book has honest unavailable state. |
| R06 | Accessible bypass | Keyboard, screen reader, reduced-motion, no-JS/no-WebGL paths reach the same public content and reader. |
| R07 | Responsive experience | Desktop, tablet, and mobile have distinct interaction layouts; no required hover on touch. |
| R08 | Performance | Measured provisional budgets in performance spec and graceful quality reduction; content renders before scene. |
| R09 | Search discoverability | Public home, collections, book/detail/reader pages output meaningful HTML, metadata, canonical and sitemap. |
| R10 | Rights and security | Every public book/asset has documented display rights; no secrets or private content in static export. |
| R11 | Data migration seam | UI consumes `BookRepository`; switching static to API adapter does not alter domain model/view contracts. |
| R12 | Reproducible delivery | CI validates data, accessibility, tests, type/lint/build; Pages direct-route smoke passes before release. |

## Journey and scene states

1. **The Book:** a visually dominant closed book, readable title/identity, subtle lighting, lightweight poster before 3D. Loading has progress/status and retry. “Browse books” immediately skips animation.
2. **Opening:** desktop scroll scrubs cover hinge and a limited number of page leaves. Motion is linked to visible user progress, not a timed gate.
3. **Entering:** camera moves through the page aperture; cut/fade at a controlled occlusion boundary avoids clipping. Backward scroll returns smoothly.
4. **Library:** one atmospheric room with essential shelves, a table/lamp/window as depth cues; dust and audio are optional and disabled in low quality. HTML collection navigation remains visible.
5. **Shelf:** selected collection is highlighted and moved into focus. Shelf reveal exposes its books; no hidden scroll trap.
6. **Books:** reveal follows catalogue `sortOrder`. Hover and keyboard focus pull a book forward; tap selects then offers explicit “Open details.” Metadata is a DOM overlay.
7. **Detail:** selected book gets a visible cover and full metadata, description, availability, chapters if present, and Read/Preview action. Direct route works without scene.
8. **Reader:** semantic article/chapter text, TOC, next/previous, comfortable line measure and typography, focus return, and direct URL. Page-turn decoration is optional and never blocks text.

## Reader format policy

MVP: reviewed Markdown compiled to semantic HTML at build time. PDF is a later attachment/alternate download only where rights permit; EPUB is a later adapter with reading-system testing; image-only books require OCR/alt/transcript or are catalogue-only. Reader format and distribution permission are separate decisions. Do not treat a cover image as a complete accessible book.

## Content rules

Rights status must be explicit: public domain (jurisdiction verified), open license (terms/attribution verified), owner created, licensed (scope/territory/expiry verified), or restricted (metadata only or omitted). No assumption that a public URL grants hosting rights. See [rights model](../security/RIGHTS.md).
