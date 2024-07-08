import {type Schema} from 'src/types.js';

export function isDefinition(schema: Schema) {
	return schema.type !== undefined || schema.oneOf !== undefined;
}
