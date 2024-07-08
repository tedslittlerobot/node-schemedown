import {type SchemaTree} from 'src/tree/tree.class.js';
import type {Renderer, RenderManifest} from '../types.js';

export class SimpleRenderer implements Renderer {
	render(tree: SchemaTree): RenderManifest {
		return [];
	}
}
