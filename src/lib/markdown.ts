import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import type { Root } from 'mdast';

function remarkStripH1() {
	return (tree: Root) => {
		tree.children = tree.children.filter(
			(node: Root['children'][number]) => node.type !== 'heading' || node.depth !== 1
		);
	};
}

export interface TocEntry {
	level: number;
	text: string;
	id: string;
}

export interface RenderResult {
	html: string;
	toc: TocEntry[];
}

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkStripH1)
	.use(remarkRehype)
	.use(rehypeSlug)
	.use(rehypeStringify);

export async function renderMarkdown(markdown: string): Promise<RenderResult> {
	const tree = processor.parse(markdown);

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
