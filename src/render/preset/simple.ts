import {capitalCase} from 'change-case';
import type {RenderContext, RenderDefinitionContext, RenderDocumentContext} from '../types.js';
import {BaseRenderer} from '../base-renderer.class.js';
import {renderDefinition, renderDocument} from '../markdown.js';

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
			file: {type: 'markdown', content: renderDocument(context)},
		});
	}

	async definitionNode(context: RenderDefinitionContext): Promise<void> {
		context.document.manifest.push({
			path: [context.document.node.path, `${context.key}.md`].filter(Boolean).join('/'),
			file: {type: 'markdown', content: renderDefinition(context)},
		});
	}
}
