# CI, deployment, and SEO strategy

**State:** specified only; no workflow/site exists yet. Owner chose a public GitHub repository and MIT software license; site origin and production deployment remain decision gates. A private-repository Pages conflict was researched but is resolved by the owner's public-repository choice. GitHub Free supports Pages from public repositories ([GitHub Pages eligibility](https://docs.github.com/en/pages/getting-started-with-github-pages)).

## CI/CD

On pull request and push: `npm ci` → validate content/rights → lint → typecheck → unit/component/accessibility checks → static build → inspect routes/budgets. On approved main release: same checks, upload `out/` with GitHub Pages artifact action, then deploy-pages. Concurrency prevents overlapping deployments. Keep one workflow for app checks/deploy and the SKB-mandated repo-knowledge sync workflow, adapting its build/test commands to this project. `tools/repo_knowledge sync --ci` owns generated mechanical state and must run/report even when checks fail, per SKB policy. Use least-privilege workflow permissions; only deployment job needs `pages: write` and `id-token: write`. No external deployment secrets for default Pages URL.

Do not automatically download GitHub Actions artifacts locally. After CI, report run/result and artifact availability; owner downloads manually if needed.

## Pages and routing

Build with Next static export. For `https://soobujmiah.github.io/kitabs/`, configure base path `/kitabs` and matching asset URLs; for a custom domain, rebuild with root base path and selected canonical origin. Generate directory-form `index.html` per route and test direct refresh. A `404.html` provides navigation. A project site's `/kitabs/robots.txt` is informational; crawlers normally request the origin-root `/robots.txt`, which this repository may not control. Publish the sitemap from the owning user site or submit its direct URL to search tools if needed. Pages size and bandwidth limits are monitored against asset manifest. Version assets where possible; Pages caching headers are not assumed configurable. If library media grows beyond Pages practical limits, evaluate CDN/object storage before migration.

## Crawlable pages

Home and collection pages contain real headings, descriptions, and linked book cards in export HTML. Each public book page has unique title/description, author, language, cover alt, canonical, Open Graph image, and appropriate Book JSON-LD only when fields/rights are accurate. Reader pages have title/TOC/chapter HTML and no hidden content requirement. Generate `sitemap.xml` only for public URLs and `robots.txt` for the selected origin. Validate source HTML with JS disabled and inspect rendered page with JS enabled. Avoid false rich-result claims.

## Release procedure

1. Confirm public repository, MIT source license, identity, content/asset rights, and desired URL.
2. CI passes at the release commit; rights and accessibility/performance evidence are reviewed.
3. Owner authorizes production deployment under SKB policy; configure Pages source and custom domain/DNS if chosen.
4. Deploy and smoke-test HTTPS, home, direct collection/book/reader routes, assets, sitemap, 404, reduced motion, and no-WebGL fallback. Record evidence in phase/handoff docs; generated commit/build facts remain under `.repo/`.
