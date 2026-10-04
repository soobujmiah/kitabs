# Kitabs agent instructions

Purpose: build an immersive book-to-library-to-book experience with a usable, crawlable library and reader for everyone. Preserve the static MVP and rights-first content boundary. Do not introduce private books, auth, a database, or deployment merely because tooling exists.

## Reading order and authority

1. Read this file, `docs/handoff/CURRENT.md`, `.repo/STATUS.md` when installed, current Git state, and the phase in `docs/phases/PLAN.md`.
2. For non-trivial decisions verify canonical SKB `soobujmiah/skb` via its Git remote, then read `ASSISTANT_CONTEXT.md`, `profile/assistant-guidance.md`, and task-relevant linked standards. In this environment a verified local checkout is `/home/sbj/skb`; check its remote and freshness again. SKB supplies owner context and governance. This repository's source, tests, and live Git state govern implementation facts.
3. Consult `docs/architecture/DECISIONS.md`, `docs/TRACEABILITY.md`, and relevant product/design/test documents before changing contracts. Distinguish proposed, implemented, locally verified, CI verified, and released.

## Boundaries

- A semantic catalogue and reader are the primary functional interface. WebGL is optional progressive enhancement.
- Book metadata, media, and reader content have separate models and rights records. Never publish material without verified distribution rights.
- Keep static metadata behind a `BookRepository` adapter so a future backend can replace the source without rewriting views.
- Never commit credentials, private content, or Supabase secret/service-role keys. No backend in MVP.
- For this new project, do not invent a license. Retain the copyright notice until the owner selects terms.

## Workflow and evidence

Complete documentation gate in `docs/phases/PLAN.md` before production UI code. Work one phase at a time: read contract, implement, test, review, update human-authored docs/traceability/handoff, then commit. Before each session state current HEAD, milestone, expected files, checks, and deferred work. At close inspect diff/status, run relevant checks, and report actual results. A new agent must resume from Git/repo evidence, never chat memory.

When `.repo/` is installed, `tools/repo_knowledge` and CI alone own mechanical state (`.repo/project.yaml`, `.repo/STATUS.md`, events). Do not hand-edit it. Human-authored rationale, phase scope, and next gates stay in docs. Follow SKB `governance/REPO_STATE_PROTOCOL.md` and `governance/KNOWLEDGE_RETURN_PROTOCOL.md`; return durable, verified project knowledge through authorized SKB access. Never copy secrets or assume protocol presence grants write authority.

Use GitHub Actions for repeatable checks and Pages deployment only after the release gate. A generated Actions artifact stays in GitHub; the owner downloads it manually if needed. Do not silently retrieve it locally. Production deployment and repository visibility/license decisions remain human authority gates unless explicitly authorized.
