import {capitalCase} from 'change-case';
import {type SchemaTree} from 'src/tree/tree.class.js';
import type {SchemaUriNode} from 'src/tree/types.js';
import type {RenderManifest} from '../types.js';
import {BaseRenderer} from '../renderer.class.js';

export class SimpleRenderer extends BaseRenderer {
	async documentNode(node: SchemaUriNode, manifest: RenderManifest, tree: SchemaTree): Promise<void> {
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

	async definitionNode(node: SchemaUriNode, definition: {path: string; key: string}, manifest: RenderManifest, tree: SchemaTree): Promise<void> {
		manifest.push({
			path: [node.path, `${definition.key}.md`].filter(Boolean).join('/'),
			file: {type: 'markdown', content: `# ${capitalCase(definition.key)}`},
		});
	}
}
