import {type SchemaTree} from 'src/tree/tree.class.js';
import type {SchemaUriNode} from 'src/tree/types.js';
import type {Renderer, RenderManifest} from './types.js';

export abstract class BaseRenderer implements Renderer {
	static getDefinitionKey(name: string) {
		return name.split('/').pop()!;
	}

	async render(tree: SchemaTree): Promise<RenderManifest> {
		// Recursively walk down the tree and plot each node
		return this.recursiveTreeWalk(tree.tree, [], tree);
	}

	async recursiveTreeWalk(node: SchemaUriNode, manifest: RenderManifest, tree: SchemaTree): Promise<RenderManifest> {
		await this.documentNode(node, manifest, tree);

		for (const definition of node.definitions) {
			// eslint-disable-next-line no-await-in-loop
			await this.definitionNode(
				node,
				{path: definition, key: BaseRenderer.getDefinitionKey(definition)},
				manifest,
				tree,
			);
		}

		for (const child of node.children) {
			// eslint-disable-next-line no-await-in-loop
			await this.recursiveTreeWalk(child, manifest, tree);
		}

		return manifest;
	}

	abstract documentNode(node: SchemaUriNode, manifest: RenderManifest, tree: SchemaTree): Promise<void>;
	abstract definitionNode(node: SchemaUriNode, definition: {path: string; key: string}, manifest: RenderManifest, tree: SchemaTree): Promise<void>;
}
