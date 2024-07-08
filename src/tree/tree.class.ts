import {type Schema} from 'src/types.js';
import {getSchemasFromDirectory} from 'src/utils/io.js';
import {type SchemaSupply, type SchemaUriNode} from './types.js';
import {treeify} from './treeify.js';
import {getSchemaSupply} from './get-schema-supply.js';

export class SchemaTree {
	public static async fromDirectory(source: string) {
		const schemas = await getSchemasFromDirectory(source);

		return new SchemaTree(schemas);
	}

	public readonly schemas: SchemaSupply;
	public readonly tree: SchemaUriNode;

	constructor(
		public readonly source: Schema[],
	) {
		this.schemas = getSchemaSupply(source);
		this.tree = treeify(this.schemas);
	}
}
