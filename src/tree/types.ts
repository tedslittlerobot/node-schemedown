import {type Schema} from 'src/types.js';

export type KeyReference = {
	$id: string;
	key: string;
};

export type SchemaSupply = {
	documents: Record<string, Schema>;
	definitions: Record<string, Schema>;
};

/**
 * This essentially represents a schema JSON document - ie. the whole .json document.
 * ie. Not necessarily an actual schema definition.
 */
export type SchemaUriNode = {
	/**
	 * The ID from the JSON Schema Doc. Undefined if there is no corresponding doc.
	 *
	 * A document should have either a definition, or sub-definitions.
	 * In theory it could have neither but it would be a fairly useless document.
	 */
	$id: string | undefined;

	/**
	 * The full path of the item in the heirarchy.
	 */
	path: string;

	/**
	 * The key of the item
	 */
	key: string;

	/**
	 * Leaves for child items
	 */
	children: SchemaUriNode[];

	/**
	 * Reference of document-level definitions
	 */
	definition: string | undefined;

	/**
	 * References of definitions
	 */
	definitions: string[];
};
