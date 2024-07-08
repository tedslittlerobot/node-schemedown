import type {SchemaSupply, SchemaUriNode} from './types.js';
import {extractDefinitions} from './extract-definitions.js';
import {isDefinition} from './utils.js';

export function makeNode($id: string | undefined, schemas: SchemaSupply, {path, key}: {path: string; key: string}): SchemaUriNode {
	if (!$id) {
		return {
			$id,
			path,
			key,
			children: [],
			definition: undefined,
			definitions: [],
		};
	}

	const schema = schemas.documents[$id];

	if (!schema) {
		throw new Error(`Cannot find schema for [${$id}]`);
	}

	const definitions = extractDefinitions(schema);

	return {
		$id,
		path,
		key,
		children: [],
		definition: isDefinition(schema) ? $id : undefined,
		definitions: definitions ? Object.keys(definitions) : [],
	};
}

export function makeBlankNode($id: string): SchemaUriNode {
	return {
		$id,
		key: '',
		path: '',
		children: [],
		definition: undefined,
		definitions: [],
	};
}
