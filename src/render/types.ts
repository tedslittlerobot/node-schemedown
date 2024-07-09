import {type SchemaTree} from 'src/tree/tree.class.js';
import {type SchemaUriNode} from 'src/tree/types.js';

export type RenderDocumentContext = {
	node: SchemaUriNode;
	manifest: RenderManifest;
	tree: SchemaTree;
};

export type RenderDefinitionContext = {
	key: string;
	path: string;
	document: RenderDocumentContext;
};

export type Renderer = {
	render(tree: SchemaTree): Promise<RenderManifest> | RenderManifest;
};

export type RenderManifest = RenderManifestItem[];

export type RenderManifestItem = {
	path: string;
	file: RenderableFile;
};

export type RenderableFile = RawFile | MarkdownFile | JsonFile;

export type MarkdownFile = {
	type: 'markdown';
	content: string | Array<string | undefined>;
	frontMatter?: Record<string, unknown>;
};

export type JsonFile = {
	type: 'json';
	content: Record<string, unknown>;
};

export type RawFile = {
	type: 'raw';
	content: string;
};
