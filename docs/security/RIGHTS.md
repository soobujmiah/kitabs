# Content rights and security model

## Publication decision

The static export makes every included byte public. UI hiding, robots, or an absent download button do not enforce rights. A book can be listed only with permission to display its metadata/cover; reader text and downloadable file require separate explicit rights. No arbitrary copyrighted uploads. Before publication, each text edition, cover, model, texture, font, and audio file needs a source, rights basis, relevant territory, attribution, permitted actions, and evidence record. Public-domain claims must be checked for the publication jurisdiction and source edition; Gutenberg's US status does not establish global rights. Open licenses require exact version/conditions. Owner-created work needs ownership confirmation; licensed work needs scope/expiry; restricted work never enters `public/` or generated HTML.

| Rights basis | MVP action |
|---|---|
| Owner-created, rights confirmed | May publish per owner's instruction |
| Public-domain, relevant jurisdiction/edition confirmed | May publish with source record |
| Open-license, terms and attribution met | May publish within allowed actions |
| Licensed, publication permission verified | May publish only within scope/expiry/territory |
| Restricted/unknown | Metadata only if allowed; no cover/text/file export |

`content/rights/*.json` is the local evidence index; private contracts stay outside Git and are referenced by non-sensitive identifier. Review rights again before custom domain or public release. Code repository copyright is Copyright © Sobuj Miah / সবুজ মিয়া; no source license is assumed.

## Security controls

MVP has no accounts, forms that persist personal data, database, or secret runtime configuration. Validate static record paths/URLs and sanitize Markdown output. Pin dependencies and review licenses. `.env*` is ignored except documented examples with placeholders. Do not log/bookmark sensitive reader state without user choice. Future private books require server-backed entitlement checks, RLS and least-privilege grants, private storage, short-lived signed URLs, and tests for anonymous/authenticated denial. A Supabase publishable key may be browser-visible only under tested policies; secret/service-role keys are never browser-visible. GitHub Pages cannot meet restricted-content enforcement by itself.

Threat review before MVP release: malicious Markdown HTML/links, dependency compromise, asset licensing gaps, accidental credential commit, route/path traversal in build inputs, and misleading download affordance. A later backend adds auth/session, RLS, signed URL leakage, and abuse/rate-limit analysis as a separate phase.
