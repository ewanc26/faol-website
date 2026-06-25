// ── Markdown Rendering Pipeline ─────────────────────────
// Unified / remark / rehype transform: parses Markdown, strips the H1
// (which is rendered by the page template from frontmatter), and builds
// a table of contents from remaining headings.

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import type { Root } from 'mdast';

/** Strip all H1 headings — the post title is rendered from frontmatter, not Markdown. */
function remarkStripH1() {
	return (tree: Root) => {
		tree.children = tree.children.filter(
			(node: Root['children'][number]) => node.type !== 'heading' || node.depth !== 1
		);
	};
}

/** A single entry in the generated table of contents. */
export interface TocEntry {
	level: number;
	text: string;
	id: string;
}

/** Processed HTML and extracted TOC from a Markdown string. */
export interface RenderResult {
	html: string;
	toc: TocEntry[];
}

// Pipeline: remark → strip H1 → rehype → slugify → stringify
const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkStripH1)
	.use(remarkRehype)
	.use(rehypeSlug)
	.use(rehypeStringify);

/** Render Markdown to HTML and extract a TOC from H2/H3 headings. */
export async function renderMarkdown(markdown: string): Promise<RenderResult> {
	const tree = processor.parse(markdown);

	// Extract H2/H3 headings into a TOC before rehype processes them.
	// Walking the raw mdast tree avoids parsing slug IDs back out of HTML.
	const toc: TocEntry[] = [];
	for (const node of tree.children) {
		if (node.type !== 'heading' || node.depth < 2 || node.depth > 3) continue;
		const text = node.children
			.filter((c) => c.type === 'text' || c.type === 'inlineCode')
			.map((c) => ('value' in c ? c.value : ''))
			.join('');
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s/g, '-');
		toc.push({ level: node.depth, text, id });
	}

	const hast = await processor.run(tree);
	const html = processor.stringify(hast);

	return { html, toc };
}
