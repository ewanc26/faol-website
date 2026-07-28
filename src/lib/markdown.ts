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

/** Recursively collect the text content of a hast node. */
function hastText(node: any): string {
	if (node.type === 'text') return node.value;
	if (!Array.isArray(node.children)) return '';
	return node.children.map(hastText).join('');
}

/** Render Markdown to HTML and extract a TOC from H2/H3 headings. */
export async function renderMarkdown(markdown: string): Promise<RenderResult> {
	const tree = processor.parse(markdown);
	const hast: any = await processor.run(tree);

	// Read the TOC off the *processed* tree so the anchors are exactly the
	// IDs rehype-slug wrote into the HTML. Deriving them separately from the
	// mdast text diverged for duplicate headings (rehype-slug appends -1, -2)
	// and for non-ASCII text, producing table-of-contents links to nowhere.
	const toc: TocEntry[] = [];
	for (const node of hast.children ?? []) {
		if (node.type !== 'element') continue;
		if (node.tagName !== 'h2' && node.tagName !== 'h3') continue;
		const id = node.properties?.id;
		if (typeof id !== 'string' || !id) continue;
		toc.push({ level: Number(node.tagName.slice(1)), text: hastText(node), id });
	}

	const html = processor.stringify(hast);

	return { html, toc };
}
