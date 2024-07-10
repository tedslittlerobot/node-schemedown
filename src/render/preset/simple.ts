import {capitalCase} from 'change-case';
import type {RenderContext, RenderDefinitionContext, RenderDocumentContext} from '../types.js';
import {BaseRenderer} from '../base-renderer.class.js';
import {markdownRenderers} from '../markdown.js';

export class SimpleRenderer extends BaseRenderer {
	async rootDocumentNode(context: RenderDocumentContext): Promise<void> {
		await this.documentNode(context);
	}

	async missingDocumentNode({node, manifest}: RenderContext): Promise<void> {
		manifest.push({
			path: [node.path, 'index.md'].filter(Boolean).join('/'),
			file: {type: 'markdown', content: `# ${capitalCase(node.key)}`},
		});
	}

	async documentNode(context: RenderDocumentContext): Promise<void> {
		context.manifest.push({
			path: [context.node.path, 'index.md'].filter(Boolean).join('/'),
			file: {
				type: 'markdown', content: [
					markdownRenderers.document.title(context),
					markdownRenderers.document.description(context),
				],
			},
		});
	}

	async definitionNode({key, document: {node, manifest}}: RenderDefinitionContext): Promise<void> {
		manifest.push({
			path: [node.path, `${key}.md`].filter(Boolean).join('/'),
			file: {type: 'markdown', content: `# ${capitalCase(key)}`},
		});
	}
}
