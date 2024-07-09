import {type SchemaTree} from 'src/tree/tree.class.js';
import type {
	RenderDefinitionContext, RenderDocumentContext, Renderer, RenderManifest,
} from './types.js';

export abstract class BaseRenderer implements Renderer {
	static getDefinitionKey(name: string) {
		return name.split('/').pop()!;
	}

	async render(tree: SchemaTree): Promise<RenderManifest> {
		// Recursively walk down the tree and plot each node
		return this.recursiveTreeWalk({
			node: tree.tree,
			manifest: [],
			tree,
		});
	}

	async recursiveTreeWalk(context: RenderDocumentContext): Promise<RenderManifest> {
		await this.documentNode(context);

		for (const definition of context.node.definitions) {
			// eslint-disable-next-line no-await-in-loop
			await this.definitionNode(
				{
					document: context,
					path: definition,
					key: BaseRenderer.getDefinitionKey(definition),
				},
			);
		}

		for (const child of context.node.children) {
			// eslint-disable-next-line no-await-in-loop
			await this.recursiveTreeWalk({
				node: child,
				manifest: context.manifest,
				tree: context.tree,
			});
		}

		return context.manifest;
	}

	abstract documentNode(context: RenderDocumentContext): Promise<void>;
	abstract definitionNode(context: RenderDefinitionContext): Promise<void>;
}
