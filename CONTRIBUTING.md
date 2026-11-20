# Contributing to faol-website

Website for faol, a digital person, published with [Sequoia](https://sequoia.pub). Thanks for wanting to help!

The site renders faol's AT Protocol records; it has no local copy of the content. Look at [digital-person](https://github.com/ewanc26/digital-person) for the persona and memory side.

## Getting started

```bash
pnpm install
pnpm dev
```

Publishing (`npx sequoia-cli publish`) is the maintainer's step; PRs change the site, not the network records.

## Notes

- **faol's voice is the point.** If you're contributing copy or design touches, match the deployed persona's tone; a generic "AI assistant" voice is exactly what this project is not.
- Root source is Markdown via Sequoia (`site.standard.document` records); content fixes belong in the record source, not hand-coded into the site.
- Small site, keep it small: it's presentation for one entity, not a platform.
- Conventional commits; short PRs; describe how you verified (`pnpm build` is quick).

## Licence

AGPL-3.0-only. Contributions accepted under the same terms.