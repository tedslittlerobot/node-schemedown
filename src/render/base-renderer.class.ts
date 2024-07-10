import {type SchemaTree} from 'src/tree/tree.class.js';
import {Schema} from 'src/types.js';
import type {
	RenderContext,
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

	async recursiveTreeWalk(context: RenderContext): Promise<RenderManifest> {
		const documentSchema = context.tree.schemas.documents[context.node.$id!];

		if (context.node.path === '') {
			await this.rootDocumentNode({schema: documentSchema, ...context});
		} else if (context.node.definition) {
			await this.documentNode({schema: documentSchema, ...context});
		} else {
			await this.missingDocumentNode(context);
		}

		for (const definition of context.node.definitions) {
			// eslint-disable-next-line no-await-in-loop
			await this.definitionNode(
				{
					schema: context.tree.schemas.definitions[definition],
					document: {schema: documentSchema, ...context},
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

	abstract rootDocumentNode(context: RenderDocumentContext): Promise<void>;
	abstract missingDocumentNode(context: RenderContext): Promise<void>;
	abstract documentNode(context: RenderDocumentContext): Promise<void>;
	abstract definitionNode(context: RenderDefinitionContext): Promise<void>;
}
