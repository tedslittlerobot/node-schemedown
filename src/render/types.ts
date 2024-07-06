
export type RenderManifest = RenderManifestItem[];

export type RenderManifestItem = {
	path: string;
	file: RawFile | MarkdownFile | JsonFile;
};

export type MarkdownFile = {
	type: 'markdown';
	content: string;
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
