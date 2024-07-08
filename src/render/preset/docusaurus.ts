import {type SchemaTree} from 'src/tree/tree.class.js';
import type {Renderer, RenderManifest} from '../types.js';

export class DocusaurusRenderer implements Renderer {
	render(tree: SchemaTree): RenderManifest {
		return [];
	}
}
