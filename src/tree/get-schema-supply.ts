import {type Schema} from 'src/types.js';
import {type SchemaSupply} from './types.js';
import {isDefinition} from './utils.js';
import {extractDefinitions} from './extract-definitions.js';

export function getSchemaSupply(schemas: Schema[]): SchemaSupply {
	const documents: Record<string, Schema> = {};
	let definitions: Record<string, Schema> = {};

	for (const schema of schemas) {
		if (!schema.$id) {
			throw new Error(`Schema has no id: ${JSON.stringify(schema)}`);
		}

		documents[schema.$id] = schema;

		if (isDefinition(schema)) {
			definitions[schema.$id] = schema;
		}

		definitions = {...definitions, ...extractDefinitions(schema)};
	}

	return {documents, definitions};
}
