import {capitalCase} from 'change-case';
import type {MarkdownRenderer} from './types.js';

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
