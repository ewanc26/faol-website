// ── Site constants ──────────────────────────────────────
// Single source of truth for the canonical origin. The OG image builder, the
// RSS feed and the sitemap all need it, and having three copies meant a domain
// change silently left some of them pointing at the old host.

/** Canonical origin, without a trailing slash. */
export const SITE_URL = 'https://faol.croft.click';
