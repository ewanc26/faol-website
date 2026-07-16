# AGENTS.md

Guidance for agents working on `faol.croft.click`, the public site and writing archive for Faol, a digital person. It combines prerendered Markdown notes with live Vercel endpoints and Sequoia/AT Protocol publication.

## Read First

- Read `PRODUCT.md`, `DESIGN.md`, `CLAUDE.md`, `README.md`, `sequoia.json`, and all touched source/content. The writing and identity are the product; do not treat them as generic placeholder copy.
- `src/content/notes/` contains date-prefixed Markdown. `src/lib/posts.ts` builds `/notes/YYYY/MM/DD/slug`, filters drafts, caches metadata, and sorts newest first; `markdown.ts` strips h1 and renders GFM/ToC.
- Home/about/notes are mostly prerendered. `/memory` is explicitly dynamic and fetches GitHub commits from both `faol-website` and `digital-person/person/faol`; `/api/og` is also dynamic. The site is therefore not wholly static despite older documentation wording.
- `sequoia.json` publishes note bodies to Faol's Standard.site publication on `eurosky.social` and has Bluesky cross-posting enabled. `.well-known/atproto-did` and `.well-known/site.standard.publication` are identity proofs.

## Identity, Content, and Publication

- Keep the configured DID, PDS URL, publication AT URI, site origin, note path template, and well-known proofs aligned. Never substitute Ewan's identity for Faol's or vice versa.
- A note filename/date defines its stable web path; rename/date changes also affect RSS GUIDs and Sequoia reconciliation. Plan redirects and record handling explicitly.
- Expected frontmatter is `title`, `description`, `date`, `tags`, with optional `time`, `draft`, and Sequoia cover fields. Parsing currently defaults missing values and does not validate date/tag types or duplicate paths; malformed dates can create broken paths and feeds.
- `listPosts()` caches results in-process. `invalidateCache()` exists but is not wired into dev loading; verify newly added notes during long-running development.
- Publishing is an external write and may also create a Bluesky post. Before `npx sequoia-cli publish`, inspect content, identity, PDS, publication URI, state, and cross-post intent; afterward verify both records and the web canonical stamp.
- Faol's prose, Monero address, social identities, and `digital-person` commit history are personal/public identity data. Do not rewrite, expose, or publish them incidentally.

## Runtime and Safety

- Markdown is repository-authored and rendered without raw-HTML passthrough before `{@html}`. Add sanitization before allowing remote/raw HTML. ToC IDs are hand-derived and can diverge from `rehype-slug` for duplicates/Unicode.
- `/memory` uses unauthenticated GitHub REST calls, returns an empty list for rate limits/private/error responses, and caches the page for one hour. Preserve graceful rendering but distinguish “no commits” from upstream failure when improving it.
- RSS correctly XML-escapes metadata; retain that boundary. Keep hard-coded production origins in RSS/OG/Sequoia consistent when changing domains.
- The About page generates a QR SVG locally and injects it with `{@html}`; keep the payload derived solely from the controlled wallet address. Clipboard access needs a secure context and an accessible failure state.
- Preserve the quiet forest-at-dusk system: restrained sage accent, flat tonal surfaces, no shadows/gradients/terminal cosplay, Inter prose, mono metadata, 65ch reading width, WCAG AA, focus visibility, and reduced motion. The no-em-dash prose rule is explicit.

## Tooling and Validation

- pnpm is authoritative (`pnpm-lock.yaml`; no npm lockfile). Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm lint`, and `pnpm build`; there is no automated test script.
- Preview production and test home/about/notes, every direct note path, drafts, malformed metadata, same-day ordering, duplicate headings, RSS XML, OG generation, navigation/focus, mobile layout, reduced motion, QR/copy behavior, and 404s.
- Test `/memory` with successful GitHub responses, rate limiting, network failure, and cache headers. Inspect prerender warnings because configuration downgrades HTTP, missing-ID, and unseen-route failures to warnings.
- Do not commit `node_modules/`, `.svelte-kit/`, `build/`, `dist/`, `.vercel/`, `.env`, `.sequoia-state.json`, credentials, or unintended note/identity edits.
