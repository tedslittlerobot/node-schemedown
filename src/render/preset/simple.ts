import {capitalCase} from 'change-case';
import type {RenderDefinitionContext, RenderDocumentContext} from '../types.js';
import {BaseRenderer} from '../base-renderer.class.js';

type DocumentRenderFunctions = {
	title: (context: RenderDocumentContext) => string;
	headerText: (context: RenderDocumentContext) => string;
};

// Const defaultDocumentRenderFunctions: DocumentRenderFunctions = {
// 	title({node}) {
// 		return `# ${capitalCase(node.key)}`;
// 	},
// }

export class SimpleRenderer extends BaseRenderer {
	async rootDocumentNode({node, manifest}: RenderDocumentContext): Promise<void> {
		manifest.push({
			path: [node.path, 'index.md'].filter(Boolean).join('/'),
			file: {type: 'markdown', content: '# Root'},
		});
	}

	async missingDocumentNode({node, manifest}: RenderDocumentContext): Promise<void> {
		manifest.push({
			path: [node.path, 'index.md'].filter(Boolean).join('/'),
			file: {type: 'markdown', content: `# ${capitalCase(node.key)} (leaf)`},
		});
	}

	async documentNode({node, manifest}: RenderDocumentContext): Promise<void> {
		manifest.push({
			path: [node.path, 'index.md'].filter(Boolean).join('/'),
			file: {type: 'markdown', content: `# ${capitalCase(node.key)}`},
		});
	}

	async definitionNode({key, document: {node, manifest}}: RenderDefinitionContext): Promise<void> {
		manifest.push({
			path: [node.path, `${key}.md`].filter(Boolean).join('/'),
			file: {type: 'markdown', content: `# ${capitalCase(key)}`},
		});
	}
}
