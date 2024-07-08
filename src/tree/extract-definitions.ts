import {type Schema} from 'src/types.js';

export function extractDefinitions(schema: Schema): Record<string, Schema> | undefined {
	for (const definitionKey of ['$defs', 'definitions'] as const) {
		if (definitionKey in schema) {
			const definitions: Record<string, Schema> | undefined = (schema as any)[definitionKey] as unknown as Record<string, Schema> | undefined;

			if (definitions) {
				const output: Record<string, Schema> = {};

				for (const key of Object.keys(definitions)) {
					output[`${schema.$id}#/${definitionKey}/${key}`] = definitions[key];
				}

				return output;
			}
		}
	}

	return undefined;
}
