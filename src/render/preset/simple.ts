import {capitalCase} from 'change-case';
import type {RenderDefinitionContext, RenderDocumentContext} from '../types.js';
import {BaseRenderer} from '../renderer.class.js';

type DocumentRenderFunctions = {
	title: (context: RenderDocumentContext) => string;
	headerText: (context: RenderDocumentContext) => string;
};

export class SimpleRenderer extends BaseRenderer {
	async documentNode({node, manifest}: RenderDocumentContext): Promise<void> {
		if (node.path === '') {
			manifest.push({
				path: [node.path, 'index.md'].filter(Boolean).join('/'),
				file: {type: 'markdown', content: '# Root'},
			});

			return;
		}

		if (node.definition) {
			manifest.push({
				path: [node.path, 'index.md'].filter(Boolean).join('/'),
				file: {type: 'markdown', content: `# ${capitalCase(node.key)}`},
			});
		} else {
			manifest.push({
				path: [node.path, 'index.md'].filter(Boolean).join('/'),
				file: {type: 'markdown', content: `# ${capitalCase(node.key)} (leaf)`},
			});
		}
	}

	async definitionNode({key, document: {node, manifest}}: RenderDefinitionContext): Promise<void> {
		manifest.push({
			path: [node.path, `${key}.md`].filter(Boolean).join('/'),
			file: {type: 'markdown', content: `# ${capitalCase(key)}`},
		});
	}
}
