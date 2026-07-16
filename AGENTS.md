# AGENTS.md

Guidance for agents working on the Faol website, a SvelteKit content/presentation project.

## Structure

- `src/routes/` defines pages and server endpoints.
- `src/lib/` contains shared components, data, and styling.
- `static/` contains public assets copied unchanged.

## Rules

- Read the current pages and README before changing visual direction; preserve the site's established identity.
- Use npm and keep `package-lock.json` authoritative.
- Prefer semantic HTML, progressive enhancement, accessible focus states, useful alt text, and responsive layouts.
- Keep environment-dependent or secret behavior in server-only modules. Never expose credentials through `$env/static/public` or serialized page data.
- Optimize images and avoid adding large client dependencies for effects achievable with existing CSS/components.
- Preserve stable public routes and metadata.

## Validation

Run `npm run check`, `npm run lint`, and `npm run build`, then preview production output. Review navigation, direct routes, 404 behavior, forms, metadata, keyboard flow, contrast, reduced motion, mobile widths, and asset loading from a clean checkout. Do not commit `.svelte-kit/`, build output, or `.env` files.
