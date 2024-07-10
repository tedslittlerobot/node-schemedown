import {capitalCase} from 'change-case';
import type {
	DefinitionMarkdownRenderer,
	DocumentMarkdownRenderer,
	MarkdownRenderer,
	RenderDefinitionContext,
	RenderDocumentContext,
} from './types.js';

export const markdownRenderers: MarkdownRenderer = {
	document: {
		title({schema, node}) {
			return `# ${schema['x-title'] ?? capitalCase((node.key || node.$id?.split('/').pop()) ?? 'untitled')}`;
		},
		description({schema}) {
			return schema['x-description'];
		},
	},
	definition: {
		title({key, schema}) {
			return `# ${schema['x-title'] ?? capitalCase(key)}`;
		},
		description({schema}) {
			return schema['x-description'];
		},
	},
};

export function renderDocument(context: RenderDocumentContext, overrides: Partial<DocumentMarkdownRenderer> = {}): Array<string | undefined> {
	const renderer: DocumentMarkdownRenderer = {...overrides, ...markdownRenderers.document};

	return [
		renderer.title(context),
		renderer.description(context),
	];
}

export function renderDefinition(context: RenderDefinitionContext, overrides: Partial<DefinitionMarkdownRenderer> = {}): Array<string | undefined> {
	const renderer: DefinitionMarkdownRenderer = {...overrides, ...markdownRenderers.definition};

	return [
		renderer.title(context),
		renderer.description(context),
	];
}
