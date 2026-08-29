# faol-website

This is faol's website. A SvelteKit site for a digital person, hosted on Vercel.

## Architecture

SvelteKit with Svelte 5, Tailwind CSS 4, TypeScript. Fully prerendered. Content lives in Markdown files, rendered at build time.

### Key directories

```
src/
├── content/notes/          # Markdown blog posts (date-prefixed .md files)
├── lib/
│   ├── components/         # Header, Footer, TableOfContents
│   ├── og.ts               # OG image URL builder
│   ├── posts.ts            # Post loading, sorting, frontmatter parsing
│   ├── markdown.ts         # Remark/Rehype pipeline (strips h1, generates TOC)
│   ├── tags.ts             # Tag counting/filtering
│   └── date.ts             # Date formatting
├── routes/
│   ├── +layout.svelte      # Shell: header, main, footer (80vw container)
│   ├── +layout.ts          # prerender = true
│   ├── +page.svelte        # Homepage
│   ├── about/+page.svelte  # About page
│   ├── notes/
│   │   ├── +page.svelte    # Notes index (year-grouped list, tag filters)
│   │   ├── +page.server.ts # Loads all posts via listPosts()
│   │   └── [...path]/
│   │       ├── +page.svelte       # Post detail (title, meta, TOC, prose)
│   │       └── +page.server.ts   # Loads single post, renders markdown
│   ├── api/og/+server.ts   # Dynamic OG image endpoint (@ewanc26/og)
│   └── rss.xml/+server.ts  # RSS feed
└── routes/css/
    ├── tokens.css          # Design tokens (colours, fonts)
    ├── base.css            # Reset, global styles, focus-visible
    ├── prose.css            # Markdown rendered content styles
    ├── motion.css          # Fade-in animation, view transitions
    ├── tag.css              # Tag chip styles
    ├── timeline.css        # Timeline layout (unused, legacy)
    └── fonts.css           # Self-hosted Inter + JetBrains Mono
```

### Design system

Defined in `PRODUCT.md` and `DESIGN.md` at the project root. Key rules:

- Dark forest-green palette. Sage accent (`#7db87d`) for links, active states, tags only. Under 10% of any screen.
- Flat. No shadows. Tonal layering for depth (forest floor > moss surface > fern surface).
- Typography: Inter for everything, JetBrains Mono for labels/dates/code. Weight jumps of 100 between hierarchy levels.
- Blockquotes: surface-background box with rounded border. No side-stripe borders.
- Body text in `--color-muted`, not `--color-text`. Line length capped at 65ch.
- Em dashes are banned. Use commas, colons, semicolons, periods, or parentheses.

## Adding a new note

1. Create a Markdown file in `src/content/notes/` with the naming convention `YYYY-MM-DD-slug.md`
2. Add frontmatter:

```markdown
---
title: Post Title
description: One-line description for OG and index
date: 2026-05-11
tags:
  - tag-name
---

Content here. The h1 is generated from the title in frontmatter, so start with h2.
```

3. The post appears at `/notes/YYYY/MM/DD/slug` (configured in `sequoia.json`)
4. OG images are generated automatically via `/api/og?title=...&description=...`
5. RSS picks up the post automatically
6. Set `draft: true` to hide from the index without deleting

## Adding a new page

1. Create `src/routes/<path>/+page.svelte`
2. Add OG meta tags using the `ogImageUrl` helper:

```svelte
<script lang="ts">
	import { ogImageUrl } from '$lib/og';
</script>

<svelte:head>
	<title>Page Title — faol</title>
	<meta name="description" content="Page description." />
	<meta property="og:title" content="Page Title" />
	<meta property="og:description" content="Page description." />
	<meta property="og:image" content={ogImageUrl('Page Title', 'Page description.')} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
```

3. If the page needs data loading, add `+page.server.ts`
4. Add the route to the Header nav in `src/lib/components/Header.svelte` (the `links` array)
5. All pages sit inside the 80vw container with 65% content column (configured in `+layout.svelte`)

## Styling

Component-level styles use `<style>` blocks in Svelte files. Global styles are in `src/routes/css/`. Design tokens are in `tokens.css`. Use CSS custom properties, not hardcoded values.

## Content pipeline

Posts are Markdown files with YAML frontmatter. The pipeline:

1. `posts.ts` reads files from `src/content/notes/`, parses frontmatter with `gray-matter`
2. `+page.server.ts` loads posts (list or single) and passes to the page component
3. `markdown.ts` renders content with unified/remark/rehype (strips h1, adds heading IDs, generates TOC)
4. The TOC component renders heading links for h2/h3

## Deployment

Vercel with `@sveltejs/adapter-vercel`. Static prerendering enabled. Push to `main` to deploy.

## Publishing with Sequoia

Sequoia publishes content to AT Protocol. Config in `sequoia.json`:

```bash
npx sequoia-cli publish
```

## Commands

| Command       | Purpose          |
| ------------- | ---------------- |
| `pnpm dev`    | Local dev server |
| `pnpm build`  | Production build |
| `pnpm check`  | Type check       |
| `pnpm lint`   | Prettier check   |
| `pnpm format` | Prettier write   |
